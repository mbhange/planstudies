import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyCookies = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8 animate-fade-in">
          Privacy & Cookies Policy
        </h1>
        <div className="space-y-8 text-gray-700 animate-slide-in leading-relaxed">
          <section>
            <p>
              At PlanStudies, we value your privacy and are committed to maintaining the confidentiality of your information. This policy outlines how we collect, use, and protect the data you share with us. Our goal is to ensure transparency and security so that you can navigate our platform with confidence. Your trust is our top priority, and we continuously work to uphold the highest privacy standards.
            </p>
            {/* <div className="flex justify-center mt-6">
              <img src="/privacy-protection.png" alt="Privacy Protection" className="w-3/4 rounded-lg shadow-md" />
            </div> */}
          </section>

          <section>
            <p>
              We collect various types of data to enhance your experience on our platform. This includes your name, email address, contact details, browsing behavior, and device information. By understanding how you interact with our platform, we can tailor content, improve features, and offer personalized recommendations. Our data collection is carried out with strict adherence to legal frameworks and industry best practices, ensuring your information remains safe and secure.
            </p>
          </section>

          <section>
            <p>
              To provide a seamless and personalized experience, we employ cookies and tracking technologies. Cookies help us remember your preferences, analyze site traffic, enhance security, and improve user engagement. These small data files are stored on your device and enable us to optimize performance, making your interactions with PlanStudies smooth and efficient. Our use of cookies is fully compliant with global data protection laws, and we ensure that they do not compromise your privacy.
            </p>
            {/* <div className="flex justify-center mt-6">
              <img src="/cookies-tracking.png" alt="Cookies Usage" className="w-3/4 rounded-lg shadow-md" />
            </div> */}
          </section>

          <section>
            <p>
              Managing your cookies is easy, and we empower you with complete control over your preferences. Most web browsers allow users to modify cookie settings, including accepting, rejecting, or deleting stored cookies. Below is a reference on how to manage cookies across different browsers:
            </p>
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-3">Browser</th>
                  <th className="border border-gray-300 p-3">Steps to Manage Cookies</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">Google Chrome</td>
                  <td className="border border-gray-300 p-3">Settings &gt; Privacy and Security &gt; Cookies and Other Site Data</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 p-3 font-semibold">Mozilla Firefox</td>
                  <td className="border border-gray-300 p-3">Options &gt; Privacy & Security &gt; Cookies and Site Data</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">Safari</td>
                  <td className="border border-gray-300 p-3">Preferences &gt; Privacy &gt; Manage Website Data</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 p-3 font-semibold">Microsoft Edge</td>
                  <td className="border border-gray-300 p-3">Settings &gt; Cookies and Site Permissions</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <p>
              At PlanStudies, we implement state-of-the-art security measures to protect your data from unauthorized access, loss, or misuse. Our security protocols include encryption, multi-factor authentication, and secure server storage. We never sell your personal data to third parties. Any sharing of data is strictly for operational improvements, fraud prevention, and enhanced security measures. Our commitment to security ensures that your information is always in safe hands.
            </p>
            <p>
              Below is an overview of our key security measures and how they protect your data:
            </p>
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-3">Security Measure</th>
                  <th className="border border-gray-300 p-3">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">Encryption</td>
                  <td className="border border-gray-300 p-3">Ensures that sensitive data is converted into a secure format to prevent unauthorized access.</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 p-3 font-semibold">Multi-Factor Authentication</td>
                  <td className="border border-gray-300 p-3">Requires users to verify their identity using multiple authentication steps for added security.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">Secure Servers</td>
                  <td className="border border-gray-300 p-3">Data is stored in highly secured servers with restricted access.</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 p-3 font-semibold">Regular Audits</td>
                  <td className="border border-gray-300 p-3">We conduct periodic security assessments to identify and mitigate risks.</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <p>
              If you have any questions, concerns, or require further clarification about our privacy policy, feel free to reach out to us at <span className="font-semibold">support@planstudies.com</span>. Our team is always available to provide support and address any inquiries related to data privacy and security. We appreciate your trust in PlanStudies and remain committed to safeguarding your personal information at all times.
            </p>
          </section>
        </div>
      </div>
    </div>
            <Footer />
        </div>
    );
};

export default PrivacyCookies;
