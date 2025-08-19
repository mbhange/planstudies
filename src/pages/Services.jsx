import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Services.css";

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  const serviceCategories = [
    {
      title: "Coaching Services",
      icon: "📚",
      description:
        "Comprehensive test preparation and language training programs",
      services: [
        {
          name: "IELTS",
          description:
            "International English Language Testing System preparation",
        },
        {
          name: "TOEFL",
          description: "Test of English as a Foreign Language coaching",
        },
        { name: "PTE", description: "Pearson Test of English preparation" },
        { name: "Duolingo", description: "Duolingo English Test preparation" },
        {
          name: "GRE",
          description: "Graduate Record Examinations preparation",
        },
        {
          name: "GMAT",
          description: "Graduate Management Admission Test coaching",
        },
        { name: "SAT", description: "Scholastic Assessment Test preparation" },
        {
          name: "Spoken English",
          description: "Conversational English and communication skills",
        },
        { name: "German", description: "German language learning programs" },
        {
          name: "French",
          description: "French language courses and certification",
        },
      ],
    },
    {
      title: "Visa Services",
      icon: "✈️",
      description:
        "Immigration and visa consultancy services for various purposes",
      services: [
        {
          name: "Student Visa",
          description: "Complete student visa application and processing",
        },
        {
          name: "Spouse Visa",
          description: "Dependent visa services for family members",
        },
        {
          name: "Visitor Visa",
          description: "Tourist and visitor visa application assistance",
        },
        {
          name: "Immigration",
          description: "Permanent residency and immigration consulting",
        },
        {
          name: "Visa Extension",
          description: "Visa renewal and extension services",
        },
      ],
    },
    {
      title: "Allied Services",
      icon: "🛂",
      description:
        "Complete travel and financial assistance for international students",
      services: [
        {
          name: "Air Ticket",
          description: "Flight booking assistance and best fare options",
        },
        {
          name: "Forex",
          description: "Foreign exchange services and currency conversion",
        },
        {
          name: "Education Loan",
          description: "Student loan guidance and application assistance",
        },
        {
          name: "Foreign Sim Card",
          description: "International connectivity solutions",
        },
        {
          name: "Travel Insurance",
          description: "Comprehensive travel and health insurance coverage",
        },
      ],
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="services-container">
        {/* Hero Section */}
        <div className="services-hero">
          <h1 className="services-title">
            Our <span className="highlight">Services</span>
          </h1>
          <p className="services-subtitle">
            A way to career abroad - Empowering Your Study Abroad Journey with
            Expert Guidance
          </p>

          {/* Statistics Section */}
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-number">24+</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">60000+</span>
              <span className="stat-label">Success Stories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">High</span>
              <span className="stat-label">Visa Success For Refusal Cases</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Universities & Colleges</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1-1</span>
              <span className="stat-label">Personalized Counselling</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12000+</span>
              <span className="stat-label">Families Settled Abroad</span>
            </div>
          </div>
        </div>

        {/* Main Services Section */}
        <div className="main-services">
          {serviceCategories.map((category, index) => (
            <div
              key={index}
              className={`service-category ${
                expandedService === index ? "expanded" : ""
              }`}
            >
              <div
                className="service-category-header"
                onClick={() => toggleService(index)}
              >
                <div className="service-category-icon">{category.icon}</div>
                <div className="service-category-content">
                  <h2 className="service-category-title">{category.title}</h2>
                  <p className="service-category-description">
                    {category.description}
                  </p>
                </div>
                <div className="expand-arrow">
                  {expandedService === index ? "−" : "+"}
                </div>
              </div>

              <div className="service-category-details">
                <div className="services-grid">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="service-card">
                      <h4 className="service-name">{service.name}</h4>
                      <p className="service-description">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="cta-section">
          <h2>Ready to Start Your Journey?</h2>
          <p>
            Get personalized counselling from our experts and take the first
            step towards your dream career abroad.
          </p>
          <button className="btn-white-professional px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
            Book Free Consultation
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
