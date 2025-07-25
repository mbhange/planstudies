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
