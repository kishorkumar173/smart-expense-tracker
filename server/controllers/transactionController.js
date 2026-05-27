const Transaction = require("../models/Transaction");

// Add Transaction
const addTransaction = async (req, res) => {
  try {
    const {
      type,
      category,
      amount,
      description,
      date,
    } = req.body;

    const transaction =
      await Transaction.create({
        user: req.user._id,
        type,
        category,
        amount,
        description,
        date,
      });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Transactions
const getTransactions = async (
  req,
  res
) => {
  try {
    const transactions =
      await Transaction.find({
        user: req.user._id,
      }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Transaction
const updateTransaction =
  async (req, res) => {
    try {
      const transaction =
        await Transaction.findById(
          req.params.id
        );

      if (!transaction) {
        return res
          .status(404)
          .json({
            message:
              "Transaction not found",
          });
      }

      // Check ownership
      if (
        transaction.user.toString() !==
        req.user._id.toString()
      ) {
        return res
          .status(401)
          .json({
            message:
              "Not authorized",
          });
      }

      const updatedTransaction =
        await Transaction.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(
        updatedTransaction
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Delete Transaction
const deleteTransaction =
  async (req, res) => {
    try {
      const transaction =
        await Transaction.findById(
          req.params.id
        );

      if (!transaction) {
        return res
          .status(404)
          .json({
            message:
              "Transaction not found",
          });
      }

      // Check ownership
      if (
        transaction.user.toString() !==
        req.user._id.toString()
      ) {
        return res
          .status(401)
          .json({
            message:
              "Not authorized",
          });
      }

      await transaction.deleteOne();

      res.json({
        message:
          "Transaction deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};