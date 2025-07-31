

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Inline styles for form elements
const formStyles = `
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    background-color: #ffffff;
    font-size: 0.875rem;
    transition: all 0.2s ease-in-out;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Add styles to the document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = formStyles;
  document.head.appendChild(styleSheet);
}

const StudentBackgroundForm = () => {
    const [activeTab, setActiveTab] = useState("education");
    const [workExperiences, setWorkExperiences] = useState([{ company: "", role: "", startDate: "", endDate: "", file: null }]);
    const [courses, setCourses] = useState([
        { country: "", institute: "", degree: "", course: "", intake: "" },
    ]);
    const [formData, setFormData] = useState({
        fullName: "",
        dob: "",
        school10th: "",
        board10th: "",
        marks10th: "",
        startDate10th: "",
        endDate10th: "",
        marksheet10th: null,
        school12th: "",
        board12th: "",
        marks12th: "",
        stream12th: "",
        startDate12th: "",
        endDate12th: "",
        marksheet12th: null,
        bachelorInstitute: "",
        bachelorDegree: "",
        bachelorCourse: "",
        bachelorMarks: "",
        bachelorStartDate: "",
        bachelorEndDate: "",
        bachelorMarksheet: null,
        masterInstitute: "",
        masterDegree: "",
        masterCourse: "",
        masterMarks: "",
        masterStartDate: "",
        masterEndDate: "",
        masterMarksheet: null,
        englishExam: "",
        englishScore: "",
        englishDate: "",
        englishResult: null,
        otherLangExam: "",
        otherLangScore: "",
        otherLangDate: "",
        otherLangResult: null,
        aptitudeExam: "",
        aptitudeScore: "",
        aptitudeDate: "",
        aptitudeResult: null,
    });
    const [errors, setErrors] = useState({});

    // Function to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };
    
    const handleCourseChange = (index, field, value) => {
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

    const validate = () => {
        let tempErrors = {};
        if (activeTab === "education") {
            if (!formData.fullName) tempErrors.fullName = "Full Name is required";
            if (!formData.dob) tempErrors.dob = "Date of Birth is required";
            if (!formData.school10th) tempErrors.school10th = "10th School Name is required";
            if (!formData.board10th) tempErrors.board10th = "10th Board Name is required";
            if (!formData.marks10th) tempErrors.marks10th = "10th Marks are required";
            if (!formData.startDate10th) tempErrors.startDate10th = "10th Start Date is required";
            if (!formData.endDate10th) tempErrors.endDate10th = "10th End Date is required";
        }
        // Add validation for other tabs as needed

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            const currentIndex = tabs.findIndex(t => t.id === activeTab);
            if (currentIndex < tabs.length - 1) {
                setActiveTab(tabs[currentIndex + 1].id);
            }
        }
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const data = new FormData();
                for (const key in formData) {
                    data.append(key, formData[key]);
                }
                data.append('courses', JSON.stringify(courses));
                data.append('workExperiences', JSON.stringify(workExperiences));

                const response = await axios.post("http://localhost:5000/api/student-background", data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("✅ Form submitted successfully!", { position: "top-right", autoClose: 3000 });
            } catch (error) {
                console.error("Error submitting form", error);
                toast.error("❌ Failed to submit form!", { position: "top-right", autoClose: 3000 });
            }
        }
    };

    const tabs = [
        { id: "education", label: "Education Details", icon: "🎓" },
        { id: "language", label: "Language Proficiency", icon: "🗣️" },
        { id: "aptitude", label: "Aptitude Proficiency", icon: "🧠" },
        { id: "experience", label: "Work Experience", icon: "💼" },
        { id: "institution", label: "Interested Course", icon: "🏫" },
    ];


    return (
        <div className="min-h-screen">
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {tabs.map((tab, index) => {
                            const isActive = activeTab === tab.id;
                            const isCompleted = tabs.findIndex(t => t.id === activeTab) > index;
                            return (
                                <div key={tab.id} className="flex items-center">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                                        isActive 
                                            ? 'bg-blue-600 text-white shadow-lg transform scale-110' 
                                            : isCompleted 
                                                ? 'bg-green-500 text-white' 
                                                : 'bg-gray-200 text-gray-600'
                                    }`}>
                                        {isCompleted ? '✓' : index + 1}
                                    </div>
                                    <div className={`ml-3 hidden sm:block ${
                                        isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'
                                    }`}>
                                        <div className="text-xs font-medium">{tab.icon}</div>
                                        <div className="text-sm">{tab.label}</div>
                                    </div>
                                    {index < tabs.length - 1 && (
                                        <div className={`hidden sm:block w-16 h-0.5 ml-4 ${
                                            isCompleted ? 'bg-green-500' : 'bg-gray-300'
                                        }`}></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Navigation for Mobile */}
                <div className="sm:hidden mb-6">
                    <div className="grid grid-cols-2 gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                <div className="text-lg mb-1">{tab.icon}</div>
                                <div>{tab.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {/* Tab Content Header */}
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="text-3xl mr-3">{tabs.find(t => t.id === activeTab)?.icon}</div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {tabs.find(t => t.id === activeTab)?.label}
                                </h2>
                            </div>
                            <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-20"></div>
                        </div>

                        {/* Tab Content */}
                        <div className="animate-fadeIn">
                            {activeTab === "education" && (
                                <div className="space-y-6">
                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">10th Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="form-group">
                                                    <label className="form-label">Enter Full Name</label>
                                                    <input type="text" name="fullName" placeholder="Enter Full Name" className="form-input" onChange={handleInputChange} />
                                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Date of Birth</label>
                                                    <input type="date" name="dob" className="form-input" onChange={handleInputChange} />
                                                    {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group col-span-1 sm:col-span-2">
                                                <label className="form-label">School/Institute Name</label>
                                                <input type="text" name="school10th" placeholder="Enter School/Institute Name" className="form-input" onChange={handleInputChange} />
                                                {errors.school10th && <p className="text-red-500 text-xs mt-1">{errors.school10th}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Board Name</label>
                                                <input type="text" name="board10th" placeholder="Enter Board Name" className="form-input" onChange={handleInputChange} />
                                                {errors.board10th && <p className="text-red-500 text-xs mt-1">{errors.board10th}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Marks (%)</label>
                                                <input type="text" name="marks10th" placeholder="Enter Marks" className="form-input" onChange={handleInputChange} />
                                                {errors.marks10th && <p className="text-red-500 text-xs mt-1">{errors.marks10th}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Start Date</label>
                                                <input type="date" name="startDate10th" className="form-input" onChange={handleInputChange} />
                                                {errors.startDate10th && <p className="text-red-500 text-xs mt-1">{errors.startDate10th}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">End Date</label>
                                                <input type="date" name="endDate10th" className="form-input" onChange={handleInputChange} />
                                                {errors.endDate10th && <p className="text-red-500 text-xs mt-1">{errors.endDate10th}</p>}
                                            </div>
                                            <div className="form-group col-span-1 sm:col-span-2">
                                                <label className="form-label">Upload Marksheet</label>
                                                <input type="file" name="marksheet10th" className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={handleFileChange} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Add other education levels similarly */}
                                </div>
                            )}

                            {activeTab === "language" && (
                                <div className="space-y-6">
                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">English Proficiency</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="form-group">
                                                <label className="form-label">Select Exam</label>
                                                <select name="englishExam" className="form-input" onChange={handleInputChange}>
                                                    <option>IELTS</option>
                                                    <option>PTE</option>
                                                    <option>DUOLINGO</option>
                                                    <option>TOEFL</option>
                                                    <option>CAEL</option>
                                                    <option>CELPIP</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Test Score</label>
                                                <input type="text" name="englishScore" placeholder="Test Score" className="form-input" onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Test Date</label>
                                                <input type="date" name="englishDate" className="form-input" onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Upload Test Result</label>
                                                <input type="file" name="englishResult" className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={handleFileChange} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Add other language sections similarly */}
                                </div>
                            )}

                            {activeTab === "aptitude" && (
                                <div className="space-y-6">
                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Aptitude Proficiency</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="form-group">
                                                <label className="form-label">Select Exam</label>
                                                <select name="aptitudeExam" className="form-input" onChange={handleInputChange}>
                                                    <option>SAT</option>
                                                    <option>GRE</option>
                                                    <option>GMAT</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Test Score</label>
                                                <input type="text" name="aptitudeScore" placeholder="Test Score" className="form-input" onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Test Date</label>
                                                <input type="date" name="aptitudeDate" className="form-input" onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Upload Test Result</label>
                                                <input type="file" name="aptitudeResult" className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={handleFileChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "experience" && (
                                <div className="space-y-6">
                                    {workExperiences.map((exp, index) => (
                                        <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Work Experience {index + 1}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="form-group">
                                                    <label className="form-label">Company Name</label>
                                                    <input type="text" placeholder="Company Name" className="form-input" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Role</label>
                                                    <input type="text" placeholder="Role" className="form-input" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Start Date</label>
                                                    <input type="date" className="form-input" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">End Date</label>
                                                    <input type="date" className="form-input" />
                                                </div>
                                                <div className="form-group col-span-1 sm:col-span-2">
                                                    <label className="form-label">Upload Experience/Offer Letter</label>
                                                    <input type="file" className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                                </div>
                                            </div>
                                            {index > 0 && (
                                                <div className="text-right mt-4">
                                                    <button
                                                        onClick={() => removeWorkExperience(index)}
                                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div className="flex justify-start">
                                        <button onClick={addWorkExperience} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200">
                                            Add More
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "institution" && (
                                <div className="space-y-6">
                                    {courses.map((course, index) => (
                                        <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Interested Course {index + 1}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="form-group">
                                                    <label className="form-label">Select Country</label>
                                                    <select
                                                        className="form-input"
                                                        value={course.country}
                                                        onChange={(e) => handleCourseChange(index, "country", e.target.value)}
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
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Interested Institute Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Interested Institute Name"
                                                        className="form-input"
                                                        value={course.institute}
                                                        onChange={(e) => handleCourseChange(index, "institute", e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Degree Level</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Degree Level"
                                                        className="form-input"
                                                        value={course.degree}
                                                        onChange={(e) => handleCourseChange(index, "degree", e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Course of Study</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Course of Study"
                                                        className="form-input"
                                                        value={course.course}
                                                        onChange={(e) => handleCourseChange(index, "course", e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Interested Intake</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Interested Intake"
                                                        className="form-input"
                                                        value={course.intake}
                                                        onChange={(e) => handleCourseChange(index, "intake", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            {index > 0 && (
                                                <div className="text-right mt-4">
                                                    <button
                                                        onClick={() => removeCourse(index)}
                                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div className="flex justify-start">
                                        <button onClick={addMoreCourse} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200">
                                            Add More
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    const currentIndex = tabs.findIndex(t => t.id === activeTab);
                                    if (currentIndex > 0) {
                                        setActiveTab(tabs[currentIndex - 1].id);
                                    }
                                }}
                                disabled={activeTab === "education"}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                    activeTab === "education"
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-500 text-white hover:bg-gray-600'
                                }`}
                            >
                                Previous
                            </button>
                            
                            {activeTab === "institution" ? (
                                <button
                                    onClick={handleSubmit}
                                    className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-200 shadow-lg"
                                >
                                    Submit Form
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    );
};

export default StudentBackgroundForm;


