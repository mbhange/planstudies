import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const Uk = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in Finland</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/800px-Flag_of_Finland.svg.png"
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
            Finland is one of the leading destinations for higher education in Europe, known for its innovative teaching methods, high-quality universities, and exceptional student support systems. Renowned for its excellent educational system and vibrant, student-friendly atmosphere, Finland provides international students with a world-class education and a unique cultural experience.
            </p>

            <h2>Why Choose Finland?</h2>
            <ul>
                <li><strong>•	High-Quality Education:    </strong>Italy is home to some of the most prestigious universities and institutions in the world, offering programs in art, engineering, business, medicine, architecture, and more.</li>
                <li><strong>•	Innovative Learning Environment: </strong>Studying in Italy offers a unique opportunity to immerse yourself in art, history, and culture, from ancient ruins to Renaissance masterpieces.</li>
                <li><strong>•	English-Taught Programs:      </strong>Many Italian universities offer degree programs in English, making it accessible for students from around the world.</li>
                <li><strong>•	Affordability:       </strong>Compared to other European countries, Italy provides an affordable education with lower tuition fees and cost of living, especially outside major cities like Rome and Milan.</li>
                <li><strong>•	Safe and High-Quality Lifestyle:       </strong>Students in Italy can work part-time during their studies, and graduates can access post-study work opportunities in various fields.</li>
                <li><strong>•	Work Opportunities:      </strong>Students can work part-time during their studies, and Finland offers a post-study work visa that allows graduates to search for jobs in the country.</li>
            </ul>

            <p>
            Start your academic adventure in Finland with PlanStudies – where quality education, innovation, and personal growth come together in one of Europe’s most advanced countries!
            </p>
            <Footer />
        </div>
    );
};

export default Uk;
