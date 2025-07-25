import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUniversalAccess, FaKeyboard, FaEye, FaHeadphones, FaSignLanguage } from "react-icons/fa";
import { Link } from "react-router-dom";

const Accessibility = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      {/* <section className="text-center py-16 bg-white shadow-md">
        <h1 className="text-4xl font-bold text-gray-800">Accessibility at PlanStudies</h1>
        <p className="text-lg mt-4 text-gray-600" style={{textAlign:"center"}}>Ensuring an inclusive experience for all users.</p>
      </section> */}

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">Accessibility at PlanStudies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: FaUniversalAccess, title: "Inclusive Design", description: "Our platform is built to be usable by everyone, regardless of ability." },
            { icon: FaKeyboard, title: "Keyboard Navigation", description: "Navigate easily using keyboard shortcuts and tab-based movement." },
            { icon: FaEye, title: "Screen Reader Support", description: "Fully compatible with popular screen readers for visually impaired users." },
            { icon: FaHeadphones, title: "Audio Assistance", description: "Text-to-speech support for enhanced accessibility." },
            { icon: FaSignLanguage, title: "Sign Language Support", description: "Providing sign language assistance where possible." },
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md text-center transition hover:shadow-lg">
              <feature.icon className="text-blue-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Assistive Tech Section */}
      <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center my-12">
        <h2 className="text-3xl font-semibold text-gray-800">Compatible with Assistive Technologies</h2>
        <p className="mt-4 text-lg text-gray-600">
          PlanStudies supports a wide range of assistive technologies, ensuring everyone can access our platform seamlessly.
        </p>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center my-12">
        <h2 className="text-3xl font-semibold text-gray-800">Need Assistance?</h2>
        <p className="mt-4 text-lg text-gray-600">
          If you need help accessing any part of our website, feel free to reach out.
        </p>
        <Link to="/contact">
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Contact Us
          </button>
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Accessibility;
