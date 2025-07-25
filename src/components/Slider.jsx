// import React, { useRef } from "react"
// import "../styles/slider.css"

// const Slider = () => {
//   const sliderRef = useRef(null);

//   const destinations = [
//     {
//       title: " Study in the USA",
//       image: "https://images.pexels.com/photos/4386429/pexels-photo-4386429.jpeg?auto=compress&cs=tinysrgb&w=600",
//       link: "/us"
//     },
//     {
//       title: " Study in the UK",
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png",
//       link: "/uk",
//     },
//     {
//       title: " Study in Canada",
//       image: "https://rukminim2.flixcart.com/image/850/1000/jyhl1u80/flag/k/j/c/canada-canadian-flag-maple-leave-flag-futurekart-original-imafgznb54qffrgn.jpeg?q=90&crop=false",
//       link: "/canada",
//     },
//     {
//       title: " Study in New Zealand",
//       image: "https://files.ekmcdn.com/funkyleisurel/images/flag-of-new-zealand-6821-p.png",
//       link: "nz",
//     },
//     {
//       title: " Study in Australia",
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/255px-Flag_of_Australia_%28converted%29.svg.png", // Replace with your image path
//       link: "/aus",
//     },
//     {
//       title: "Study in Germany",
//       image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png", // Replace with your image path
//       link: "/germany",
//     },
//     {
//       title: "Study in France",
//       image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/255px-Flag_of_France.svg.png", // Replace with your image path
//       link: "/france",
//     },
//     {
//       title: "Study in Italy",
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Flag_of_Italy_%28Pantone%2C_2006%29.svg/220px-Flag_of_Italy_%28Pantone%2C_2006%29.svg.png", // Replace with your image path
//       link: "/italy",
//     },
//     {
//       title: "Study in Dubai",
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1200px-Flag_of_the_United_Arab_Emirates.svg.png", // Replace with your image path
//       link: "/dubai",
//     },
//     {
//       title: "Study in Finland",
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/800px-Flag_of_Finland.svg.png", // Replace with your image path
//       link: "finland",
//     },
//     {
//       title: "Study in Singapore",
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1200px-Flag_of_Singapore.svg.png", // Replace with your image path
//       link: "/singapore",
//     },
//     {
//       title: "Study in Poland",
//       image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/800px-Flag_of_Poland.svg.png", // Replace with your image path
//       link: "/poland",
//     },
//     {
//       title: "Study in Cyprus",
//       image: "https://cdn.britannica.com/83/7883-050-0E5BCA30/Flag-Cyprus.jpg", // Replace with your image path
//       link: "/cyprus",
//     },
//     {
//       title: "Study in Malta",
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/640px-Flag_of_Malta.svg.png", // Replace with your image path
//       link: "/malta",
//     },
//     {
//       title: "Study in Ireland",
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/640px-Flag_of_Ireland.svg.png",
//       link: "/ireland",
//     },
//   ];

//   const scrollSlider = (direction) => {
//     const slider = sliderRef.current;
//     const scrollAmount = slider.offsetWidth;
//     direction === "left"
//       ? (slider.scrollLeft -= scrollAmount)
//       : (slider.scrollLeft += scrollAmount);
//   };

//   return (
//     <div className="py-8 px-4">
//       <h2 className="slidee">
//         Choose Your Study Abroad Destination
//       </h2>
//       <div className="relative overflow-hidden">
//         <button
//           onClick={() => scrollSlider("left")}
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-10"
//         >
//           ◀
//         </button>
//         <button
//           onClick={() => scrollSlider("right")}
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-10"
//         >
//           ▶
//         </button>

//         {/* Slider */}
//         <div
//           ref={sliderRef}
//           className="flex gap-6 overflow-x-scroll no-scrollbar scroll-smooth"
//         >
//           {destinations.map((destination, index) => (
//             <div
//               key={index}
//               className="min-w-[250px] w-[250px] h-[300px] bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
//             >
//               <img
//                 src={destination.image}
//                 alt={destination.title}
//                 className="w-full h-[150px] object-cover rounded-md mb-4"
//               />
//               <h3 className="text-xl font-semibold text-blue-700">
//                 {destination.title}
//               </h3>
//               <a
//                 href={destination.link}
//                 className="mt-2 text-blue-500 flex items-center gap-2 hover:text-blue-700 transition duration-300"
//               >
//                 Explore <span>→</span>
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Slider;

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaGraduationCap } from "react-icons/fa";
import "../styles/slider.css";

const Slider = () => {
  const sliderRef = useRef(null);

  const destinations = [
    {
      title: "USA",
      subtitle: "United States of America",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_the_United_States_%28Web_Colors%29.svg/1920px-Flag_of_the_United_States_%28Web_Colors%29.svg.png",
      link: "/us"
    },
    {
      title: "UK",
      subtitle: "United Kingdom",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png",
      link: "/uk"
    },
    {
      title: "Canada",
      subtitle: "The Great White North",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1920px-Flag_of_Canada_%28Pantone%29.svg.png",
      link: "/canada"
    },
    {
      title: "New Zealand",
      subtitle: "Land of the Long White Cloud",
      image:
        "https://files.ekmcdn.com/funkyleisurel/images/flag-of-new-zealand-6821-p.png",
      link: "nz"
    },
    {
      title: "Australia",
      subtitle: "Down Under",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1920px-Flag_of_Australia_%28converted%29.svg.png",
      link: "/aus"
    },
    {
      title: "Germany",
      subtitle: "Land of Ideas",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png",
      link: "/germany"
    },
    {
      title: "France",
      subtitle: "Hexagone",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/255px-Flag_of_France.svg.png",
      link: "/france"
    },
    {
      title: "Italy",
      subtitle: "Boot Peninsula",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Flag_of_Italy_%28Pantone%2C_2006%29.svg/220px-Flag_of_Italy_%28Pantone%2C_2006%29.svg.png",
      link: "/italy"
    },
    {
      title: "Dubai",
      subtitle: "United Arab Emirates",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1200px-Flag_of_the_United_Arab_Emirates.svg.png",
      link: "/dubai"
    },
    {
      title: "Finland",
      subtitle: "Land of a Thousand Lakes",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/800px-Flag_of_Finland.svg.png",
      link: "finland"
    },
    {
      title: "Singapore",
      subtitle: "Lion City",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1200px-Flag_of_Singapore.svg.png",
      link: "/singapore"
    },
    {
      title: "Poland",
      subtitle: "Heart of Europe",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/800px-Flag_of_Poland.svg.png",
      link: "/poland"
    },
    {
      title: "Cyprus",
      subtitle: "Island of Aphrodite",
      image: "https://cdn.britannica.com/83/7883-050-0E5BCA30/Flag-Cyprus.jpg",
      link: "/cyprus"
    },
    {
      title: "Malta",
      subtitle: "Jewel of the Mediterranean",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/640px-Flag_of_Malta.svg.png",
      link: "/malta"
    },
    {
      title: "Ireland",
      subtitle: "Emerald Isle",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/640px-Flag_of_Ireland.svg.png",
      link: "/ireland"
    },
  ];

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    const cardWidth = 280; // Fixed card width + gap
    const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time

    if (direction === "left") {
      slider.scrollLeft -= scrollAmount;
    } else {
      slider.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="slider-section">
      <div className="slider-header">
        <FaGraduationCap className="slider-header-icon" />
        <h2 className="slider-title">Choose Your Study Abroad Destination</h2>
        <p className="slider-subtitle">
          Explore world-class education opportunities across the globe
        </p>
      </div>

      <div className="slider-wrapper">
        <button
          onClick={() => scrollSlider("left")}
          className="slider-nav-button left-nav-button"
          aria-label="Previous destinations"
        >
          <FaChevronLeft />
        </button>

        <div ref={sliderRef} className="slider-content">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              className="destination-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="card-image-container">
                <img
                  src={destination.image}
                  alt={`Study in ${destination.title}`}
                  className="destination-image"
                />
              </div>

              <div className="card-content">
                <h3 className="destination-title">{destination.title}</h3>
                <p className="destination-subtitle">{destination.subtitle}</p>

                <a href={destination.link} className="explore-button">
                  <span>Explore Programs</span>
                  <FaChevronRight className="explore-icon" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scrollSlider("right")}
          className="slider-nav-button right-nav-button"
          aria-label="Next destinations"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Slider;
