import AddTransaction from "../components/AddTransaction";
import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BudgetCard from "../components/BudgetCard";

import {
  FaTrash,
  FaEdit,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {

  const [summary, setSummary] =
    useState({});

  const [transactions,
    setTransactions] =
    useState([]);

  const [filter,
    setFilter] =
    useState("");

  const token =
    localStorage.getItem(
      "token"
    );

  const config = {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {

        const summaryRes =
          await API.get(
            "/dashboard/summary",
            config
          );

        setSummary(
          summaryRes.data
        );

        const transactionRes =
          await API.get(
            "/transactions",
            config
          );

        setTransactions(
          transactionRes.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  // DELETE
  const deleteTransaction =
    async (id) => {
      try {

        await API.delete(
          `/transactions/${id}`,
          config
        );

        fetchDashboard();

      } catch (error) {
        console.log(error);
      }
    };

  // EDIT
  const editTransaction =
    async (item) => {

      const amount =
        prompt(
          "Enter new amount",
          item.amount
        );

      if (!amount) return;

      try {

        await API.put(
          `/transactions/${item._id}`,
          {
            category:
              item.category,
            amount,
            description:
              item.description,
          },
          config
        );

        fetchDashboard();

      } catch (error) {
        console.log(error);
      }
    };

  // SEARCH FILTER
  const filteredTransactions =
    transactions.filter(
      (item) =>
        item.category
          .toLowerCase()
          .includes(
            filter.toLowerCase()
          )
    );

  // PIE CHART
  const pieData =
    transactions
      .filter(
        (t) =>
          t.type === "expense"
      )
      .map((item) => ({
        name:
          item.category,
        value:
          item.amount,
      }));

  // BAR CHART
  const barData =
    transactions.map(
      (item) => ({
        category:
          item.category,
        amount:
          item.amount,
      })
    );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
  ];

  return (
    <div className="flex bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        <Navbar />

        <AddTransaction
          refreshDashboard={
            fetchDashboard
          }
        />

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 my-8">

          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl p-6 shadow-xl">
            <h3>
              Total Income
            </h3>

            <h1 className="text-4xl font-bold">
              ₹
              {
                summary.totalIncome
                || 0
              }
            </h1>
          </div>

          <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-3xl p-6 shadow-xl">
            <h3>
              Total Expense
            </h3>

            <h1 className="text-4xl font-bold">
              ₹
              {
                summary.totalExpense
                || 0
              }
            </h1>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl p-6 shadow-xl">
            <h3>
              Balance
            </h3>

            <h1 className="text-4xl font-bold">
              ₹
              {
                summary.balance
                || 0
              }
            </h1>
          </div>

        </div>

        {/* Budget */}
        <div className="mb-8">

          <BudgetCard
            expense={
              summary.totalExpense
            }
          />

        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="font-bold text-xl mb-4">
              Expense Pie Chart
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {pieData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="font-bold text-xl mb-4">
              Expense Analytics
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={barData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="category"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="amount"
                />
              </BarChart>

            </ResponsiveContainer>
          </div>

        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search category..."
          className="border p-3 rounded-xl mb-4 w-full shadow-md"
          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }
        />

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Transactions
          </h2>

          <table className="w-full overflow-hidden rounded-2xl">

            <thead>
              <tr>
                <th>
                  Category
                </th>

                <th>
                  Type
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredTransactions.map(
                (item) => (
                  <tr
                    key={
                      item._id
                    }
                    className="border-b text-center hover:bg-slate-100 transition"
                  >

                    <td>
                      {
                        item.category
                      }
                    </td>

                    <td>
                      {
                        item.type
                      }
                    </td>

                    <td>
                      ₹
                      {
                        item.amount
                      }
                    </td>

                    <td className="flex gap-3 justify-center py-3">

                      <button
                        onClick={() =>
                          editTransaction(
                            item
                          )
                        }
                        className="bg-blue-500 text-white p-2 rounded-lg"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          deleteTransaction(
                            item._id
                          )
                        }
                        className="bg-red-500 text-white p-2 rounded-lg"
                      >
                        <FaTrash />
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>
          </table>
        </div>

        <div className="text-center mt-8 text-gray-500">
          Made with ❤️ by Kishor Kumar L
        </div>

      </div>
    </div>
  );
}

export default Dashboard;