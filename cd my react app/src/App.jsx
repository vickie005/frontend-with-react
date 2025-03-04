import { useState, useEffect } from "react";
import Task from "./components/Task";

function App() {
  // Load tasks from localStorage on initial render
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Edit a task
  const editTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = updatedTask;
    setTasks(updatedTasks);
  };

  // Toggle task completion
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""} style={styles.app}>
      <h1>Task Manager</h1>
      <button onClick={toggleDarkMode} style={styles.darkModeBtn}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addBtn}>
          Add Task
        </button>
      </div>

      <div>
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onDelete={() => deleteTask(index)}
            onEdit={(updatedTask) => editTask(index, updatedTask)}
            onToggleComplete={() => toggleComplete(index)}
          />
        ))}
      </div>
    </div>
  );
}

// Inline styles for quick styling
const styles = {
  app: {
    textAlign: "center",
    padding: "20px",
    transition: "background 0.3s, color 0.3s",
  },
  input: {
    padding: "8px",
    marginRight: "10px",
  },
  addBtn: {
    padding: "8px 12px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  darkModeBtn: {
    padding: "8px 12px",
    marginBottom: "10px",
    cursor: "pointer",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default App;
