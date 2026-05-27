const express = require(
  "express"
);

const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require(
  "../controllers/transactionController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

// Add + Get
router
  .route("/")
  .post(
    protect,
    addTransaction
  )
  .get(
    protect,
    getTransactions
  );

// Update + Delete
router
  .route("/:id")
  .put(
    protect,
    updateTransaction
  )
  .delete(
    protect,
    deleteTransaction
  );

module.exports = router;