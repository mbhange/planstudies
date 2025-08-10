import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Countries.css";

const UsPage = () => {
  return (
    <>
      <Navbar />
      
      <div className="country-page">
        <div className="country-container">
          <div className="country-header">
            <div className="flag-container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png"
                alt="USA Flag"
                className="country-flag"
              />
            </div>
            <h1 className="country-title">Study in the USA</h1>
            <div className="title-underline"></div>
          </div>

          <div className="country-content">
            <div className="intro-section">
              <p className="country-description">
                The USA is a global leader in education, offering unparalleled opportunities for academic and professional growth.
                Home to world-class universities and a diverse cultural landscape, studying in the USA is a gateway to success in a
                variety of fields.
              </p>
            </div>

            <div className="benefits-section">
              <h2 className="section-heading">Why Choose the USA?</h2>
              
              <div className="benefits-list">
                <div className="benefit-card">
                  <div className="benefit-icon">🌟</div>
                  <div className="benefit-content">
                    <h3>Top-Ranked Institutions</h3>
                    <p>The USA hosts some of the world's best universities and colleges known for innovation and academic excellence.</p>
                  </div>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">📚</div>
                  <div className="benefit-content">
                    <h3>Wide Range of Programs</h3>
                    <p>Choose from diverse programs and disciplines tailored to your career goals.</p>
                  </div>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">🔬</div>
                  <div className="benefit-content">
                    <h3>Research & Innovation</h3>
                    <p>Access cutting-edge facilities and opportunities for groundbreaking research.</p>
                  </div>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">💼</div>
                  <div className="benefit-content">
                    <h3>Work Opportunities</h3>
                    <p>Part-time work options for students and post-graduation work opportunities under OPT and CPT programs.</p>
                  </div>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">🌍</div>
                  <div className="benefit-content">
                    <h3>Cultural Diversity</h3>
                    <p>Experience a vibrant, multicultural environment that fosters personal and academic growth.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <div className="cta-card">
                <h3>Ready to Start Your Journey?</h3>
                <p>Start your journey to study in the USA with PlanStudies – your partner in achieving global success!</p>
                <Link to="/contact" className="cta-button">
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default UsPage;
