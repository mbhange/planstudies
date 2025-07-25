import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const Uk = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in Australia</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/255px-Flag_of_Australia_%28converted%29.svg.png"
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
                Australia is a leading destination for international students, offering a world-class education system, innovative teaching methods, and a multicultural environment. With globally ranked institutions and excellent post-study work opportunities, Australia is the perfect place to achieve academic and career success.
            </p>

            <h2>Why Choose Australia?</h2>
            <ul>
                <li><strong>•	Globally Recognized Education: </strong>Australian universities are known for academic excellence and innovation.</li>
                <li><strong>•	Diverse Programs:    </strong> Choose from a wide variety of courses and disciplines tailored to global career opportunities.</li>
                <li><strong>•	Work While Studying:   </strong>International students can work part-time to gain experience and support their living expenses.</li>
                <li><strong>•	Post-Study Work Opportunities:  </strong>Benefit from post-graduation work visas, enabling you to gain professional experience.</li>
                <li><strong>•	High Quality of Life:   </strong>Experience a safe, inclusive, and vibrant lifestyle in a culturally diverse country.</li>
            </ul>

            <p>
            Start your journey to study in Australia with PlanStudies – where opportunities meet excellence!
            </p>
            <Footer />
        </div>
    );
};

export default Uk;
