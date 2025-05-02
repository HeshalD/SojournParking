import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError(""); setMsg("");

    try {
      const res = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, {
        password,
      });
      setMsg(res.data.message);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
    } catch (err) {
      setError(err.response?.data?.error || "Reset failed");
    }
  };

  return (
    <form onSubmit={handleReset} className="reset-password-form">
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
