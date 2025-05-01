import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
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
      Swal.fire({
        title: "Error",
        text: "Passwords do not match!",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      return;
    }
    try {
      const { confirmPassword, ...submitData } = formData; // Exclude confirmPassword before sending to backend
      await axios.post("http://localhost:5000/user/register", submitData);

      Swal.fire({
        title: "Success!",
        text: "Registered Successfully",
        icon: "success",
        confirmButtonColor: "#50b087",
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Registration Failed",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleGoogleLogin = () => {
    Swal.fire({
      title: "Google Login",
      text: "Google Login Clicked (Integrate OAuth Here)",
      icon: "info",
      confirmButtonColor: "#50b087",
    });
  };

  const handleFacebookLogin = () => {
    Swal.fire({
      title: "Facebook Login",
      text: "Facebook Login Clicked (Integrate OAuth Here)",
      icon: "info",
      confirmButtonColor: "#1877f2",
    });
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
            type="tel"
            name="phone"
            onChange={handleChange}
            className="form-control glass-input mb-3"
            placeholder="Phone Number"
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
            onClick={() => navigate("/")}
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
