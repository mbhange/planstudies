import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResetPassword.css"; // Add your styles here
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams(); // Get the token from the URL (if present)
  const navigate = useNavigate();

  // For forgot password (sending reset link)
  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Email is required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Password reset link has been sent to your email.");
        setEmail(""); // Clear email field after success
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  // For resetting the password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        setMessage("Password has been reset successfully.");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login page after a few seconds
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while resetting your password.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="create">
        <div className="reset-password-container">
          <h2>{token ? "Reset Your Password" : "Forgot Password"}</h2>
          <form
            onSubmit={token ? handleResetPassword : handlePasswordResetRequest}
            className="form"
          >
            {token ? (
              <>
                <label>New Password:</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit" className="btnn">Reset Password</button>
              </>
            ) : (
              <>
                <label>Email:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btnn">Send Reset Link</button>
              </>
            )}
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
