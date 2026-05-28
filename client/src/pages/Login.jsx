import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
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

        const res =
          await API.post(
            "/auth/login",
            formData
          );

        // Save token
        localStorage.setItem(
          "token",
          res.data.token
        );

        // Save logged-in user
        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        alert(
          "Login Success 😎"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Invalid credentials"
        );
      }
    };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-5">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-4 rounded-xl w-full mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-4 rounded-xl w-full mb-4"
          required
        />

        <button className="bg-blue-600 text-white p-4 rounded-xl w-full hover:bg-blue-700 transition">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;