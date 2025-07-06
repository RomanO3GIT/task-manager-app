import React, { useState } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  completed?: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onUpdate: (
    id: string,
    updatedFields: { title: string; description: string }
  ) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onToggleComplete,
  onUpdate,
}) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const startEditing = (task: Task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const saveEdit = () => {
    if (editingTaskId) {
      onUpdate(editingTaskId, {
        title: editTitle,
        description: editDescription,
      });
      setEditingTaskId(null);
    }
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <input
            type="checkbox"
            checked={!!task.completed}
            onChange={() => onToggleComplete(task._id, !task.completed)}
          />
          <div className="task-content">
            {editingTaskId === task._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                />
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{task.title}</strong> {task.description}
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => onDelete(task._id)}>Delete</button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
