import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsConditions = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gradient-to-br from-gray-50 to-blue-50 py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-custom-blue-gradient px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-4">
                                Terms & Conditions
                            </h1>
                            <p className="text-blue-100 text-center max-w-2xl mx-auto text-sm sm:text-base">
                                Please read these terms carefully before using our educational platform services.
                            </p>
                        </div>

                        {/* Content Section */}
                        <div className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
                            <div className="space-y-8 text-gray-700 leading-relaxed">
                                <section className="mb-10">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">1. Introduction</h2>
                                    <p className="mb-6">
                                        Welcome to PlanStudies, an educational platform designed to bridge students with institutions worldwide. By using our platform, you agree to comply with the following terms and conditions. If you do not accept these terms, please refrain from using our services. We are committed to providing you with a seamless experience while ensuring transparency and security at all times.
                                    </p>
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                        <p className="text-blue-700 font-medium">Important Notice</p>
                                        <p className="text-sm text-blue-600">By accessing or using PlanStudies, you acknowledge that you have read, understood, and agree to be bound by these terms.</p>
                                    </div>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">2. User Accounts</h2>
                                    <p className="mb-4">
                                        Users must register with accurate and up-to-date personal information. You are responsible for keeping your login credentials confidential and must notify us of any unauthorized access.
                                    </p>
                                    <ul className="list-disc pl-6 mb-4 space-y-2">
                                        <li>Provide accurate and complete registration information</li>
                                        <li>Maintain the confidentiality of your account credentials</li>
                                        <li>Notify us immediately of any unauthorized access</li>
                                        <li>Take responsibility for all activities under your account</li>
                                    </ul>
                                    <p>
                                        Misrepresentation or falsification of identity may result in immediate account suspension. Users found sharing accounts may face restricted access or permanent suspension.
                                    </p>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">3. Course Enrollment</h2>
                                    <p className="mb-4">
                                        Enrollment in courses is subject to availability and approval from respective institutions. PlanStudies does not guarantee admission but facilitates the application process.
                                    </p>
                                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-4">
                                        <p className="text-yellow-700 font-medium">Please Note</p>
                                        <p className="text-sm text-yellow-600">We facilitate applications but do not guarantee admission. Final decisions rest with the respective institutions.</p>
                                    </div>
                                    <p>
                                        Users must adhere to the eligibility criteria specified by institutions and ensure that all submitted documents are accurate. Failure to comply may result in the rejection of applications.
                                    </p>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">4. Payments & Refunds</h2>
                                    <p className="mb-4">
                                        Payments for courses and services must be completed using our authorized payment gateways. Users must carefully review refund policies before making any payments.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-gray-800 mb-2">Payment Processing</h3>
                                            <p className="text-sm text-gray-600">All payments are processed through secure, authorized payment gateways for your protection.</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-gray-800 mb-2">Refund Policy</h3>
                                            <p className="text-sm text-gray-600">Refund eligibility depends on institution policies, course commencement, and cancellation timelines.</p>
                                        </div>
                                    </div>
                                    <p>
                                        Refund requests will only be processed if they comply with our refund policies and the specific terms set by educational institutions.
                                    </p>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">5. Prohibited Activities</h2>
                                    <p className="mb-4">
                                        Users must not engage in activities that violate applicable laws, infringe intellectual property rights, or disrupt platform operations. Examples of prohibited activities include but are not limited to:
                                    </p>
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
                                        <p className="text-red-700 font-medium">Strictly Prohibited</p>
                                        <p className="text-sm text-red-600">Violation of these terms may result in immediate account suspension or legal action.</p>
                                    </div>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Providing false or misleading information</li>
                                        <li>Attempting to hack, modify, or interfere with platform functionalities</li>
                                        <li>Using automated systems to extract data without permission</li>
                                        <li>Sharing copyrighted material without authorization</li>
                                        <li>Harassing, threatening, or abusing other users</li>
                                    </ul>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">6. Data Privacy & Security</h2>
                                    <p className="mb-4">
                                        PlanStudies takes privacy seriously and ensures that user data is protected under relevant data protection laws. Our privacy policies outline the collection, usage, and storage of personal information.
                                    </p>
                                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
                                        <p className="text-green-700 font-medium">Your Privacy Matters</p>
                                        <p className="text-sm text-green-600">We employ encryption, secure databases, and advanced authentication measures to protect your personal information.</p>
                                    </div>
                                    <p>
                                        For detailed information about how we collect, use, and protect your data, please refer to our Privacy & Cookies Policy.
                                    </p>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">7. Account Termination</h2>
                                    <p className="mb-4">
                                        We reserve the right to terminate or restrict access to user accounts under certain circumstances. Affected users will be notified via email, and appeals may be considered on a case-by-case basis.
                                    </p>
                                    <ul className="list-disc pl-6 mb-4 space-y-2">
                                        <li>Policy violations or misconduct</li>
                                        <li>Fraudulent activities or suspicious behavior</li>
                                        <li>Legal obligations or court orders</li>
                                        <li>Intellectual property violations</li>
                                    </ul>
                                    <p>
                                        Users who violate intellectual property laws may be reported to legal authorities in accordance with applicable laws.
                                    </p>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">8. Changes to Terms</h2>
                                    <p className="mb-4">
                                        These terms may be updated periodically to reflect policy changes, regulatory requirements, or improvements to our platform. Users are encouraged to review the terms frequently to stay informed about any modifications.
                                    </p>
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                        <p className="text-blue-700 font-medium">Stay Updated</p>
                                        <p className="text-sm text-blue-600">Continued usage of PlanStudies implies acceptance of the updated terms. We recommend checking this page regularly.</p>
                                    </div>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">9. Contact Us</h2>
                                    <p className="mb-6">
                                        If you have any questions, concerns, or require further clarification about these terms, feel free to reach out to us at <span className="font-semibold text-blue-600">support@planstudies.com</span>. Our team is always available to assist you and ensure your experience remains smooth and beneficial.
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

export default TermsConditions;
