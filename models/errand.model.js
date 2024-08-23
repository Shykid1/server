const mongoose = require("mongoose");

const errandSchema = new mongoose.Schema({
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rider",
    required: "Rider ID is required",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "User ID is required",
  },
  pickup: {
    type: String,
    required: "Pickup location is required",
    trim: true,
  },
  destination: {
    type: String,
    required: "Destination location is required",
    trim: true,
  },
  status: {
    type: String,
    enum: ["requested", "accepted", "picked up", "completed", "cancelled"],
    default: "requested",
  },
});

const Errand = mongoose.models.Errand || mongoose.model("Errand", errandSchema);

module.exports = Errand;
