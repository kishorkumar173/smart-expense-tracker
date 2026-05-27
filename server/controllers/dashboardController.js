const Transaction = require(
  "../models/Transaction"
);

const getDashboardSummary =
  async (req, res) => {
    try {
      const transactions =
        await Transaction.find({
          user: req.user._id,
        });

      const totalIncome =
        transactions
          .filter(
            (item) =>
              item.type ===
              "income"
          )
          .reduce(
            (acc, item) =>
              acc + item.amount,
            0
          );

      const totalExpense =
        transactions
          .filter(
            (item) =>
              item.type ===
              "expense"
          )
          .reduce(
            (acc, item) =>
              acc + item.amount,
            0
          );

      const balance =
        totalIncome -
        totalExpense;

      res.json({
        totalIncome,
        totalExpense,
        balance,
        transactions:
          transactions.length,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getDashboardSummary,
};