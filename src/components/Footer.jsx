// import React from "react";
// import "../styles/Footer.css";
// import logo from "../images/logo.png";

// const Footer = () => {
//   return (
//     <footer className="footer-container">
//       <div className="footer-content">
//         <div className="footer-address">
//           <img src={logo} alt="Logo" style={{ height: "75px", width: "130px" }} />
//         </div>

//          <div className="footer-discover">
//           <h4></h4>
//           <ul>
//             <li><a href="/our-story">Students</a></li>
//             <li><a href="/careers">Schools</a></li>
//             <li><a href="/recruiter">Recruiters</a></li>
//             <li><a href="/track-progress">Institutions</a></li>
//             <li><a href="/life-at-applyboard">Explore Schools</a></li>
//             <li><a href="/leadership">Explore Programs</a></li>
//           </ul>
//         </div>

//         <div className="footer-discover">
//           <h4><b>Discover</b></h4>
//           <ul>
//             <li><a href="/our-story">Our Story</a></li>
//             {/* <li><a href="/careers">Careers</a></li> */}
//             {/* <li><a href="/blog">Blog</a></li> */}
//             {/* <li><a href="/press">Press</a></li> */}
//             {/* <li><a href="/life-at-applyboard">Life at ApplyBoard</a></li> */}
//             {/* <li><a href="/leadership">Leadership</a></li> */}
//             <li><a href="/contact">Contact</a></li>
//           </ul>
//         </div>

//         {/* <div className="footer-resources">
//           <h4>Resources</h4>
//           <ul>
//             <li><a href="/ux-resources">UX Resources</a></li>
//             <li><a href="/au-resources">AU Resources</a></li>
//           </ul>
//         </div> */}

//         <div className="footer-legal">
//           <h4><b>Legal</b></h4>
//           <ul>
//             <li><a href="/privacy-cookies-policy">Privacy & Cookies Policy</a></li>
//             <li><a href="/terms-conditions">Terms & Conditions</a></li>
//             <li><a href="/accessibility">Accessibility</a></li>
//           </ul>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>© 2025 PlanStudies. All Rights Reserved.</p>
//       </div>
//     </footer>
//   );

// };

// export default Footer;

import React, { useState } from "react";
import "../styles/Footer.css";
import logo from "../images/logo.png";

const FooterSection = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="footer-section">
      <div className="footer-section-header" onClick={() => setIsOpen(!isOpen)}>
        <h4>{title}</h4>
        <span>{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={logo} alt="PlanStudies Logo" className="footer-logo" />
          <p className="footer-description">
            Empowering students worldwide to achieve their educational dreams
            through trusted guidance and comprehensive support.
          </p>
        </div>

        <FooterSection
          title="Services"
          items={[
            { label: "Students", link: "/students" },
            { label: "Schools", link: "/schools" },
            { label: "Recruiters", link: "/recruiters" },
            { label: "Institutions", link: "/institutions" },
            { label: "Explore Schools", link: "/explore-schools" },
            { label: "Explore Programs", link: "/explore-programs" },
          ]}
        />

        <FooterSection
          title="Discover"
          items={[
            { label: "Our Story", link: "/our-story" },
            { label: "Careers", link: "/careers" },
            { label: "Blog", link: "/blog" },
            { label: "Press", link: "/press" },
            { label: "Contact", link: "/contact" },
          ]}
        />

        <FooterSection
          title="Legal"
          items={[
            {
              label: "Privacy & Cookies Policy",
              link: "/privacy-cookies-policy",
            },
            { label: "Terms & Conditions", link: "/terms-conditions" },
            { label: "Accessibility", link: "/accessibility" },
            { label: "Support", link: "/support" },
          ]}
        />
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 PlanStudies. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
