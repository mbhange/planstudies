import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Countries.css";

const Uk = () => {
  return (
    <>
      <Navbar />
      
      <div className="country-page">
        <div className="country-container">
          <div className="country-header">
            <div className="flag-container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
                alt="UK Flag"
                className="country-flag"
              />
            </div>
            <h1 className="country-title">Study in the UK</h1>
            <div className="title-underline"></div>
          </div>

          <div className="country-content">
            <div className="intro-section">
              <p className="country-description">
                The UK is a world-renowned destination for international education, offering prestigious universities, 
                diverse programs, and a rich cultural heritage. Studying in the UK combines academic excellence with 
                opportunities to experience one of the most vibrant and historically significant countries in the world.
              </p>
            </div>

            <div className="benefits-section">
              <h2 className="section-heading">Why Choose the UK?</h2>
              
              <div className="benefits-list">
                <div className="benefit-card">
                  <div className="benefit-icon">🏆</div>
                  <div className="benefit-content">
                    <h3>Globally Recognized Qualifications</h3>
                    <p>UK degrees are highly respected by employers and institutions worldwide.</p>
                  </div>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">⏱️</div>
                  <div className="benefit-content">
                    <h3>Shorter Duration Programs</h3>
                    <p>Many undergraduate degrees are completed in 3 years, and master’s programs in 1 year, saving time and money.</p>
                  </div>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">🏰</div>
                  <div className="benefit-content">
                    <h3>Rich Academic History</h3>
                    <p>Study at some of the oldest and most prestigious universities globally.</p>
                  </div>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">💼</div>
                  <div className="benefit-content">
                    <h3>Post-Study Work Opportunities</h3>
                    <p>Benefit from the Graduate Route visa, allowing up to 2 years of work after graduation.</p>
                  </div>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">🌍</div>
                  <div className="benefit-content">
                    <h3>Multicultural Experience</h3>
                    <p>The UK is home to a diverse and inclusive student community.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <div className="cta-card">
                <h3>Ready to Start Your Journey?</h3>
                <p>Embark on your study journey in the UK with PlanStudies – your trusted partner for international education!</p>
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

export default Uk;
