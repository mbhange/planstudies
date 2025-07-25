import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const CanadaPage = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in Ireland</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/640px-Flag_of_Ireland.svg.png"
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
            Ireland is a rapidly growing destination for international students, offering world-class education, a thriving economy, and a rich cultural heritage. Known as the "Land of Saints and Scholars," Ireland provides a perfect blend of academic excellence and vibrant student life.
            </p>

            <h2>Why Choose Ireland?</h2>
            <ul>
                <li><strong>•	Globally Recognized Education:    </strong> Ireland’s universities and colleges are renowned for their high academic standards and innovative research.</li>
                <li><strong>•	Diverse Program Options:    </strong> A wide variety of programs across disciplines, including STEM, business, arts, and humanities.</li>
                <li><strong>•	Post-Study Work Opportunities:  </strong> Ireland offers generous post-study work visas, enabling graduates to gain valuable experience.</li>
                <li><strong>•	Technology and Innovation Hub:   </strong> Ireland is home to global tech giants and leading industries, offering excellent career prospects.</li>
                <li><strong>•	Welcoming Environment:   </strong> Known for its friendly people and safe environment, Ireland is a welcoming choice for international students.</li>
            </ul>

            <p>
            Start your journey to study in Ireland with PlanStudies – where your dreams turn into reality!
            </p>
            <Footer />
        </div>
    );
};

export default CanadaPage;
