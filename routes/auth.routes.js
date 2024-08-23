const auth = require("../controllers/auth.controller");
const express = require("express");
const protect = require("../middleware/Auth.middleware");

const router = express.Router();

// Register a new user
router.post("/register", auth.register);

// Login a user
router.post("/login", auth.login);

// Get a user
router.get("/users", protect, auth.getUsers);

// Get a single user
router.get("/users/:id", protect, auth.getUserById);

// Update a user
router.put("/users/:id", protect, auth.updateUser);

// Delete a user
router.delete("/users/:id", protect, auth.deleteUser);

// Logout a user
router.post("/logout/:id", auth.logout);

module.exports = router;
