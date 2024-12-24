require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");

connectDB();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
