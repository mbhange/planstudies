import React from 'react';
import "../styles/TopInstitutions.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TopInstitutions = () => {
    const institutions = [
        {
            name: "Harvard University",
            description: "Harvard University is one of the most prestigious institutions in the world, offering a wide array of undergraduate, graduate, and professional programs.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/800px-Harvard_University_coat_of_arms.svg.png"
        },
        {
            name: "Stanford University",
            description: "Stanford University is known for its cutting-edge research, excellent faculty, and vibrant campus life, especially in the fields of technology and innovation.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/800px-Seal_of_Leland_Stanford_Junior_University.svg.png"
        },
        {
            name: "University of Oxford",
            description: "The University of Oxford, in the UK, is renowned for its high academic standards and rich history, offering programs in a wide range of disciplines.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/1636px-Oxford-University-Circlet.svg.png"
        },
        {
            name: "MIT (Massachusetts Institute of Technology)",
            description: "MIT is a leader in the fields of science, engineering, and technology, consistently ranked among the top universities globally for innovation and research.",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/MIT_Seal.svg/1200px-MIT_Seal.svg.png"
        },
        {
            name: "University of Cambridge",
            description: "Cambridge University, located in the UK, is famous for its tradition of academic excellence and producing leaders in diverse fields.",
            logo: "https://neas.org.au/wp-content/uploads/2024/03/1.-CUP-A_Logo_Customer-brandmark_RGB_Stacked_Full-colour_Black.png"
        },
        {
            name: "University of California, Berkeley (UCB)",
            description: "UC Berkeley pushes the boundaries of knowledge, challenges convention and expands opportunity to create the leaders of tomorrow.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg"
        },
        {
            name: "University of Melbourne",
            description: "Australia's number one university and world leader in education, teaching and research. We offer a vast range of study courses and research programs.",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQGzmdOafRC9iy_Jk_msnyToMTo3ODw0alKw&s"
        },
        {
            name: "University of Toronto",
            description: "A collegiate system with seven colleges, each with its own history and traditions. It's considered one of the best universities in Canada. ",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/640px-Utoronto_coa.svg.png"
        },
        {
            name: "University of British Columbia",
            description: "The University of British Columbia is a global centre for research and teaching, consistently ranked among the top 20 public universities in the world.",
            logo: "https://ires.ubc.ca/files/2019/10/ubc-logo.png"
        },
        {
            name: "University of Windsor",
            description: "Securing the road ahead · Bridge builders · Timing revolution · Lancers Care week to provide a winter wellness experience.",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPIEzly7twe73T2gWz0HtX2tbVqIMICYMIQw&s"
        },
        {
            name: "Princeton University",
            description: "Through teaching and research, we educate people who will contribute to society and develop knowledge that will make a difference in the world.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/800px-Princeton_seal.svg.png"
        },
        {
            name: "Yale University",
            description: "Since 2018, this unique undergraduate seminar taught by Yale astrophysicist Meg Urry adds artistic dimension to scientific concepts of time and space.",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDSYdIimQlNltdnIgyKSgsHUXyWc3QvXGiWVUP2VfcnrV4y1a5OYOjmyTaRfohVzujbTE&usqp=CAU"
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="top-institutions-container">
                <h2 className="about">Top Institutions Abroad</h2>
                <div className="institutions-grid">
                    {institutions.map((institution, index) => (
                        <div key={index} className="institution-card">
                            <img
                                src={institution.logo}
                                alt={`${institution.name} logo`}
                                className="institution-logo"
                            />
                            <h3>{institution.name}</h3>
                            <p>{institution.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TopInstitutions;
