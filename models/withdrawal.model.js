const { Schema, model, models } = require("mongoose");

const withdrawalSchema = new Schema(
  {
    riderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSED", "FAILED"],
      default: "PENDING",
    },
    transferReference: String,
  },
  {
    timestamps: true,
  }
);

const Withdrawal = models.Withdrawal || model("Withdrawal", withdrawalSchema);

module.exports = Withdrawal;
