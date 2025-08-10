import React, { Suspense, lazy } from "react";

// Eager load above-the-fold components
import Navbar from "../components/Navbar";
import HomePage from "../components/HomePage";

// Lazy load below-the-fold components
const InfoSection = lazy(() => import("../components/InfoSection"));
const Slider = lazy(() => import("../components/Slider"));
const Statistics = lazy(() => import("../components/Statistics"));
const Footer = lazy(() => import("../components/Footer"));
const Popup = lazy(() => import("../components/Popup"));
const FaqSection = lazy(() => import("../components/FaqSection"));
const Testimonial = lazy(() => import("../components/Testimonial"));

// Loading component
const ComponentLoader = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);


const Home = () => {
    return(
        <div>
            <Suspense fallback={<ComponentLoader />}>
                <Popup />
            </Suspense>
            <Navbar />
            <HomePage />
            <Suspense fallback={<ComponentLoader />}>
                <InfoSection />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
                <Slider />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
                <Statistics />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
                <Testimonial />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
                <FaqSection />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
                <Footer />
            </Suspense>
        </div>
    )
}
export default Home;