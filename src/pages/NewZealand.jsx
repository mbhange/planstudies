import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const Uk = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in New Zealand</h1>
            <img
                src="https://files.ekmcdn.com/funkyleisurel/images/flag-of-new-zealand-6821-p.png"
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
                New Zealand is an emerging hub for international education, known for its high-quality academic standards, stunning natural landscapes, and welcoming culture. With a focus on innovation and research, studying in New Zealand opens doors to a world of opportunities.
            </p>

            <h2>Why Choose New Zealand?</h2>
            <ul>
                <li><strong>•	Globally Recognized Qualifications: </strong>Degrees from New Zealand institutions are respected worldwide.</li>
                <li><strong>•	Innovative Teaching Methods:   </strong> Focus on practical learning and real-world problem-solving.</li>
                <li><strong>•	Work While Studying:   </strong>Students can work part-time during their studies to gain experience and support living expenses.</li>
                <li><strong>•	Post-Study Work Opportunities:  </strong> Benefit from flexible post-study work visas to build your career.</li>
                <li><strong>•	Safe and Welcoming Environment:  </strong>Known for its friendly communities and low crime rates, New Zealand is a safe and inclusive destination.</li>
            </ul>

            <p>
                Begin your study journey in New Zealand with PlanStudies – your partner in achieving global success!
            </p>
            <Footer />
        </div>
    );
};

export default Uk;
