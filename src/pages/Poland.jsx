import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const Uk = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in Poland</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/800px-Flag_of_Poland.svg.png"
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
            Poland is becoming an increasingly popular destination for international students due to its high-quality education, affordable living costs, and vibrant cultural experience. Known for its rich history and modern academic institutions, Poland offers a unique opportunity to study in the heart of Europe.
            </p>

            <h2>Why Choose Poland?</h2>
            <ul>
                <li><strong>•	High-Quality Education:   </strong>Polish universities are known for their strong academic programs, particularly in engineering, medicine, and business.</li>
                <li><strong>•	Affordable Tuition and Living Costs:  </strong>Poland offers a cost-effective study experience, with low tuition fees and affordable living expenses compared to other European countries.</li>
                <li><strong>•	Cultural Heritage:     </strong>Enjoy a rich cultural experience with a blend of historical sites, modern cities, and diverse traditions.</li>
                <li><strong>•	Work Opportunities:       </strong>International students can work part-time during their studies and access post-study work opportunities to gain experience.</li>
                <li><strong>•	Central European Location:   </strong>Poland is centrally located in Europe, making it easy to travel and explore neighboring countries.</li>
                
            </ul>

            <p>
            Begin your journey to study in Poland with PlanStudies – your partner in achieving educational success in Europe!
            </p>
            <Footer />
        </div>
    );
};

export default Uk;
