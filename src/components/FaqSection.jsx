import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/FaqSection.css";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const faqData = [
  {
    question: "What is PlanStudies?",
    answer:
      "PlanStudies is a comprehensive platform that helps students find and apply to universities worldwide. We provide personalized guidance, application assistance, and support throughout your study abroad journey.",
  },
  {
    question: "How do I apply for a course?",
    answer:
      "Simply create an account, browse our extensive database of courses and universities, select your preferred options, and follow our step-by-step guided application process. Our experts will assist you at every stage.",
  },
  {
    question: "Is PlanStudies free to use?",
    answer:
      "Yes! Creating an account, exploring institutions, and accessing basic services is completely free. We also offer premium services for personalized counseling and application assistance.",
  },
  {
    question: "How can I track my application status?",
    answer:
      "Once you submit an application through our platform, you can track its progress in real-time from your personalized dashboard. You'll receive updates and notifications at every stage of the process.",
  },
  {
    question: "What makes PlanStudies different?",
    answer:
      "With over years of experience, we have successfully helped thousands of students navigate their study abroad journey. Our dedicated team ensures personalized assistance, from university selection to visa processing, providing tailored solutions for each student's unique needs.",
  },
  {
    question: "How many applications have you processed so far?",
    answer:
      "We have successfully processed over 5000+ applications, helping students gain admission to top universities and secure their student visas with ease.",
  },
  {
    question: "Where are your offices located?",
    answer:
      "We have offices in key locations, including Vadodara, Anand, and Bharuch (India), as well as an international office in Toronto (Canada). We also offer online consultations, making our services accessible worldwide.",
  },
  {
    question: "Where is your Vadodara branch located?",
    answer:
      "Our Vadodara office is located at Genda Circle, Karelibaug, Bhayli, Manjalpur, and Ajwa. Feel free to visit for professional consultations and expert assistance.",
  },
  {
    question: "What services do you provide?",
    answer:
      "We specialize in student visas, university application guidance, scholarship support, SOP writing, visa rejection handling, post-arrival assistance, and much more to ensure a seamless process for students planning to study abroad.",
  },
  {
    question: "Do you assist with visa refusals?",
    answer:
      "Yes, we provide expert guidance for students whose visa applications have been refused. We help in reapplying by strengthening your application and improving your chances of approval.",
  },
  {
    question: "Do you offer SOP writing services?",
    answer:
      "Yes, we offer professional SOP (Statement of Purpose) writing services to ensure that your application stands out and maximizes your chances of getting selected by universities and securing a visa.",
  },
  {
    question: "What coaching services do you offer?",
    answer:
      "We provide coaching for a variety of exams and language proficiency tests, including IELTS, PTE, TOEFL, Duolingo, CELPIP, GRE, GMAT, SAT, French, and German. Our coaching is available both online and in-person to help you prepare for your exams.",
  },
  {
    question: "Do you help with finding the right university?",
    answer:
      "Absolutely! We offer expert university selection counseling, ensuring that we recommend the best programs suited to your academic background, career goals, and financial considerations.",
  },
  {
    question: "How can I book a free consultation?",
    answer:
      "Booking a free consultation is easy. Simply visit our website, fill out the consultation form, or contact us directly through phone or email to schedule a meeting with our expert counselors.",
  },
  {
    question: "What is covered during a free consultation?",
    answer:
      "In the free consultation, we assess your goals, explain the study abroad process, and provide tailored advice on university selection, visa options, scholarship opportunities, and more.",
  },
  {
    question: "Do you offer online coaching services?",
    answer:
      "Yes, we provide coaching services both online and in-person, offering flexibility for students to choose the best option based on their convenience.",
  },
  {
    question: "Are your coaching classes suitable for beginners?",
    answer:
      "Yes, our coaching programs cater to all levels, from beginners to advanced students, ensuring that every student receives personalized attention and support.",
  },
  {
    question: "How do I contact you for more information?",
    answer:
      "You can contact us through the contact form on our website, by emailing us at help@planstudies.com, or by calling us at +91-6357091029.",
  },
  {
    question: "What countries do you provide services for?",
    answer:
      "We offer visa and immigration services for several countries, including Canada, USA, UK, Australia, New Zealand, Germany, France, Malta, Italy, Spain, Singapore, Netherlands, Dubai, Ireland, Cyprus, Russia, Poland, Georgia, and the Caribbean Islands.",
  },
  {
    question: "What are your office hours?",
    answer:
      "Our offices are open from Monday to Saturday, from 10 AM to 7 PM. You can also schedule an online consultation based on your availability.",
  },
  {
    question: "Do you offer post-arrival assistance?",
    answer:
      "Yes, we provide post-arrival services, such as assistance with accommodation, insurance, travel, and other essential services, ensuring a smooth transition after you arrive at your destination.",
  },
  {
    question: "Do you offer scholarships or financial assistance?",
    answer:
      "Yes, we assist students in finding suitable scholarships and other financial aid options to help fund their education abroad.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-header">
        <FaQuestionCircle className="faq-header-icon" />
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">
          Find answers to common questions about our services
        </p>
      </div>

      <div className="faq-container">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <button
              className={`faq-question ${openIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="faq-question-text">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="faq-icon-wrapper"
              >
                <FaChevronDown className="faq-icon" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
