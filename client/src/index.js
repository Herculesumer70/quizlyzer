import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./Signup";
import Login from "./Login";
import Saved from "./Saved";

function Root() {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Signup theme={theme} toggleTheme={toggleTheme} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setUsername={setUsername}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path="/app"
          element={<App username={username} setUsername={setUsername} />}
        />
        <Route path="/Saved" element={<Saved username={username} />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
