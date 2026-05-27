import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-700 to-teal-700 flex justify-center items-center px-4">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <div className="flex flex-col items-center mb-6">

          <div className="bg-white p-4 rounded-full shadow-lg mb-4">
            <FaUserPlus className="text-4xl text-green-600" />
          </div>

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-200 mt-2 text-center">
            Start tracking your expenses smartly
          </p>

        </div>

        <form className="space-y-5">

          <div>
            <label className="text-white text-sm">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-2 p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="text-white text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="text-white text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button className="w-full bg-white text-green-700 font-bold py-4 rounded-xl hover:scale-105 transition duration-300 shadow-lg">
            Register
          </button>

        </form>

        <p className="text-center text-gray-200 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-bold text-yellow-300 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;