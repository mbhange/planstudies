import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/StudentDashboard.css";
import NavbarStudent from "../components/NavbarStudent";
import Footer from "../components/Footer";
import { ClipLoader } from "react-spinners";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


const currencySymbols = {
  "United States": "$",
  "Canada": "C$",
  "United Kingdom": "£",
  "Australia": "A$",
  "Germany": "€",
  "Italy": "€",
  "Malta": "€",
  "France": "€",
  "Finland": "€",
  "Netherlands": "€",
  "Poland": "€",
  "Ireland": "€",
  "New Zealand": "NZ$"
};

const getCurrencySymbol = (countryName) => {
  return currencySymbols[countryName] || "$";
};


const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCourses, setTotalCourses] = useState(0);
  const [flipped, setFlipped] = useState({});
  const [likedCourses, setLikedCourses] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [page, setPage] = useState(1);
  const resultsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [intake, setIntake] = useState("");
  const [program, setProgram] = useState("");
  const [programLevel, setProgramLevel] = useState("");
  const [exam, setExam] = useState("");
  const [language, setLanguage] = useState("");
  const [languageScore, setLanguageScore] = useState("");
  const [aptitudeTest, setAptitudeTest] = useState("");
  const [aptitudeScore, setAptitudeScore] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [examScore, setExamScore] = useState("");
  const [inputPage, setInputPage] = useState(page);


  // useEffect(() => {
  //   console.log(`🚀 Running useEffect for page: ${page}`);

  //   setLoading(true);

  //   axios
  //     .post("http://localhost:5000/api/odoo/courses", { page, resultsPerPage, })
  //     .then((response) => {
  //       console.log(`✅ Received data for page: ${response.data.currentPage}`);

  //       setCourses((prevCourses) =>
  //         page === 1 ? response.data.courses : [...prevCourses, ...response.data.courses]
  //       );
  //       setTotalPages(response.data.totalPages);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setError("Failed to fetch courses");
  //       setLoading(false);
  //     });

  // }, [page]); 

  // useEffect(() => {
  //   console.log("🚀 Fetching all courses...");

  //   setLoading(true);

  //   axios
  //     .post("http://localhost:5000/api/odoo/courses", { fetchAll: true })
  //     .then((response) => {
  //       if (response.data && Array.isArray(response.data.courses)) {
  //         setCourses(response.data.courses);
  //         setFilteredCourses(response.data.courses);
  //         setLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("❌ Error fetching courses:", error);
  //       setError("Failed to fetch courses");
  //       setLoading(false);
  //     });
  // }, []);

  // const fetchAllCourses = () => {
  //   axios
  //     .post("http://localhost:5000/api/odoo/courses", { fetchAll: true })
  //     .then((response) => {
  //       if (response.data && Array.isArray(response.data.courses)) {
  //         setCourses(response.data.courses); 
  //         setFilteredCourses(response.data.courses); 
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching courses:", error);
  //     });
  // };

  // useEffect(() => {
  //   fetchAllCourses(); // Fetch courses when component mounts
  // }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      console.log("🚀 Fetching all courses...");
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/api/odoo/courses", { fetchAll: true });
        if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
          setFilteredCourses(response.data.courses);
        }
      } catch (error) {
        console.error("❌ Error fetching courses:", error);
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, []);
  

  const handlePageChange = useCallback((newPage) => {
    setPage((prev) => {
      if (prev !== newPage) {
        console.log("🔄 Changing page to:", newPage);
        return newPage;
      }
      return prev;
    });
  }, []);

  // const totalPages = Math.ceil(totalCourses / resultsPerPage);

  const toggleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleLike = (course) => {
    setLikedCourses((prev) => {
      if (prev.some((c) => c.id === course.id)) {
        return prev.filter((c) => c.id !== course.id);
      } else {
        return [...prev, course];
      }
    });
  };

  const printCourses = () => {
    const likedCourses = document.querySelectorAll(".course-card");

    if (!likedCourses.length) {
      alert("No liked courses to print!");
      return;
    }

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
<html>
  <head>
    <title>Print Liked Courses</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 10px; padding: 10px; overflow: hidden; }
      .course-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 5px;
      }
      .course-card {
        width: 100%; /* Ensures each course takes full width */
        display: flex;
        justify-content: space-between;
        border: 1px solid #ddd;
        padding: 5px;
        box-sizing: border-box;
        page-break-inside: avoid; /* Prevents breaking inside cards */
      }
      .card-front, .card-back {
        width: 49%; /* Places front on left, back on right */
        padding: 5px;
        border: 1px solid #ccc;
        font-size: 12px; /* Slightly smaller font to fit everything */
        box-sizing: border-box;
      }
      img {
        max-width: 100%;
        max-height: 60px; /* Limits image height to fit content */
        display: block;
        margin: 5px auto;
      }
      /* Prevent extra blank pages */
      @media print {
        body { margin: 0; padding: 5px; }
        .course-container { 
          display: flex; 
          flex-wrap: wrap; 
          justify-content: space-between;
          max-height: 100vh; /* Ensures content stays within one page */
        }
        .course-card { 
          width: 100%; 
          display: flex; 
          justify-content: space-between;
          border: 1px solid #000;
          overflow: hidden; /* Prevents extra blank space */
        }
        .card-front, .card-back {
          width: 49%;
          page-break-inside: avoid;
          border: 1px solid #000;
          padding: 5px;
        }
        img {
          max-height: 50px;
        }
        /* Hide unwanted elements */
        .hide-on-print, .view-less-btn, .view-btn, .apply-btn, .like-btn, .cancel-icon {
        display: none !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="course-container">
`);


    likedCourses.forEach((course) => {
      const front = course.querySelector(".card-front");
      const back = course.querySelector(".card-back");

      if (front && back) {
        printWindow.document.write(`
            <div class="course-card">
              <div class="card-front">${front.innerHTML}</div>
              <div class="card-back">${back.innerHTML}</div>
            </div>
          `);
      }
    });

    printWindow.document.write(`
        </div>
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };


  const filterCourses = () => {
    let updatedCourses = courses;

    if (country) {
      updatedCourses = updatedCourses.filter(
        (course) => course.country_id?.[1] === country
      );
    }
    if (state) {
      updatedCourses = updatedCourses.filter(
        (course) => course.state_id?.[1] === state
      );
    }
    if (intake) {
      updatedCourses = updatedCourses.filter(
        (course) => (course.notes && typeof course.notes === "string" ? course.notes.includes(intake) : false)
      );
    }

    if (programLevel) {
      updatedCourses = updatedCourses.filter(
        (course) => course.program_level_id?.[1] === programLevel
      );
    }

    if (selectedExam && examScore) {
      updatedCourses = updatedCourses.filter((course) => {
        if (selectedExam === "Ielts") {
          return course.ielts_overall_score && parseFloat(course.ielts_overall_score) <= parseFloat(examScore);
        }
        if (selectedExam === "Pte") {
          return course.pte_overall_score && parseFloat(course.pte_overall_score) <= parseFloat(examScore);
        }
        if (selectedExam === "Duolingo") {
          return course.duolingo_overall_score && parseFloat(course.duolingo_overall_score) <= parseFloat(examScore);
        }
        if (selectedExam === "Toefl") {
          return course.toefl_overall_score && parseFloat(course.toefl_overall_score) <= parseFloat(examScore);
        }
        if (selectedExam === "Celpip") {
          return course.celpip_overall_score && parseFloat(course.celpip_overall_score) <= parseFloat(examScore);
        }
        if (selectedExam === "Cael") {
          return course.cael_overall_score && parseFloat(course.cael_overall_score) <= parseFloat(examScore);
        }
        return true;
      });
    }
    if (language && languageScore) {
      updatedCourses = updatedCourses.filter((course) => {
        if (language === "Gmat") {
          return course.gmat_overall_score && parseFloat(course.gmat_overall_score) <= parseFloat(languageScore);
        }
        if (language === "Gre") {
          return course.gre_overall_score && parseFloat(course.gre_overall_score) <= parseFloat(languageScore);
        }
        if (language === "Sat") {
          return course.sat_overall_score && parseFloat(course.sat_overall_score) <= parseFloat(languageScore);
        }
      })
    }
    if (aptitudeTest && aptitudeScore) {
      updatedCourses = updatedCourses.filter((course) => {
        if (language === "German") {
          return course.german_language_overall_score && parseFloat(course.german_language_overall_score) <= parseFloat(aptitudeScore);
        }
        if (language === "French") {
          return course.french_language_overall_score && parseFloat(course.french_language_overall_score) <= parseFloat(aptitudeScore);
        }
      })
    }

    setFilteredCourses(updatedCourses);
    setPage(1); // Reset to first page on new filter selection
  };

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);

    // Check if the selected country has states
    const hasStates = courses.some(course => course.country_id?.[1] === selectedCountry && course.state_id);

    if (!hasStates) {
      setState(""); // Reset state if the selected country has no states
    }
  };


  useEffect(() => {
    let updatedCourses = courses;

    // Apply filters
    if (country) {
      updatedCourses = updatedCourses.filter(course => course.country_id?.[1] === country);
    }

    if (state) {
      updatedCourses = updatedCourses.filter(course => course.state_id?.[1] === state);
    }
    if (intake) {
      updatedCourses = updatedCourses.filter(course =>
        course.notes && typeof course.notes === "string" ? course.notes.includes(intake) : false
      );
    }
    if (programLevel) {
      updatedCourses = updatedCourses.filter(course => course.program_level_id?.[1] === programLevel);
    }

    // Exam Score Filtering
    if (selectedExam && examScore) {
      updatedCourses = updatedCourses.filter((course) => {
        const scoreMap = {
          Ielts: "ielts_overall_score",
          Pte: "pte_overall_score",
          Duolingo: "duolingo_overall_score",
          Toefl: "toefl_overall_score",
          Celpip: "celpip_overall_score",
          Cael: "cael_overall_score",
        };
        return course[scoreMap[selectedExam]] && parseFloat(course[scoreMap[selectedExam]]) <= parseFloat(examScore);
      });
    }

    // Language Score Filtering
    if (language && languageScore) {
      updatedCourses = updatedCourses.filter((course) => {
        const languageMap = {
          Gmat: "gmat_overall_score",
          Gre: "gre_overall_score",
          Sat: "sat_overall_score",
        };
        return course[languageMap[language]] && parseFloat(course[languageMap[language]]) <= parseFloat(languageScore);
      });
    }

    // Aptitude Test Filtering
    if (aptitudeTest && aptitudeScore) {
      updatedCourses = updatedCourses.filter((course) => {
        const aptitudeMap = {
          German: "german_language_overall_score",
          French: "french_language_overall_score",
        };
        return course[aptitudeMap[aptitudeTest]] && parseFloat(course[aptitudeMap[aptitudeTest]]) <= parseFloat(aptitudeScore);
      });
    }

    // Search Filter
    if (searchTerm) {
      updatedCourses = updatedCourses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.institute_id?.[1] && course.institute_id[1].toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredCourses(updatedCourses);

    // ✅ Reset page only when filters change, but NOT when paginating
    if (
      searchTerm || country || state || intake || programLevel || selectedExam || examScore ||
      language || languageScore || aptitudeTest || aptitudeScore
    ) {
      setPage(1);
    }

  }, [searchTerm, country, state, intake, programLevel, selectedExam, examScore, language, languageScore, aptitudeTest, aptitudeScore, courses]);

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader size={40} color={"#007bff"} loading={loading} />
        <p>Loading courses...</p>
      </div>
    );
  }

  if (error) return <div className="error">{error}</div>;

  const uniqueValues = (key) =>
    [...new Set(courses.map((course) => course[key]?.[1]).filter(Boolean))];
  // const uniqueValues = (key) => {
  //   return [...new Set(courses.map(course => course[key]?.[1]).filter(Boolean))];
  // };


  // Pagination logic
  const startIndex = (page - 1) * resultsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + resultsPerPage);
  // const totalPages = Math.ceil(filteredCourses.length / resultsPerPage);

  return (
    <div className="justify">
      {/* <NavbarStudent /> */}
      <div className="courses-container">
        {/* <h2 className="titled">Find Your Course</h2> */}
        <div className="search-container">
          <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
            <FaShoppingCart size={24} /> {showCart ? "Back" : `Cart (${likedCourses.length})`}
          </button>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search courses or universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <div className="content">

          <div className="filter-sidebar">
            <h3 className="Filterr">Filters</h3>

            <label>Country</label>
            <select onChange={(e) => handleCountryChange(e.target.value)}>
              <option value="">Select Country</option>
              {uniqueValues("country_id").map((c, index) => (
                <option key={index} value={c}>{c}</option>
              ))}
            </select>

            <label>State</label>
            <select onChange={(e) => setState(e.target.value)} disabled={!country}>
              <option value="">Select State</option>
              {courses
                .filter((course) => course.country_id?.[1] === country)
                .map((course) => course.state_id?.[1])
                .filter(Boolean)
                .filter((state, index, self) => self.indexOf(state) === index)
                .map((s, index) => (
                  <option key={index} value={s}>{s}</option>
                ))}
            </select>

            <label>Intake</label>
            <select onChange={(e) => setIntake(e.target.value)}>
              <option value="">Select Intake</option>
              <option value="Spring">Spring</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
            </select>

            <label>Program Level</label>
            <select onChange={(e) => setProgramLevel(e.target.value)}>
              <option value="">Select Program Level</option>
              {uniqueValues("program_level_id").map((level, index) => (
                <option key={index} value={level}>{level}</option>
              ))}
            </select>

            <label>English Proficiency Exam</label>
            <select onChange={(e) => setSelectedExam(e.target.value)} value={selectedExam}>
              <option value="">Select Exam</option>
              <option value="Ielts">IELTS</option>
              <option value="Pte">PTE</option>
              <option value="Duolingo">DUOLINGO</option>
              <option value="Toefl">TOEFL</option>
              <option value="Celpip">CELPIP</option>
              <option value="Cael">CAEL</option>
            </select>

            {selectedExam && (
              <div>
                <label>Enter {selectedExam} Score</label>
                <input
                  type="number"
                  placeholder={`${selectedExam} Overall`}
                  value={examScore}
                  onChange={(e) => setExamScore(e.target.value)}
                />
              </div>
            )}

            <label>Aptitude Exam</label>
            <select onChange={(e) => setLanguage(e.target.value)} value={language}>
              <option value="">Select Exam</option>
              <option value="Gmat">GMAT</option>
              <option value="Gre">GRE</option>
              <option value="Sat">SAT</option>
            </select>

            {language && (
              <div>
                <label>Enter {language} Score</label>
                <input
                  type="number"
                  placeholder={`${language} Overall`}
                  value={languageScore}
                  onChange={(e) => setLanguageScore(e.target.value)}
                />
              </div>
            )}

            <label>Language Proficiency Exam</label>
            <select onChange={(e) => setAptitudeTest(e.target.value)} value={aptitudeTest}>
              <option value="">Select Exam</option>
              <option value="German">German</option>
              <option value="French">French</option>
            </select>

            {aptitudeTest && (
              <div>
                <label>Enter {aptitudeTest} Score</label>
                <input
                  type="number"
                  placeholder={`${aptitudeTest} Overall`}
                  value={aptitudeScore}
                  onChange={(e) => setAptitudeScore(e.target.value)}
                />
              </div>
            )}

            <button className="reset-btn" onClick={() => {
              setCountry("");
              setState("");
              setIntake("");
              setProgramLevel("");
              setSelectedExam("");
              setExamScore("");
              setLanguage("");
              setLanguageScore("");
              setAptitudeTest("");
              setAptitudeScore("");
              setFilteredCourses(courses);
              setPage(1);
            }}>Reset Filters</button>
          </div>


          {showCart ? (
            <div className="cart">
              <button onClick={printCourses} className="print-btn">Print</button>
              <h2 className="liked">Liked Courses</h2>
              <div className="cart-items-grid">
                {likedCourses.length > 0 ? (
                  likedCourses.map((course, index) => (
                    <motion.div
                      key={index}
                      className={`course-card ${flipped[index] ? "flipped" : ""}`}>
                      <div className="card-inner ">
                        <div className="card-front selected-course" id="likedCoursesContainer">
                          <button className="like-btn" onClick={() => toggleLike(course)}>
                            <FaHeart className="heart" color={likedCourses.some((c) => c.id === course.id) ? "red" : "white"} />
                          </button>
                          <button className="box" onClick={() => toggleLike(course)}>
                            <span className="cancel-icon">✖</span>
                          </button>
                          <h3>{course.institute_id?.[1] || "Unknown Institute"}</h3>
                          <div className="course-details-container">
                            <div className="course-details">
                              <p><strong>Course:</strong> {course.name}</p>
                              <p><strong>Program Level:</strong> {course.program_level_id?.[1] || "N/A"}</p>
                              <div className="details-with-line">
                                <div className="details-left">
                                  <p><strong>Country:</strong> {course.country_id?.[1] || "N/A"}</p>
                                  <p><strong>State:</strong> {course.state_id?.[1] || "N/A"}</p>
                                  <p><strong>Duration:</strong> {course.year} year</p>
                                  <p><strong>Semesters:</strong> {course.semester}</p>
                                  <p><strong>Months:</strong> {course.month}</p>
                                  <p>
                                    <strong>Fees:</strong>
                                    {course.total_tuition_fees_amount
                                      ? ` ${getCurrencySymbol(course.country_id?.[1])}${course.total_tuition_fees_amount}`
                                      : "N/A"}
                                  </p>
                                  <p>
                                    <strong>Application Fees:</strong>
                                    {course.application_fees
                                      ? ` ${getCurrencySymbol(course.country_id?.[1])}${course.application_fees}`
                                      : "N/A"}
                                  </p>
                                </div>

                                <div className="vertical-line"></div>

                                <div className="details-right">
                                  <p style={{ color: "green" }}>{course.program_type || "N/A"}</p>
                                  <p style={{ color: "green" }}>{course.program_delivery_mode || "N/A"}</p>
                                  <p>
                                    <strong>Scholarship:</strong>
                                    {course.application_fees
                                      ? ` ${getCurrencySymbol(course.country_id?.[1])}${course.scholarship}`
                                      : "N/A"}
                                  </p>
                                  <p><strong>Percentage:</strong> {course.percentage_score || "N/A"}</p>
                                  <p><strong>CGPA:</strong> {course.cgpa_score || "N/A"}</p>
                                  <p><strong>Max Backlogs:</strong> {course.number_of_backlogs_accepted || "0"}</p>
                                  <p><strong>Education Gap Allowed:</strong> {course.education_gap_allowed || "0"}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p><strong>Deadline:</strong> {course.submission_deadline || "N/A"}</p>
                          <div className="button-container">
                            <a href={course.program_url} className="apply-btn">View Course</a>
                            <button className="view-btn" onClick={() => toggleFlip(index)}>View More</button>
                          </div>
                        </div>

                        <div className="card-back">
                          <div className="details-with-line">
                            <div className="course-details">
                              <div className="details-with-line">

                                <div className="details-left">
                                  <div style={{ marginBottom: "9px" }}>
                                    <p><strong>IELTS Overall:</strong> {course.ielts_overall_score || "0"}</p>
                                    <p>
                                      <strong>L-</strong>{course.ielts_listening || "0"}, <strong>R-</strong>{course.ielts_reading || "0"}, <strong>W-</strong>{course.ielts_writing || "0"}, <strong>S-</strong>{course.ielts_speaking || "0"}
                                    </p>
                                  </div>
                                  <div style={{ marginBottom: "9px" }}>
                                    <p><strong>TOEFL Overall:</strong> {course.toefl_overall_score || "0"}</p>
                                    <p>
                                      <strong>L-</strong>{course.toefl_listening || "0"}, <strong>R-</strong>{course.toefl_reading || "0"}, <strong>W-</strong>{course.toefl_writing || "0"}, <strong>S-</strong>{course.toefl_speaking || "0"}
                                    </p>
                                  </div>
                                  <div style={{ marginBottom: "9px" }}>
                                    <p><strong>PTE Overall:</strong> {course.pte_overall_score || "0"}</p>
                                    <p>
                                      <strong>L-</strong>{course.pte_listening || "0"}, <strong>R-</strong>{course.pte_reading || "0"}, <strong>W-</strong>{course.pte_writing || "0"}, <strong>S-</strong>{course.pte_speaking || "0"}
                                    </p>
                                  </div>
                                  <div style={{ marginBottom: "9px" }}>
                                    <p><strong>German Overall:</strong> {course.german_language_overall_score || "0"}</p>
                                    <p>
                                      <strong>L-</strong>{course.german_language_listening || "0"}, <strong>R-</strong>{course.german_language_reading || "0"}, <strong>W-</strong>{course.german_language_writing || "0"}, <strong>S-</strong>{course.german_language_speaking || "0"}
                                    </p>
                                  </div>
                                  <div style={{ marginBottom: "9px" }}>
                                    <p><strong>French Overall:</strong> {course.french_language_overall_score || "0"}</p>
                                    <p>
                                      <strong>L-</strong>{course.french_language_listening || "0"}, <strong>R-</strong>{course.french_language_reading || "0"}, <strong>W-</strong>{course.french_language_writing || "0"}, <strong>S-</strong>{course.french_language_speaking || "0"}
                                    </p>
                                  </div>
                                  <div style={{ marginBottom: "9px" }}>
                                    <p><strong>CAEL Overall:</strong> {course.cael_overall_score || "0"}</p>
                                    <p>
                                      <strong>L-</strong>{course.cael_listening || "0"}, <strong>R-</strong>{course.cael_reading || "0"}, <strong>W-</strong>{course.cael_writing || "0"}, <strong>S-</strong>{course.cael_speaking || "0"}
                                    </p>
                                  </div>
                                  <div style={{ marginBottom: "9px" }}>
                                    <p><strong>CELPIP Overall:</strong> {course.celpip_overall_score || "0"}</p>
                                    <p>
                                      <strong>L-</strong>{course.celpip_listening || "0"}, <strong>R-</strong>{course.celpip_reading || "0"}, <strong>W-</strong>{course.celpip_writing || "0"}, <strong>S-</strong>{course.celpip_speaking || "0"}
                                    </p>
                                  </div>
                                  <div className="duolingo-container">
                                    <p style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                      <strong>SAT Overall:</strong>
                                      <span>{course.sat_overall_score || "0"}</span>
                                    </p>
                                    <div className="duolingo-score">
                                      <p>Reading & Writing: <span>{course.sat_reading_and_writing || "0"}</span></p>
                                      <p>Maths: <span>{course.sat_math || "0"}</span></p>
                                    </div>
                                  </div>
                                </div>

                                <div className="vertical-line"></div>

                                <div className="details-right">
                                  <div className="duolingo-container" style={{ marginBottom: "9px" }}>
                                    <p style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                      <strong>DUOLINGO Overall:</strong>
                                      <span>{course.duolingo_overall_score || "0"}</span>
                                    </p>
                                    <div className="duolingo-score">
                                      <p>Literacy: <span>{course.duolingo_literacy || "0"}</span></p>
                                      <p>Comprehension: <span>{course.duolingo_comprehension || "0"}</span></p>
                                      <p>Conversation: <span>{course.duolingo_conversation || "0"}</span></p>
                                      <p>Production: <span>{course.duolingo_production || "0"}</span></p>
                                    </div>
                                  </div>
                                  <div className="duolingo-container" style={{ marginBottom: "9px" }}>
                                    <p style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                      <strong>GMAT Overall:</strong>
                                      <span>{course.gmat_overall_score || "0"}</span>
                                    </p>
                                    <div className="duolingo-score">
                                      <p>Writing: <span>{course.gmat_analytical_writing || "0"}</span></p>
                                      <p>Integrated reasoning: <span>{course.gmat_integrated_reasoning || "0"}</span></p>
                                      <p>Quantitative reasoning: <span>{course.gmat_quantitative_reasoning || "0"}</span></p>
                                      <p>Verbal reasoning: <span>{course.gmat_verbal_reasoning || "0"}</span></p>
                                    </div>
                                  </div>
                                  <div className="duolingo-container">
                                    <p style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                      <strong>GRE Overall:</strong>
                                      <span>{course.gre_overall_score || "0"}</span>
                                    </p>
                                    <div className="duolingo-score">
                                      <p>Writing: <span>{course.gre_analytical_writing || "0"}</span></p>
                                      <p>Quantitative reasoning: <span>{course.gre_quantitative_reasoning || "0"}</span></p>
                                      <p>Verbal reasoning: <span>{course.gre_verbal_reasoning || "0"}</span></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button className="view-less-btn" onClick={() => toggleFlip(index)}>Go Back</button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p>No liked courses.</p>
                )}
              </div>
            </div>
          ) : (

            <div className="courses-grid">
              {paginatedCourses.length > 0 ? (
                paginatedCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    className={`course-card ${flipped[index] ? "flipped" : ""}`}>
                    <div className="card-inner">
                      <div className="card-front">
                        <button className="like-btn" onClick={() => toggleLike(course)}>
                          <FaHeart color={likedCourses.some((c) => c.id === course.id) ? "red" : "skyblue"} /></button>
                        <h3>{course.institute_id?.[1] || "Unknown Institute"}</h3>
                        <div className="course-details-container">
                          <div className="course-details">
                            <p><strong>Course:</strong> {course.name}</p>
                            <p><strong>Program Level:</strong> {course.program_level_id?.[1] || "N/A"}</p>
                            <div className="details-with-line">
                              <div className="details-left">
                                <p><strong>Country:</strong> {course.country_id?.[1] || "N/A"}</p>
                                <p><strong>State:</strong> {course.state_id?.[1] || "N/A"}</p>
                                <p><strong>Duration:</strong> {course.year} year</p>
                                <p><strong>Semesters:</strong> {course.semester}</p>
                                <p><strong>Months:</strong> {course.month}</p>
                                {/* <p><strong>City:</strong> {course.city_id?.[1] || "N/A"}</p> */}
                                <p>
                                  <strong>Fees:</strong>
                                  {course.total_tuition_fees_amount
                                    ? ` ${getCurrencySymbol(course.country_id?.[1])}${course.total_tuition_fees_amount}`
                                    : "N/A"}
                                </p>
                                <p>
                                  <strong>Application Fees:</strong>
                                  {course.application_fees
                                    ? ` ${getCurrencySymbol(course.country_id?.[1])}${course.application_fees}`
                                    : "N/A"}
                                </p>
                              </div>

                              <div className="vertical-line"></div>

                              <div className="details-right">
                                <p style={{ color: "green" }}>{course.program_type || "N/A"}</p>
                                <p style={{ color: "green" }}>{course.program_delivery_mode || "N/A"}</p>
                                <p>
                                  <strong>Scholarship:</strong>
                                  {course.application_fees
                                    ? ` ${getCurrencySymbol(course.country_id?.[1])}${course.scholarship}`
                                    : "N/A"}
                                </p>
                                <p><strong>Percentage:</strong> {course.percentage_score || "N/A"}</p>
                                <p><strong>CGPA:</strong> {course.cgpa_score || "N/A"}</p>
                                <p><strong>Max Backlogs:</strong> {course.number_of_backlogs_accepted || "0"}</p>
                                <p><strong>Education Gap Allowed:</strong> {course.education_gap_allowed || "0"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div> */}
                        <p><strong>Deadline:</strong> {course.submission_deadline || "N/A"}</p>
                        {/* </div> */}
                        <div className="button-container">
                          <a href={course.program_url} className="apply-btn">View Course</a>
                          <button className="view-btn" onClick={() => toggleFlip(index)}>View More</button>
                        </div>
                      </div>

                      <div className="card-back">
                        <div className="details-with-line">
                          <div className="course-details">
                            <div className="details-with-line">

                              <div className="details-left">
                                <div style={{ marginBottom: "9px" }}>
                                  <p><strong>IELTS Overall:</strong> {course.ielts_overall_score || "0"}</p>
                                  <p>
                                    <strong>L-</strong>{course.ielts_listening || "0"}, <strong>R-</strong>{course.ielts_reading || "0"}, <strong>W-</strong>{course.ielts_writing || "0"}, <strong>S-</strong>{course.ielts_speaking || "0"}
                                  </p>
                                </div>
                                <div style={{ marginBottom: "9px" }}>
                                  <p><strong>TOEFL Overall:</strong> {course.toefl_overall_score || "0"}</p>
                                  <p>
                                    <strong>L-</strong>{course.toefl_listening || "0"}, <strong>R-</strong>{course.toefl_reading || "0"}, <strong>W-</strong>{course.toefl_writing || "0"}, <strong>S-</strong>{course.toefl_speaking || "0"}
                                  </p>
                                </div>
                                <div style={{ marginBottom: "9px" }}>
                                  <p><strong>PTE Overall:</strong> {course.pte_overall_score || "0"}</p>
                                  <p>
                                    <strong>L-</strong>{course.pte_listening || "0"}, <strong>R-</strong>{course.pte_reading || "0"}, <strong>W-</strong>{course.pte_writing || "0"}, <strong>S-</strong>{course.pte_speaking || "0"}
                                  </p>
                                </div>
                                <div style={{ marginBottom: "9px" }}>
                                  <p><strong>German Overall:</strong> {course.german_language_overall_score || "0"}</p>
                                  <p>
                                    <strong>L-</strong>{course.german_language_listening || "0"}, <strong>R-</strong>{course.german_language_reading || "0"}, <strong>W-</strong>{course.german_language_writing || "0"}, <strong>S-</strong>{course.german_language_speaking || "0"}
                                  </p>
                                </div>
                                <div style={{ marginBottom: "9px" }}>
                                  <p><strong>French Overall:</strong> {course.french_language_overall_score || "0"}</p>
                                  <p>
                                    <strong>L-</strong>{course.french_language_listening || "0"}, <strong>R-</strong>{course.french_language_reading || "0"}, <strong>W-</strong>{course.french_language_writing || "0"}, <strong>S-</strong>{course.french_language_speaking || "0"}
                                  </p>
                                </div>
                                <div style={{ marginBottom: "9px" }}>
                                  <p><strong>CAEL Overall:</strong> {course.cael_overall_score || "0"}</p>
                                  <p>
                                    <strong>L-</strong>{course.cael_listening || "0"}, <strong>R-</strong>{course.cael_reading || "0"}, <strong>W-</strong>{course.cael_writing || "0"}, <strong>S-</strong>{course.cael_speaking || "0"}
                                  </p>
                                </div>
                                <div style={{ marginBottom: "9px" }}>
                                  <p><strong>CELPIP Overall:</strong> {course.celpip_overall_score || "0"}</p>
                                  <p>
                                    <strong>L-</strong>{course.celpip_listening || "0"}, <strong>R-</strong>{course.celpip_reading || "0"}, <strong>W-</strong>{course.celpip_writing || "0"}, <strong>S-</strong>{course.celpip_speaking || "0"}
                                  </p>
                                </div>
                                <div className="duolingo-container" style={{ marginBottom: "9px" }}>
                                  <p style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <strong>SAT Overall:</strong>
                                    <span>{course.sat_overall_score || "0"}</span>
                                  </p>
                                  <div className="duolingo-score">
                                    <p>Reading and Writing: <span>{course.sat_reading_and_writing || "0"}</span></p>
                                    <p>Maths: <span>{course.sat_math || "0"}</span></p>
                                  </div>
                                </div>
                              </div>

                              <div className="vertical-line"></div>

                              <div className="details-right">
                                <div className="duolingo-container" style={{ marginBottom: "9px" }}>
                                  <p style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <strong>DUOLINGO Overall:</strong>
                                    <span>{course.duolingo_overall_score || "0"}</span>
                                  </p>
                                  <div className="duolingo-score">
                                    <p>Literacy: <span>{course.duolingo_literacy || "0"}</span></p>
                                    <p>Comprehension: <span>{course.duolingo_comprehension || "0"}</span></p>
                                    <p>Conversation: <span>{course.duolingo_conversation || "0"}</span></p>
                                    <p>Production: <span>{course.duolingo_production || "0"}</span></p>
                                  </div>
                                </div>
                                <div className="duolingo-container" style={{ marginBottom: "9px" }}>
                                  <p style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <strong>GMAT Overall:</strong>
                                    <span>{course.gmat_overall_score || "0"}</span>
                                  </p>
                                  <div className="duolingo-score">
                                    <p>Writing: <span>{course.gmat_analytical_writing || "0"}</span></p>
                                    <p>Integrated reasoning: <span>{course.gmat_integrated_reasoning || "0"}</span></p>
                                    <p>Quantitative reasoning: <span>{course.gmat_quantitative_reasoning || "0"}</span></p>
                                    <p>Verbal reasoning: <span>{course.gmat_verbal_reasoning || "0"}</span></p>
                                  </div>
                                </div>
                                <div className="duolingo-container" style={{ marginBottom: "9px" }}>
                                  <p style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <strong>GRE Overall:</strong>
                                    <span>{course.gre_overall_score || "0"}</span>
                                  </p>
                                  <div className="duolingo-score">
                                    <p>Writing: <span>{course.gre_analytical_writing || "0"}</span></p>
                                    <p>Quantitative reasoning: <span>{course.gre_quantitative_reasoning || "0"}</span></p>
                                    <p>Verbal reasoning: <span>{course.gre_verbal_reasoning || "0"}</span></p>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                        <button className="view-less-btn" onClick={() => toggleFlip(index)}>Go Back</button>
                      </div>

                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="no-results">No courses found. Try different filters.</div>
              )}
            </div>
          )}
        </div>

        <div className="pagination flex flex-wrap justify-center items-center gap-2 p-4">
          <div className="go-to-page mt-4 flex items-center gap-2">
            <label htmlFor="goToPage">Go to page:</label>
            <input
              id="goToPage"
              type="number"
              min={1}
              max={totalPages}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              className="border px-2 py-1 w-20 rounded"
            />
            <button
              onClick={() => {
                const p = Number(inputPage);
                if (p >= 1 && p <= totalPages) handlePageChange(p);
              }}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Go
            </button>
          </div>

          <button
            onClick={() => handlePageChange(1)}
            // onClick={() => handlePageChange(1)}
            disabled={page === 1}
            className="pagination-btn first"
          >
            ⏮ First
          </button>

          <button
            onClick={() => handlePageChange((prev) => Math.max(prev - 1, 1))}
            // onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="pagination-btn prev"
          >
            ◀ Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) =>
              p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2)
            )
            .map((p, index, arr) => (
              <React.Fragment key={p}>
                {index > 0 && p !== arr[index - 1] + 1 ? (
                  <span className="ellipsis">...</span>
                ) : null}
                <button
                  className={`pagination-btn number ${p === page ? "active bg-blue-500 text-white" : ""
                    } px-3 py-1 rounded-md transition hover:bg-gray-300`}
                  // onClick={() => setPage(p)}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </button>
              </React.Fragment>
            ))}

          <button
            onClick={() => handlePageChange((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={page >= totalPages}
            className="pagination-btn next"
          >
            Next ▶
          </button>

          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={page === totalPages}
            className="pagination-btn last"
          >
            Last ⏭
          </button>
        </div>
      </div>

      {/* <Footer /> */}
    </div>

  );
};
export default StudentDashboard;
