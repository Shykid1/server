const Errand = require("../models/errand.model");
const Rider = require("../models/rider.model");
const User = require("../models/user.model");

// Create and Save a new Errand
exports.createErrand = async (req, res) => {
  try {
    const { riderId, userId, pickup, destination } = req.body;

    // Check if rider exists
    const rider = await Rider.findById(riderId);
    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if rider is available
    if (!rider.available) {
      return res.status(400).json({
        success: false,
        message: "Rider is not available",
      });
    }

    // Check if destination and pickup is provided
    if (!pickup || !destination) {
      return res.status(400).json({
        success: false,
        message: "Pickup and destination is required",
      });
    }

    // Create a new errand
    const errand = new Errand({
      riderId,
      userId,
      pickup,
      destination,
    });

    // Save errand in the database
    const data = await errand.save();

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Retrieve and return all errands from the database.
exports.getErrands = async (req, res) => {
  try {
    const errands = await Errand.find().populate("riderId").populate("userId");

    res.status(200).json({
      success: true,
      data: errands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Find a single errand with an id
exports.getErrand = async (req, res) => {
  try {
    const { id } = req.params;
    const errand = await Errand.findById(id)
      .populate("riderId")
      .populate("userId");

    if (!errand) {
      return res.status(404).json({
        success: false,
        message: "Errand not found",
      });
    }

    res.status(200).json({
      success: true,
      data: errand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// acceptErrand
exports.acceptErrand = async (req, res) => {
  try {
    const { id } = req.params;

    const status = "accepted";

    const errand = await Errand.findById(id);

    if (errand.status === "accepted") {
      return res.status(400).json({
        success: false,
        message: "Errand already accepted",
      });
    }

    const updatedErrand = await Errand.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!errand) {
      return res.status(404).json({
        success: false,
        message: "Errand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Errand accepted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel errand
exports.cancelErrand = async (req, res) => {
  try {
    const { id } = req.params;

    const status = "cancelled";

    const errand = await Errand.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!errand) {
      return res.status(404).json({
        success: false,
        message: "Errand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Errand cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Pick up errand
exports.pickupErrand = async (req, res) => {
  try {
    const { id } = req.params;

    const status = "picked up";

    const errand = await Errand.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!errand) {
      return res.status(404).json({
        success: false,
        message: "Errand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Errand picked up successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Complete errand
exports.completeErrand = async (req, res) => {
  try {
    const { id } = req.params;

    const status = "completed";

    const errand = await Errand.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!errand) {
      return res.status(404).json({
        success: false,
        message: "Errand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Errand completed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a errand with the specified id in the request
exports.deleteErrand = async (req, res) => {
  try {
    const { id } = req.params;

    const errand = await Errand.findByIdAndDelete(id);

    if (!errand) {
      return res.status(404).json({
        success: false,
        message: "Errand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Errand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete all errands by userId from the database.
exports.deleteAllErrands = async (req, res) => {
  try {
    const { userId } = req.params;

    const errands = await Errand.deleteMany({ userId });

    if (!errands) {
      return res.status(404).json({
        success: false,
        message: "Errands not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Errands deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
