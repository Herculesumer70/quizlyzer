// src/Saved.js <- this is where every summary/quiz is saved or deleted
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Saved.css";

function Saved({ username }) {
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState("summary");
  const [filter, setFilter] = useState("latest");

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/saved/view/${username}/${mode}`
      );

      const sorted =
        filter === "latest"
          ? [...res.data.items].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          : [...res.data.items].sort((a, b) =>
              mode === "quiz"
                ? a.content.length - b.content.length
                : a.content.length - b.content.length
            );

      setItems(sorted);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/saved/delete/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
      alert("✅ Item deleted successfully.");
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("❌ Failed to delete item.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [mode, filter]);

  return (
    <div className="saved-page">
      <h1>📚 Saved {mode === "summary" ? "Summaries" : "Quizzes"}</h1>

      <div className="filter-controls">
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="summarie">Summaries</option>
          <option value="quizz">Quizzes</option>
        </select>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="latest">Sort by Latest</option>
          <option value="length">Sort by Length</option>
        </select>
      </div>

      {items.length === 0 ? (
        <p className="empty-msg">No saved {mode}s found.</p>
      ) : (
        items.map((item, index) => (
          <div key={item._id} className="saved-item">
            <h3>
              {mode === "summary"
                ? `Summary #${index + 1}`
                : `Quiz #${index + 1}`}
            </h3>

            {mode === "quiz" && Array.isArray(item.content) ? (
              <ul>
                {item.content.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            ) : (
              <pre>{item.content}</pre>
            )}

            <div className="item-meta">
              Saved on {new Date(item.createdAt).toLocaleString()}
            </div>

            <div className="action-buttons">
              <button className="delete" onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Saved;
