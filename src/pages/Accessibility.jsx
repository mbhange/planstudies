import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUniversalAccess, FaKeyboard, FaEye, FaHeadphones, FaSignLanguage, FaFont, FaPalette, FaMobile } from "react-icons/fa";
import { Link } from "react-router-dom";

const Accessibility = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-gray-50 to-blue-50 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-custom-blue-gradient px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-4">
                Accessibility Statement
              </h1>
              <p className="text-blue-100 text-center max-w-2xl mx-auto text-sm sm:text-base">
                Ensuring an inclusive and accessible educational experience for all users, regardless of ability.
              </p>
            </div>

            {/* Content Section */}
            <div className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
              <div className="space-y-8 text-gray-700 leading-relaxed">
                <section className="mb-10">
                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Our Commitment to Accessibility</h2>
                  <p className="mb-6">
                    At PlanStudies, we are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to guarantee we provide equal access to all of our users.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-blue-700 font-medium">Accessibility Promise</p>
                    <p className="text-sm text-blue-600">We strive to make our platform usable by everyone, following WCAG 2.1 AA guidelines and best practices for inclusive design.</p>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-6">Accessibility Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { icon: FaUniversalAccess, title: "Inclusive Design", description: "Our platform is built with universal design principles to be usable by everyone." },
                      { icon: FaKeyboard, title: "Keyboard Navigation", description: "Full keyboard support with logical tab order and visible focus indicators." },
                      { icon: FaEye, title: "Screen Reader Support", description: "Compatible with NVDA, JAWS, VoiceOver, and other popular screen readers." },
                      { icon: FaHeadphones, title: "Audio Assistance", description: "Text-to-speech functionality and audio descriptions where applicable." },
                      { icon: FaFont, title: "Text Customization", description: "Adjustable font sizes and high contrast options for better readability." },
                      { icon: FaPalette, title: "Color & Contrast", description: "Sufficient color contrast ratios and alternative text for color-dependent information." },
                    ].map((feature, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <feature.icon className="text-blue-600 text-3xl mb-3" />
                        <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Assistive Technologies</h2>
                  <p className="mb-4">
                    PlanStudies is designed to be compatible with a wide range of assistive technologies and adaptive strategies. Our platform supports:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
                    <li>Voice recognition software (Dragon NaturallySpeaking)</li>
                    <li>Keyboard navigation and switch controls</li>
                    <li>Screen magnification software</li>
                    <li>Alternative input devices</li>
                  </ul>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <p className="text-green-700 font-medium">Tested & Verified</p>
                    <p className="text-sm text-green-600">Our accessibility features are regularly tested with real users and assistive technology to ensure optimal compatibility.</p>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Standards & Guidelines</h2>
                  <p className="mb-4">
                    We follow established accessibility standards and guidelines to ensure our platform meets the needs of all users:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">WCAG 2.1 AA</h3>
                      <p className="text-sm text-gray-600">Web Content Accessibility Guidelines Level AA compliance for perceivable, operable, understandable, and robust content.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">Section 508</h3>
                      <p className="text-sm text-gray-600">Federal accessibility standards ensuring equal access to information and functionality.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Ongoing Improvements</h2>
                  <p className="mb-4">
                    Accessibility is an ongoing effort. We continuously work to improve the accessibility of our platform through:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Regular accessibility audits and testing</li>
                    <li>User feedback integration and response</li>
                    <li>Staff training on accessibility best practices</li>
                    <li>Technology updates and improvements</li>
                    <li>Collaboration with disability advocacy groups</li>
                  </ul>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-blue-700 font-medium">Your Feedback Matters</p>
                    <p className="text-sm text-blue-600">We value your input in making our platform more accessible. Please share your experiences and suggestions with us.</p>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Need Accessibility Support?</h2>
                  <p className="mb-6">
                    If you experience any accessibility barriers while using PlanStudies or need assistance accessing any part of our website, please don't hesitate to contact us at <span className="font-semibold text-blue-600">accessibility@planstudies.com</span>. Our dedicated accessibility team is here to help ensure you have full access to our educational platform.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <p className="text-yellow-700 font-medium">Alternative Formats Available</p>
                    <p className="text-sm text-yellow-600">We can provide information in alternative formats upon request, including large print, Braille, or audio formats.</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Accessibility;
