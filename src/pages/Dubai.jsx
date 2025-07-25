import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const Uk = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in Dubai</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1200px-Flag_of_the_United_Arab_Emirates.svg.png"
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
            Dubai is rapidly becoming a top destination for international students, offering a blend of world-class education, a vibrant multicultural environment, and cutting-edge infrastructure. Known for its global business hub status, luxurious lifestyle, and diverse academic offerings, Dubai presents an exciting opportunity for students seeking both quality education and personal growth.
            </p>

            <h2>Why Choose Dubai?</h2>
            <ul>
                <li><strong>•	World-Class Universities:    </strong>Italy is home to some of the most prestigious universities and institutions in the world, offering programs in art, engineering, business, medicine, architecture, and more.</li>
                <li><strong>•	Strategic Location:</strong>Studying in Italy offers a unique opportunity to immerse yourself in art, history, and culture, from ancient ruins to Renaissance masterpieces.</li>
                <li><strong>•	Innovative Education:     </strong>Many Italian universities offer degree programs in English, making it accessible for students from around the world.</li>
                <li><strong>•	Multicultural Environment:      </strong>Compared to other European countries, Italy provides an affordable education with lower tuition fees and cost of living, especially outside major cities like Rome and Milan.</li>
                <li><strong>•	Post-Study Work Opportunities:      </strong>Students in Italy can work part-time during their studies, and graduates can access post-study work opportunities in various fields.</li>
            </ul>

            <p>
            Take the first step towards studying in Dubai with PlanStudies – where opportunities meet innovation in one of the world’s most dynamic cities!
            </p>
            <Footer />
        </div>
    );
};

export default Uk;
