const Rider = require("../models/rider.model");

// Create a new rider
exports.createRider = async (req, res) => {
  try {
    const { userId, address, city, region, phone } = req.body;

    const rider = new Rider({
      userId,
      address,
      city,
      region,
      phone,
    });

    const newRider = await rider.save();

    res.status(201).json({
      success: true,
      data: newRider,
      message: "Rider created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all riders
exports.getRiders = async (req, res) => {
  try {
    const riders = await Rider.find().populate("userId");

    if (!riders) {
      return res.status(400).json({
        success: false,
        message: "No riders found",
      });
    }

    res.status(200).json({
      success: true,
      data: riders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single rider
exports.getRiderById = async (req, res) => {
  try {
    const { id } = req.params;

    const rider = await Rider.findById(id).populate("userId");

    if (!rider) {
      return res.status(400).json({
        success: false,
        message: "Rider not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rider,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a rider
exports.updateRider = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRider = await Rider.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedRider,
      message: "Rider updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a rider
exports.deleteRider = async (req, res) => {
  try {
    const { id } = req.params;

    await Rider.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Rider deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
