import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
    const navigate = useNavigate();
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

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
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

                    {/* Mobile logout button inside menu */}
                    <div className="navbar-btns mobile-btns">
                        <button className="btn-logout" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Desktop logout button */}
                <div className="navbar-btns desktop-btns">
                    <button className="btn-logout" onClick={handleLogout}>
                        Log Out
                    </button>
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
