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
  const [isLoading, setIsLoading] = useState(false);

  // Extract token from query string
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (!tokenFromUrl) {
      setError("Invalid reset link. Please request a new password reset link.");
      return;
    }
    // Decode the token from URL
    try {
      const decodedToken = decodeURIComponent(tokenFromUrl);
      setToken(decodedToken);
    } catch (err) {
      setError("Invalid reset link format. Please request a new password reset link.");
    }
  }, [location]);

  // Submit new password to backend
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/reset-password",
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
      if (err.response?.data?.error === "Invalid or expired token") {
        setError("This password reset link has expired. Please request a new one.");
      } else {
        setError(err.response?.data?.error || "Failed to reset password. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
        minLength="6"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPassword;
