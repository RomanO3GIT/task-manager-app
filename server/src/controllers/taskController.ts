import { Request, Response } from "express";
import Task from "../models/Task";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }
    const newTask = new Task({ title, description, completed: false });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTaskCompleted = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      res.status(400).json({ message: "Invalid 'completed' value" });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
