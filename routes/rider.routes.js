const riderController = require("../controllers/rider.controller");
const protect = require("../middleware/Auth.middleware");
const express = require("express");

const router = express.Router();

// Create a new rider
router.post("/create", protect, riderController.createRider);

// Get all riders
router.get("/", protect, riderController.getRiders);

// Get a single rider
router.get("/:id", protect, riderController.getRiderById);

// Update a rider
router.put("/:id", protect, riderController.updateRider);

// Delete a rider
router.delete("/:id", protect, riderController.deleteRider);

module.exports = router;
