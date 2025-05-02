import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  // Extract token from query string
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (!tokenFromUrl) {
      navigate("/login");
    } else {
      setToken(tokenFromUrl);
    }
  }, [location, navigate]);

  // Submit new password to backend
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      const res = await axios.post(
        "http://localhost:5001/api/users/reset-password",
        {
          token,
          newPassword: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMsg(res.data.message || "Password reset successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Reset password error:", err.response || err);
      setError(err.response?.data?.error || "Reset failed");
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="reset-password-form">
      <h2>Reset Password</h2>
      {msg && <p style={{ color: "lightgreen" }}>{msg}</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
