import React, { useState } from "react";
import Navbar from "../components/NavbarStudent";
import Footer from "../components/Footer";

const CourseRequest = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        country: "",
        intake: "", 
        preferences: "",
    });

    const [message, setMessage] = useState("");

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Sending request...");

        try {
            const response = await fetch("http://localhost:5000/api/request-course", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("Request sent successfully! Our team will reach out soon.");
                setFormData({
                    name: "", email: "", country: "",
                    intake: "", preferences: ""
                });
            } else {
                setMessage("Failed to send request. Please try again later.");
            }
        } catch (error) {
            console.error("Error sending request:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Request a Course Option</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex gap-4">
                        {/* Country Interested */}
                        <div className="w-1/2">
                            <label className="block text-gray-700">Country Interested</label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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

                        {/* Interested Intake */}
                        <div className="w-1/2">
                            <label className="block text-gray-700">Interested Intake</label>
                            <select
                                name="intake"
                                value={formData.intake}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">Select Intake</option>
                                <option value="Fall 2025">Fall 2025</option>
                                <option value="Spring 2026">Spring 2026</option>
                                <option value="Summer 2026">Summer 2026</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Course Preferences</label>
                        <textarea
                            name="preferences"
                            value={formData.preferences}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="What type of course are you looking for?"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Submit Request
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-green-600 text-sm">{message}</p>}
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default CourseRequest;