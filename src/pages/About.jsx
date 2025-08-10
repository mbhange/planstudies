import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="text-center py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h1
              className={`text-5xl font-bold text-gray-900 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              About <span className="text-blue-500">PlanStudies</span>
            </h1>
            <div className="mt-6 w-16 h-1 bg-blue-500 mx-auto rounded-full transition-all duration-1000 delay-300 scale-x-110"></div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to PlanStudies
              </h2>
              <p className="text-gray-600 mb-6">
                At PlanStudies, we are dedicated to making the dream of studying
                abroad a reality for students and advisors. Our comprehensive
                platform simplifies the study abroad process, helping students
                discover courses, check eligibility, and apply to top
                institutions seamlessly.
              </p>
              <div className="bg-blue-100 p-4 rounded-lg mb-8">
                <p className="text-blue-600 font-semibold">
                  Your Gateway to Global Education Excellence
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg transform transition-all duration-1000 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Students studying together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-16 px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="overflow-hidden rounded-lg shadow-lg transform transition-all duration-1000 hover:scale-105 order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Professional team meeting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Who We Are
              </h2>
              <p className="text-gray-600 mb-6">
                We are a team of passionate education and technology experts
                committed to empowering students and advisors with cutting-edge
                tools and resources. By leveraging advanced technology and our
                extensive network of universities, we bridge the gap between
                aspirations and achievements.
              </p>

              <div className="bg-white py-4 px-6 rounded-xl shadow-md transform transition-all duration-1000 hover:scale-105 mb-8">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-3xl text-blue-600 font-bold">500+</div>
                    <div className="text-sm text-gray-600">Universities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl text-blue-600 font-bold">16+</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl text-blue-600 font-bold">10k+</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 bg-gray-50 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              What We Do
            </h2>
            <p className="text-center text-gray-600 mb-10">
              We provide comprehensive services to make your study abroad
              journey smooth and successful.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "🎯",
                  title: "Eligibility Assessment",
                  description:
                    "Comprehensive evaluation based on academic records, test scores, and preferences.",
                },
                {
                  icon: "📚",
                  title: "Course Matching",
                  description:
                    "Discover programs perfectly aligned with your career goals and interests.",
                },
                {
                  icon: "✅",
                  title: "University Shortlisting",
                  description:
                    "Create a personalized list of preferred institutions based on your profile.",
                },
                {
                  icon: "📝",
                  title: "Application Support",
                  description:
                    "Expert guidance throughout the entire application and admission process.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-1000 hover:shadow-lg hover:scale-105"
                >
                  <div className="text-3xl text-blue-600 mb-4 text-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 bg-white px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-8">
              To democratize access to quality international education by
              providing innovative tools, expert guidance, and personalized
              support that empowers students to achieve their academic and
              career aspirations globally.
            </p>
            <div className="mt-8">
              {/* <link>
                <button
                  className="inline-block text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #1b73b9, #2980b9)",
                  }}
                >
                  Get Started Today
                </button>
              </link> */}
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center text-white text-lg font-semibold px-10 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #1b73b9, #2980b9)",
                }}
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
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
