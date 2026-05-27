import axios from "axios";

const API = axios.create({
  baseURL:
    "https://smart-expense-tracker-mo5w.onrender.com/api",
});

export default API;