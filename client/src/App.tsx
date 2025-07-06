import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

type Task = {
  _id: string;
  title: string;
  description: string;
  completed?: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const API_URL = "http://localhost:5000/api/tasks";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data: Task[]) => setTasks(data))
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (title: string, description: string) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create task");
        return res.json();
      })
      .then((newTask: Task) => setTasks((prev) => [...prev, newTask]))
      .catch((err) => alert(err.message));
  };

  const handleDelete = (id: string) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete task");
      })
      .then(() => setTasks((prev) => prev.filter((t) => t._id !== id)))
      .catch((err) => alert(err.message));
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    fetch(`${API_URL}/${id}/completed`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update task");
        return res.json();
      })
      .then((updatedTask: Task) => {
        setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
      })
      .catch((err) => alert(err.message));
  };

  const handleUpdate = (
    id: string,
    updatedFields: { title: string; description: string }
  ) => {
    const taskToUpdate = tasks.find((t) => t._id === id);
    if (!taskToUpdate) return;

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...updatedFields,
        completed: taskToUpdate.completed ?? false,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update task");
        return res.json();
      })
      .then((updatedTask: Task) => {
        setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
      })
      .catch((err) => alert(err.message));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return task.completed === false;
    if (filter === "completed") return task.completed === true;
    return true;
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Task Manager</h1>

      {/* Фільтри */}
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TaskForm onAdd={handleAdd} />
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
