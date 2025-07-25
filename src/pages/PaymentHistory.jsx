import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import axios from "axios";
import { Moon, Sun } from "lucide-react";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [filterType, setFilterType] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [customRange, setCustomRange] = useState({ from: "", to: "" });
  const [darkMode, setDarkMode] = useState(false);
  const uniqueYears = [...new Set(payments.map((p) => new Date(p.date).getFullYear()))];

  useEffect(() => {
    axios.get("http://localhost:5000/api/payments").then((res) => {
      setPayments(res.data);
      setFilteredPayments(res.data);
    });
  }, []);

  const totalPaymentsReceived = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

  const filterData = () => {
    let filteredData = payments;
    if (filterType === "year" && selectedYear) {
      filteredData = payments.filter((p) => new Date(p.date).getFullYear() === parseInt(selectedYear));
    } else if (filterType === "month" && selectedMonth) {
      filteredData = payments.filter(
        (p) => new Date(p.date).getFullYear() === parseInt(selectedYear) && new Date(p.date).getMonth() + 1 === parseInt(selectedMonth)
      );
    } else if (filterType === "week" && selectedWeek) {
      const startOfWeek = new Date(selectedWeek);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      filteredData = payments.filter(
        (p) => new Date(p.date) >= startOfWeek && new Date(p.date) <= endOfWeek
      );
    } else if (filterType === "day" && selectedDay) {
      filteredData = payments.filter((p) => new Date(p.date).toISOString().split("T")[0] === selectedDay);
    } else if (filterType === "custom") {
      const from = new Date(customRange.from);
      const to = new Date(customRange.to);
      filteredData = payments.filter((p) => {
        const paymentDate = new Date(p.date);
        return paymentDate >= from && paymentDate <= to;
      });
    }
    setFilteredPayments(filteredData);
  };

  useEffect(() => {
    filterData();
  }, [filterType, selectedYear, selectedMonth, selectedWeek, selectedDay, customRange]);

  const filterByCustomDate = () => {
    if (customRange.from && customRange.to) {
      const from = new Date(customRange.from);
      const to = new Date(customRange.to);
      setFilteredPayments(
        payments.filter((p) => {
          const paymentDate = new Date(p.date);
          return paymentDate >= from && paymentDate <= to;
        })
      );
      setFilterType("custom");
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredPayments);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "payments.csv");
  };

  const yearlyData = payments.reduce((acc, payment) => {
    const year = new Date(payment.date).getFullYear();
    acc[year] = (acc[year] || 0) + parseFloat(payment.amount);
    return acc;
  }, {});

  const chartData = Object.keys(yearlyData).map((year) => ({
    year,
    amount: yearlyData[year],
  }));

  return (
    <div className={darkMode ? "bg-gray-900 text-white p-6" : "p-6"}>
      <div className="flex justify-between mb-4">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-wide uppercase border-b-4 border-blue-500 pb-2 text-center sm:text-left">
          💰 Payment History
        </h1>


        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded bg-gray-700 text-white flex items-center justify-center w-10 h-10"
        >
          {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-300" />}
        </button>
      </div>

      <div className={`mb-4 p-4 rounded shadow-md text-lg font-bold ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
        Total Payments Received: ${totalPaymentsReceived.toFixed(2)}
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

      {filterType === "year" && (
        <select onChange={(e) => setSelectedYear(e.target.value)} className={`p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}>
          <option value="">Select Year</option>
          {uniqueYears.map((year) => (
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
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <table className="w-full border-collapse border mt-4">
        <thead>
          <tr className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"} text-left`}>
            <th className="border p-2">Date</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment.id} className="text-center">
              <td className="border p-2">{new Date(payment.date).toLocaleDateString()}</td>
              <td className="border p-2">${payment.amount}</td>
              <td className="border p-2">{payment.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;