import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/About.css";

const Aboutus = () => {
    return (
        <div>
            <Navbar />
            <div className="about-us-container">
                <h1 className="about-title">About <span className="highlight">PlanStudies</span></h1>

                <div className="section section-animated">
                    <div className="text">
                        <h2 className="section-title">Welcome to <span className="highlight">PlanStudies</span> – Your Gateway to Global Education</h2>
                        <p className="section-description">
                            At PlanStudies, we are dedicated to making the dream of studying abroad a reality for students and advisors.
                            Our platform simplifies the study abroad process, helping students discover courses, check eligibility,
                            and apply to top institutions seamlessly.
                        </p>
                    </div>
                    <div className="image">
                        <img className="fade-in" src="https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Global Education" />
                    </div>
                </div>

                <div className="section section-animated reverse">
                    <div className="image">
                        <img className="fade-in" src="https://images.pexels.com/photos/5940837/pexels-photo-5940837.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Team" />
                    </div>
                    <div className="text">
                        <h2 className="section-title">Who We Are</h2>
                        <p className="section-description">
                            We are a team of passionate education and technology experts committed to empowering students and advisors
                            with cutting-edge tools and resources. By leveraging technology and our extensive network of universities,
                            we bridge the gap between aspirations and achievements.
                        </p>
                    </div>
                </div>

                <div className="section section-animated">
                    <div className="text">
                        <h2 className="section-title">What We Do</h2>
                        <div className="feature-list">
                            <div className="feature-item"><span className="icon">🎯</span> <strong>Eligibility Assessment:</strong> Check eligibility based on academic records and preferences.</div>
                            <div className="feature-item"><span className="icon">📚</span> <strong>Course Matching:</strong> Discover a wide range of programs tailored to career goals.</div>
                            <div className="feature-item"><span className="icon">✅</span> <strong>Shortlisting:</strong> Create a personalized list of preferred institutions.</div>
                            <div className="feature-item"><span className="icon">📝</span> <strong>Admission Assistance:</strong> Get expert support throughout the application process.</div>
                        </div>
                    </div>
                    <div className="image">
                        <img className="fade-in" src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600" alt="What We Do" />
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Aboutus;