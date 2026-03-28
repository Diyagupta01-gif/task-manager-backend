const jwt = require("jsonwebtoken");
const User = require("../models/User");

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("TOKEN GENERATED:", token);

    res.json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };