import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyCookies = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gradient-to-br from-gray-50 to-blue-50 py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-custom-blue-gradient px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-4">
                                Privacy & Cookies Policy
                            </h1>
                            <p className="text-blue-100 text-center max-w-2xl mx-auto text-sm sm:text-base">
                                Your privacy matters to us. Learn how we collect, use, and protect your information.
                            </p>
                        </div>

                        {/* Content Section */}
                        <div className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
                            <div className="space-y-8 text-gray-700 leading-relaxed">
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Our Commitment to Privacy</h2>
            <p className="mb-6">
              At PlanStudies, we value your privacy and are committed to maintaining the confidentiality of your information. This policy outlines how we collect, use, and protect the data you share with us. Our goal is to ensure transparency and security so that you can navigate our platform with confidence. Your trust is our top priority, and we continuously work to uphold the highest privacy standards.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-700 font-medium">Our Privacy Promise</p>
              <p className="text-sm text-blue-600">We never sell your personal data and only collect what's necessary to provide you with the best educational planning experience.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Data Collection</h2>
            <p className="mb-4">
              We collect various types of data to enhance your experience on our platform. This includes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Personal information (name, email address, contact details)</li>
              <li>Educational background and preferences</li>
              <li>Browsing behavior and site interaction</li>
              <li>Device and technical information</li>
            </ul>
            <p>
              By understanding how you interact with our platform, we can tailor content, improve features, and offer personalized recommendations. Our data collection is carried out with strict adherence to legal frameworks and industry best practices, ensuring your information remains safe and secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Cookies & Tracking</h2>
            <p className="mb-6">
              To provide a seamless and personalized experience, we employ cookies and tracking technologies. Cookies help us remember your preferences, analyze site traffic, enhance security, and improve user engagement. These small data files are stored on your device and enable us to optimize performance, making your interactions with PlanStudies smooth and efficient. Our use of cookies is fully compliant with global data protection laws, and we ensure that they do not compromise your privacy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Essential Cookies</h3>
                <p className="text-sm text-gray-600">Required for basic site functionality and security. Cannot be disabled.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Analytics Cookies</h3>
                <p className="text-sm text-gray-600">Help us understand how you use our site so we can improve your experience.</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Managing Your Cookies</h2>
            <p className="mb-4">
              Managing your cookies is easy, and we empower you with complete control over your preferences. Most web browsers allow users to modify cookie settings, including accepting, rejecting, or deleting stored cookies. Below is a reference on how to manage cookies across different browsers:
            </p>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-6">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-custom-blue-gradient">
                  <tr>
                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-white">Browser</th>
                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-white">Steps to Manage Cookies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Google Chrome</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Settings &gt; Privacy and Security &gt; Cookies and Other Site Data</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Mozilla Firefox</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Options &gt; Privacy & Security &gt; Cookies and Site Data</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Safari</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Preferences &gt; Privacy &gt; Manage Website Data</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Microsoft Edge</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Settings &gt; Cookies and Site Permissions</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 italic">
              Note: The steps provided above may vary slightly depending on your browser version.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Data Security & Protection</h2>
            <p className="mb-4">
              At PlanStudies, we implement state-of-the-art security measures to protect your data from unauthorized access, loss, or misuse. Our security protocols include encryption, multi-factor authentication, and secure server storage. We never sell your personal data to third parties. Any sharing of data is strictly for operational improvements, fraud prevention, and enhanced security measures. Our commitment to security ensures that your information is always in safe hands.
            </p>
            <p className="mb-4">
              Below is an overview of our key security measures and how they protect your data:
            </p>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-6">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-custom-blue-gradient">
                  <tr>
                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-white">Security Measure</th>
                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Encryption</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Ensures that sensitive data is converted into a secure format to prevent unauthorized access.</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Multi-Factor Authentication</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Requires users to verify their identity using multiple authentication steps for added security.</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Secure Servers</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Data is stored in highly secured servers with restricted access.</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Regular Audits</td>
                    <td className="px-4 py-3 text-sm text-gray-700">We conduct periodic security assessments to identify and mitigate risks.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-700 font-medium">Your Data, Your Control</p>
              <p className="text-sm text-green-600">You can request access to, correction of, or deletion of your personal data at any time through your account settings or by contacting our support team.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have any questions, concerns, or require further clarification about our privacy policy, feel free to reach out to us at <span className="font-semibold text-blue-600">support@planstudies.com</span>. Our team is always available to provide support and address any inquiries related to data privacy and security. We appreciate your trust in PlanStudies and remain committed to safeguarding your personal information at all times.
            </p>
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

export default PrivacyCookies;
