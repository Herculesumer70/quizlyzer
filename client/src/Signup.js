import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import logo from "./quizlyzer.png";

function Signup({ theme, toggleTheme }) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, username, password, confirmPassword } = formData;
    if (!email || !username || !password || !confirmPassword) {
      setLoading(false);
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      setLoading(false);
      return setError("Passwords do not match.");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        username,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-container ${theme}`}>
      {/* 🔁 Theme toggle switch <- slider for different theme */}
      <div className="theme-switch">
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider" />
        </label>
      </div>

      {/* 🧠 Logo and Tagline*/}
      <div className="branding">
        <img src={logo} alt="Quizlyzer Logo" className="quizlyzer-logo" />
        <p className="quizlyzer-tagline">
          Transform your text into knowledge — Summarize or Quiz instantly.
        </p>
      </div>

      {/* 📝 Signup Form */}
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}

        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input
          type={showPass ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type={showPass ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />

        <label className="show-password">
          <input
            type="checkbox"
            checked={showPass}
            onChange={() => setShowPass((prev) => !prev)}
          />
          Show Password
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
