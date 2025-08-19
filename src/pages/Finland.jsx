// import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import "../styles/Countries.css";

// const Uk = () => {
//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             <Navbar />
//             <h1 className='country'>Study in Finland</h1>
//             <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/800px-Flag_of_Finland.svg.png"
//                 alt="Study in the USA"
//                 style={{
//                     width: '25%',
//                     height: 'auto',
//                     marginBottom: '20px',
//                     display: 'block',
//                     marginLeft: 'auto',
//                     marginRight: 'auto',
//                     borderRadius: '15px',
//                     animation: 'fadeIn 2s ease-in-out',
//                 }}
//             />
//             <p>
//             Finland is one of the leading destinations for higher education in Europe, known for its innovative teaching methods, high-quality universities, and exceptional student support systems. Renowned for its excellent educational system and vibrant, student-friendly atmosphere, Finland provides international students with a world-class education and a unique cultural experience.
//             </p>

//             <h2>Why Choose Finland?</h2>
//             <ul>
//                 <li><strong>•	High-Quality Education:    </strong>Italy is home to some of the most prestigious universities and institutions in the world, offering programs in art, engineering, business, medicine, architecture, and more.</li>
//                 <li><strong>•	Innovative Learning Environment: </strong>Studying in Italy offers a unique opportunity to immerse yourself in art, history, and culture, from ancient ruins to Renaissance masterpieces.</li>
//                 <li><strong>•	English-Taught Programs:      </strong>Many Italian universities offer degree programs in English, making it accessible for students from around the world.</li>
//                 <li><strong>•	Affordability:       </strong>Compared to other European countries, Italy provides an affordable education with lower tuition fees and cost of living, especially outside major cities like Rome and Milan.</li>
//                 <li><strong>•	Safe and High-Quality Lifestyle:       </strong>Students in Italy can work part-time during their studies, and graduates can access post-study work opportunities in various fields.</li>
//                 <li><strong>•	Work Opportunities:      </strong>Students can work part-time during their studies, and Finland offers a post-study work visa that allows graduates to search for jobs in the country.</li>
//             </ul>

//             <p>
//             Start your academic adventure in Finland with PlanStudies – where quality education, innovation, and personal growth come together in one of Europe’s most advanced countries!
//             </p>
//             <Footer />
//         </div>
//     );
// };

// export default Uk;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FinlandAnimatedLayout = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Navbar />

      {/* Animated Hero Section */}
      <section className="relative bg-custom-blue-gradient text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full animate-ping"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              }`}
            >
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Study in{" "}
                <span className="text-yellow-300 animate-pulse">Finland</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Unlock your potential with world-class education, multicultural
                experiences, and endless opportunities in one of the world's
                most welcoming countries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="group btn-white-professional inline-flex items-center justify-center text-lg font-semibold px-8 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <span>Start Your Journey</span>
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  to="/programs"
                  className="btn-outline-scale-only inline-flex items-center justify-center text-lg font-semibold px-8 py-4 rounded-lg transition-all duration-300"
                >
                  Explore Programs
                </Link>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <div className="relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/1280px-Flag_of_Finland.svg.png"
                  alt="Canada Flag"
                  className="w-full max-w-lg mx-auto h-80 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full animate-bounce opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Benefits Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Finland?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the exceptional advantages that make Finland the premier
              destination for international education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎓",
                title: "World-Class Education",
                description:
                  "Access globally recognized institutions with cutting-edge research facilities and innovative programs.",
                delay: "delay-100",
              },
              {
                icon: "💰",
                title: "Affordable Excellence",
                description:
                  "Enjoy competitive tuition fees and reasonable living costs without compromising on quality.",
                delay: "delay-200",
              },
              {
                icon: "🌍",
                title: "Multicultural Environment",
                description:
                  "Experience a diverse, welcoming community that celebrates cultures from around the world.",
                delay: "delay-300",
              },
              {
                icon: "💼",
                title: "Career Opportunities",
                description:
                  "Build your career with excellent work permits and post-graduation employment opportunities.",
                delay: "delay-400",
              },
              {
                icon: "🛡️",
                title: "Safe & Secure",
                description:
                  "Study in one of the world's safest countries with excellent healthcare and social systems.",
                delay: "delay-500",
              },
              {
                icon: "🏠",
                title: "Immigration Pathways",
                description:
                  "Clear routes to permanent residency and citizenship for international students.",
                delay: "delay-600",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className={`group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } ${benefit.delay}`}
              >
                <div className="w-16 h-16 bg-custom-blue-gradient rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Statistics Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              {
                number: "500+",
                label: "Universities",
                sublabel: "Top-ranked institutions",
              },
              {
                number: "90%",
                label: "Success Rate",
                sublabel: "Graduate employment",
              },
              {
                number: "15+",
                label: "Study Fields",
                sublabel: "Academic disciplines",
              },
              {
                number: "50+",
                label: "Countries",
                sublabel: "Student diversity",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 hover:scale-110 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl font-bold text-blue-600 mb-2 animate-pulse">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-600">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated CTA Section */}
      <section className="relative bg-custom-blue-gradient py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-transparent animate-pulse"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Begin Your Finland Adventure?
            </h3>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Join thousands of international students who have chosen Finland
              as their pathway to success. Let PlanStudies guide you through
              every step of your educational journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="group btn-white-professional inline-flex items-center justify-center text-lg font-semibold px-10 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span>Get Started Today</span>
                <svg
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                to="/about"
                className="btn-outline-scale-only inline-flex items-center justify-center text-lg font-semibold px-10 py-4 rounded-lg transition-all duration-300"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FinlandAnimatedLayout;
