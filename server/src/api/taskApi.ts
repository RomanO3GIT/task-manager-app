const BASE_URL = "http://localhost:5000/api/tasks";

export const getTasks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createTask = async (task: {
  title: string;
  description: string;
}) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id: string, updatedData: any) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const deleteTask = async (id: string) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
