const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    // check header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // extract token
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    // attach user
    req.user = decoded.id;

    next();

  } catch (error) {
  console.log("JWT ERROR:", error.message); // 🔥 ADD THIS
  return res.status(401).json({ message: "Token failed" });
}
};

module.exports = authMiddleware;