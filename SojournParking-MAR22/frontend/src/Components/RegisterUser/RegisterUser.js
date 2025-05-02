
import "./AuthStyles.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const { confirmPassword, ...submitData } = formData; // exclude confirmPassword before sending to backend
      await axios.post("http://localhost:5000/user/register", submitData,{
        withCredentials:true,
      }); // API endpoint for user registration
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
      console.log(err)
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
        <h2 className="text-center fw-bold mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="form-control glass-input mb-3"
            placeholder="Full Name"
            required
          />
          <input
            type="number"
            name="age"
            onChange={handleChange}
            className="form-control glass-input mb-3"
            placeholder="Age"
            required
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="form-control glass-input mb-3"
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control glass-input mb-3"
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            className="form-control glass-input mb-3"
            placeholder="Confirm Password"
            required
          />
          <button type="submit" className="btn glass-btn w-100">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p>Already have an account?</p>
          <button
            className="btn glass-btn-outline w-100"
            onClick={() => navigate("/login")}
          >
            Login
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

export default Register;
