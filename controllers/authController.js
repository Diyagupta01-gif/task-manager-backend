const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("REGISTER BODY:", req.body);

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ✅ LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN BODY:", req.body);

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { registerUser, loginUser };