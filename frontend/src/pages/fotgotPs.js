import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8070/user/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset link.");
    }
  };

  return (
    <div className="auth-wrapper d-flex justify-content-center align-items-center">
      <div className="auth-glass-card p-5">
        <h2 className="text-center fw-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleResetRequest}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control glass-input mb-3"
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="btn glass-btn w-100">
            Send Reset Link
          </button>
        </form>
        {message && <p className="text-center mt-3 text-success">{message}</p>}

        <div className="text-center mt-3">
          <button className="btn glass-btn-outline w-100" onClick={() => navigate("/login")}>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
