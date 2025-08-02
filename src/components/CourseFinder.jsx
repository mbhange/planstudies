import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
// import { Footer } from "flowbite-react";
import Navbar from "../components/NavbarStudent";
import Footer from "../components/Footer";

// NOTE: No CSS imports! All styling is Tailwind only.

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
const getCurrencySymbol = (countryName) => currencySymbols[countryName] || "$";

const OdooCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flipped, setFlipped] = useState({});
  const [likedCourses, setLikedCourses] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [page, setPage] = useState(1);
  const resultsPerPage = 10;
  const [inputPage, setInputPage] = useState(1);
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

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/odoo/courses",
          { fetchAll: true }
        );
        if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
          setFilteredCourses(response.data.courses);
        }
      } catch (error) {
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    setInputPage(newPage);
  }, []);

  const toggleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const toggleLike = (course) => {
    setLikedCourses((prev) =>
      prev.some((c) => c.id === course.id)
        ? prev.filter((c) => c.id !== course.id)
        : [...prev, course]
    );
  };

  // FILTER functions
  const uniqueValues = (key) => [
    ...new Set(courses.map((course) => course[key]?.[1]).filter(Boolean)),
  ];

  useEffect(() => {
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
      updatedCourses = updatedCourses.filter((course) =>
        course.notes && typeof course.notes === "string"
          ? course.notes.includes(intake)
          : false
      );
    }
    if (programLevel) {
      updatedCourses = updatedCourses.filter(
        (course) => course.program_level_id?.[1] === programLevel
      );
    }
    if (selectedExam && examScore) {
      const scoreMap = {
        Ielts: "ielts_overall_score",
        Pte: "pte_overall_score",
        Duolingo: "duolingo_overall_score",
        Toefl: "toefl_overall_score",
        Celpip: "celpip_overall_score",
        Cael: "cael_overall_score",
      };
      updatedCourses = updatedCourses.filter(
        (course) =>
          course[scoreMap[selectedExam]] &&
          parseFloat(course[scoreMap[selectedExam]]) <= parseFloat(examScore)
      );
    }
    if (language && languageScore) {
      const languageMap = {
        Gmat: "gmat_overall_score",
        Gre: "gre_overall_score",
        Sat: "sat_overall_score",
      };
      updatedCourses = updatedCourses.filter(
        (course) =>
          course[languageMap[language]] &&
          parseFloat(course[languageMap[language]]) <= parseFloat(languageScore)
      );
    }
    if (aptitudeTest && aptitudeScore) {
      const aptitudeMap = {
        German: "german_language_overall_score",
        French: "french_language_overall_score",
      };
      updatedCourses = updatedCourses.filter(
        (course) =>
          course[aptitudeMap[aptitudeTest]] &&
          parseFloat(course[aptitudeMap[aptitudeTest]]) <=
            parseFloat(aptitudeScore)
      );
    }
    if (searchTerm) {
      updatedCourses = updatedCourses.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (course.institute_id?.[1] &&
            course.institute_id[1]
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredCourses(updatedCourses);
    setPage(1);
    setInputPage(1);
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

  // Pagination logic
  const startIndex = (page - 1) * resultsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + resultsPerPage
  );
  const totalPages = Math.ceil(filteredCourses.length / resultsPerPage) || 1;

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80">
        <ClipLoader size={40} color={"#1b73b9"} loading={loading} />
        <p className="mt-3 text-blue-700">Loading courses...</p>
      </div>
    );
  }
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="md:w-1/4 w-full bg-white rounded-xl p-5 shadow">
            <h3 className="font-bold text-lg mb-4 text-blue-800">Filters</h3>

            <label className="block mb-1 mt-2 text-sm">Country</label>
            <select
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Country</option>
              {uniqueValues("country_id").map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="block mb-1 mt-2 text-sm">State</label>
            <select
              onChange={(e) => setState(e.target.value)}
              value={state}
              disabled={!country}
              className="w-full p-2 border rounded mb-2 disabled:bg-gray-100"
            >
              <option value="">Select State</option>
              {courses
                .filter((course) => course.country_id?.[1] === country)
                .map((course) => course.state_id?.[1])
                .filter(Boolean)
                .filter((s, idx, arr) => arr.indexOf(s) === idx)
                .map((s, idx) => (
                  <option key={idx} value={s}>
                    {s}
                  </option>
                ))}
            </select>

            <label className="block mb-1 mt-2 text-sm">Intake</label>
            <select
              onChange={(e) => setIntake(e.target.value)}
              value={intake}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Intake</option>
              <option value="Spring">Spring</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
            </select>

            <label className="block mb-1 mt-2 text-sm">Program Level</label>
            <select
              onChange={(e) => setProgramLevel(e.target.value)}
              value={programLevel}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Program Level</option>
              {uniqueValues("program_level_id").map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <label className="block mb-1 mt-2 text-sm">
              English Proficiency Exam
            </label>
            <select
              onChange={(e) => setSelectedExam(e.target.value)}
              value={selectedExam}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Exam</option>
              <option value="Ielts">IELTS</option>
              <option value="Pte">PTE</option>
              <option value="Duolingo">DUOLINGO</option>
              <option value="Toefl">TOEFL</option>
              <option value="Celpip">CELPIP</option>
              <option value="Cael">CAEL</option>
            </select>
            {selectedExam && (
              <div className="mb-2">
                <label className="block mb-1 text-sm">
                  Enter {selectedExam} Score
                </label>
                <input
                  type="number"
                  placeholder={`${selectedExam} Overall`}
                  value={examScore}
                  onChange={(e) => setExamScore(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}

            <label className="block mb-1 mt-2 text-sm">Aptitude Exam</label>
            <select
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Exam</option>
              <option value="Gmat">GMAT</option>
              <option value="Gre">GRE</option>
              <option value="Sat">SAT</option>
            </select>
            {language && (
              <div className="mb-2">
                <label className="block mb-1 text-sm">
                  Enter {language} Score
                </label>
                <input
                  type="number"
                  placeholder={`${language} Overall`}
                  value={languageScore}
                  onChange={(e) => setLanguageScore(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}

            <label className="block mb-1 mt-2 text-sm">
              Language Proficiency Exam
            </label>
            <select
              onChange={(e) => setAptitudeTest(e.target.value)}
              value={aptitudeTest}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Exam</option>
              <option value="German">German</option>
              <option value="French">French</option>
            </select>
            {aptitudeTest && (
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Enter {aptitudeTest} Score
                </label>
                <input
                  type="number"
                  placeholder={`${aptitudeTest} Overall`}
                  value={aptitudeScore}
                  onChange={(e) => setAptitudeScore(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}

            <button
              className="w-full py-2 mt-2 font-semibold text-white rounded-lg shadow bg-gradient-to-br from-[#1b73b9] to-[#2980b9] hover:opacity-90 transition"
              onClick={() => {
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
              }}
            >
              Reset Filters
            </button>
          </div>

          {/* Main content */}
          <div className="md:w-3/4 w-full flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center items-stretch gap-4">
              <div className="flex flex-row gap-2 items-center">
                <button
                  className="flex items-center gap-2 bg-gradient-to-br from-[#1b73b9] to-[#2980b9] text-white px-4 py-2 rounded-lg shadow font-semibold hover:opacity-90 transition"
                  onClick={() => setShowCart(!showCart)}
                >
                  <FaShoppingCart size={20} />
                  {showCart ? "Back" : `Cart (${likedCourses.length})`}
                </button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses or universities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm w-56 focus:ring focus:ring-blue-100"
                  />
                  <FaSearch className="absolute left-2 top-3 text-gray-400" />
                </div>
              </div>
            </div>
            {showCart ? (
              <div className="bg-white rounded-xl shadow p-5">
                <h2 className="text-lg font-bold text-blue-700 mb-3">
                  Liked Courses
                </h2>
                {likedCourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {likedCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        className={`relative bg-gradient-to-bl from-[#e6f0fa] to-[#f7fafd] rounded-2xl shadow-md p-4 border border-blue-100 flex flex-col justify-between ${
                          flipped[course.id] ? "ring-2 ring-blue-400" : ""
                        }`}
                      >
                        <div>
                          <button
                            className="absolute top-2 right-2 z-10"
                            onClick={() => toggleLike(course)}
                          >
                            <FaHeart
                              className={`text-lg transition ${
                                likedCourses.some((c) => c.id === course.id)
                                  ? "text-red-500"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                          <h3 className="text-blue-900 font-semibold text-xl mb-2">
                            {course.institute_id?.[1] || "Unknown Institute"}
                          </h3>
                          <div className="text-gray-900 font-medium text-base mb-2">
                            {course.name}
                          </div>
                          <div className="grid grid-cols-2 text-sm gap-y-1">
                            <div className="text-gray-700">
                              Level:{" "}
                              <span className="font-semibold">
                                {course.program_level_id?.[1] || "N/A"}
                              </span>
                            </div>
                            <div className="text-gray-700">
                              Type:{" "}
                              <span className="font-semibold">
                                {course.program_type || "N/A"}
                              </span>
                            </div>
                            <div className="text-gray-700 col-span-2">
                              Country:{" "}
                              <span className="font-semibold">
                                {course.country_id?.[1] || "N/A"}
                              </span>
                            </div>
                            <div className="text-gray-700 col-span-2">
                              State:{" "}
                              <span className="font-semibold">
                                {course.state_id?.[1] || "N/A"}
                              </span>
                            </div>
                            <div className="text-gray-700">
                              Semester:{" "}
                              <span className="font-semibold">
                                {course.semester}
                              </span>
                            </div>
                            <div className="text-gray-700">
                              Year:{" "}
                              <span className="font-semibold">
                                {course.year}
                              </span>
                            </div>
                            <div className="text-gray-700">
                              Total Fees:{" "}
                              <span className="font-semibold">
                                {course.total_tuition_fees_amount
                                  ? `${getCurrencySymbol(
                                      course.country_id?.[1]
                                    )}${course.total_tuition_fees_amount}`
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="text-gray-700">
                              Application:{" "}
                              <span className="font-semibold">
                                {course.application_fees
                                  ? `${getCurrencySymbol(
                                      course.country_id?.[1]
                                    )}${course.application_fees}`
                                  : "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between gap-2 mt-4">
                          <a
                            href={course.program_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center py-2 font-semibold rounded-lg shadow bg-gradient-to-br from-[#1b73b9] to-[#2980b9] text-white hover:opacity-90 transition text-sm"
                          >
                            View Course
                          </a>
                          <button
                            className="flex-1 text-center py-2 font-semibold rounded-lg shadow bg-transparent border border-blue-300 text-blue-700 hover:bg-blue-50 transition text-sm ml-2"
                            onClick={() => toggleFlip(course.id)}
                          >
                            More Info
                          </button>
                        </div>
                        {flipped[course.id] && (
                          <div className="mt-4 text-sm text-blue-800">
                            Exam/Language detail here — (extend with more info
                            as needed)
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-blue-400 text-center">
                    No liked courses.
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedCourses.length > 0 ? (
                    paginatedCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        className={`relative bg-gradient-to-bl from-[#e6f0fa] to-[#f7fafd] rounded-2xl shadow-md p-4 border border-blue-100 flex flex-col justify-between ${
                          flipped[course.id] ? "ring-2 ring-blue-400" : ""
                        }`}
                      >
                        <button
                          className="absolute top-2 right-2 z-10"
                          onClick={() => toggleLike(course)}
                        >
                          <FaHeart
                            className={`text-lg transition ${
                              likedCourses.some((c) => c.id === course.id)
                                ? "text-red-500"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                        <h3 className="text-blue-900 font-semibold text-xl mb-2">
                          {course.institute_id?.[1] || "Unknown Institute"}
                        </h3>
                        <div className="text-gray-900 font-medium text-base mb-2">
                          {course.name}
                        </div>
                        <div className="grid grid-cols-2 text-sm gap-y-1">
                          <div className="text-gray-700">
                            Level:{" "}
                            <span className="font-semibold">
                              {course.program_level_id?.[1] || "N/A"}
                            </span>
                          </div>
                          <div className="text-gray-700">
                            Type:{" "}
                            <span className="font-semibold">
                              {course.program_type || "N/A"}
                            </span>
                          </div>
                          <div className="text-gray-700 col-span-2">
                            Country:{" "}
                            <span className="font-semibold">
                              {course.country_id?.[1] || "N/A"}
                            </span>
                          </div>
                          <div className="text-gray-700 col-span-2">
                            State:{" "}
                            <span className="font-semibold">
                              {course.state_id?.[1] || "N/A"}
                            </span>
                          </div>
                          <div className="text-gray-700">
                            Semester:{" "}
                            <span className="font-semibold">
                              {course.semester}
                            </span>
                          </div>
                          <div className="text-gray-700">
                            Year:{" "}
                            <span className="font-semibold">{course.year}</span>
                          </div>
                          <div className="text-gray-700">
                            Total Fees:{" "}
                            <span className="font-semibold">
                              {course.total_tuition_fees_amount
                                ? `${getCurrencySymbol(
                                    course.country_id?.[1]
                                  )}${course.total_tuition_fees_amount}`
                                : "N/A"}
                            </span>
                          </div>
                          <div className="text-gray-700">
                            Application:{" "}
                            <span className="font-semibold">
                              {course.application_fees
                                ? `${getCurrencySymbol(
                                    course.country_id?.[1]
                                  )}${course.application_fees}`
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between gap-2 mt-4">
                          <a
                            href={course.program_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center py-2 font-semibold rounded-lg shadow bg-gradient-to-br from-[#1b73b9] to-[#2980b9] text-white hover:opacity-90 transition text-sm"
                          >
                            View Course
                          </a>
                          <button
                            className="flex-1 text-center py-2 font-semibold rounded-lg shadow bg-transparent border border-blue-300 text-blue-700 hover:bg-blue-50 transition text-sm ml-2"
                            onClick={() => toggleFlip(course.id)}
                          >
                            More Info
                          </button>
                        </div>
                        {flipped[course.id] && (
                          <div className="mt-4 text-sm text-blue-800">
                            Exam/Language detail here — (extend with more info
                            as needed)
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-blue-400 text-center">
                      No courses found. Try different filters.
                    </div>
                  )}
                </div>
                {/* PAGINATION */}
                <div className="flex flex-wrap justify-center items-center gap-2 p-4">
                  <div className="flex items-center gap-2">
                    <label htmlFor="goToPage" className="text-gray-700">
                      Go to page:
                    </label>
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
                    disabled={page === 1}
                    className="px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 font-medium disabled:opacity-40"
                  >
                    ⏮ First
                  </button>
                  <button
                    onClick={() => handlePageChange(Math.max(page - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 font-medium disabled:opacity-40"
                  >
                    ◀ Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (p) =>
                        p === 1 ||
                        p === totalPages ||
                        (p >= page - 2 && p <= page + 2)
                    )
                    .map((p, index, arr) => (
                      <React.Fragment key={p}>
                        {index > 0 && p !== arr[index - 1] + 1 ? (
                          <span className="px-2">...</span>
                        ) : null}
                        <button
                          className={`px-3 py-1 rounded font-medium ${
                            p === page
                              ? "bg-gradient-to-br from-[#1b73b9] to-[#2980b9] text-white"
                              : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                          }`}
                          onClick={() => handlePageChange(p)}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    ))}
                  <button
                    onClick={() =>
                      handlePageChange(page < totalPages ? page + 1 : page)
                    }
                    disabled={page >= totalPages}
                    className="px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 font-medium disabled:opacity-40"
                  >
                    Next ▶
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={page === totalPages}
                    className="px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 font-medium disabled:opacity-40"
                  >
                    Last ⏭
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OdooCourses;
