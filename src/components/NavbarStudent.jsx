import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" style={{ height: "75px", width: "130px" }} />
            </div>
            <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/associate">Associates</Link>
                <Link to="/contact">Contact</Link>
            </ul>
            <div className="navbar-btns">
                <Link to="/stdlogout">
                    <button className="logout-button" onClick={handleLogout}>
                        Log out
                    </button>
                </Link>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
