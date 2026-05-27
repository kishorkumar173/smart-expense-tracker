import {
  FaChartPie,
  FaWallet,
  FaMoneyBill,
  FaCog
} from "react-icons/fa";

import { useNavigate }
from "react-router-dom";

function Sidebar() {

  const navigate =
    useNavigate();

  return (
    <div className="bg-gradient-to-b from-slate-950 to-blue-950 text-white w-72 min-h-screen p-8 shadow-2xl">

      <h1 className="text-3xl font-bold mb-12">
        Expense Tracker
      </h1>

      <ul className="space-y-5">

        <li
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-800 transition cursor-pointer"
        >
          <FaChartPie />
          Dashboard
        </li>

        <li
          onClick={() =>
            alert(
              "Transactions Page Coming Soon 😎"
            )
          }
          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-800 transition cursor-pointer"
        >
          <FaMoneyBill />
          Transactions
        </li>

        <li
          onClick={() =>
            alert(
              "Budget Page Coming Soon 😎"
            )
          }
          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-800 transition cursor-pointer"
        >
          <FaWallet />
          Budget
        </li>

        <li
          onClick={() =>
            alert(
              "Settings Page Coming Soon 😎"
            )
          }
          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-800 transition cursor-pointer"
        >
          <FaCog />
          Settings
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;