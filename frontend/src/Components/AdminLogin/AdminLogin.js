/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Dummy credentials for authentication
    if (email === "admin@123.com" && password === "admin123") {
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/adminDashboard"); // Redirect to admin dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="admin-auth-container">
      <h2 className="admin-auth-heading">Admin Login</h2>
      <form className="admin-auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="admin-auth-input"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="admin-auth-input"
        />
        {error && <p className="admin-auth-error">{error}</p>}
        <button type="submit" className="admin-auth-button">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;

*/


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      // Save the token to localStorage
      const token = response.data.token;
      localStorage.setItem("adminToken", token);

      // Navigate to admin dashboard
      navigate("/adminDashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="admin-auth-container">
      <h2 className="admin-auth-heading">Admin Login</h2>
      <form className="admin-auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="admin-auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="admin-auth-input"
        />
        {error && <p className="admin-auth-error">{error}</p>}
        <button type="submit" className="admin-auth-button">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
