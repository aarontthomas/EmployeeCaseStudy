// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import EmployeeManager from "./EmployeeManager.jsx" // Import it here

import { login, register } from "./services/authService.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
        const res = await login(credentials);
        if (res.status === 200) {
            setIsAuthenticated(true);
            Swal.fire("Logged in!", "Welcome back.", "success");
            navigate("/");
        }
    } catch {
        Swal.fire("Error", "Login failed. Please try again.", "error");
    }
  };

  const handleRegister = async (credentials) => {
    try {
      const res = await register(credentials);
      if (res.status === 201) {
        Swal.fire("Registered!", "Account created. Please log in.", "success");
        navigate("/login");
      }
    } catch {
      Swal.fire("Error", "Registration failed.", "error");
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onRegister={handleRegister} />} />

      <Route
        path="/"
        element={
          isAuthenticated ? <EmployeeManager /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
