// import React from "react";
// // import { Link } from 'react-router-dom';
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "../styles/Services.css"


// const Services = () => {
//     return (
//         <div>
//             <Navbar />
//             <div className="services-container">
//                 <h1 className="services-title">Our Services</h1>
//                 <div className="services-list">
//                     <div className="service-item">
//                         <div className="service-icon">📝</div>
//                         <h3><b>Admission Process</b></h3>
//                         <p>Our streamlined admission process ensures a smooth and hassle-free entry into the academic programs.</p>
//                     </div>
//                     <div className="service-item">
//                         <div className="service-icon">✈️</div>
//                         <h3><b>Visa Process</b></h3>
//                         <p>Assistance with visa applications, documentation, and procedures to ensure a smooth travel experience for your studies abroad.</p>
//                     </div>
//                     <div className="service-item">
//                         <div className="service-icon">📄</div>
//                         <h3><b>Documents Guidance</b></h3>
//                         <p>Receive expert guidance on preparing and submitting important documents for your academic or professional needs.</p>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }
// export default Services;
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Services.css";

const Services = () => {
    return (
        <div>
            <Navbar />
            <div className="services-container">
                <h1 className="services-title">Our <span className="highlight">Services</span></h1>
                <p className="services-subtitle">Empowering Your Study Abroad Journey with Expert Guidance</p>

                <div className="services-list">
                    <div className="service-item">
                        <div className="service-icon">📝</div>
                        <h3>Admission Process</h3>
                        <p>Our streamlined admission process ensures a smooth and hassle-free entry into academic programs worldwide.</p>
                    </div>
                    <div className="service-item">
                        <div className="service-icon">✈️</div>
                        <h3>Visa Assistance</h3>
                        <p>Expert guidance on visa applications and procedures for a smooth transition to your dream institution abroad.</p>
                    </div>
                    <div className="service-item">
                        <div className="service-icon">📄</div>
                        <h3>Document Guidance</h3>
                        <p>Get expert advice on preparing and submitting essential documents for university admissions.</p>
                    </div>
                    <div className="service-item">
                        <div className="service-icon">🏠</div>
                        <h3>Accommodation Support</h3>
                        <p>Find and secure comfortable student accommodation near your university with our assistance.</p>
                    </div>
                    <div className="service-item">
                        <div className="service-icon">💳</div>
                        <h3>Financial Guidance</h3>
                        <p>We help you explore scholarships, student loans, and financial aid for your studies.</p>
                    </div>
                    <div className="service-item">
                        <div className="service-icon">🎓</div>
                        <h3>Career Counseling</h3>
                        <p>Expert career advice to help you choose the right course and institution based on your goals.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Services;
