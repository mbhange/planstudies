import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import axios from "axios";
import { Moon, Sun } from "lucide-react";
import Navbar from "../components/NavbarStudent";
import Footer from "../components/Footer";

const AgentHistory = () => {
    const [agents, setAgents] = useState([]);
    const [filteredAgents, setFilteredAgents] = useState([]);
    const [filterType, setFilterType] = useState(null);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedWeek, setSelectedWeek] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [customRange, setCustomRange] = useState({ from: "", to: "" });
    const [darkMode, setDarkMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const agentsPerPage = 3;

    useEffect(() => {
        axios.get("http://localhost:5000/api/agents").then((res) => {
            setAgents(res.data);
            setFilteredAgents(res.data);
        });
    }, []);

    const totalPages = Math.ceil(agents.length / agentsPerPage);
    const indexOfLastAgent = currentPage * agentsPerPage;
    const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
    const paginatedAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);

    const totalAgents = agents.length;
    const uniqueYears = [...new Set(agents.map((s) => new Date(s.created_at).getFullYear()))];

    const filterData = () => {
        let filteredData = agents;
        if (filterType === "year" && selectedYear) {
            filteredData = agents.filter((s) => new Date(s.created_at).getFullYear() === parseInt(selectedYear));
        } else if (filterType === "month" && selectedMonth) {
            filteredData = agents.filter(
                (s) => new Date(s.created_at).getFullYear() === parseInt(selectedYear) && new Date(s.created_at).getMonth() + 1 === parseInt(selectedMonth)
            );
        } else if (filterType === "week" && selectedWeek) {
            const startOfWeek = new Date(selectedWeek);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            filteredData = agents.filter(
                (s) => new Date(s.created_at) >= startOfWeek && new Date(s.created_at) <= endOfWeek
            );
        } else if (filterType === "day" && selectedDay) {
            filteredData = agents.filter((s) => new Date(s.created_at).toISOString().split("T")[0] === selectedDay);
        } else if (filterType === "custom") {
            const from = new Date(customRange.from);
            const to = new Date(customRange.to);
            filteredData = agents.filter((s) => {
                const agentDate = new Date(s.created_at);
                return agentDate >= from && agentDate <= to;
            });
        }
        setFilteredAgents(filteredData);
    };

    useEffect(() => {
        filterData();
    }, [filterType, selectedYear, selectedMonth, selectedWeek, selectedDay, customRange]);

    const filterByCustomDate = () => {
        if (customRange.from && customRange.to) {
            setFilterType("custom");
            filterData();
        }
    };

    const exportToCSV = () => {
        const csv = Papa.unparse(filteredAgents);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "agents.csv");
    };

    const yearlyData = agents.reduce((acc, agent) => {
        const year = new Date(agent.created_at).getFullYear();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(yearlyData).map((year) => ({
        year,
        count: yearlyData[year],
    }));

    return (
        <div>
            <Navbar />
            <div className={darkMode ? "bg-gray-900 text-white p-6" : "p-6"}>
                <div className="flex justify-between mb-4">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-wide uppercase border-b-4 border-blue-500 pb-2 text-center sm:text-left">
                        🤝 Agent Enrollment History
                    </h1>


                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded bg-gray-700 text-white flex items-center justify-center w-10 h-10"
                    >
                        {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-300" />}
                    </button>
                </div>

                <div className={`mb-4 p-4 rounded shadow-md text-lg font-bold ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
                    Total Agents Enrolled: {totalAgents}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {["year", "month", "week", "day"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`p-3 rounded ${filterType === type
                                ? "bg-blue-600 text-white"
                                : darkMode
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-200 text-black"
                                }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Filter Inputs */}
                {filterType === "year" && (
                    <select onChange={(e) => setSelectedYear(e.target.value)} className={`p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}>
                        <option value="">Select Year</option>
                        {[...new Set(agents.map((s) => new Date(s.created_at).getFullYear()))].map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                )}

                {filterType === "month" && (
                    <input type="month" onChange={(e) => { setSelectedYear(e.target.value.split("-")[0]); setSelectedMonth(e.target.value.split("-")[1]); }} className={`p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`} />
                )}

                {filterType === "week" && (
                    <input type="date" onChange={(e) => setSelectedWeek(e.target.value)} className={`p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`} />
                )}

                {filterType === "day" && (
                    <input type="date" onChange={(e) => setSelectedDay(e.target.value)} className={`p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`} />
                )}

                {/* Custom Date Range */}
                <h3 className={`${darkMode ? "text-white" : "text-black"}`}><b>Apply custom filters</b></h3>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4 w-full">
                    <input
                        type="date"
                        value={customRange.from}
                        onChange={(e) => setCustomRange({ ...customRange, from: e.target.value })}
                        className={`p-2 border rounded  ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
                    />
                    <input
                        type="date"
                        value={customRange.to}
                        onChange={(e) => setCustomRange({ ...customRange, to: e.target.value })}
                        className={`p-2 border rounded  ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
                    />
                    <button
                        onClick={filterByCustomDate}
                        className="p-2 bg-green-600 text-white rounded w-full md:w-auto"
                        style={{ height: "40px" }}
                    >
                        Apply
                    </button>
                </div>

                <button onClick={exportToCSV} className="mt-4 p-2 bg-yellow-500 rounded text-white">Export to CSV</button>

                <ResponsiveContainer width="100%" height={300} style={{ marginTop: "20px" }}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border mt-4">
                        {/* <thead>
                        <tr className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"} text-left`}>
                            <th className="border p-2">Enrollment Date</th>
                            <th className="border p-2">Agent Name</th>
                            <th className="border p-2">Phone Number</th>
                            <th className="border p-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAgents.map((agent) => (
                            <tr key={agent.id} className="text-center">
                                <td className="border p-2">{new Date(agent.created_at).toLocaleDateString()}</td>
                                <td className="border p-2">{agent.fullname}</td>
                                <td className="p-3 border">
                                    <a href={`tel:${agent.phone_number}`} className="text-blue-500 hover:underline">
                                        {agent.phone_number}
                                    </a>
                                </td>
                                <td className="border p-2">{agent.email}</td>
                            </tr>
                        ))}
                    </tbody> */}
                        <thead>
                            <tr className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"} text-left`}>
                                <th className="border p-2">Enrollment Date</th>
                                <th className="border p-2">Agent Name</th>
                                <th className="border p-2">Phone Number</th>
                                <th className="border p-2">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedAgents.length > 0 ? (
                                paginatedAgents.map((agent) => (
                                    <tr key={agent.id} className="text-center">
                                        <td className="border p-2">{new Date(agent.created_at).toLocaleDateString()}</td>
                                        <td className="border p-2">{agent.fullname}</td>
                                        <td className="p-3 border">
                                            <a href={`tel:${agent.phone_number}`} className="text-blue-500 hover:underline">
                                                {agent.phone_number}
                                            </a>
                                        </td>
                                        <td className="border p-2">{agent.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-3 border text-center text-gray-500">No agents found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"
                                    }`}
                            >
                                Previous
                            </button>
                            <span className="px-3 py-1 bg-gray-200 rounded">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AgentHistory;