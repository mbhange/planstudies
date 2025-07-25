import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "../images/contact.jpg";

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
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-7xl py-12 md:py-24">
          <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl font-bold text-gray-900 md:text-4xl">Get in touch</p>
                <p className="mt-4 text-lg text-gray-600">Our friendly team would love to hear from you.</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                    <div className="grid w-full items-center gap-1.5">
                      <label htmlFor="firstName" className="text-sm font-medium leading-none text-gray-700">First Name</label>
                      <input className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <label htmlFor="lastName" className="text-sm font-medium leading-none text-gray-700">Last Name</label>
                      <input className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                    <div className="grid w-full items-center gap-1.5">
                      <label htmlFor="email" className="text-sm font-medium leading-none text-gray-700">Email</label>
                      <input className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <label htmlFor="phoneNumber" className="text-sm font-medium leading-none text-gray-700">Phone number</label>
                      <input className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone number"
                      />
                    </div>
                  </div>

                  <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                    <div className="grid w-full items-center gap-1.5">
                      <label htmlFor="country" className="text-sm font-medium leading-none text-gray-700">Country Interested</label>
                      <input className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Interested Country"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <label htmlFor="service" className="text-sm font-medium leading-none text-gray-700">Service Interested</label>
                      <select className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a service</option>
                        <option value="Immigration Services">Immigration Services</option>
                        <option value="Job Seeker Visa">Job Seeker Visa</option>
                        <option value="Spouse Dependent Visa">Spouse Dependent Visa</option>
                        <option value="Student Visa">Student Visa</option>
                        <option value="Super Visa">Super Visa</option>
                        <option value="Visitor Visa">Visitor Visa</option>
                        <option value="Work & Holiday Visa">Work & Holiday Visa</option>
                        <option value="Coaching">Coaching</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid w-full items-center gap-1.5">
                    <label htmlFor="message" className="text-sm font-medium leading-none text-gray-700">Message</label>
                    <textarea className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Leave us a message"
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <img alt="Contact us" className="hidden max-h-full w-full rounded-lg object-cover lg:block" src={Image} />
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
