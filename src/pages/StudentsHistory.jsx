import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import axios from "axios";
import Navbar from "../components/NavbarStudent";
import Footer from "../components/Footer";
import {
  FaUsers,
  FaCalendarAlt,
  FaDownload,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaChartBar,
  FaSearch,
  FaFileExport,
} from "react-icons/fa";

const StudentHistory = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filterType, setFilterType] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [customRange, setCustomRange] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const studentsPerPage = 10;

  // Generate years from 2020 to 2025
  const availableYears = [];
  for (let year = 2020; year <= 2025; year++) {
    availableYears.push(year);
  }

  // Generate all months
  const availableMonths = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/api/students").then((res) => {
      setStudents(res.data);
      setFilteredStudents(res.data);
    });
  }, []);

  // Filter by search term
  const searchFilteredStudents = filteredStudents.filter(
    (student) =>
      student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone_number.includes(searchTerm)
  );

  const totalPages = Math.ceil(searchFilteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const paginatedStudents = searchFilteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalStudents = students.length;
  const uniqueYears = [
    ...new Set(students.map((s) => new Date(s.created_at).getFullYear())),
  ];

  const filterData = useCallback(() => {
    let filteredData = students;
    if (filterType === "year" && selectedYear) {
      filteredData = students.filter(
        (s) => new Date(s.created_at).getFullYear() === parseInt(selectedYear)
      );
    } else if (filterType === "month" && selectedMonth) {
      filteredData = students.filter(
        (s) =>
          new Date(s.created_at).getFullYear() === parseInt(selectedYear) &&
          new Date(s.created_at).getMonth() + 1 === parseInt(selectedMonth)
      );
    } else if (filterType === "week" && selectedWeek) {
      const startOfWeek = new Date(selectedWeek);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      filteredData = students.filter(
        (s) =>
          new Date(s.created_at) >= startOfWeek &&
          new Date(s.created_at) <= endOfWeek
      );
    } else if (filterType === "day" && selectedDay) {
      filteredData = students.filter(
        (s) =>
          new Date(s.created_at).toISOString().split("T")[0] === selectedDay
      );
    } else if (filterType === "custom") {
      const from = new Date(customRange.from);
      const to = new Date(customRange.to);
      filteredData = students.filter((s) => {
        const studentDate = new Date(s.created_at);
        return studentDate >= from && studentDate <= to;
      });
    }
    setFilteredStudents(filteredData);
    setCurrentPage(1); // Reset to first page when filtering
  }, [students, filterType, selectedYear, selectedMonth, selectedWeek, selectedDay, customRange]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const filterByCustomDate = () => {
    if (customRange.from && customRange.to) {
      setFilterType("custom");
      filterData();
    }
  };

  const clearFilters = () => {
    setFilterType(null);
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedWeek("");
    setSelectedDay("");
    setCustomRange({ from: "", to: "" });
    setSearchTerm("");
    setFilteredStudents(students);
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(searchFilteredStudents);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `students_${new Date().toISOString().split("T")[0]}.csv`);
  };

  const yearlyData = students.reduce((acc, student) => {
    const year = new Date(student.created_at).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // Create chart data with all years from 2020-2025
  const chartData = availableYears.map((year) => ({
    year: year.toString(),
    count: yearlyData[year] || 0,
  }));

  return (
    <>
      <Navbar />
      <div className="min-h-screen font-sans bg-gray-50 p-4">
        <div className="container mx-auto p-6 max-w-7xl ">
          {/* Header Section */}
          <div
            className="mb-8 p-6 rounded-2xl shadow-lg text-white"
            style={{ background: "linear-gradient(135deg, #1b73b9, #2980b9)" }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-3">
                    <FaUsers className="text-3xl md:text-4xl" />
                    Student Enrollment History
                  </h1>
                  <p className="text-blue-100 mt-2 text-sm md:text-base">
                    Track and analyze student enrollment trends over time
                  </p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold">
                    {totalStudents}
                  </div>
                  <div className="text-blue-100 text-sm">Total Students</div>
                </div>
              </div>
            </div>
          </div>
          {/* Filter Section */}
          <div className="bg-white border-gray-200 mb-8 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Options</h2>

            {/* Search Bar */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
              {["year", "month", "week", "day", "custom"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`p-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    filterType === type
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <FaCalendarAlt className="text-sm" />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
              <button
                onClick={clearFilters}
                className="px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
              >
                Clear All
              </button>
            </div>

            {/* Filter Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterType === "year" && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Year</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              )}

              {filterType === "month" && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Year</option>
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Month</option>
                    {availableMonths.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {filterType === "week" && (
                <input
                  type="date"
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}

              {filterType === "day" && (
                <input
                  type="date"
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>

            {/* Custom Date Range */}
            {filterType === "custom" && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Custom Date Range
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="date"
                    value={customRange.from}
                    onChange={(e) =>
                      setCustomRange({ ...customRange, from: e.target.value })
                    }
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="From Date"
                  />
                  <input
                    type="date"
                    value={customRange.to}
                    onChange={(e) =>
                      setCustomRange({ ...customRange, to: e.target.value })
                    }
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="To Date"
                  />
                  <button
                    onClick={filterByCustomDate}
                    className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Apply Range
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Export Button */}
          <div className="mb-8">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <FaFileExport className="w-5 h-5" />
              Export to CSV
            </button>
          </div>

          {/* Chart Section */}
          <div className="bg-white border-gray-200 mb-8 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaChartBar className="text-blue-600" />
                Enrollment Trends by Year
              </h2>
            </div>
            <div className="w-full">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#374151" }}
                    axisLine={{ stroke: "#d1d5db" }}
                  />
                  <YAxis
                    tick={{ fill: "#374151" }}
                    axisLine={{ stroke: "#d1d5db" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      color: "#374151",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "#000000" }} />
                  <Bar
                    dataKey="count"
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                    name="Student Count"
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#1e40af" stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Student Records ({searchFilteredStudents.length} results)
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollment Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedStudents.length > 0 ? (
                    paginatedStudents.map((student, index) => (
                      <tr
                        key={student.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-50 transition-colors duration-150`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(student.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {student.fullname}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <a
                            href={`tel:${student.phone_number}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                          >
                            {student.phone_number}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <a
                            href={`mailto:${student.email}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                          >
                            {student.email}
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <FaUsers className="text-4xl text-gray-300" />
                          <p className="text-lg">No students found</p>
                          <p className="text-sm">
                            Try adjusting your search or filters
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>

                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {indexOfFirstStudent + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(
                          indexOfLastStudent,
                          searchFilteredStudents.length
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {searchFilteredStudents.length}
                      </span>{" "}
                      results
                    </p>
                  </div>

                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
                            : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <FaChevronLeft className="h-3 w-3" />
                      </button>

                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        {currentPage} of {totalPages}
                      </span>

                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
                            : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <FaChevronRight className="h-3 w-3" />
                      </button>
                    </nav>
                  </div>
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

export default StudentHistory;

