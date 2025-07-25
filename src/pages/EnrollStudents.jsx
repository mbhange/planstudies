
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/NavbarStudent";
import Footer from "../components/Footer";

const StudentBackgroundForm = () => {
    const [activeTab, setActiveTab] = useState("education");
    const [workExperiences, setWorkExperiences] = useState([{ company: "", role: "", startDate: "", endDate: "", file: null }]);
    const [courses, setCourses] = useState([
        { country: "", institute: "", degree: "", course: "", intake: "" },
    ]);

    // Function to handle input change
    const handleInputChange = (index, field, value) => {
        const newCourses = [...courses];
        newCourses[index][field] = value;
        setCourses(newCourses);
    };

    // Function to add a new course entry
    const addMoreCourse = () => {
        setCourses([...courses, { country: "", institute: "", degree: "", course: "", intake: "" }]);
    };

    // Function to remove a course entry
    const removeCourse = (index) => {
        const newCourses = courses.filter((_, i) => i !== index);
        setCourses(newCourses);
    };

    const removeWorkExperience = (index) => {
        const newExperiences = workExperiences.filter((_, i) => i !== index);
        setWorkExperiences(newExperiences);
    };

    const addWorkExperience = () => {
        setWorkExperiences([...workExperiences, { company: "", role: "", startDate: "", endDate: "", file: null }]);
    };

    // const handleSubmit = async () => {
    //     try {
    //         const response = await axios.post("http://localhost:5000/api/student-background", formData, {
    //             headers: { "Content-Type": "application/json" }
    //         });
    //         alert("Form submitted successfully!");
    //     } catch (error) {
    //         console.error("Error submitting form", error);
    //         alert("Failed to submit form");
    //     }
    // };
    const handleSubmit = async () => {
        try {
            const formData = { 
                courses, 
                workExperiences,
                timestamp: new Date().toISOString()
            };
            const response = await axios.post("http://localhost:5000/api/student-background", formData, {
                headers: { "Content-Type": "application/json" }
            });
            toast.success("✅ Form submitted successfully!", { position: "top-right", autoClose: 3000 });
        } catch (error) {
            console.error("Error submitting form", error);
            toast.error("❌ Failed to submit form!", { position: "top-right", autoClose: 3000 });
        }
    };


    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg" style={{ marginTop: "20px", marginBottom: "20px" }}>
                <div className="flex flex-col md:flex-row justify-center md:justify-around items-center gap-3 md:gap-5 mb-4">
                    <button
                        onClick={() => setActiveTab("education")}
                        className={`w-full md:w-auto px-4 py-2 text-sm md:text-base rounded ${activeTab === "education" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        Education Details
                    </button>
                    <button
                        onClick={() => setActiveTab("language")}
                        className={`w-full md:w-auto px-4 py-2 text-sm md:text-base rounded ${activeTab === "language" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        Language Proficiency
                    </button>
                    <button
                        onClick={() => setActiveTab("aptitude")}
                        className={`w-full md:w-auto px-4 py-2 text-sm md:text-base rounded ${activeTab === "aptitude" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        Aptitude Proficiency
                    </button>
                    <button
                        onClick={() => setActiveTab("experience")}
                        className={`w-full md:w-auto px-4 py-2 text-sm md:text-base rounded ${activeTab === "experience" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        Work Experience
                    </button>
                    <button
                        onClick={() => setActiveTab("institution")}
                        className={`w-full md:w-auto px-4 py-2 text-sm md:text-base rounded ${activeTab === "institution" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        Interested Course
                    </button>
                </div>

                {activeTab === "education" && (
                    <div>
                        <h2 className="text-xl font-bold">Education Details</h2>
                        {["10th", "12th", "Bachelor's", "Master's"].map(level => (

                            <div key={level} className="mb-4 border p-4 rounded">
                                {level === "10th" &&(
                                    <>
                                    <label>Enter Full Name & DOB</label>
                                    <div className="flex space-x-4">
                                        <input type="text" placeholder="Enter Full Name" className="w-full p-2 border rounded mt-2" />
                                        <input type="date" className="w-1/2 p-2 border rounded mt-2" />
                                    </div>
                                    </>
                                )}
                                <h3 className="font-semibold" style={{ color: "black" }}>{level} Details</h3>
                                <label>Enter School/Institute Name</label>
                                <input type="text" placeholder="Enter School/Institute Name" className="w-full p-2 border rounded mt-2" />

                                {(level === "10th" || level === "12th") && (
                                    <>
                                        <label>Enter Board Name</label>
                                        <input type="text" placeholder="Enter Board Name" className="w-full p-2 border rounded mt-2" />
                                        <label>Enter Marks</label>
                                        <input type="text" placeholder="Enter Marks" className="w-full p-2 border rounded mt-2" />
                                    </>
                                )}

                                {level === "12th" && (
                                    <>
                                        <label>Select Stream</label>
                                        <select className="w-full p-2 border rounded mt-2">
                                            <option>Commerce</option>
                                            <option>Science</option>
                                            <option>Humanities (Arts)</option>
                                        </select>
                                    </>
                                )}

                                {(level === "Bachelor's" || level === "Master's") && (
                                    <>
                                        <label>Degree Level</label>
                                        <input type="text" placeholder="Degree Level" className="w-full p-2 border rounded mt-2" />
                                        <label>Course of Study</label>
                                        <input type="text" placeholder="Course of Study" className="w-full p-2 border rounded mt-2" />
                                        <label>Enter Marks</label>
                                        <input type="text" placeholder="Enter Marks" className="w-full p-2 border rounded mt-2" />
                                    </>
                                )}

                                <label>Start Date - End Date</label>
                                <div className="flex space-x-4">
                                    <input type="date" className="w-1/2 p-2 border rounded mt-2" />
                                    <input type="date" className="w-1/2 p-2 border rounded mt-2" />
                                </div>
                                <label>Upload Marksheet</label>
                                <input type="file" className="w-full p-2 border rounded mt-2" />
                            </div>
                        ))}
                        <label>Additional Notes</label>
                        <textarea className="w-full p-2 border rounded mt-2"></textarea>
                        <button onClick={() => setActiveTab("language")} className="px-4 py-2 bg-blue-500 text-white rounded mt-4" style={{marginLeft:"20px"}}>Next</button>
                    </div>
                )}
                
                {activeTab === "language" && (
                    <div>
                        <div>
                            <h2 className="text-xl font-bold">Language Proficiency</h2>
                            <div className="border p-4 rounded">
                                <label>Select Exam</label>
                                <select className="w-full p-2 border rounded mt-2">
                                    <option>IELTS</option>
                                    <option>PTE</option>
                                    <option>DUOLINGO</option>
                                    <option>TOEFL</option>
                                    <option>CAEL</option>
                                    <option>CELPIP</option>
                                </select>
                                <label>Test Score</label>
                                <input type="text" placeholder="Test Score" className="w-full p-2 border rounded mt-2" />
                                <label>Test Date</label>
                                <input type="date" className="w-full p-2 border rounded mt-2" />
                                <label>Upload Test Result</label>
                                <input type="file" className="w-full p-2 border rounded mt-2" />
                            </div>

                            <div className="border p-4 rounded" style={{ marginTop: "20px" }}>
                                <label>Select Exam</label>
                                <select className="w-full p-2 border rounded mt-2">
                                    <option>German</option>
                                    <option>French</option>
                                </select>
                                <label>Test Score</label>
                                <input type="text" placeholder="Test Score" className="w-full p-2 border rounded mt-2" />
                                <label>Test Date</label>
                                <input type="date" className="w-full p-2 border rounded mt-2" />
                                <label>Upload Test Result</label>
                                <input type="file" className="w-full p-2 border rounded mt-2" />
                            </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <label>Additional Notes</label>
                            <textarea className="w-full p-2 border rounded mt-2"></textarea>
                            <button onClick={() => setActiveTab("education")} className="px-4 py-2 bg-blue-500 text-white rounded mt-4" style={{ marginLeft: "20px" }}>Prev</button>
                            <button onClick={() => setActiveTab("aptitude")} className="px-4 py-2 bg-blue-500 text-white rounded mt-4" style={{ marginLeft: "20px" }}>Next</button>
                        </div>
                    </div>
                )}

                {activeTab === "aptitude" && (
                    <div>
                        <div className="border p-4 rounded">
                            <h2 className="text-xl font-bold">Aptitude Proficiency</h2>
                            <label>Select Exam</label>
                            <select className="w-full p-2 border rounded mt-2">
                                <option>SAT</option>
                                <option>GRE</option>
                                <option>GMAT</option>
                            </select>
                            <label>Test Score</label>
                            <input type="text" placeholder="Test Score" className="w-full p-2 border rounded mt-2" />
                            <label>Test Date</label>
                            <input type="date" className="w-full p-2 border rounded mt-2" />
                            <label>Upload Test Result</label>
                            <input type="file" className="w-full p-2 border rounded mt-2" />
                        </div >
                        <div style={{ marginTop: "10px" }}>
                            <label>Additional Notes</label>
                            <textarea className="w-full p-2 border rounded mt-2"></textarea>
                            <button onClick={() => setActiveTab("language")} className="px-4 py-2 bg-blue-500 text-white rounded mt-4" style={{ marginLeft: "20px" }}>Prev</button>
                            <button onClick={() => setActiveTab("experience")} className="px-4 py-2 bg-blue-500 text-white rounded mt-4" style={{ marginLeft: "20px" }}>Next</button>
                        </div>
                    </div>
                )}

                {activeTab === "experience" && (
                    <div>
                        <h2 className="text-xl font-bold">Work Experience</h2>
                        {workExperiences.map((exp, index) => (
                            <div key={index} className="border p-4 rounded mb-2">
                                <label>Company Name</label>
                                <input type="text" placeholder="Company Name" className="w-full p-2 border rounded mt-2" />
                                <label>Role</label>
                                <input type="text" placeholder="Role" className="w-full p-2 border rounded mt-2" />
                                <label>Start Date - End Date</label>
                                <div className="flex space-x-4">
                                    <input type="date" className="w-1/2 p-2 border rounded mt-2" />
                                    <input type="date" className="w-1/2 p-2 border rounded mt-2" />
                                </div>
                                <label>Upload Experience/Offer Letter</label>
                                <input type="file" className="w-full p-2 border rounded mt-2" />
                                {index > 0 && (
                                    <button
                                        onClick={() => removeWorkExperience(index)}
                                        className="px-4 py-2 bg-red-500 text-white rounded mt-4 ml-2"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button onClick={addWorkExperience} className="px-4 py-2 bg-green-500 text-white rounded mt-2" style={{ marginBottom: "10px" }}>Add More</button><br />
                        <label >Additional Notes</label>
                        <textarea className="w-full p-2 border rounded mt-2"></textarea>
                        <button onClick={() => setActiveTab("aptitude")} className="px-4 py-2 bg-blue-500 text-white rounded mt-4" style={{ marginLeft: "20px" }}>Prev</button>
                        <button onClick={() => setActiveTab("institution")} className="px-4 py-2 bg-blue-500 text-white rounded mt-4" style={{ marginLeft: "20px" }}>Next</button>
                    </div>
                )}

                {activeTab === "institution" && (
                    <div>
                        {courses.map((course, index) => (
                            <div key={index} className="border p-4 rounded mb-2">
                                <h2 className="text-xl font-bold">Interested Course {index + 1}</h2>
                                <label>Select Country</label>
                                <select
                                    className="w-full p-2 border rounded mt-2"
                                    value={course.country}
                                    onChange={(e) => handleInputChange(index, "country", e.target.value)}
                                >
                                    <option value="">Select a country</option>
                                    <option>USA</option>
                                    <option>Canada</option>
                                    <option>UK</option>
                                    <option>New Zealand</option>
                                    <option>Australia</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                    <option>Italy</option>
                                    <option>Dubai</option>
                                    <option>Finland</option>
                                    <option>Singapore</option>
                                    <option>Poland</option>
                                    <option>Cyprus</option>
                                    <option>Malta</option>
                                    <option>Ireland</option>
                                </select>

                                <label>Enter Interested Institute Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Interested Institute Name"
                                    className="w-full p-2 border rounded mt-2"
                                    value={course.institute}
                                    onChange={(e) => handleInputChange(index, "institute", e.target.value)}
                                />

                                <label>Degree Level</label>
                                <input
                                    type="text"
                                    placeholder="Degree Level"
                                    className="w-full p-2 border rounded mt-2"
                                    value={course.degree}
                                    onChange={(e) => handleInputChange(index, "degree", e.target.value)}
                                />

                                <label>Enter Course of Study</label>
                                <input
                                    type="text"
                                    placeholder="Enter Course of Study"
                                    className="w-full p-2 border rounded mt-2"
                                    value={course.course}
                                    onChange={(e) => handleInputChange(index, "course", e.target.value)}
                                />

                                <label>Interested Intake</label>
                                <input
                                    type="text"
                                    placeholder="Interested Intake"
                                    className="w-full p-2 border rounded mt-2"
                                    value={course.intake}
                                    onChange={(e) => handleInputChange(index, "intake", e.target.value)}
                                />

                                {index > 0 && (
                                    <button
                                        onClick={() => removeCourse(index)}
                                        className="px-4 py-2 bg-red-500 text-white rounded mt-4 ml-2"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={addMoreCourse}
                            className="px-4 py-2 bg-green-500 text-white rounded mt-4"
                        >
                            Add More
                        </button>

                        <div style={{ marginTop: "10px" }}>
                            <label>Additional Notes</label>
                            <textarea className="w-full p-2 border rounded mt-2"></textarea>
                            <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded mt-4">Submit</button>
                            <button onClick={() => setActiveTab("experience")} className="px-4 py-2 bg-blue-500 text-white rounded mt-4" style={{ marginLeft: "20px" }}>Prev</button>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
            <Footer />
        </div>

    );
};

export default StudentBackgroundForm;
