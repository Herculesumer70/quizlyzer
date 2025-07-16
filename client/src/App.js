// src/App.js <- this is react navigate feature and imported fontawesome, free solid icons.
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import logo from "./quizlyzer.png";

function App({ username, setUsername }) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("summary");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername("");
    localStorage.removeItem("user");
    navigate("/");
  };

  // makes sure that if something is not credible
  const handleGenerate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/generate", {
        text,
        mode,
      });
      setResult(response.data.result);
    } catch (err) {
      console.error("❌ Error generating:", err);
      setResult("❌ Something went wrong.");
    }
  };

  // when a user saves a summary/quiz, they get notified on the screen
  const handleSave = async () => {
    if (!result) return;
    try {
      const res = await axios.post("http://localhost:5000/api/saved/save", {
        username,
        mode,
        content: result,
      });
      alert("✅ Saved!");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Failed to save.");
    }
  };

  return (
    <div className="app-page">
      <div className="logout-btn_" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </div>

      <div className="logo-container">
        <img src={logo} alt="Quizlyzer Logo" className="app-logo" />
        <h1 className="app-title">Quizlyzer</h1>
      </div>
      <h2 className="welcome">Welcome, {username} 🎉</h2>

      <textarea
        className="prompt-box"
        rows="5"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="controls__">
        <select
          className="dropdown"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="summary">Summarize</option>
          <option value="quiz">Generate Quiz</option>
        </select>

        <button className="generate-btn" onClick={handleGenerate}>
          Generate
        </button>

        <button className="save-btn" onClick={handleSave}>
          Save {mode === "summary" ? "Summary" : "Quiz"}
        </button>

        <button className="view-btn" onClick={() => navigate("/Saved")}>
          View Saved
        </button>
      </div>

      <div className="result-output">
        {Array.isArray(result) ? (
          result.map((q, i) => (
            <p key={i}>
              Q{i + 1}: {q}
            </p>
          ))
        ) : (
          <div className="result-output">{result}</div>
        )}
      </div>
    </div>
  );
}

export default App;
