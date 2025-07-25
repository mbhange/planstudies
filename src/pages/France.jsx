import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const Uk = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in France</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/255px-Flag_of_France.svg.png"
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
            France is a global leader in education, culture, and innovation, making it a sought-after destination for international students. With prestigious institutions, affordable tuition, and a rich cultural experience, studying in France offers a unique blend of academic and personal growth.
            </p>

            <h2>Why Choose France?</h2>
            <ul>
                <li><strong>•	Renowned Education System:   </strong>France is home to some of the world’s best universities and business schools, known for excellence in various fields.</li>
                <li><strong>•	Affordable Tuition Fees:     </strong>Public institutions offer competitive tuition costs, with scholarships available for international students.</li>
                <li><strong>•	Diverse Programs:    </strong>Choose from a wide array of programs in English or French, catering to every academic interest.</li>
                <li><strong>•	Work and Career Opportunities:    </strong>Students can work part-time during studies and benefit from post-study work permits.</li>
                <li><strong>•	Cultural Experience:    </strong>Immerse yourself in France’s rich history, art, and gastronomy while studying in a multicultural environment.</li>
            </ul>

            <p>
            Take the first step towards studying in France with PlanStudies – where education meets elegance and opportunity!
            </p>
            <Footer />
        </div>
    );
};

export default Uk;
