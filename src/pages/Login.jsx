import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiCheck, HiX, HiExclamation } from "react-icons/hi";
import { Eye, EyeOff, UserCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [rememberMe, setRememberMe] = useState(false);
  const [toastState, setToastState] = useState({ show: false, message: "", type: "" });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensures the icon appears on first render
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    const storedRole = localStorage.getItem("rememberedRole");

    if (storedEmail && storedPassword && storedRole) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRole(storedRole);
      setRememberMe(true);
    }
  }, []);

  const showToast = (message, type, success = false) => {
    setToastState({ show: true, message, type });
    setLoginSuccess(success);
    setTimeout(() => {
      setToastState({ show: false, message: "", type: "" });
      if (success) {
        const storedRole = localStorage.getItem("userRole");
        if (storedRole) {
          navigateToDashboard(storedRole);
        }
      }
    }, 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Role removed from request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed.");
      }

      const userData = await response.json();

      // Store user details in localStorage
      localStorage.setItem("userEmail", userData.user.email);
      localStorage.setItem("userId", userData.user.id);
      localStorage.setItem("userRole", userData.user.role); // Role fetched from backend

      // Show toast first, then navigate after delay
      showToast("Login successful!", "success", true);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
        localStorage.setItem("rememberedRole", role);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberedRole");
      }

      // Ensure toast is visible for 2 seconds before navigating
      setTimeout(() => {
        navigateToDashboard(userData.user.role);
      }, 2000); // 2-second delay for toast visibility

    } catch (error) {
      console.error("Login Error:", error.message);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const navigateToDashboard = (role) => {
    switch (role) {
      case "student":
        navigate("/student-dash");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "agent":
        navigate("/agent-dashboard");
        break;
      case "sub_admin_usa":
        navigate("/sub-admin-usa-dashboard");
        break;
      case "sub_admin_aus_nz":
        navigate("/sub-admin-aus-nz-dashboard");
        break;
      case "sub_admin_uk":
        navigate("/sub-admin-uk-dashboard");
        break;
      case "sub_admin_canada":
        navigate("/sub-admin-canada-dashboard");
        break;
      case "sub_admin_europe":
        navigate("/sub-admin-europe-dashboard");
        break;
      default:
        navigate("/"); // Redirect to homepage if role is unknown
    }
  };

  const handleToastClose = () => {
    setToastState({ show: false, message: "", type: "" });

    if (loginSuccess) {
      const storedRole = localStorage.getItem("userRole");
      if (storedRole) {
        navigateToDashboard(storedRole);
      }
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="main-content">
        <div className="login-section">
          <div className="container">
            <div className="form-wrapper">
              {/* Left side - Hero content */}
              <div className="hero-content">
                <div className="hero-text">
                  <h1>Welcome Back!</h1>
                  <p>Sign in to your account to continue your educational journey with us. Access your personalized dashboard and track your progress.</p>
                  <div className="features-list">
                    <div className="feature-item">
                      <HiCheck className="feature-icon" />
                      <span>Access your personalized dashboard</span>
                    </div>
                    <div className="feature-item">
                      <HiCheck className="feature-icon" />
                      <span>Track your application progress</span>
                    </div>
                    <div className="feature-item">
                      <HiCheck className="feature-icon" />
                      <span>Connect with expert counselors</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Login Form */}
              <div className="form-container">
                <div className="form-header">
                  <div className="avatar-container">
                    <UserCircle className="avatar-icon" />
                  </div>
                  <h2>Sign In</h2>
                  <p>Enter your credentials to access your account</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
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

                  {/* Remember Me & Forgot Password */}
                  <div className="form-options">
                    <div className="remember-me">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="checkbox-input"
                      />
                      <label htmlFor="remember" className="checkbox-label">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="forgot-password-link"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>

                  {/* Create Account Link */}
                  <div className="form-footer">
                    <p>
                      Don't have an account?{" "}
                      <Link to="/create" className="create-account-link">
                        Create one here
                      </Link>
                    </p>
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

export default Login;
