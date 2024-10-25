const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "First name is required",
    trim: true,
  },
  email: {
    type: String,
    required: "Email is required",
    trim: true,
    unique: "Email already exists",
  },
  phone: {
    type: String,
    required: "Phone number is required",
    trim: true,
    unique: "Phone number already exists",
  },
  password: {
    type: String,
    required: "Password is required",
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "rider"],
    default: "user",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
