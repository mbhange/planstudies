import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const StudyAbroad = () => {
    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    I Want to Study Abroad
                </h1>

                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
                    <p className="text-gray-700">
                        Studying abroad is a life-changing decision that opens doors to global career opportunities, cultural experiences, and personal growth. Whether you are looking for the best universities, scholarships, or visa guidance, our platform is here to support you throughout the journey.
                    </p>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Choosing the Right Country</h2>
                    <ul className="list-disc pl-5 text-gray-700">
                        <li><b>Canada</b> – Affordable education, post-study work opportunities, and high quality of life.</li>
                        <li><b>USA</b> – Home to Ivy League institutions, research opportunities, and diverse career paths.</li>
                        <li><b>UK</b> – World-class universities with short-duration programs and strong employment rates.</li>
                        <li><b>Australia</b> – High-quality education, work rights during study, and post-study visas.</li>
                        <li><b>New Zealand</b> – Affordable tuition fees, research-driven universities, and safety.</li>
                        <li><b>Europe</b> (Germany, France, Netherlands, etc.) – Free/low tuition, strong industry connections, and multicultural environment.</li>
                    </ul>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Course & University Search</h2>
                    <p>Choosing the right program is crucial. Our Course Finder helps you explore courses based on:</p>
                    <ul className="list-disc pl-5 text-gray-700">
                        <li>Field of Study (Engineering, Business, Healthcare, etc.)</li>
                        <li>University List</li>
                        <li>Tuition Fees & Scholarships</li>
                        <li>Internship & Career Opportunities</li>
                    </ul>
                    <Link to="/course-finder">
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Start Your Course Search
                        </button>
                    </Link>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Admission Application Process</h2>
                    <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                        <li>Research & Shortlist Universities</li>
                        <li>Check Eligibility Requirements</li>
                        <li>Prepare Required Documents (Transcripts, SOP, LORs, Resume, etc.)</li>
                        <li>Submit Online Applications</li>
                        <li>Pay Application Fees</li>
                        <li>Attend Interviews (if required)</li>
                        <li>Receive Offer Letter & Accept Admission</li>
                    </ol>
                    <Link to="/create">
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Apply Now
                        </button>
                    </Link>
                </section>


                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Visa Application Process</h2>
                    <p>Once you receive an admission offer, the next step is applying for a student visa. Steps include:</p>
                    <ul className="list-disc pl-5 text-gray-700">
                        <li><b>Check Visa Requirements</b> for your study destination</li>
                        <li><b>Gather Required Documents</b> (Passport, Offer Letter, Financial Proof, etc.)</li>
                        <li><b>Book Visa Appointment</b> (Embassy/Consulate or Visa Center)</li>
                        <li><b>Attend Visa Interview</b> (For USA and some other countries)</li>
                        <li><b>Receive Visa Approval & Travel Preparation</b></li>
                    </ul>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Pre-Departure Checklist</h2>
                    <ul className="list-disc pl-5 text-gray-700">
                        <p>✔️ Student Visa & Passport</p>
                        <p>✔️ Flight Tickets</p>
                        <p>✔️ Accommodation Confirmation</p>
                        <p>✔️ Financial Proof & Emergency Funds</p>
                        <p>✔️ Health Insurance</p>
                        <p>✔️ Packing Essentials (Clothing, Study Materials, etc.)</p>
                        <p>✔️ Contact Information (University, Embassy, Emergency Numbers)</p>
                    </ul>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Download Pre-Departure Guide
                    </button>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Get Expert Assistance</h2>
                    <p>Need personalized guidance? Our study-abroad experts can help with:</p>
                    <ul className="list-disc pl-5 text-gray-700">
                        <p>✅ Course Selection & Admission Assistance</p>
                        <p>✅ Visa Application Support</p>
                        <p>✅ Scholarship & Financial Aid Advice</p>
                        <p>✅ Pre-Departure & Post-Arrival Guidance</p>
                    </ul>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Book a Free Consultation
                    </button>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Conclusion</h2>
                    <p className="text-gray-700">
                        Studying abroad is a big step toward a brighter future. Our platform is designed to guide you at every stage – from course selection to settling in a new country. Explore, apply, and achieve your dreams with us!
                    </p>
                    <Link to="/create">
                        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Start Your Study Abroad Journey Today!
                        </button>
                    </Link>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default StudyAbroad;
