const express = require("express");

const {
  setBudget,
  getBudgetSummary,
} = require(
  "../controllers/budgetController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

// Set Budget
router.post(
  "/",
  protect,
  setBudget
);

// Get Budget Summary
router.get(
  "/:month",
  protect,
  getBudgetSummary
);

module.exports = router;