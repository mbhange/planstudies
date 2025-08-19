// import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "../styles/Countries.css";

// const CanadaPage = () => {
//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <Navbar />
//       <h1 className="country">Study in Ireland</h1>
//       <img
//         src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/640px-Flag_of_Ireland.svg.png"
//         alt="Study in the USA"
//         style={{
//           width: "25%",
//           height: "auto",
//           marginBottom: "20px",
//           display: "block",
//           marginLeft: "auto",
//           marginRight: "auto",
//           borderRadius: "15px",
//           animation: "fadeIn 2s ease-in-out",
//         }}
//       />
//       <p>
//         Ireland is a rapidly growing destination for international students,
//         offering world-class education, a thriving economy, and a rich cultural
//         heritage. Known as the "Land of Saints and Scholars," Ireland provides a
//         perfect blend of academic excellence and vibrant student life.
//       </p>

//       <h2>Why Choose Ireland?</h2>
//       <ul>
//         <li>
//           <strong>• Globally Recognized Education: </strong> Ireland’s
//           universities and colleges are renowned for their high academic
//           standards and innovative research.
//         </li>
//         <li>
//           <strong>• Diverse Program Options: </strong> A wide variety of
//           programs across disciplines, including STEM, business, arts, and
//           humanities.
//         </li>
//         <li>
//           <strong>• Post-Study Work Opportunities: </strong> Ireland offers
//           generous post-study work visas, enabling graduates to gain valuable
//           experience.
//         </li>
//         <li>
//           <strong>• Technology and Innovation Hub: </strong> Ireland is home to
//           global tech giants and leading industries, offering excellent career
//           prospects.
//         </li>
//         <li>
//           <strong>• Welcoming Environment: </strong> Known for its friendly
//           people and safe environment, Ireland is a welcoming choice for
//           international students.
//         </li>
//       </ul>

//       <p>
//         Start your journey to study in Ireland with PlanStudies – where your
//         dreams turn into reality!
//       </p>
//       <Footer />
//     </div>
//   );
// };

// export default CanadaPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const IrelandAnimatedLayout = () => {
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
                <span className="text-yellow-300 animate-pulse">Ireland</span>
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
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/1920px-Flag_of_Ireland.svg.png"
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
              Why Choose Ireland?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the exceptional advantages that make Canada the premier
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
              Ready to Begin Your Ireland Adventure?
            </h3>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Join thousands of international students who have chosen Ireland
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

export default IrelandAnimatedLayout;
