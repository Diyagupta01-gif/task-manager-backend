const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// ✅ REGISTER ROUTE
router.post("/register", registerUser);

// ✅ LOGIN ROUTE
router.post("/login", loginUser);

// ✅ FORGOT PASSWORD
router.post("/forgot", forgotPassword);

// ✅ RESET PASSWORD
router.post("/reset/:token", resetPassword);

// 🔥 NEW: GUEST LOGIN ROUTE (REAL SYSTEM)
router.post("/guest", async (req, res) => {
  try {
    const jwt = require("jsonwebtoken");

    // 👇 temporary guest user
    const guestUser = {
      _id: "guest_" + Date.now(),
      email: "guest@demo.com",
    };

    // 👇 generate token
    const token = jwt.sign(
      { id: guestUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Guest login failed" });
  }
});

module.exports = router;