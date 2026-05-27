const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");

// Set Budget
const setBudget = async (req, res) => {
  try {
    const { monthlyBudget, month } =
      req.body;

    let budget = await Budget.findOne({
      user: req.user._id,
      month,
    });

    // Update existing budget
    if (budget) {
      budget.monthlyBudget =
        monthlyBudget;

      await budget.save();
    } else {
      // Create new budget
      budget = await Budget.create({
        user: req.user._id,
        monthlyBudget,
        month,
      });
    }

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Budget Summary
const getBudgetSummary = async (
  req,
  res
) => {
  try {
    const { month } = req.params;

    const budget =
      await Budget.findOne({
        user: req.user._id,
        month,
      });

    if (!budget) {
      return res.status(404).json({
        message:
          "No budget found",
      });
    }

    // Get expenses
    const expenses =
      await Transaction.find({
        user: req.user._id,
        type: "expense",
      });

    const totalSpent =
      expenses.reduce(
        (acc, item) =>
          acc + item.amount,
        0
      );

    const remaining =
      budget.monthlyBudget -
      totalSpent;

    const exceeded =
      totalSpent >
      budget.monthlyBudget;

    res.json({
      budget:
        budget.monthlyBudget,
      spent: totalSpent,
      remaining,
      exceeded,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  setBudget,
  getBudgetSummary,
};