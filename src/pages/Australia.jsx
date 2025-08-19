import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AustraliaAnimatedLayout = () => {
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
                <span className="text-yellow-300 animate-pulse">Australia</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Unlock your potential with world-class education, multicultural
                experiences, and endless opportunities in one of the world's
                most vibrant countries.
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
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1920px-Flag_of_Australia_%28converted%29.svg.png"
                  alt="Australia Flag"
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
              Why Choose Australia?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the exceptional advantages that make Australia a premier
              destination for international education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎓",
                title: "Globally Recognized Education",
                description:
                  "Australian universities are known for academic excellence and innovation with globally recognized degrees.",
                delay: "delay-100",
              },
              {
                icon: "💰",
                title: "Work While Studying",
                description:
                  "International students can work part-time to gain experience and support their living expenses.",
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
                title: "Post-Study Work Opportunities",
                description:
                  "Benefit from post-graduation work visas, enabling you to gain professional experience.",
                delay: "delay-400",
              },
              {
                icon: "🏖️",
                title: "High Quality of Life",
                description:
                  "Experience a safe, inclusive, and vibrant lifestyle in a culturally diverse country.",
                delay: "delay-500",
              },
              {
                icon: "🏠",
                title: "Diverse Programs",
                description:
                  "Choose from a wide variety of courses and disciplines tailored to global career opportunities.",
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
                number: "39",
                label: "Universities",
                sublabel: "In world top 500",
              },
              {
                number: "90%",
                label: "Employment Rate",
                sublabel: "Post-graduation success",
              },
              {
                number: "5",
                label: "Cities in Top 10",
                sublabel: "World's most liveable cities",
              },
              {
                number: "140+",
                label: "Nationalities",
                sublabel: "Diverse student community",
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
              Ready to Begin Your Australian Adventure?
            </h3>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Join thousands of international students who have chosen Australia as
              their pathway to success. Let PlanStudies guide you through every
              step of your educational journey.
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

export default AustraliaAnimatedLayout;
