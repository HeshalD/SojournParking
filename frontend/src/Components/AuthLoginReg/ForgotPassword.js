import React, { useState } from "react";
import axios from "axios";
import "./FandR.css";  // You can style this component as you like

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMsg("");

    try {
      const res = await axios.post("http://localhost:5001/api/users/forgot-password", { email });
      setMsg(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="forgot-password-form">
      <h2>Forgot Password</h2>
      {msg && <p style={{ color: "lightgreen" }}>{msg}</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;
