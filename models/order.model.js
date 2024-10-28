const { Schema, model, models } = require("mongoose");

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    riderId: { type: String },
    pickupLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: { type: String, required: true },
    },
    deliveryLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: { type: String, required: true },
    },
    status: {
      type: String,
      enum: [
        "PENDING",
        "PAYMENT_PENDING",
        "PAID",
        "ACCEPTED",
        "PICKED_UP",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    estimatedDistance: { type: Number },
    estimatedDuration: { type: Number },
    price: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    paymentReference: String,
    riderEarnings: { type: Number },
    userRating: { type: Number },
    riderRating: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || model("Order", orderSchema);

module.exports = Order;
