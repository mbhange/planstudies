import React from "react";
import Navbar from "../components/Navbar";
import HomePage from "../components/HomePage";
import InfoSection from "../components/InfoSection";
import Slider from "../components/Slider";
import Statistics from "../components/Statistics";
import Footer from "../components/Footer";
import Popup from "../components/Popup";
import FaqSection from "../components/FaqSection";
import Testimonial from "../components/Testimonial";
// import "../styles/Inquiry.css"


const Home = () => {
    return(
        <div>
            <Popup />
            <Navbar />
            <HomePage />
            <InfoSection />
            <Slider />
            <Statistics />
            <Testimonial />
            <FaqSection />
            <Footer />
            {/* <Inquiry /> */}
        </div>
    )
}
export default Home;