import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/user/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending reset link');
    }
  };

  return (
    <div className="fpc-container">
      <div className="fpc-glass-card">
        <h2 className="fpc-header">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="fpc-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="fpc-input"
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="fpc-primary-btn">
            Send Reset Link
          </button>
        </form>
        {message && <div className="fpc-message">{message}</div>}
        <button 
          className="fpc-secondary-btn" 
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;