import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from query parameter
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // Delay for animation before navigating
      setTimeout(() => {
        navigate("/userDashboard");
      }, 2000);
    } else {
      // If token is not found, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="auth-mern-body">
      <div className="auth-mern-container">
        <div className="auth-mern-box auth-mern-glass-card">
          <div className="auth-mern-lottie-container">

          </div>
          <h2 className="auth-mern-text-center">Login Successful!</h2>
          <p className="auth-mern-text-center">
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    </div>
  );
};

export default OAuthSuccess;
