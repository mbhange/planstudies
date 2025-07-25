// import React from "react";
// import "../styles/InfoSection.css";

// const InfoCards = () => {
//   const cards = [
//     {
//       title: "Students",
//       description: "Match your dreams with programs that fit your skills and interests.",
//       image: "https://images.pexels.com/photos/5538583/pexels-photo-5538583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       link: "/plan-studies",
//     },
//     {
//       title: "Recruitment",
//       description: "PlanStudies is your trusted partner, helping students worldwide achieve their educational goals.",
//       image: "https://images.pexels.com/photos/4344860/pexels-photo-4344860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       link: "/resources",
//     },
//     {
//       title: "Institutions",
//       description: "Enhance your global presence and student applications with a platform trusted by 800+ institutions.",
//       image: "https://images.pexels.com/photos/14928813/pexels-photo-14928813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       link: "/track-progress",
//     },
//   ];

//   return (
//     <div className="info-cards-container">
//       <h2 className="info-cards-title">Discover More</h2>
//       <div className="info-cards">
//         {cards.map((card, index) => (
//           <div className="info-card" key={index}>
//             <img
//               src={card.image}
//               alt={card.title}
//               className="info-card-image"
//               onClick={() => window.location.href = card.link}
//             />
//             <h3 className="info-card-title">{card.title}</h3>
//             <p className="info-card-description">{card.description}</p>
//             <button
//               className="info-card-button"
//               onClick={() => window.location.href = card.link}
//             >
//               Learn More
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InfoCards;

import React from "react";
import "../styles/InfoSection.css";

const InfoCards = () => {
  const cards = [
    {
      title: "Students",
      description:
        "Match your dreams with programs that fit your skills and interests.",
      image:
        "https://images.pexels.com/photos/5538583/pexels-photo-5538583.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      link: "/plan-studies",
    },
    {
      title: "Recruitment",
      description:
        "PlanStudies is your trusted partner, helping students worldwide achieve their educational goals.",
      image:
        "https://images.pexels.com/photos/4344860/pexels-photo-4344860.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      link: "/resources",
    },
    {
      title: "Institutions",
      description:
        "Enhance your global presence and student applications with a platform trusted by 800+ institutions.",
      image:
        "https://images.pexels.com/photos/14928813/pexels-photo-14928813.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      link: "/track-progress",
    },
  ];

  const handleNavigation = (link) => {
    window.location.href = link;
  };

  return (
    <section className="info-cards-container">
      <h2 className="info-cards-title">Discover More</h2>
      <div className="info-cards">
        {cards.map((card, index) => (
          <div className="info-card" key={index}>
            <img
              src={card.image}
              alt={card.title}
              className="info-card-image"
              loading="lazy"
              onClick={() => handleNavigation(card.link)}
            />
            <div className="info-card-content">
              <h3 className="info-card-title">{card.title}</h3>
              <p className="info-card-description">{card.description}</p>
              <button
                className="info-card-button"
                onClick={() => handleNavigation(card.link)}
                aria-label={`Learn more about ${card.title}`}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoCards;
