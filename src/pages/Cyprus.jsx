import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const CanadaPage = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />
            <h1 className='country'>Study in Cyprus</h1>
            <img
                src="https://cdn.britannica.com/83/7883-050-0E5BCA30/Flag-Cyprus.jpg"
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
                Cyprus is an increasingly popular destination for international students, known for its rich history, Mediterranean climate, and diverse academic offerings. With affordable tuition fees, English-speaking programs, and a welcoming environment, Cyprus offers a unique blend of academic excellence and cultural experiences.
            </p>

            <h2>Why Choose Cyprus?</h2>
            <ul>
                <li><strong>•	World-Class Education:  </strong> Cyprus offers high-quality education, with universities and colleges recognized globally for their academic programs, particularly in business, law, and tourism.</li>
                <li><strong>•	English-Taught Programs:  </strong> Many programs are offered in English, making it an ideal destination for international students from English-speaking countries.</li>
                <li><strong>•	Affordable Tuition and Living Costs: </strong> Cyprus offers low tuition fees and a reasonable cost of living compared to other European countries.</li>
                <li><strong>•	Cultural and Historical Richness:  </strong> Explore ancient history, stunning beaches, and vibrant cities, all while experiencing the warmth of Mediterranean culture.</li>
                <li><strong>•	Safe and Friendly Environment:  </strong> Cyprus is known for being a safe, welcoming country for international students, with a low crime rate and a friendly, multicultural society.</li>
            </ul>

            <p>
                Embark on your study journey in Cyprus with PlanStudies – your trusted partner for a smooth and successful experience!
            </p>
            <Footer />
        </div>
    );
};

export default CanadaPage;
