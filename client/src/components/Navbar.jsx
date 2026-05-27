import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/");
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-5 flex justify-between items-center mb-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Smart Expense Tracker
        </h1>

        <p className="text-gray-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-slate-600" />

          <span className="font-semibold">
            {user?.name}
          </span>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;