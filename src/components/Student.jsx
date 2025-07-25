import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Student.css";

const Student = () => {
    return (
        <div>
            <Navbar />
            <div className="pathway-container">
                <header className="pathway-header">
                    <h1 className="main-title">Discover Your Pathway to Success</h1><br />
                    <p className="welcome-message">
                        Welcome to a world of endless opportunities! Whether you're dreaming of
                        studying engineering, business, arts, or science, our platform is here
                        to help you find the perfect program tailored to your skills, passions,
                        and career goals.
                    </p>
                </header>

                <section className="why-choose-us">
                    <h2 className="section-title">Why Choose Us?</h2>
                    <ul className="benefits-list">
                        <li><b>Personalized Program Matching:</b> Find programs that align with your academic background and interests.</li>
                        <li><b>Explore Top Universities:</b> Discover institutions renowned for excellence in education worldwide.</li>
                        <li><b>Step-by-Step Guidance:</b> Navigate through the application process with ease.</li>
                        <li><b>Scholarship Opportunities:</b> Learn about financial aid options to support your journey.</li>
                    </ul>
                </section>

                <section className="start-journey">
                    <h2 className="section-title">Start Your Journey Today</h2>
                    <p>
                        Take the first step towards your dream career by exploring programs that
                        fit your goals. Whether you're looking for undergraduate, postgraduate,
                        or diploma courses, we’ve got you covered.
                    </p>
                    <Link to="/register">
                        <button className="register-button">Register</button>
                    </Link>
                </section>
            </div>
            <Footer />
        </div>
    )
}
export default Student;