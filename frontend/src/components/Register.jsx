import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register.css"; // Shared styling file

export default function Register({ onRegister }) {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onRegister(user);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            className="auth-input"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          <button type="submit" className="auth-button">Register</button>
        </form>
        <div className="auth-footer">
          <span>Already have an account?</span>
          <button className="link-button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
