import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { FaGoogle, FaFacebookF, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from 'libphonenumber-js';

import "react-phone-number-input/style.css";

import "./AuthLoginRegMern.css";
import loginAnimation from "../../animations/Car.json";
import registerAnimation from "../../animations/Car.json";

const AuthLoginRegMern = () => {
  const [isLoginMern, setIsLoginMern] = useState(true);
  const [errorMern, setErrorMern] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);

  const toggleFormMern = () => setIsLoginMern(!isLoginMern);

  return (
    <div className="auth-mern-body">
      <div className="auth-mern-container">
        <div className="auth-mern-box">
          <AnimatePresence mode="wait">
            {isLoginMern ? (
              <motion.div
                key="login-mern"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="auth-mern-form-wrapper"
              >
                <LoginFormMern toggleFormMern={toggleFormMern} setErrorMern={setErrorMern} errorMern={errorMern} />
              </motion.div>
            ) : (
              <motion.div
                key="register-mern"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="auth-mern-form-wrapper"
              >
                <RegisterFormMern toggleFormMern={toggleFormMern} setErrorMern={setErrorMern} errorMern={errorMern} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const LoginFormMern = ({ toggleFormMern, setErrorMern, errorMern }) => {
  const [emailMern, setEmailMern] = useState("");
  const [passwordMern, setPasswordMern] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [twoFAToken, setTwoFAToken] = useState("");
  const [twoFACode, setTwoFACode] = useState("");

  const handleLoginMern = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMern("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email: emailMern,
        password: passwordMern,
      });

      if (res.data.requires2FA) {
        setRequires2FA(true);
        setTwoFAToken(res.data.tempToken);
      } else {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/userDashboard";
      }
    } catch (error) {
      setErrorMern(error.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMern("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/verify2FA", {
        tempToken: twoFAToken,
        code: twoFACode,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/userDashboard";
    } catch (error) {
      setErrorMern(error.response?.data?.error || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  /*const handleOAuthLoginMern = (provider) => {
    window.open(`http://localhost:5001/api/users/${provider}`, "_self");
  };
*/
  if (requires2FA) {
    return (
      <form onSubmit={handle2FASubmit} className="auth-mern-glass-card">
        <button
          type="button"
          className="auth-mern-btn-back"
          onClick={() => setRequires2FA(false)}
          style={{ position: "absolute", top: "8px", left: "10px", zIndex: 0 }}
        >
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Back to Login
        </button>
    
        <div className="auth-mern-lottie-container" style={{ marginTop: "40px" }}>
          <Player autoplay loop src={loginAnimation} style={{ height: "150px" }} />
        </div>
        <h1 className="auth-mern-text-center auth-mern-mb-4">Two-Factor Authentication</h1>
        <p className="auth-mern-text-center auth-mern-mb-4">
          We've sent a verification code to your email
        </p>
        {errorMern && <div className="auth-mern-alert auth-mern-mb-3">{errorMern}</div>}
        <input
          type="text"
          placeholder="Enter 6-digit code"
          className="auth-mern-input auth-mern-mb-3"
          value={twoFACode}
          onChange={(e) => {
            // Only allow numbers and limit to 6 digits
            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
            setTwoFACode(value);
          }}
          required
          maxLength="6"
          pattern="\d{6}"
          inputMode="numeric"
        />
        <button 
          className="auth-mern-btn auth-mern-btn-primary auth-mern-w-100" 
          disabled={isLoading || twoFACode.length !== 6}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>
        <p className="auth-mern-text-center auth-mern-mt-3">
          Didn't receive a code?{" "}
          <button
            type="button"
            className="auth-mern-btn-link"
            onClick={handleLoginMern}
            disabled={isLoading}
          >
            Resend Code
          </button>
        </p>
      </form>
    );
    
  }

  return (
    <form onSubmit={handleLoginMern} className="auth-mern-glass-card">
      <div className="auth-mern-lottie-container">
        <Player autoplay loop src={loginAnimation} style={{ height: "150px" }} />
      </div>
      <h1 className="auth-mern-text-center auth-mern-mb-4">Login</h1>
      {errorMern && <div className="auth-mern-alert auth-mern-mb-3">{errorMern}</div>}
      <input
        type="email"
        placeholder="Email"
        className="auth-mern-input auth-mern-mb-3"
        value={emailMern}
        onChange={(e) => setEmailMern(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="auth-mern-input auth-mern-mb-3"
        value={passwordMern}
        onChange={(e) => setPasswordMern(e.target.value)}
        required
      />
      <button className="auth-mern-btn auth-mern-btn-primary auth-mern-w-100" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      
      <p className="auth-mern-text-center auth-mern-mt-3">
        Don't have an account?{" "}
        <button type="button" className="auth-mern-btn-link" onClick={toggleFormMern} disabled={isLoading}>
          Register
        </button>
      </p>
      <p className="auth-mern-text-center auth-mern-mt-2">
        <a href="/forgot-password" className="auth-mern-btn-link">
          Forgot Password?
        </a>
      </p>
    </form>
  );
};

const RegisterFormMern = ({ toggleFormMern, setErrorMern, errorMern }) => {
  const [fullNameMern, setFullNameMern] = useState("");
  const [emailMern, setEmailMern] = useState("");
  const [phoneMern, setPhoneMern] = useState("");
  const [passwordMern, setPasswordMern] = useState("");
  const [confirmPasswordMern, setConfirmPasswordMern] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterMern = async (e) => {
    e.preventDefault();
    setErrorMern("");

    if (!isValidPhoneNumber(phoneMern)) {
      setErrorMern("Please enter a valid phone number.");
      return;
    }

    if (passwordMern !== confirmPasswordMern) {
      setErrorMern("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/api/users/register", {
        fullName: fullNameMern,
        email: emailMern,
        phone: phoneMern,
        password: passwordMern,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/login";
    } catch (error) {
      setErrorMern(error.response?.data?.error || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegisterMern} className="auth-mern-glass-card">
      <div className="auth-mern-lottie-container">
        <Player autoplay loop src={registerAnimation} style={{ height: "150px" }} />
      </div>
      <h1 className="auth-mern-text-center auth-mern-mb-4">Register</h1>
      {errorMern && <div className="auth-mern-alert auth-mern-mb-3">{errorMern}</div>}
      <input
        type="text"
        placeholder="Full Name"
        className="auth-mern-input auth-mern-mb-3"
        value={fullNameMern}
        onChange={(e) => setFullNameMern(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="auth-mern-input auth-mern-mb-3"
        value={emailMern}
        onChange={(e) => setEmailMern(e.target.value)}
        required
      />
      <PhoneInput
        placeholder="Enter phone number"
        value={phoneMern}
        onChange={setPhoneMern}
        defaultCountry="LK"
        className="auth-mern-input auth-mern-mb-3"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="auth-mern-input auth-mern-mb-3"
        value={passwordMern}
        onChange={(e) => setPasswordMern(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="auth-mern-input auth-mern-mb-3"
        value={confirmPasswordMern}
        onChange={(e) => setConfirmPasswordMern(e.target.value)}
        required
      />
      <button className="auth-mern-btn auth-mern-btn-primary auth-mern-w-100" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      <p className="auth-mern-text-center auth-mern-mt-3">
        Already have an account?{" "}
        <button type="button" className="auth-mern-btn-link" onClick={toggleFormMern} disabled={isLoading}>
          Login
        </button>
      </p>
    </form>
  );
};

export default AuthLoginRegMern;



