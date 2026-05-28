function BudgetCard({
  expense = 0,
  budget = 50000,
}) {

  const percentage =
    Math.min(
      (expense / budget) * 100,
      100
    );

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <div className="flex justify-between mb-3">

        <h2 className="font-bold text-xl">
          Monthly Budget
        </h2>

        <span className="font-semibold">
          ₹{expense} / ₹{budget}
        </span>

      </div>

      <div className="w-full bg-gray-200 rounded-full h-5">

        <div
          className="bg-green-500 h-5 rounded-full transition-all duration-500"
          style={{
            width:
              `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-4 text-gray-500">

        Remaining:
        ₹
        {budget - expense}

      </p>

    </div>
  );
}

export default BudgetCard;