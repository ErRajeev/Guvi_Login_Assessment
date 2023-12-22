import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  // Email validation function
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    return passwordRegex.test(password);
  };

  const nameChangeHandle = (e) => setName(e.target.value);
  const emailChangeHandle = (e) => setEmail(e.target.value);
  const passwordChangeHandle = (e) => setPassword(e.target.value);
  const confirmPasswordChangeHandle = (e) => setConfirmPassword(e.target.value);
  const onOtpChange = (e) => setOtp(e.target.value);

  const displayErrorMessage = (errorMessage) => {
    setMessage(errorMessage);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Validate email format
      if (!isEmailValid(email)) {
        displayErrorMessage("Please enter a valid email address.");
        return;
      }

      // Validate password format
      if (!isPasswordValid(password)) {
        displayErrorMessage(
          "Password must meet the following criteria:\n- At least 6 characters\n- At least 1 numeral\n- At least 1 alphabet\n- Use at least one of the following special characters: !@#$%^&*"
        );
        return;
      }

      // Add password confirmation check
      if (password !== confirmPassword) {
        displayErrorMessage("Passwords do not match");
        return;
      }

      const response = await axios.post("http://localhost:5000/reg", {
        name: name,
        email: email.toLowerCase(),
        password: password,
      });

      // console.log(response.data);

      setMessage("Please check your email for OTP.");
      setShowOtpInput(true);
    } catch (error) {
      console.log(error);
      displayErrorMessage(`Error: ${error.response.data.error}`);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/otp-verify", {
        email: email,
        token: otp,
      });
      setTimeout(() => {
        setMessage("");
        setShowOtpInput(false);
        navigate("/");
      }, 2000);
      setMessage(response.data.message);
    } catch (error) {
      setTimeout(() => {
        setMessage("");
      }, 2000);
      displayErrorMessage(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={nameChangeHandle}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={emailChangeHandle}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={passwordChangeHandle}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          value={confirmPassword}
          onChange={confirmPasswordChangeHandle}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-success"
        onClick={handleRegister}
      >
        Sign Up
      </button>
      {message && (
        <p className="mt-3" style={{ color: "red", fontSize: "0.8rem" }}>
          {message}
        </p>
      )}
      {showOtpInput && (
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">
            OTP:
          </label>
          <input
            type="text"
            className="form-control"
            id="otp"
            value={otp}
            onChange={onOtpChange}
          />
        </div>
      )}
      {showOtpInput && (
        <button className="btn btn-success" onClick={handleVerifyOTP}>
          Verify OTP
        </button>
      )}
    </div>
  );
};

export default Signup;
