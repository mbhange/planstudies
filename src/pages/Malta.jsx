import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const CanadaPage = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in Malta</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/640px-Flag_of_Malta.svg.png"
                alt="Study in the USA"
                style={{
                    width: '25%',
                    height: 'auto',
                    marginBottom: '20px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: '15px',
                    animation: 'fadeIn 2s ease-in-out',
                }}
            />
            <p>
            Malta is a hidden gem in Europe, offering high-quality education, a vibrant multicultural atmosphere, and a safe, welcoming environment for international students. Known for its rich history, Mediterranean climate, and English-speaking courses, Malta provides a unique study abroad experience.
            </p>

            <h2>Why Choose Malta?</h2>
            <ul>
                <li><strong>•	High-Quality Education:   </strong> Maltese universities and institutions offer excellent programs, particularly in areas like business, tourism, and technology.</li>
                <li><strong>•	English-Taught Courses:   </strong> English is one of the official languages, making it an ideal destination for students from English-speaking countries or those looking to improve their English skills.</li>
                <li><strong>•	Affordable Living and Tuition:  </strong> Malta provides affordable tuition fees and low living costs compared to other European destinations.</li>
                <li><strong>•	Strategic Location:   </strong> Situated in the heart of the Mediterranean, Malta offers easy access to both Europe and North Africa.</li>
                <li><strong>•	Safe and Friendly Environment:   </strong> Malta is known for its safety and welcoming community, making it a great place for international students to live and study.</li>
            </ul>

            <p>
            Start your study adventure in Malta with PlanStudies – where academic excellence meets Mediterranean charm!
            </p>
            <Footer />
        </div>
    );
};

export default CanadaPage;
