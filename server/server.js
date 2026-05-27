const dashboardRoutes = require(
  "./routes/dashboardRoutes"
);
const budgetRoutes = require(
  "./routes/budgetRoutes"
);
const transactionRoutes = require(
  "./routes/transactionRoutes"
);
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(
  "/api/transactions",
  transactionRoutes
);
app.use(
  "/api/budget",
  budgetRoutes
);
app.use(
    "/api/dashboard",
    dashboardRoutes
);
app.get("/", (req, res) => {
  res.send("Smart Expense Tracker API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});