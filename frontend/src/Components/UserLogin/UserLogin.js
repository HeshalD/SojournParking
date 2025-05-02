import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import "../RegisterUser/RegisterUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/login", { email, password });

      // Store the token
      localStorage.setItem("token", res.data.token);
      
      // Create the session with name and email
      await axios.post("http://localhost:5000/sessions", {
        name: res.data.user.name,
        email: res.data.user.email
      });

      alert("Login Successful");
      navigate("/userDashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login Clicked (Integrate OAuth Here)");
  };

  const handleFacebookLogin = () => {
    alert("Facebook Login Clicked (Integrate OAuth Here)");
  };

  return (
    <div className="auth-wrapper d-flex justify-content-center align-items-center">
      <div className="auth-glass-card p-5">
        <h2 className="text-center fw-bold mb-4">Welcome</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control glass-input mb-3"
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control glass-input mb-3"
            placeholder="Password"
            required
          />
          <button type="submit" className="btn glass-btn w-100 mb-3">
            Login
          </button>
        </form>

        <div className="text-center mt-2">
          <p className="text-muted">
            <a href="#" onClick={() => navigate("/forgot-password")} className="text-decoration-none">
              Forgot Password?
            </a>
          </p>
        </div>

        <div className="text-center mt-3">
          <p>Don't have an account?</p>
          <button
            className="btn glass-btn-outline w-100"
            onClick={() => navigate("user/register")}
          >
            Register
          </button>
        </div>
        
        <div className="text-center mt-4">
          <button className="btn social-login-btn google-btn mb-2" onClick={handleGoogleLogin}>
            <FcGoogle className="social-icon" />
            Login with Google
          </button>
          <button className="btn social-login-btn facebook-btn mb-3" onClick={handleFacebookLogin}>
            <FaFacebook className="social-icon" />
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;