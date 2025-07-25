import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";
import "../styles/Testimonial.css";

const testimonials = [
  { name: "Yash Desai", text: "PlanStudies guided me to my dream university!" },
  { name: "Vishwa Prajapati", text: "A seamless experience with top-notch support!" },
  { name: "Jimit Patel", text: "Best platform for students aiming to study abroad!" },
  { name: "Dev Darji", text: "A must-have resource for every student!" },
  { name: "Sumit Parmar", text: "Super easy to use and very helpful!" },
  { name: "Ansh Patel", text: "Found amazing study opportunities here!" },
  { name: "Riya Shah", text: "Incredible support throughout my application process!" },
  { name: "Aman Mehta", text: "Highly professional team, made everything simple!" },
  { name: "Sneha Patel", text: "Got admission in Canada without any stress!" },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="w-full flex flex-col items-center my-10 relative">
      <h2 className="text-3xl font-semibold text-primary mb-8">What Our Students Say</h2>
      <div className="flex items-center justify-around w-full max-w-6xl">
        <button onClick={prevSlide} aria-label="Previous Slide" className="p-3 rounded-full transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
          <FaChevronLeft size={24} />
        </button>
        <div className="flex-1 overflow-hidden px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {testimonials.slice(index * 3, index * 3 + 3).map((testimonial, i) => (
                <motion.div
                  key={i}
                  className="p-6 border shadow-md rounded-md flex flex-col items-center text-center bg-white"
                >
                  <FaUserCircle size={50} className="text-primary mb-3" />
                  <p className="text-lg italic text-gray-600">"{testimonial.text}"</p>
                  <h3 className="font-bold mt-3 text-gray-800">- {testimonial.name}</h3>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={nextSlide} aria-label="Next Slide" className="p-3 rounded-full transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
