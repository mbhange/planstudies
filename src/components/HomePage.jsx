// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "../styles/Home.css";

// const HomePage = () => {
//   const slides = [
//     "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     "https://images.pexels.com/photos/5905440/pexels-photo-5905440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     "https://images.pexels.com/photos/6147271/pexels-photo-6147271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   ];

//   const [slideIndex, setSlideIndex] = useState(0);  // State for the active slide

//   return (
//     <div className="home-container">
//       <Swiper
//         modules={[Autoplay, EffectFade]}
//         effect="fade"
//         autoplay={{ delay: 4000, disableOnInteraction: false }}
//         loop={true}
//         className="background-slider"
//         onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}  // Update slide index on slide change
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div
//               className={`slide ${slideIndex === index ? 'fade-in' : ''}`}
//               style={{ backgroundImage: `url(${slide})` }}
//             ></div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className="content112">
//         <h1 className="tagline11">Transforming the Future <br /> of Education</h1>
//         <div className="buttons">
//           <button className="button animate-button">I Want to Study Abroad</button>
//           <button className="button animate-button">I Want to Guide Students for Abroad Studies</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect, memo, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "../critical.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const HomePage = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Optimized images with WebP support and proper sizing - memoized to prevent re-renders
  const slides = useMemo(() => [
    {
      webp: "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1&fm=webp",
      jpg: "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1",
      alt: "Students studying abroad"
    },
    {
      webp: "https://images.pexels.com/photos/5905440/pexels-photo-5905440.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1&fm=webp",
      jpg: "https://images.pexels.com/photos/5905440/pexels-photo-5905440.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1",
      alt: "University campus"
    },
    {
      webp: "https://images.pexels.com/photos/6147271/pexels-photo-6147271.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1&fm=webp",
      jpg: "https://images.pexels.com/photos/6147271/pexels-photo-6147271.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1",
      alt: "International education"
    },
  ], []);

  // Preload the first image for faster LCP
  useEffect(() => {
    const firstImage = new Image();
    const secondImage = new Image();
    
    firstImage.onload = () => {
      secondImage.onload = () => setImagesLoaded(true);
      secondImage.src = slides[1].webp;
    };
    firstImage.src = slides[0].webp;
  }, [slides]);

  return (
    <div className="home-container">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop={true}
        speed={1000}
        className="background-slider"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <picture className={`slide ${activeIndex === index ? "active" : ""}`}>
              <source srcSet={slide.webp} type="image/webp" />
              <img
                src={slide.jpg}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="content112">
        <h1 className="tagline11">
          Transforming the Future <br /> of Education
        </h1>
        <p className="subtitle">
          Connect with 500+ universities worldwide. Your study abroad journey
          starts here.
        </p>
        <div className="buttons">
          <Link to="/create" className="button-link">
            <button className="button animate-button primary">
              🎓 I Want to Study Abroad
            </button>
          </Link>
          <Link to="/create" className="button-link">
            <button className="button animate-button secondary">
              🤝 I Want to Guide Students
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default HomePage;
