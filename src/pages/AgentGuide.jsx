import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const AgentGuidance = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          I Want to Guide Students for Abroad Studies
        </h1>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p className="text-gray-700">
            Are you an education consultant, agent, or associate looking to guide students in their study abroad journey? Our platform provides you with comprehensive tools, resources, and expert assistance to help your students successfully apply to universities worldwide. From course search to visa application, we offer end-to-end support to ensure a smooth process for both you and your students.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-2">Why Partner with Us?</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Access to Top Universities & Colleges Worldwide</li>
            <li>Real-Time Updates on Admissions & Visa Procedures</li>
            <li>Complete CRM & Support System to Manage Applications</li>
            <li>Attractive Commission Structure & Incentives</li>
          </ul>
          <p>By becoming our <b>Agent/Associate</b>, you gain access to our <b>expert guidance, online tools, and dedicated support team</b> to help you grow your study abroad business.</p>
          <Link to="/create">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Register as an Agent/Associate
            </button>
          </Link>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-2">Course & University Search for Students</h2>
          <p>Finding the right course is the first step in guiding students. Our platform provides:</p>
          <ul className="list-disc pl-5 text-gray-700">
            <li><b>Course Finder Tool</b> – Browse programs based on country, university, and field of study.</li>
            <li><b>University Database</b> – Access detailed information on admissions, fees, and scholarships.</li>
            <li><b>Comparison Tool</b> – Compare multiple courses to help students make informed decisions.</li>
          </ul>
          <Link to="/course-finder">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Searching for Courses
            </button>
          </Link>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Admission Application Process</h2>
          <p>As an agent, you will be responsible for ensuring that students submit complete and accurate applications. The process includes:</p>
          <h3 style={{ color: "#2a71d0" }}>✔ Checking Admission Requirements</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Academic Qualifications</li>
            <li>English Proficiency (IELTS, TOEFL, PTE)</li>
            <li>Entrance Exams (GMAT, GRE, SAT, etc.)</li>
          </ul>

          <h3 style={{ color: "#2a71d0" }}>✔ Document Preparation</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Academic Transcripts & Certificates</li>
            <li>Statement of Purpose (SOP)</li>
            <li>Letters of Recommendation (LORs)</li>
            <li>Resume/CV (LORs)</li>
          </ul>

          <h3 style={{ color: "#2a71d0" }}>✔ Application Submission</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Online/Offline Submission to Universities</li>
            <li>Tracking Application Status (SOP)</li>
          </ul>
          <h3 style={{ color: "#2a71d0" }}>✔ Receiving Offer Letter & Acceptance Process</h3>
          <Link to="/docs">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Submit an Application
            </button>
          </Link>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Student Visa Assistance</h2>
          <p>Every country has different visa requirements. As an agent, you should guide students in:</p>
          <h3 style={{ color: "#2a71d0" }}>1. Visa Documentation</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Valid Passport</li>
            <li>University Offer Letter</li>
            <li>Financial Proof (Bank Statements, Loan Letter)</li>
            <li>Visa Application Form</li>
            <li>Medical & Police Clearance (if required)</li>
          </ul>
          <h3 style={{ color: "#2a71d0" }}>2.	Visa Application & Interview Preparation</h3>
          <li>Scheduling <b>visa appointments</b>.</li>
          <li>Preparing students for <b>visa interviews</b> (USA, UK, Canada).</li>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-2">Tools & Resources for Agents</h2>
          <p>To make your job easier, our platform provides:</p>
          <ul className="list-disc pl-5 text-gray-700">
            <li><b>Agent Dashboard</b> – Track student applications, admission status, and visa updates.</li>
            <li><b>Training & Webinars</b> – Regular updates on study abroad trends.</li>
            <li><b>Expert Consultation</b> – One-on-one assistance for complex cases.</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Access Agent Tools
          </button>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-2">Join Our Agent Network & Grow Your Business</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Become a Certified Partner and expand your education consulting business.</li>
            <li>Get Access to a Wide Network of Universities & Colleges.</li>
            <li>Receive Attractive Commission & Incentives for Every Successful Student Enrollment.</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Register as an Associate/Agent
          </button>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-2">Conclusion</h2>
          <p className="text-gray-700">
            Helping students study abroad is a rewarding opportunity. With our comprehensive support, expert guidance, and advanced tools, you can confidently assist students in achieving their dreams.
          </p>
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            Start Guiding Students Now!
          </button>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AgentGuidance;
