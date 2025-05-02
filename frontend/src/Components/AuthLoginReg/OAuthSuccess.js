import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../Services/api";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refreshToken = params.get("refresh_token");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setAuthToken(token);
      navigate("/userDashboard");
    } else {
      navigate("/login?error=oauth_failed");
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
};

export default OAuthSuccess;