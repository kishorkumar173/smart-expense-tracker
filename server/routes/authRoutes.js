const express = require("express");

const authController = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post(
  "/register",
  authController.registerUser
);

// Login
router.post(
  "/login",
  authController.loginUser
);

// Protected Test Route
router.get(
  "/profile",
  protect,
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;