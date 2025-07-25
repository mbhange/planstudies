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
                    <h1 className="main-title">Empowering Your Recruitment Journey</h1><br />
                    <p className="welcome-message">
                        At PlanStudies, we collaborate with trusted recruitment partners worldwide to guide students toward achieving
                        their educational dreams. Together, we connect aspiring learners with opportunities at top universities and colleges
                        across the globe.
                    </p>
                </header>

                <section className="why-choose-us">
                    <h2 className="section-title">Why Partner with PlanStudies?</h2>
                    <ul className="benefits-list">
                        <li><b>Global Network Access: </b> Gain access to a vast network of reputable institutions and programs.</li>
                        <li><b>Comprehensive Support: </b> We provide marketing tools, training, and resources to enhance your recruitment efforts.</li>
                        <li><b>Transparent Processes: </b>Our streamlined systems ensure clear communication and efficient application handling.</li>
                        <li><b>Exclusive Opportunities: </b> Unlock scholarships, priority applications, and partnership benefits for your students.</li>
                    </ul>
                </section>

                <section className="start-journey">
                    <h2 className="section-title">Your Success is Our Goal</h2>
                    <p>
                        Join our mission to help students succeed. With our expertise and
                        your dedication, we can empower students to reach their full potential while growing your network
                        and reputation as a trusted recruitment partner.
                    </p>
                    {/* <Link to="/register">
                        <button className="register-button">Register</button>
                    </Link> */}
                    <p>
                        Click <Link to="/register"><b style={{color:"red"}}><u>"Register"</u></b></Link> to explore how PlanStudies can support your recruitment goals.
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    )
}
export default Student;