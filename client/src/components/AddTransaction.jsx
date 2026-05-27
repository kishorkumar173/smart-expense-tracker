import { useState } from "react";
import API from "../services/api";

function AddTransaction({
  refreshDashboard,
}) {
  const [formData,
    setFormData] =
    useState({
      type: "expense",
      category: "",
      amount: "",
      description: "",
    });

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMTZiZDQzMmYxYzM5YmM2ZGQ3ODRmNyIsImlhdCI6MTc3OTg3NjE5NywiZXhwIjoxNzgwNDgwOTk3fQ.nDpP1FQVk2_jJWP8j88Lscx7SHmruzjNsa7XXCq7MEE";

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await API.post(
          "/transactions",
          formData,
          config
        );

        alert(
          "Transaction Added"
        );

        setFormData({
          type: "expense",
          category: "",
          amount: "",
          description: "",
        });

        refreshDashboard();

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

      <h2 className="text-2xl font-bold mb-5">
        Add Transaction
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
        className="grid md:grid-cols-4 gap-4"
      >

        <select
          name="type"
          value={
            formData.type
          }
          onChange={
            handleChange
          }
          className="border p-4 rounded-xl"
        >
          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={
            formData.category
          }
          onChange={
            handleChange
          }
          className="border p-4 rounded-xl"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={
            formData.amount
          }
          onChange={
            handleChange
          }
          className="border p-4 rounded-xl"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          className="border p-4 rounded-xl"
        />

        <button className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition">
          Add Transaction
        </button>

      </form>
    </div>
  );
}

export default AddTransaction;