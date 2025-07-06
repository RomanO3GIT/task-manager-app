import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// 🔹 Додаємо маршрути
import taskRoutes from "./routes/taskRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🔹 Підключаємо маршрути
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager API is running ✅");
});

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
