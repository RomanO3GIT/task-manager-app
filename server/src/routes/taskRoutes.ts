import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskCompleted, // додай цю функцію у контролери
} from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id/completed", updateTaskCompleted); // новий PATCH маршрут
router.delete("/tasks/:id", deleteTask);

export default router;
