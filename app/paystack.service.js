const PAYSTACK_BASE_URL = "api.paystack.co";
const https = require("https");
const Rider = require("../models/rider");
const Withdrawal = require("../models/withdrawal");
const Order = require("../models/order");
const { config } = require("dotenv");

config();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

const paystackRequest = (method, endpoint, data = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: PAYSTACK_BASE_URL,
      port: 443,
      path: `/v1/${endpoint}`,
      method: method,
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(data));
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};

const riderWithDrawal = async (req, res) => {
  try {
    const { amount } = req.body;
    const { userId } = req.user;

    const rider = await Rider.findOne({ userId });

    if (amount > rider.accountBalance) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    if (!rider.bankDetails?.recipientCode) {
      return res.status(400).json({ error: "Bank account not set up" });
    }

    // Initiate transfer with Paystack
    const transferResponse = await paystackRequest("POST", "transfer", {
      source: "balance",
      amount: amount * 100, // Paystack accepts amount in kobo
      recipient: rider.bankDetails.recipientCode,
      reason: `Rider withdrawal - ${rider.name}`,
    });

    if (!transferResponse.status) {
      return res.status(400).json({ error: "Transfer initiation failed" });
    }

    // Create withdrawal record
    const withdrawal = new Withdrawal({
      riderId: userId,
      amount,
      transferReference: transferResponse.data.reference,
    });
    await withdrawal.save();

    // Update rider's balance
    await Rider.findOneAndUpdate(
      { userId },
      { $inc: { accountBalance: -amount } }
    );

    res.json({ success: true, withdrawal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const paymentWebHookHandler = async (req, res) => {
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(400).send("Invalid signature");
  }

  const event = req.body;

  if (event.event === "charge.success") {
    const order = await Order.findOne({
      paymentReference: event.data.reference,
    });
    if (order) {
      order.paymentStatus = "PAID";
      order.status = "PAID";
      await order.save();
    }
  }

  if (event.event === "transfer.success") {
    const withdrawal = await Withdrawal.findOne({
      transferReference: event.data.reference,
    });
    if (withdrawal) {
      withdrawal.status = "PROCESSED";
      await withdrawal.save();
    }
  }

  res.sendStatus(200);
};

module.exports = { paystackRequest, riderWithDrawal, paymentWebHookHandler };
