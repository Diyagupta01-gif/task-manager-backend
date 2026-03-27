import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  // ================= GET TASKS =================
  const getTasks = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/tasks",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ADD TASK =================
  const addTask = async () => {
    if (!title) return;

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/tasks",
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE TASK =================
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= TOGGLE TASK =================
  const toggleTask = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/tasks/${id}`,
        { toggle: true },   // 🔥 important
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT TASK =================
  const editTask = async (id, oldTitle) => {
    const newTitle = prompt("Edit task:", oldTitle);
    if (!newTitle) return;

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/tasks/${id}`,
        { title: newTitle },   // 🔥 important
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // ================= LOAD =================
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Task Manager 🚀</h2>
          <button style={styles.logout} onClick={logout}>
            Logout
          </button>
        </div>

        <div style={styles.inputBox}>
          <input
            style={styles.input}
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button style={styles.addBtn} onClick={addTask}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task._id} style={styles.task}>
              <span
                onClick={() => toggleTask(task._id)}
                style={{
                  ...styles.text,
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>

              <div>
                <button
                  style={styles.editBtn}
                  onClick={() => editTask(task._id, task.title)}
                >
                  ✏️
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTask(task._id)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ================= STYLES =================
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
  },
  addBtn: {
    background: "#4facfe",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    background: "#f2f2f2",
    padding: "8px",
    borderRadius: "5px",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "red",
  },
  editBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    marginRight: "5px",
  },
  text: {
    cursor: "pointer",
  },
};

export default Dashboard;