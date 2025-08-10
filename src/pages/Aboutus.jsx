import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/About.css";

const Aboutus = () => {
  return (
    <>
      <Navbar />
      <div className="about-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              About <span className="brand-highlight">PlanStudies</span>
            </h1>
            {/* <p className="hero-subtitle">
              Your trusted partner in making global education dreams come true
            </p> */}
            <div className="hero-underline"></div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="content-section">
          <div className="container">
            <div className="section-wrapper">
              <div className="text-content">
                <h2 className="section-title">Welcome to PlanStudies</h2>
                <p className="section-description">
                  At PlanStudies, we are dedicated to making the dream of
                  studying abroad a reality for students and advisors. Our
                  comprehensive platform simplifies the study abroad process,
                  helping students discover courses, check eligibility, and
                  apply to top institutions seamlessly.
                </p>
                <div className="highlight-box">
                  <p>Your Gateway to Global Education Excellence</p>
                </div>
              </div>
              <div className="image-content">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Students studying together"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="content-section alternate">
          <div className="container">
            <div className="section-wrapper reverse">
              <div className="image-content">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional team meeting"
                />
              </div>
              <div className="text-content">
                <h2 className="section-title">Who We Are</h2>
                <p className="section-description">
                  We are a team of passionate education and technology experts
                  committed to empowering students and advisors with
                  cutting-edge tools and resources. By leveraging advanced
                  technology and our extensive network of universities, we
                  bridge the gap between aspirations and achievements.
                </p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Universities</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">15+</div>
                    <div className="stat-label">Countries</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">10k+</div>
                    <div className="stat-label">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="content-section">
          <div className="container">
            <div className="section-wrapper">
              <div className="text-content">
                <h2 className="section-title">What We Do</h2>
                <p className="section-description">
                  We provide comprehensive services to make your study abroad
                  journey smooth and successful.
                </p>
                <div className="services-grid">
                  <div className="service-card">
                    <div className="service-icon">🎯</div>
                    <h3>Eligibility Assessment</h3>
                    <p>
                      Comprehensive evaluation based on academic records, test
                      scores, and preferences.
                    </p>
                  </div>
                  <div className="service-card">
                    <div className="service-icon">📚</div>
                    <h3>Course Matching</h3>
                    <p>
                      Discover programs perfectly aligned with your career goals
                      and interests.
                    </p>
                  </div>
                  <div className="service-card">
                    <div className="service-icon">✅</div>
                    <h3>University Shortlisting</h3>
                    <p>
                      Create a personalized list of preferred institutions based
                      on your profile.
                    </p>
                  </div>
                  <div className="service-card">
                    <div className="service-icon">📝</div>
                    <h3>Application Support</h3>
                    <p>
                      Expert guidance throughout the entire application and
                      admission process.
                    </p>
                  </div>
                </div>
              </div>
              <div className="image-content">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Students working on applications"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="container">
            <div className="mission-content">
              <h2 className="mission-title">Our Mission</h2>
              <p className="mission-text">
                To democratize access to quality international education by
                providing innovative tools, expert guidance, and personalized
                support that empowers students to achieve their academic and
                career aspirations globally.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Aboutus;
