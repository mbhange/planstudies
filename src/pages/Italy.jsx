import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const Uk = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in Italy</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Flag_of_Italy_%28Pantone%2C_2006%29.svg/220px-Flag_of_Italy_%28Pantone%2C_2006%29.svg.png"
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
            Italy is renowned for its rich cultural heritage, world-class universities, and high standard of education. A destination steeped in history, art, and innovation, Italy offers international students an opportunity to study in some of the world’s most prestigious institutions while experiencing a vibrant lifestyle and unique cultural experiences.
            </p>

            <h2>Why Choose Italy?</h2>
            <ul>
                <li><strong>•	World-Class Education:    </strong>Italy is home to some of the most prestigious universities and institutions in the world, offering programs in art, engineering, business, medicine, architecture, and more.</li>
                <li><strong>•	Rich Cultural Experience:     </strong>Studying in Italy offers a unique opportunity to immerse yourself in art, history, and culture, from ancient ruins to Renaissance masterpieces.</li>
                <li><strong>•	English-Taught Programs:     </strong>Many Italian universities offer degree programs in English, making it accessible for students from around the world.</li>
                <li><strong>•	Affordable Education:     </strong>Compared to other European countries, Italy provides an affordable education with lower tuition fees and cost of living, especially outside major cities like Rome and Milan.</li>
                <li><strong>•	Work Opportunities:     </strong>Students in Italy can work part-time during their studies, and graduates can access post-study work opportunities in various fields.</li>
                <li><strong>•	Central Location in Europe:     </strong>Italy’s strategic location provides easy access to the rest of Europe, making travel and exploration an exciting part of the student experience.</li>
            </ul>

            <p>
            Start your academic journey in Italy with PlanStudies – where education meets history, art, and innovation in one of the most beautiful countries in the world!
            </p>
            <Footer />
        </div>
    );
};

export default Uk;
