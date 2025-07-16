import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Login({ setUsername, theme, toggleTheme }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!user || !pass) return setError("All fields are required.");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: user,
        password: pass,
      });
      setUsername(res.data.username);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/app");
    } catch (err) {
      setError("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-container ${theme}`}>
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

      <form onSubmit={(e) => e.preventDefault()} className="auth-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <input
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <div className="show-password">
          <input
            type="checkbox"
            checked={showPass}
            onChange={() => setShowPass((prev) => !prev)}
          />
          Show Password
        </div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
