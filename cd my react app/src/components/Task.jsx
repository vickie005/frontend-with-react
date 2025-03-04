import { useState } from "react";

function Task({ task, onDelete, onEdit, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task.text);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    onEdit(updatedTask);
    setIsEditing(false);
  };

  return (
    <div style={styles.task}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggleComplete}
      />
      {isEditing ? (
        <input
          type="text"
          value={updatedTask}
          onChange={(e) => setUpdatedTask(e.target.value)}
          style={styles.input}
        />
      ) : (
        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
          {task.text}
        </span>
      )}

      {isEditing ? (
        <button onClick={handleSave} style={styles.saveBtn}>Save</button>
      ) : (
        <button onClick={handleEdit} style={styles.editBtn}>Edit</button>
      )}

      <button onClick={onDelete} style={styles.deleteBtn}>Delete</button>
    </div>
  );
}

const styles = {
  task: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    margin: "5px 0",
    borderRadius: "5px",
  },
  input: {
    padding: "5px",
  },
  editBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  saveBtn: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Task;
