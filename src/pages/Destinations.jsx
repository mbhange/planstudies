import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Destinations.css";

const Destinations = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const destinations = [
    {
      name: "Canada",
      route: "/canada",
      flag: "🇨🇦",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1920px-Flag_of_Canada_%28Pantone%29.svg.png",
      highlights: ["Post-graduation work permits", "Immigration pathways", "Affordable tuition"],
      description: "Experience world-class education with excellent post-graduation opportunities and clear immigration pathways.",
      popular: true
    },
    {
      name: "United States",
      route: "/us",
      flag: "🇺🇸",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png",
      highlights: ["Top-ranked universities", "Research opportunities", "Diverse programs"],
      description: "Access to world's leading universities and cutting-edge research facilities across all academic disciplines.",
      popular: true
    },
    {
      name: "United Kingdom",
      route: "/uk",
      flag: "🇬🇧",
      image: "https://flagcdn.com/w1280/gb.png",
      highlights: ["Historic universities", "1-year master's", "Cultural heritage"],
      description: "Study at prestigious institutions with rich academic traditions and shorter degree programs.",
      popular: true
    },
    {
      name: "Australia",
      route: "/aus",
      flag: "🇦🇺",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1920px-Flag_of_Australia_%28converted%29.svg.png",
      highlights: ["High quality of life", "Work while studying", "Beautiful landscapes"],
      description: "Enjoy excellent education standards with the opportunity to work while studying in a stunning environment.",
      popular: true
    },
    {
      name: "New Zealand",
      route: "/nz",
      flag: "🇳🇿",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/1920px-Flag_of_New_Zealand.svg.png",
      highlights: ["Safe environment", "Innovation focus", "Natural beauty"],
      description: "Study in one of the world's safest countries known for innovation and breathtaking natural scenery."
    },
    {
      name: "Germany",
      route: "/germany",
      flag: "🇩🇪",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png",
      highlights: ["Low tuition fees", "Engineering excellence", "Strong economy"],
      description: "Access world-class education with minimal tuition fees in Europe's economic powerhouse."
    },
    {
      name: "France",
      route: "/france",
      flag: "🇫🇷",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1920px-Flag_of_France.svg.png",
      highlights: ["Cultural richness", "Fashion & arts", "Culinary excellence"],
      description: "Immerse yourself in rich culture while studying at renowned institutions in fashion, arts, and cuisine."
    },
    {
      name: "Italy",
      route: "/italy",
      flag: "🇮🇹",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1920px-Flag_of_Italy.svg.png",
      highlights: ["Historic universities", "Art & design", "Mediterranean lifestyle"],
      description: "Study at some of the world's oldest universities while enjoying the Mediterranean lifestyle and rich history."
    },
    {
      name: "Dubai (UAE)",
      route: "/dubai",
      flag: "🇦🇪",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1920px-Flag_of_the_United_Arab_Emirates.svg.png",
      highlights: ["Global business hub", "Tax-free income", "Modern infrastructure"],
      description: "Experience world-class education in a global business hub with state-of-the-art facilities."
    },
    {
      name: "Singapore",
      route: "/singapore",
      flag: "🇸🇬",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1920px-Flag_of_Singapore.svg.png",
      highlights: ["Asia-Pacific gateway", "Multicultural society", "Technology hub"],
      description: "Study in Asia's education hub with excellent connectivity to the Asia-Pacific region."
    },
    {
      name: "Finland",
      route: "/finland",
      flag: "🇫🇮",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/1920px-Flag_of_Finland.svg.png",
      highlights: ["Education excellence", "Innovation", "High living standards"],
      description: "Experience the world's best education system in a country known for innovation and quality of life."
    },
    {
      name: "Ireland",
      route: "/ireland",
      flag: "🇮🇪",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/1920px-Flag_of_Ireland.svg.png",
      highlights: ["Tech industry hub", "English-speaking", "Friendly culture"],
      description: "Study in the heart of Europe's tech industry with friendly locals and stunning landscapes."
    },
    {
      name: "Poland",
      route: "/poland",
      flag: "🇵🇱",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/1920px-Flag_of_Poland.svg.png",
      highlights: ["Affordable education", "Central Europe", "Growing economy"],
      description: "Access quality European education at affordable costs in a rapidly developing economy."
    },
    {
      name: "Cyprus",
      route: "/cyprus",
      flag: "🇨🇾",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Cyprus.svg/1920px-Flag_of_Cyprus.svg.png",
      highlights: ["Mediterranean climate", "EU member", "English programs"],
      description: "Enjoy studying in a beautiful Mediterranean island with EU benefits and English-taught programs."
    },
    {
      name: "Malta",
      route: "/malta",
      flag: "🇲🇹",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/1920px-Flag_of_Malta.svg.png",
      highlights: ["English-speaking", "EU benefits", "Island lifestyle"],
      description: "Study in English on a beautiful Mediterranean island with full EU membership benefits."
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-custom-blue-gradient text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden destinations-hero">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="%23ffffff" opacity="0.1"%3e%3cpolygon points="0,0 1000,0 1000,100 0,60"/%3e%3c/svg%3e")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center bottom',
            backgroundSize: 'cover'
          }}></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full animate-ping"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="destinations-title">
              Study Abroad <span className="highlight">Destinations</span>
            </h1>
            <p className="destinations-subtitle">
              Discover your perfect study destination from our comprehensive list of countries offering world-class education, 
              diverse cultures, and exciting career opportunities.
            </p>
            
            {/* Statistics Section */}
            <div className="stats-section">
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Countries</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Universities</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Programs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our most sought-after study abroad destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {destinations.filter(dest => dest.popular).map((destination, index) => (
              <Link
                key={index}
                to={destination.route}
                className={`group destination-card popular-card transform transition-all duration-500 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="popular-badge">
                    <span>Popular</span>
                  </div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={`${destination.name} flag`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-4xl mb-2 block">{destination.flag}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {destination.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 2).map((highlight, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Destinations */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              All Study Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete list of countries where you can pursue your education dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <Link
                key={index}
                to={destination.route}
                className={`group destination-card transform transition-all duration-500 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${(index + 4) * 50}ms` }}
              >
                <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={`${destination.name} flag`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-4xl mb-2 block">{destination.flag}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {destination.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 2).map((highlight, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-custom-blue-gradient py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto text-center">
          <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Global Journey?
          </h3>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            Get personalized guidance to choose the perfect destination for your academic and career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="btn-white-professional inline-flex items-center justify-center text-lg font-semibold px-10 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span>Get Free Consultation</span>
            </Link>
            <Link
              to="/services"
              className="btn-outline-scale-only inline-flex items-center justify-center text-lg font-semibold px-10 py-4 rounded-lg transition-all duration-300"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Destinations;
