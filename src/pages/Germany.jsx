import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const Uk = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in Germany</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png"
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
                Germany is a top destination for international students, known for its world-class education, cutting-edge research, and vibrant cultural heritage. With numerous tuition-free or low-cost education options, Germany offers an unparalleled opportunity to achieve academic excellence in the heart of Europe.
            </p>

            <h2>Why Choose Germany?</h2>
            <ul>
                <li><strong>•	Tuition-Free Education:  </strong>Many public universities offer programs with no or minimal tuition fees.</li>
                <li><strong>•	World-Class Universities:    </strong>Germany is home to some of the best institutions globally, known for academic rigor and innovation.</li>
                <li><strong>•	Diverse Programs:    </strong>Choose from a wide range of programs, particularly in engineering, technology, and sciences.</li>
                <li><strong>•	Work Opportunities:   </strong>Students can work part-time during studies and enjoy post-study work visas for career building.</li>
                <li><strong>•	Cultural and Economic Hub:   </strong>Experience a rich cultural environment and access opportunities in Europe’s largest economy.</li>
            </ul>

            <p>
                Embark on your journey to study in Germany with PlanStudies – where ambition meets opportunity!
            </p>
            <Footer />
        </div>
    );
};

export default Uk;
