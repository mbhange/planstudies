import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const CanadaPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <Navbar />
      <h1 className='country'>Study in CANADA</h1>
      <img
        src="https://rukminim2.flixcart.com/image/850/1000/jyhl1u80/flag/k/j/c/canada-canadian-flag-maple-leave-flag-futurekart-original-imafgznb54qffrgn.jpeg?q=90&crop=false"
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
      Canada is a top destination for international students, known for its high-quality education, diverse culture, and safe environment. With world-renowned universities and colleges offering a wide range of programs, studying in Canada opens doors to global opportunities.
      </p>

      <h2>Why Choose Canada?</h2>
      <ul>
        <li><strong>•	Globally Recognized Education: </strong> Canadian degrees are valued worldwide for their academic excellence.</li>
        <li><strong>•	Affordable Tuition and Living Costs: </strong> Competitive fees and a reasonable cost of living make Canada a cost-effective choice.</li>
        <li><strong>•	Work Opportunities: </strong> International students can work during and after studies, gaining valuable experience.</li>
        <li><strong>•	Pathway to Immigration: </strong> Many programs offer pathways to permanent residency.</li>
        <li><strong>•	Multicultural Environment: </strong> Experience a welcoming, inclusive society with vibrant cultural diversity.</li>
      </ul>

      <p>
      Begin your journey to study in Canada with PlanStudies – where your future starts today!
      </p>
      <Footer />
    </div>
  );
};

export default CanadaPage;
