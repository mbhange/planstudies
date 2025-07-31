import React from "react";
import EnrollStudents from "../pages/EnrollStudents";
import Navbar from "../components/NavbarStudent";
import Footer from "../components/Footer";

const EnrollStdAgent = () => {
    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <Navbar />
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            Student Enrollment Form
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Complete the student profile to begin their journey with PlanStudies
                        </p>
                        <div className="mt-4 flex items-center justify-center">
                            <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-24"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="py-8">
                <EnrollStudents />
            </div>
            <Footer />
        </div>
    )
}
export default EnrollStdAgent;
