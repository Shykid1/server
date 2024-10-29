const paystackRequest = require("./paystack.service");
const Rider = require("../models/Rider");

const riderBankVerificationService = async (req, res) => {
  try {
    const { bankCode, accountNumber } = req.body;
    const { userId } = req.user;

    // Verify account with Paystack
    const accountResponse = await paystackRequest(
      "GET",
      `bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`
    );

    if (!accountResponse.status) {
      return res.status(400).json({ error: "Invalid account details" });
    }

    const rider = await Rider.findOne({ userId });

    // Create transfer recipient
    const recipientResponse = await paystackRequest(
      "POST",
      "transferrecipient",
      {
        type: "nuban",
        name: rider.name,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: "NGN",
      }
    );

    if (!recipientResponse.status) {
      return res
        .status(400)
        .json({ error: "Could not create transfer recipient" });
    }

    // Update rider's bank details
    await Rider.findOneAndUpdate(
      { userId },
      {
        bankDetails: {
          bankCode,
          accountNumber,
          accountName: accountResponse.data.account_name,
          recipientCode: recipientResponse.data.recipient_code,
        },
      }
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { riderBankVerificationService };
