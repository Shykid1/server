const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    isAvailable: { type: Boolean, default: false },
    lastActive: { type: Date },
    rating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    totalDeliveries: { type: Number, default: 0 },
    currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    accountBalance: { type: Number, default: 0 },
    bankDetails: {
      bankCode: String,
      accountNumber: String,
      accountName: String,
      recipientCode: String, // Paystack recipient code
    },
  },
  {
    timestamps: true,
  }
);

const Rider = mongoose.models.Rider || mongoose.model("Rider", riderSchema);

module.exports = Rider;
