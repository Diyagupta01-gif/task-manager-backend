const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", authHeader);

    // Check header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided ❌" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    console.log("TOKEN RECEIVED:", token?.substring(0, 20) + "...");

    // ✅ Verify using JWT_SECRET (matches how loginUser creates the token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);

    // Attach user id to request
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT Auth Error:", error.message);
    return res.status(401).json({ message: "Unauthorized ❌" });
  }
};

module.exports = authMiddleware;