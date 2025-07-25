import React, { useState, useEffect } from "react";
import "../styles/TopToBottom.css";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    console.log(window.scrollY);
    if (window.scrollY > 200) { // Button shows after 200px scroll
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showButton && (
        // <button
        //   onClick={scrollToTop}
        //   className={`scroll-to-top-button ${showButton ? "show" : ""}`}
        // >
        //   ↑
        // </button>
        <button
          onClick={scrollToTop}
          className={`scroll-to-top-button ${showButton ? "show" : ""}`}
        >
          <span>↑</span> {/* Wrap the arrow inside a span for animation */}
        </button>

      )}
    </>
  );
};

export default ScrollToTopButton;
