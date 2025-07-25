import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const Uk = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in the UK</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
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
                The UK is a world-renowned destination for international education, offering prestigious universities, diverse programs, and a rich cultural heritage. Studying in the UK combines academic excellence with opportunities to experience one of the most vibrant and historically significant countries in the world.
            </p>

            <h2>Why Choose the UK?</h2>
            <ul>
                <li><strong>•	Globally Recognized Qualifications: </strong> UK degrees are highly respected by employers and institutions worldwide.</li>
                <li><strong>•	Shorter Duration of Programs:  </strong> Many undergraduate degrees are completed in 3 years, and master's programs in 1 year, saving time and money.</li>
                <li><strong>•	Rich Academic History:  </strong>Study at some of the oldest and most prestigious universities globally.</li>
                <li><strong>•	Post-Study Work Opportunities:  </strong> Benefit from the Graduate Route visa, allowing up to 2 years of work after graduation.</li>
                <li><strong>•	Multicultural Experience: </strong> The UK is home to a diverse and inclusive student community.</li>
            </ul>

            <p>
                Embark on your study journey in the UK with PlanStudies – your trusted partner for international education!
            </p>
            <Footer />
        </div>
    );
};

export default Uk;
