import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const Uk = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in Singapore</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1200px-Flag_of_Singapore.svg.png"
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
            Singapore is a global educational hub, known for its world-class universities, cutting-edge research, and dynamic cultural environment. With a strong emphasis on innovation, technology, and a high standard of living, studying in Singapore provides students with access to top-tier education and exceptional career opportunities in Asia.
            </p>

            <h2>Why Choose Singapore?</h2>
            <ul>
                <li><strong>•	World-Class Education:     </strong>Italy is home to some of the most prestigious universities and institutions in the world, offering programs in art, engineering, business, medicine, architecture, and more.</li>
                <li><strong>•	Strategic Location: </strong>Studying in Italy offers a unique opportunity to immerse yourself in art, history, and culture, from ancient ruins to Renaissance masterpieces.</li>
                <li><strong>•	Multicultural Environment:       </strong>Many Italian universities offer degree programs in English, making it accessible for students from around the world.</li>
                <li><strong>•	Affordable Education:       </strong>Compared to other European countries, Italy provides an affordable education with lower tuition fees and cost of living, especially outside major cities like Rome and Milan.</li>
                <li><strong>•	Post-Study Work Opportunities:     </strong>Students in Italy can work part-time during their studies, and graduates can access post-study work opportunities in various fields.</li>
                
            </ul>

            <p>
            Start your study journey in Singapore with PlanStudies – your trusted partner for success in one of the world’s most vibrant cities!
            </p>
            <Footer />
        </div>
    );
};

export default Uk;
