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
            <div 
                style={{
                    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
                    padding: '3rem 0',
                    minHeight: '100vh'
                }}
                className="flex justify-center items-center"
            >
                <div className="bg-white/90 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-4xl mx-4 sm:mx-auto border border-white/20">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800 mb-3">Request a Course Option</h2>
                        <p className="text-gray-600 text-lg">Tell us about your academic interests and we'll help you find the perfect course</p>
                        <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{background: 'linear-gradient(135deg, #1b73b9, #2980b9)'}}></div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="form-group">
                                <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="form-group">
                                <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Country of Interest *</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm appearance-none cursor-pointer"
                                >
                                    <option value="">Select your preferred country</option>
                                    <option value="usa">🇺🇸 United States</option>
                                    <option value="canada">🇨🇦 Canada</option>
                                    <option value="australia">🇦🇺 Australia</option>
                                    <option value="uk">🇬🇧 United Kingdom</option>
                                    <option value="germany">🇩🇪 Germany</option>
                                    <option value="new-zealand">🇳🇿 New Zealand</option>
                                    <option value="france">🇫🇷 France</option>
                                    <option value="italy">🇮🇹 Italy</option>
                                    <option value="dubai">🇦🇪 Dubai (UAE)</option>
                                    <option value="finland">🇫🇮 Finland</option>
                                    <option value="singapore">🇸🇬 Singapore</option>
                                    <option value="poland">🇵🇱 Poland</option>
                                    <option value="malta">🇲🇹 Malta</option>
                                    <option value="ireland">🇮🇪 Ireland</option>
                                    <option value="cyprus">🇨🇾 Cyprus</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Preferred Intake *</label>
                                <select
                                    name="intake"
                                    value={formData.intake}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm appearance-none cursor-pointer"
                                >
                                    <option value="">Select your preferred intake</option>
                                    <option value="Fall 2025">Fall 2025</option>
                                    <option value="Spring 2026">Spring 2026</option>
                                    <option value="Summer 2026">Summer 2026</option>
                                    <option value="Fall 2026">Fall 2026</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Course Preferences</label>
                            <textarea
                                name="preferences"
                                value={formData.preferences}
                                onChange={handleChange}
                                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
                                placeholder="Tell us about your academic interests, preferred field of study, career goals, or any specific course requirements..."
                                rows="5"
                            />
                        </div>
                        
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full text-white py-4 rounded-xl hover:opacity-90 hover:transform hover:scale-105 transition-all duration-300 text-lg font-semibold shadow-lg"
                                style={{
                                    background: 'linear-gradient(135deg, #1b73b9, #2980b9)',
                                    boxShadow: '0 8px 32px rgba(27, 115, 185, 0.3)'
                                }}
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                    
                    {message && (
                        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                            <p className="text-center text-green-700 text-lg font-semibold">{message}</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CourseRequest;
