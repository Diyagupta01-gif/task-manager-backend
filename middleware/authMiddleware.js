const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token" });
    }

    // split properly
    const parts = header.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({ message: "Token format invalid" });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Token failed" });
  }
};

module.exports = protect;