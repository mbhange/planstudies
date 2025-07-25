import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom"; // For navigation

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    country: "",
    intake: "",
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="fixed right-4 top-20 w-[250px] bg-white bg-opacity-80 backdrop-blur-sm shadow-lg rounded-lg p-4 z-50 transition-all duration-300">
      <h2 className="text-xl font-semibold text-blue-700 mb-3 text-center">
        Inquiry Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Country Dropdown */}
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country Interested
          </label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>
              -- Select a Country --
            </option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="UK">UK</option>
            <option value="Germany">Germany</option>
            <option value="New Zealand">New Zealand</option>
            {/* <option value="Germany">Germany</option> */}
            <option value="France">France</option>
            <option value="Italy">Italy</option>
            <option value="Dubai">Dubai</option>
            <option value="Finland">Finland</option>
            <option value="Singapore">Singapore</option>
            <option value="Poland">Poland</option>
            <option value="Malta">Malta</option>
            <option value="Ireland">Ireland</option>
            <option value="Cyprus">Cyprus</option>
          </select>
        </div>

        {/* Intake Dropdown */}
        <div>
          <label
            htmlFor="intake"
            className="block text-sm font-medium text-gray-700"
          >
            Which Intake?
          </label>
          <select
            name="intake"
            id="intake"
            value={formData.intake}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>
              -- Select Intake --
            </option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
          </select>
        </div>

        {/* Course Textbox */}
        <div>
          <label
            htmlFor="course"
            className="block text-sm font-medium text-gray-700"
          >
            Which Course?
          </label>
          <input
            type="text"
            name="course"
            id="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Enter your course"
            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <Link to="/log">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;