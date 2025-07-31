import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";

const currencySymbols = {
  "United States": "$",
  Canada: "C$",
  "United Kingdom": "£",
  Australia: "A$",
  Germany: "€",
  Italy: "€",
  Malta: "€",
  France: "€",
  Finland: "€",
  Netherlands: "€",
  Poland: "€",
  Ireland: "€",
  "New Zealand": "NZ$",
};

const getCurrencySymbol = (countryName) => {
  return currencySymbols[countryName] || "$";
};

const OdooCoursesNew = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flipped, setFlipped] = useState({});
  const [likedCourses, setLikedCourses] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [intake, setIntake] = useState("");
  const [programLevel, setProgramLevel] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [examScore, setExamScore] = useState("");
  const [language, setLanguage] = useState("");
  const [languageScore, setLanguageScore] = useState("");
  const [aptitudeTest, setAptitudeTest] = useState("");
  const [aptitudeScore, setAptitudeScore] = useState("");
  const [inputPage, setInputPage] = useState(page);

  useEffect(() = {
    const fetchCourses = async () = {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/odoo/courses",
          { fetchAll: true }
        );
        if (response.data  Array.isArray(response.data.courses)) {
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

  const handlePageChange = useCallback((newPage) = {
    setPage((prev) = {
      if (prev !== newPage) {
        return newPage;
      }
      return prev;
    });
  }, []);

  const toggleFlip = (index) = {
    setFlipped((prev) = ({ ...prev, [index]: !prev[index] }));
  };

  const toggleLike = (course) = {
    setLikedCourses((prev) = {
      if (prev.some((c) = c.id === course.id)) {
        return prev.filter((c) = c.id !== course.id);
      } else {
        return [...prev, course];
      }
    });
  };

  const printCourses = () = {
    const likedCoursesNodes = document.querySelectorAll(".course-card");

    if (!likedCoursesNodes.length) {
      alert("No liked courses to print!");
      return;
    }

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      htm
        head
          titlePrint Liked Courses/title
          style
            body { font-family: Arial, sans-serif; margin: 10px; padding: 10px; overflow: hidden; }
            .course-container { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 5px; }
            .course-card { width: 100%; display: flex; justify-content: space-between; border: 1px solid #ddd; padding: 5px; box-sizing: border-box; page-break-inside: avoid; }
            .card-front, .card-back { width: 49%; padding: 5px; border: 1px solid #ccc; font-size: 12px; box-sizing: border-box; }
            img { max-width: 100%; max-height: 60px; display: block; margin: 5px auto; }
            @media print {
              body { margin: 0; padding: 5px; }
              .course-container { display: flex; flex-wrap: wrap; justify-content: space-between; max-height: 100vh; }
              .course-card { width: 100%; display: flex; justify-content: space-between; border: 1px solid #000; overflow: hidden; }
              .card-front, .card-back { width: 49%; page-break-inside: avoid; border: 1px solid #000; padding: 5px; }
              img { max-height: 50px; }
              .hide-on-print, .view-less-btn, .view-btn, .apply-btn, .like-btn, .cancel-icon { display: none !important; }
            }
          /style
        /head
        body
          div class="course-container"
    `);

    likedCoursesNodes.forEach((course) = {
      const front = course.querySelector(".card-front");
      const back = course.querySelector(".card-back");

      if (front  back) {
        printWindow.document.write(`
            div class="course-card"
              div class="card-front"${front.innerHTML}/div
              div class="card-back"${back.innerHTML}/div
            /div
          `);
      }
    });

    printWindow.document.write(`
          /div
        /body
      /html
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() = {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  useEffect(() = {
    let updatedCourses = courses;

    if (country) {
      updatedCourses = updatedCourses.filter(
        (course) = course.country_id?.[1] === country
      );
    }
    if (state) {
      updatedCourses = updatedCourses.filter(
        (course) = course.state_id?.[1] === state
      );
    }
    if (intake) {
      updatedCourses = updatedCourses.filter((course) =
        course.notes  typeof course.notes === "string"
          ? course.notes.includes(intake)
          : false
      );
    }
    if (programLevel) {
      updatedCourses = updatedCourses.filter(
        (course) = course.program_level_id?.[1] === programLevel
      );
    }
    if (selectedExam  examScore) {
      updatedCourses = updatedCourses.filter((course) = {
        const scoreMap = {
          Ielts: "ielts_overall_score",
          Pte: "pte_overall_score",
          Duolingo: "duolingo_overall_score",
          Toefl: "toefl_overall_score",
          Celpip: "celpip_overall_score",
          Cael: "cael_overall_score",
        };
        return (
          course[scoreMap[selectedExam]] 
          parseFloat(course[scoreMap[selectedExam]]) = parseFloat(examScore)
        );
      });
    }
    if (language  languageScore) {
        updatedCourses = updatedCourses.filter((course) = {
            const languageMap = {
                Gmat: "gmat_overall_score",
                Gre: "gre_overall_score",
                Sat: "sat_overall_score",
            };
            return (
                course[languageMap[language]] 
                parseFloat(course[languageMap[language]]) = parseFloat(languageScore)
            );
        });
    }
    if (aptitudeTest  aptitudeScore) {
        updatedCourses = updatedCourses.filter((course) = {
            const aptitudeMap = {
                German: "german_language_overall_score",
                French: "french_language_overall_score",
            };
            return (
                course[aptitudeMap[aptitudeTest]] 
                parseFloat(course[aptitudeMap[aptitudeTest]]) =
                parseFloat(aptitudeScore)
            );
        });
    }
    if (searchTerm) {
        updatedCourses = updatedCourses.filter(
            (course) =
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) 
            (course.institute_id?.[1] 
                course.institute_id[1]
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        );
    }

    setFilteredCourses(updatedCourses);

    if (
      searchTerm 
      country 
      state 
      intake 
      programLevel 
      selectedExam 
      examScore 
      language 
      languageScore 
      aptitudeTest 
      aptitudeScore
    ) {
      setPage(1);
    }
  }, [
    searchTerm,
    country,
    state,
    intake,
    programLevel,
    selectedExam,
    examScore,
    language,
    languageScore,
    aptitudeTest,
    aptitudeScore,
    courses,
  ]);

    const handleCountryChange = (selectedCountry) = {
        setCountry(selectedCountry);
        const hasStates = courses.some(
        (course) = course.country_id?.[1] === selectedCountry  course.state_id
        );

        if (!hasStates) {
        setState("");
        }
    };
  
  if (loading) {
    return (
      div className="flex justify-center items-center h-screen"
        ClipLoader size={40} color={"#1b73b9"} loading={loading} /
        p className="ml-4 text-lg"Loading courses.../p
      /div
    );
  }

  if (error) return div className="text-red-500 text-center mt-10"{error}/div;

  const uniqueValues = (key) = [
    ...new Set(courses.map((course) = course[key]?.[1]).filter(Boolean)),
  ];

  const startIndex = (page - 1) * resultsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + resultsPerPage
  );
  const newTotalPages = Math.ceil(filteredCourses.length / resultsPerPage);

  if (totalPages !== newTotalPages) {
      setTotalPages(newTotalPages)
  }

  return (
    div className="bg-gray-100 min-h-screen"
      div className="container mx-auto px-4 py-8"
        div className="flex justify-between items-center mb-8"
            h1 className="text-3xl font-bold text-gray-800"Find Your Course/h1
            div className="relative"
                input
                    type="text"
                    placeholder="Search courses or universities..."
                    value={searchTerm}
                    onChange={(e) = setSearchTerm(e.target.value)}
                    className="w-full md:w-96 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                /
                FaSearch className="absolute top-3 right-4 text-gray-400" /
            /div
            button
                style={{ background: 'linear-gradient(135deg, #1b73b9, #2980b9)' }}
                className="flex items-center text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity"
                onClick={() = setShowCart(!showCart)}
            
                FaShoppingCart size={24} /
                span className="ml-2"{showCart ? "Back" : `Cart (${likedCourses.length})`}/span
            /button
        /div

        div className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md"
            h3 className="text-xl font-semibold mb-6"Filters/h3
            div className="space-y-6"
              div
                label className="block text-sm font-medium text-gray-700 mb-1"Country/label
                select onChange={(e) = handleCountryChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  option value=""Select Country/option
                  {uniqueValues("country_id").map((c, index) = (
                    option key={index} value={c}{c}/option
                  ))}
                /select
              /div
              div
                label className="block text-sm font-medium text-gray-700 mb-1"State/label
                select onChange={(e) = setState(e.target.value)} disabled={!country} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                  option value=""Select State/option
                  {courses
                    .filter((course) = course.country_id?.[1] === country)
                    .map((course) = course.state_id?.[1])
                    .filter(Boolean)
                    .filter((state, index, self) = self.indexOf(state) === index)
                    .map((s, index) = (
                      option key={index} value={s}{s}/option
                    ))}
                /select
              /div
              div
                label className="block text-sm font-medium text-gray-700 mb-1"Intake/label
                select onChange={(e) = setIntake(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  option value=""Select Intake/option
                  option value="Spring"Spring/option
                  option value="Fall"Fall/option
                  option value="Winter"Winter/option
                /select
              /div
              div
                label className="block text-sm font-medium text-gray-700 mb-1"Program Level/label
                select onChange={(e) = setProgramLevel(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  option value=""Select Program Level/option
                  {uniqueValues("program_level_id").map((level, index) = (
                    option key={index} value={level}{level}/option
                  ))}
                /select
              /div
              div
                label className="block text-sm font-medium text-gray-700 mb-1"English Proficiency Exam/label
                select onChange={(e) = setSelectedExam(e.target.value)} value={selectedExam} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  option value=""Select Exam/option
                  option value="Ielts"IELTS/option
                  option value="Pte"PTE/option
                  option value="Duolingo"DUOLINGO/option
                  option value="Toefl"TOEFL/option
                  option value="Celpip"CELPIP/option
                  option value="Cael"CAEL/option
                /select
              /div
              {selectedExam  (
                div
                  label className="block text-sm font-medium text-gray-700 mb-1"Enter {selectedExam} Score/label
                  input type="number" placeholder={`${selectedExam} Overall`} value={examScore} onChange={(e) = setExamScore(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" /
                /div
              )}
              div
                label className="block text-sm font-medium text-gray-700 mb-1"Aptitude Exam/label
                select onChange={(e) = setLanguage(e.target.value)} value={language} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  option value=""Select Exam/option
                  option value="Gmat"GMAT/option
                  option value="Gre"GRE/option
                  option value="Sat"SAT/option
                /select
              /div
              {language  (
                div
                  label className="block text-sm font-medium text-gray-700 mb-1"Enter {language} Score/label
                  input type="number" placeholder={`${language} Overall`} value={languageScore} onChange={(e) = setLanguageScore(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" /
                /div
              )}
                div
                    label className="block text-sm font-medium text-gray-700 mb-1"Language Proficiency Exam/label
                    select onChange={(e) = setAptitudeTest(e.target.value)} value={aptitudeTest} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        option value=""Select Exam/option
                        option value="German"German/option
                        option value="French"French/option
                    /select
                /div
                {aptitudeTest  (
                    div
                        label className="block text-sm font-medium text-gray-700 mb-1"Enter {aptitudeTest} Score/label
                        input type="number" placeholder={`${aptitudeTest} Overall`} value={aptitudeScore} onChange={(e) = setAptitudeScore(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" /
                    /div
                )}
              button
                style={{ background: 'linear-gradient(135deg, #1b73b9, #2980b9)' }}
                className="w-full text-white py-2 rounded-md shadow-md hover:opacity-90 transition-opacity"
                onClick={() = {
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
                }}
              
                Reset Filters
              /button
            /div
          /div

          div className="lg:col-span-3"
            {showCart ? (
              div className="bg-white p-6 rounded-lg shadow-md"
                div className="flex justify-between items-center mb-6"
                    h2 className="text-2xl font-semibold"Liked Courses/h2
                    button onClick={printCourses} 
                    style={{ background: 'linear-gradient(135deg, #1b73b9, #2980b9)' }}
                    className="text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity"
                        Print
                    /button
                /div
                div className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  {likedCourses.length  0 ? (
                    likedCourses.map((course, index) = (
                      motion.div
                        key={index}
                        className={`course-card perspective-1000 ${
                          flipped[index] ? "flipped" : ""
                        }`}
                      
                         div className="relative w-full h-full duration-700 transform-style-preserve-3d"
                            div className="absolute w-full h-full bg-white rounded-lg shadow-lg p-6 backface-hidden"
                                button
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                                    onClick={() = toggleLike(course)}
                                
                                    FaHeart
                                    color={
                                        likedCourses.some((c) = c.id === course.id)
                                        ? "red"
                                        : "white"
                                    }
                                    /
                                /button
                                h3 className="text-xl font-bold mb-2"{course.institute_id?.[1] || "Unknown Institute"}/h3
                                p className="text-md text-gray-700 mb-4"{course.name}/p
                                div className="grid grid-cols-2 gap-4 text-sm"
                                    pstrongCountry:/strong {course.country_id?.[1] || "N/A"}/p
                                    pstrongState:/strong {course.state_id?.[1] || "N/A"}/p
                                    pstrongDuration:/strong {course.year} year/p
                                    pstrongFees:/strong {course.total_tuition_fees_amount ? ` ${getCurrencySymbol(course.country_id?.[1])}${course.total_tuition_fees_amount}`: "N/A"}/p
                                /div
                                div className="mt-6 flex justify-between"
                                    a href={course.program_url} 
                                    style={{ background: 'linear-gradient(135deg, #1b73b9, #2980b9)' }}
                                    className="text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity"
                                    View Course
                                    /a
                                    button
                                    onClick={() = toggleFlip(index)}
                                    style={{ background: 'linear-gradient(135deg, #1b73b9, #2980b9)' }}
                                    className="text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity"
                                    
                                    View More
                                    /button
                                /div
                            /div
                            div className="absolute w-full h-full bg-white rounded-lg shadow-lg p-6 backface-hidden transform rotate-y-180"
                                h4 className="font-bold mb-4"Additional Details/h4
                                div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm"
                                    div
                                        p className="font-semibold"IELTS:/p
                                        pOverall: {course.ielts_overall_score || "0"}/p
                                    /div
                                    div
                                        p className="font-semibold"PTE:/p
                                        pOverall: {course.pte_overall_score || "0"}/p
                                    /div
                                    div
                                        p className="font-semibold"TOEFL:/p
                                        pOverall: {course.toefl_overall_score || "0"}/p
                                    /div
                                    div
                                        p className="font-semibold"Duolingo:/p
                                        pOverall: {course.duolingo_overall_score || "0"}/p
                                    /div
                                /div
                                button
                                    onClick={() = toggleFlip(index)}
                                    style={{ background: 'linear-gradient(135deg, #1b73b9, #2980b9)' }}
                                    className="mt-6 text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity"
                                
                                    Go Back
                                /button
                            /div
                        /div
                      /motion.div
                    ))
                  ) : (
                    p className="col-span-full text-center text-gray-500"No liked courses./p
                  )}
                /div
              /div
            ) : (
              div className="grid grid-cols-1 md:grid-cols-2 gap-6"
                {paginatedCourses.length  0 ? (
                  paginatedCourses.map((course, index) = (
                    motion.div
                      key={index}
                      className="perspective-1000"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    
                      div className={`relative w-full h-[320px] duration-700 transform-style-preserve-3d ${flipped[index] ? "rotate-y-180" : ""}`}
                      div className="absolute w-full h-full bg-white rounded-lg shadow-lg p-6 backface-hidden"
                                button
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                                    onClick={() = toggleLike(course)}
                                
                                    FaHeart
                                    color={
                                        likedCourses.some((c) = c.id === course.id)
                                        ? "red"
                                        : "skyblue"
                                    }
                                    /
                                /button
                                h3 className="text-xl font-bold mb-2"{course.institute_id?.[1] || "Unknown Institute"}/h3
                                p className="text-md text-gray-700 mb-4"{course.name}/p
                                div className="grid grid-cols-2 gap-4 text-sm"
                                    pstrongCountry:/strong {course.country_id?.[1] || "N/A"}/p
                                    pstrongState:/strong {course.state_id?.[1] || "N/A"}/p
                                    pstrongDuration:/strong {course.year} year/p
                                    pstrongFees:/strong {course.total_tuition_fees_amount ? ` ${getCurrencySymbol(course.country_id?.[1])}${course.total_tuition_fees_amount}`: "N/A"}/p
                                /div
                                div className="absolute bottom-6 w-full pr-12 flex justify-between"
                                    a href={course.program_url} 
                                    style={{ background: 'linear-gradient(135deg, #1b73b9, #2980b9)' }}
                                    className="text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity"
                                    View Course
                                    /a
                                    button
                                    onClick={() = toggleFlip(index)}
                                    style={{ background: 'linear-gradient(135deg, #1b73b9, #2980b9)' }}
                                    className="text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity"
                                    
                                    View More
                                    /button
                                /div
                            /div
                            div className="absolute w-full h-full bg-white rounded-lg shadow-lg p-6 backface-hidden transform rotate-y-180"
                                h4 className="font-bold mb-4"Additional Details/h4
                                div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm"
                                    div
                                        p className="font-semibold"IELTS:/p
                                        pOverall: {course.ielts_overall_score || "0"}/p
                                    /div
                                    div
                                        p className="font-semibold"PTE:/p
                                        pOverall: {course.pte_overall_score || "0"}/p
                                    /div
                                    div
                                        p className="font-semibold"TOEFL:/p
                                        pOverall: {course.toefl_overall_score || "0"}/p
                                    /div
                                    div
                                        p className="font-semibold"Duolingo:/p
                                        pOverall: {course.duolingo_overall_score || "0"}/p
                                    /div
                                /div
                                button
                                    onClick={() = toggleFlip(index)}
                                    style={{ background: 'linear-gradient(135deg, #1b73b9, #2980b9)' }}
                                    className="absolute bottom-6 text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity"
                                
                                    Go Back
                                /button
                            /div
                      /div
                    /motion.div
                  ))
                ) : (
                  div className="col-span-full text-center text-gray-500"
                    No courses found. Try different filters.
                  /div
                )}
              /div
            )}
             div className="mt-8 flex flex-wrap justify-center items-center gap-2"
                button onClick={() = handlePageChange(1)} disabled={page === 1} className="px-3 py-1 rounded-md bg-white border border-gray-300 disabled:opacity-50" First/button
                button onClick={() = handlePageChange(page - 1)} disabled={page === 1} className="px-3 py-1 rounded-md bg-white border border-gray-300 disabled:opacity-50" Prev/button
                
                {Array.from({ length: totalPages }, (_, i) = i + 1)
                    .filter(p = p === 1 || p === totalPages || (p = page - 2  p = page + 2))
                    .map((p, index, arr) = (
                    React.Fragment key={p}
                        {index  0  p !== arr[index - 1] + 1 ? (
                        span className="ellipsis".../span
                        ) : null}
                        button
                        className={`px-3 py-1 rounded-md transition hover:bg-gray-300 ${
                            p === page ? "bg-blue-500 text-white" : "bg-white border border-gray-300"
                        }`}
                        onClick={() = handlePageChange(p)}
                        
                        {p}
                        /button
                    /React.Fragment
                    ))}

                button onClick={() = handlePageChange(page + 1)} disabled={page = totalPages} className="px-3 py-1 rounded-md bg-white border border-gray-300 disabled:opacity-50"Next /button
                button onClick={() = handlePageChange(totalPages)} disabled={page === totalPages} className="px-3 py-1 rounded-md bg-white border border-gray-300 disabled:opacity-50"Last /button

                div className="flex items-center gap-2"
                    label htmlFor="goToPage"Go to page:/label
                    input
                        id="goToPage"
                        type="number"
                        min={1}
                        max={totalPages}
                        value={inputPage}
                        onChange={(e) = setInputPage(e.target.value)}
                        className="border px-2 py-1 w-20 rounded"
                    /
                    button
                        onClick={() = {
                            const p = Number(inputPage);
                            if (p = 1  p = totalPages) handlePageChange(p);
                        }}
                        style={{ background: 'linear-gradient(135deg, #1b73b9, #2980b9)' }}
                        className="text-white px-3 py-1 rounded hover:opacity-90"
                    
                        Go
                    /button
                /div
            /div
          /div
        /div
      /div
    /div
  );
};

export default OdooCoursesNew;
