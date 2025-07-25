import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Popup.css";

const InquiryForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    intake: "",
    course: "",
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    closePopup();
    navigate("/create");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePopup}
        >
          <motion.div
            className="popup-container"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={closePopup}
              aria-label="Close popup"
            >
              ×
            </button>

            <div className="popup-header">
              <h2>Start Your Journey</h2>
              <p>Let us help you find the perfect study destination</p>
            </div>

            <form onSubmit={handleSubmit} className="inquiry-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="country">Country of Interest</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="usa">USA</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="uk">UK</option>
                    <option value="germany">Germany</option>
                    <option value="new-zealand">New Zealand</option>
                    <option value="france">France</option>
                    <option value="italy">Italy</option>
                    <option value="dubai">Dubai</option>
                    <option value="finland">Finland</option>
                    <option value="singapore">Singapore</option>
                    <option value="poland">Poland</option>
                    <option value="malta">Malta</option>
                    <option value="ireland">Ireland</option>
                    <option value="cyprus">Cyprus</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="intake">Preferred Intake</label>
                  <select
                    id="intake"
                    name="intake"
                    value={formData.intake}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Intake</option>
                    <option value="spring">Spring 2025</option>
                    <option value="summer">Summer 2025</option>
                    <option value="fall">Fall 2025</option>
                    <option value="winter">Winter 2025</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="course">Preferred Program</label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science, Business Administration"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Get Started
                <span className="btn-arrow">→</span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InquiryForm;
