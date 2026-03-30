const admin = require("../firebaseAdmin");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    // check header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided ❌" });
    }

    // extract token
    const token = authHeader.split(" ")[1];

    // verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);

    console.log("DECODED:", decodedToken);

    // attach user
    req.user = decodedToken;

    next();
  } catch (error) {
    console.log("Firebase Auth Error:", error.message);
    return res.status(401).json({ message: "Unauthorized ❌" });
  }
};

module.exports = authMiddleware;