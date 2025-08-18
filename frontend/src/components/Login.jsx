import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css"
import Swal from "sweetalert2";

export default function Login({ onLogin }) {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => { e.preventDefault(); await onLogin(creds); };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={creds.username}
            onChange={(e) => setCreds({ ...creds, username: e.target.value })}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={creds.password}
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-footer">
          <span>New here?</span>
          <button className="link-button" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
