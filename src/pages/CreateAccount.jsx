import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/CreateAccount.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiCheck, HiX, HiExclamation } from "react-icons/hi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Eye, EyeOff } from "lucide-react";

const CreateAccount = () => {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [toastState, setToastState] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message, type, onClose = null) => {
    setToastState({ show: true, message, type });
    setTimeout(() => {
      setToastState({ show: false, message: "", type: "" });
      if (onClose) onClose();
    }, 4000);
  };

  const handleToastClose = () => {
    setToastState({ show: false, message: "", type: "" });
  };

  const sendOTP = async () => {
    if (!phone) {
      showToast("Please enter your phone number.", "warning");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/send-mobile-otp",
        { phone }
      );

      if (response.data.success) {
        showToast("OTP sent successfully!", "success");
        setOtpSent(true);
      } else {
        showToast("Failed to send OTP.", "error");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (error.response) {
        showToast(`${error.response.data.message}`, "error");
      } else {
        showToast("Unexpected error. Please try again.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!phone || !phoneOtp) {
      showToast("Please enter your phone number and OTP.", "warning");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-mobile-otp",
        {
          phone: phone.trim(),
          otp: phoneOtp.trim(),
        }
      );

      if (response.data.success) {
        setOtpVerified(true);
        showToast("Phone number verified successfully!", "success");
        setPhone(response.data.phone || phone);
      } else {
        showToast("Invalid OTP. Please try again.", "warning");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      showToast(
        error.response?.data?.message ||
          "Error verifying OTP. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !reEnterPassword) {
      showToast("Please fill in all required fields.", "warning");
      return;
    }

    if (password !== reEnterPassword) {
      showToast("Passwords do not match. Please try again.", "warning");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      showToast(
        "Password must be at least 6 characters long, contain one special character, one uppercase letter, one lowercase letter, and one number.",
        "warning"
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        role,
        fullName,
        phone_number: phone,
        email,
        password,
      });

      if (response.status === 201) {
        showToast("Account created successfully!", "success", () => {
          navigate("/login");
        });
      } else {
        showToast("Unexpected response from server.", "error");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      showToast(
        error.response?.data?.message || "Error creating account. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="main-content">
        <div className="create-account-section">
          <div className="container">
            <div className="form-wrapper">
              {/* Left side - Hero content */}
              <div className="hero-content">
                <div className="hero-text">
                  <h1>Join Our Global Community</h1>
                  <p>Create your account and start your journey towards achieving your educational dreams with our trusted guidance and comprehensive support.</p>
                  <div className="features-list">
                    <div className="feature-item">
                      <HiCheck className="feature-icon" />
                      <span>Expert guidance for your educational journey</span>
                    </div>
                    <div className="feature-item">
                      <HiCheck className="feature-icon" />
                      <span>Access to top universities worldwide</span>
                    </div>
                    <div className="feature-item">
                      <HiCheck className="feature-icon" />
                      <span>Personalized application assistance</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="form-container">
                <div className="form-header">
                  <h2>Create Account</h2>
                  <p>Fill in your details to get started</p>
                </div>

                <form className="create-account-form" onSubmit={handleCreateAccount}>
                  {/* Role Selection */}
                  <div className="form-group">
                    <label htmlFor="role">Account Type</label>
                    <select 
                      id="role"
                      value={role} 
                      onChange={(e) => setRole(e.target.value)}
                      className="form-select"
                    >
                      <option value="student">Student</option>
                      <option value="agent">Agent</option>
                    </select>
                  </div>

                  {/* Full Name */}
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  {/* Phone Number Section */}
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="phone-input-container">
                      <PhoneInput
                        country={"us"}
                        value={phone}
                        onChange={(formattedValue) => setPhone(formattedValue)}
                        containerClass="phone-input-wrapper"
                        inputClass="phone-input"
                        buttonClass="phone-country-selector"
                      />
                    </div>
                    
                    {/* OTP Section */}
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={sendOTP}
                        disabled={!phone || isLoading}
                        className="otp-button send-otp"
                      >
                        {isLoading ? "Sending..." : "Send OTP"}
                      </button>
                    ) : !otpVerified ? (
                      <div className="otp-verification">
                        <input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                          className="form-input otp-input"
                          maxLength="6"
                        />
                        <button
                          type="button"
                          onClick={verifyOTP}
                          disabled={!phoneOtp || isLoading}
                          className="otp-button verify-otp"
                        >
                          {isLoading ? "Verifying..." : "Verify OTP"}
                        </button>
                        {otpError && <span className="error-message">{otpError}</span>}
                      </div>
                    ) : (
                      <div className="verification-success">
                        <HiCheck className="success-icon" />
                        <span>Phone number verified</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <div className="password-input-wrapper">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input password-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="form-group">
                    <label htmlFor="reEnterPassword">Confirm Password *</label>
                    <div className="password-input-wrapper">
                      <input
                        id="reEnterPassword"
                        type={showReEnterPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        required
                        value={reEnterPassword}
                        onChange={(e) => setReEnterPassword(e.target.value)}
                        className="form-input password-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowReEnterPassword(!showReEnterPassword)}
                        className="password-toggle"
                      >
                        {showReEnterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {passwordError && (
                      <span className="error-message">{passwordError}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>

                  {/* Login Link */}
                  <div className="form-footer">
                    <p>Already have an account? <Link to="/login">Sign in here</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastState.show && (
        <div className="toast-notification">
          <div className={`toast toast-${toastState.type}`}>
            <div className="toast-icon">
              {toastState.type === "success" && <HiCheck />}
              {toastState.type === "error" && <HiX />}
              {toastState.type === "warning" && <HiExclamation />}
            </div>
            <div className="toast-content">
              <p>{toastState.message}</p>
            </div>
            <button onClick={handleToastClose} className="toast-close">
              <HiX />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CreateAccount;
