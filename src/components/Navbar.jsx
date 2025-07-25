// import React, { useState } from "react";
// import "../styles/Navbar.css";
// import { Link } from "react-router-dom";
// import logo from "../images/logo.png";

// // import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <img src={logo} alt="Logo" style={{ height: "75px", width: "130px" }} />
//       </div>
//       <div className="navv">
//         <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
//           <Link to="/">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/services">Services</Link>
//           <Link to="/associate">Associates</Link>
//           <Link to="/contact">Contact</Link>
//         </ul>
//       </div>
//       <div className="navbar-btns">
//         <Link to="/create">
//           <button className="login-btn">Create Account</button>
//         </Link>
//         <Link to="/login">
//           <button className="login-btn">Log In</button>
//         </Link>
//       </div>
//       <div className="menu-icon" onClick={toggleMenu}>
//         <span className="bar"></span>
//         <span className="bar"></span>
//         <span className="bar"></span>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navbarRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null); // Close any open dropdowns when toggling menu
  };

  const handleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const closeAllMenus = () => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  const navItems = [
    {
      title: "Home",
      link: "/",
      hasDropdown: false,
    },
    {
      title: "Study Destinations",
      hasDropdown: true,
      dropdownItems: [
        { title: "Canada", link: "/canada" },
        { title: "United States", link: "/us" },
        { title: "United Kingdom", link: "/uk" },
        { title: "Australia", link: "/aus" },
        { title: "Germany", link: "/germany" },
        { title: "France", link: "/france" },
        { title: "View All Destinations", link: "/destinations" },
      ],
    },
    {
      title: "Services",
      hasDropdown: true,
      dropdownItems: [
        { title: "For Students", link: "/plan-studies" },
        { title: "For Institutions", link: "/track-progress" },
        { title: "For Recruitment Partners", link: "/resources" },
        { title: "All Services", link: "/services" },
      ],
    },
    {
      title: "About",
      hasDropdown: true,
      dropdownItems: [
        { title: "About Us", link: "/about" },
        { title: "Our Partners", link: "/associate" },
        { title: "Blog", link: "/blog" },
        { title: "Contact", link: "/contact" },
      ],
    },
  ];

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeAllMenus}>
            <img src={logo} alt="PlanStudies Logo" className="logo-img" />
          </Link>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="navbar-links">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                {item.hasDropdown ? (
                  <div className="dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      onClick={() => handleDropdown(item.title)}
                    >
                      {item.title}
                      <ChevronDown
                        size={16}
                        className={`dropdown-icon ${
                          activeDropdown === item.title ? "rotated" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`dropdown-menu ${
                        activeDropdown === item.title ? "show" : ""
                      }`}
                    >
                      {item.dropdownItems.map((dropItem, dropIndex) => (
                        <Link
                          key={dropIndex}
                          to={dropItem.link}
                          className="dropdown-item"
                          onClick={closeAllMenus}
                        >
                          {dropItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    className="nav-link"
                    onClick={closeAllMenus}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile buttons inside menu */}
          <div className="navbar-btns mobile-btns">
            <Link to="/create" onClick={closeAllMenus}>
              <button className="btn-create">Create Account</button>
            </Link>
            <Link to="/login" onClick={closeAllMenus}>
              <button className="btn-login">Log In</button>
            </Link>
          </div>
        </div>

        {/* Desktop buttons */}
        <div className="navbar-btns desktop-btns">
          <Link to="/create">
            <button className="btn-create">Create Account</button>
          </Link>
          <Link to="/login">
            <button className="btn-login">Log In</button>
          </Link>
          <a
            href="https://wa.me/+916357091029"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            WhatsApp
          </a>
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
          <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
          <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
