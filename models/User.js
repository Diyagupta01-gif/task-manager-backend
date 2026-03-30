const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // ✅ NEW FIELDS (safe to add)
  resetToken: {
    type: String,
  },
  resetTokenExpire: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);