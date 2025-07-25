import React from "react";

const CourseBlocks = () => {
  const courses = [
    {
      name: "Student",
      description: "Prepare for IELTS and unlock global opportunities.",
      image: "https://images.pexels.com/photos/1699419/pexels-photo-1699419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with your image path
    },
    {
      name: "Recruitment Partners",
      description: "Master PTE with our expert guidance.",
      image: "/images/pte.jpg", // Replace with your image path
    },
    {
      name: "Partner Institutions",
      description: "Ace the Duolingo English Test effortlessly.",
      image: "/images/duolingo.jpg", // Replace with your image path
    },
    {
      name: "Student",
      description: "Prepare for IELTS and unlock global opportunities.",
      image: "https://images.pexels.com/photos/1699419/pexels-photo-1699419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with your image path
    },
    {
      name: "Recruitment Partners",
      description: "Master PTE with our expert guidance.",
      image: "/images/pte.jpg", // Replace with your image path
    },
    {
      name: "Partner Institutions",
      description: "Ace the Duolingo English Test effortlessly.",
      image: "/images/duolingo.jpg", // Replace with your image path
    },

  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-8">
      {courses.map((course, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          {/* Image Section */}
          <img
            src={course.image}
            alt={`${course.name} image`}
            className="w-full h-48 object-cover"
          />

          {/* Info Section */}
          <div className="p-6 text-center">
            <h3 className="text-2xl font-semibold text-blue-700">
              {course.name}
            </h3>
            <p className="text-gray-600 mt-2">{course.description}</p>

            {/* Button */}
            <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseBlocks;
