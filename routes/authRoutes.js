const express = require("express");
const router = express.Router();

// ✅ CORRECT IMPORT
const { loginUser } = require("../controllers/authController");

// ✅ ROUTE
router.post("/login", loginUser);

module.exports = router;