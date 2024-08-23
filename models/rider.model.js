const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "User ID is required",
  },
  address: {
    type: String,
    required: "Address is required",
    trim: true,
  },
  city: {
    type: String,
    required: "City is required",
    trim: true,
  },
  region: {
    type: String,
    required: "Region is required",
    trim: true,
  },
  phone: {
    type: String,
    required: "Phone number is required",
    trim: true,
  },
  active: {
    type: String,
    default: "false",
    enum: ["true", "false"],
  },
  available: {
    type: String,
    default: "false",
    enum: ["true", "false"],
  },
});

const Rider = mongoose.models.Rider || mongoose.model("Rider", riderSchema);

module.exports = Rider;
