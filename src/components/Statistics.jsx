// import React from "react";
// import "../styles/Statistics.css"; // Import the CSS file

// const Statistics = () => {
//   const data = [
//     {
//       image: "https://img.freepik.com/premium-vector/university-flat-illustration_120816-38967.jpg",
//       number: "500+",
//       description: "Partner Institutions",
//     },
//     {
//       image: "https://atlas-content1-cdn.pixelsquid.com/assets_v2/255/2558287715732821700/jpeg-600/G03.jpg",
//       number: "5000+",
//       description: "Programs",
//     },
//     {
//       image: "https://img.freepik.com/premium-vector/handshake-icon_1306637-1302.jpg?semt=ais_hybrid",
//       number: "500+",
//       description: "Recruitment Partners",
//     },
//     {
//       image: "https://media.istockphoto.com/id/1193891975/vector/education-and-graduation-concept.jpg?s=612x612&w=0&k=20&c=qmTqAnv9-9gfF879DCwKObj6UK58FddispTlIjmnlE4=", // Replace with the actual image path
//       number: "60000+",
//       description: "Students Helped",
//     },
//     {
//       image: "https://media.istockphoto.com/id/1389937723/vector/cartoon-planet-earth-3d-vector-icon-on-white-background.jpg?s=612x612&w=0&k=20&c=hntEYVS5xepGQi1AIpRipUTYnH2Tp_S1TXS5M-pQe3A=", // Replace with the actual image path
//       number: "20+",
//       description: "Student Nationalities",
//     },
//   ];

//   return (
//     <section className="statistics">
//       <h2 className="statistics-heading">
//         We have assisted over 60,000+ students and growing!
//       </h2>
//       <div className="statistics-grid">
//         {data.map((item, index) => (
//           <div className="statistics-box" key={index}>
//             <img src={item.image} alt={item.description} className="box-image" />
//             <p className="box-number">{item.number}</p>
//             <p className="box-description">{item.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Statistics;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Statistics.css";

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({});
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const data = [
    {
      icon: "🏛️",
      number: 500,
      suffix: "+",
      description: "Partner Institutions",
      color: "#1B73B9",
    },
    {
      icon: "📚",
      number: 5000,
      suffix: "+",
      description: "Academic Programs",
      color: "#27ae60",
    },
    {
      icon: "🤝",
      number: 500,
      suffix: "+",
      description: "Recruitment Partners",
      color: "#e74c3c",
    },
    {
      icon: "👩‍🎓",
      number: 60000,
      suffix: "+",
      description: "Students Helped",
      color: "#f39c12",
    },
    {
      icon: "🌍",
      number: 35,
      suffix: "+",
      description: "Countries Covered",
      color: "#9b59b6",
    },
  ];

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCountAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation
  const startCountAnimation = () => {
    data.forEach((item, index) => {
      let start = 0;
      const end = item.number;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounters((prev) => ({
          ...prev,
          [index]: Math.floor(start),
        }));
      }, 16);
    });
  };

  // Navigate to Create Account page
  const handleStartJourney = () => {
    navigate("/create");
  };

  return (
    <section
      className={`statistics ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      <div className="statistics-container">
        <div className="statistics-header">
          <h2 className="statistics-heading">Trusted by Students Worldwide</h2>
          <p className="statistics-subtitle">
            Join thousands of successful students who have achieved their study
            abroad dreams with PlanStudies
          </p>
        </div>

        <div className="statistics-grid">
          {data.map((item, index) => (
            <div
              className="statistics-box"
              key={index}
              style={{
                "--hover-color": item.color,
                "--animation-delay": `${index * 0.1}s`,
              }}
            >
              <div className="box-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className="box-content">
                <h3 className="box-number">
                  {counters[index] || 0}
                  {item.suffix}
                </h3>
                <p className="box-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="statistics-cta">
          <p className="cta-text">Ready to join them?</p>
          <button className="cta-button" onClick={handleStartJourney}>
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
