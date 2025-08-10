import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "../images/contact.jpg";
import "../styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Your message has been sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          country: "",
          service: "",
          message: "",
        });
      } else {
        toast.error("All fields are required.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("There was an error sending your message. 🚨");
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-header">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">
              We're here to help! Fill out the form and our team will get back
              to you as soon as possible.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="country" className="form-label">
                      Country Interested
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Interested Country"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">
                      Service Interested
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="Immigration Services">
                        Immigration Services
                      </option>
                      <option value="Job Seeker Visa">Job Seeker Visa</option>
                      <option value="Spouse Dependent Visa">
                        Spouse Dependent Visa
                      </option>
                      <option value="Student Visa">Student Visa</option>
                      <option value="Super Visa">Super Visa</option>
                      <option value="Visitor Visa">Visitor Visa</option>
                      <option value="Work & Holiday Visa">
                        Work & Holiday Visa
                      </option>
                      <option value="Coaching">Coaching</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Leave us a message"
                    className="form-textarea"
                    required
                  />
                </div>
                <div>
                  <button type="submit" className="submit-button">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="contact-image">
              <img src={Image} alt="Contact Us" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
