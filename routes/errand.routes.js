const protect = require("../middleware/Auth.middleware");
const errandController = require("../controllers/errand.controller");
const router = require("express").Router();

// Create a new Errand
router.post("/", protect, errandController.createErrand);

// Retrieve all Errands
router.get("/", protect, errandController.getErrands);

// Retrieve a single Errand with id
router.get("/:id", protect, errandController.getErrand);

// Update a Errand with id
router.put("/accept/:id", protect, errandController.acceptErrand);

// Cancel a Errand with id
router.put("/cancel/:id", protect, errandController.cancelErrand);

// Pick up a Errand with id
router.put("/pickup/:id", protect, errandController.pickupErrand);

// Complete a Errand with id
router.put("/complete/:id", protect, errandController.completeErrand);

// Delete a Errand with id
router.delete("/:id", protect, errandController.deleteErrand);

// Delete all Errands
router.delete("/", protect, errandController.deleteAllErrands);

module.exports = router;
