import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Countries.css";

const UsPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <Navbar />
      <h1 className='country'>Study in the USA</h1>
      <img
        src="https://images.pexels.com/photos/4386429/pexels-photo-4386429.jpeg?auto=compress&cs=tinysrgb&w=600"
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
        The USA is a global leader in education, offering unparalleled opportunities for academic and professional growth.
        Home to world-class universities and a diverse cultural landscape, studying in the USA is a gateway to success in a
        variety of fields.
      </p>

      <h2>Why Choose the USA?</h2>
      <ul>
        <li><strong>•	Top-Ranked Institutions: </strong> The USA hosts some of the world’s best universities and colleges known for innovation and academic excellence.</li>
        <li><strong>•	Wide Range of Programs: </strong> Choose from diverse programs and disciplines tailored to your career goals.</li>
        <li><strong>•	Research and Innovation: </strong> Access cutting-edge facilities and opportunities for groundbreaking research.</li>
        <li><strong>•	Work Opportunities: </strong> Part-time work options for students and post-graduation work opportunities under OPT and CPT programs.</li>
        <li><strong>•	Cultural Diversity: </strong> Experience a vibrant, multicultural environment that fosters personal and academic growth.</li>
      </ul>

      <p>
        Start your journey to study in the USA with PlanStudies – your partner in achieving global success!
      </p>
      <Footer />
    </div>
  );
};

export default UsPage;
