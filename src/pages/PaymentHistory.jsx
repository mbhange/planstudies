import React, { useState, useEffect } from "react";
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
import { Download } from "lucide-react";
import Navbar from "../components/NavbarStudent";
import Footer from "../components/Footer";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [filterType, setFilterType] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [customRange, setCustomRange] = useState({ from: "", to: "" });
  
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
    axios.get("http://localhost:5000/api/payments").then((res) => {
      setPayments(res.data);
      setFilteredPayments(res.data);
    });
  }, []);

  const totalPaymentsReceived = payments.reduce(
    (sum, payment) => sum + parseFloat(payment.amount),
    0
  );

  const filterData = () => {
    let filteredData = payments;
    if (filterType === "year" && selectedYear) {
      filteredData = payments.filter(
        (p) => new Date(p.date).getFullYear() === parseInt(selectedYear)
      );
    } else if (filterType === "month" && selectedMonth) {
      filteredData = payments.filter(
        (p) =>
          new Date(p.date).getFullYear() === parseInt(selectedYear) &&
          new Date(p.date).getMonth() + 1 === parseInt(selectedMonth)
      );
    } else if (filterType === "week" && selectedWeek) {
      const startOfWeek = new Date(selectedWeek);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      filteredData = payments.filter(
        (p) => new Date(p.date) >= startOfWeek && new Date(p.date) <= endOfWeek
      );
    } else if (filterType === "day" && selectedDay) {
      filteredData = payments.filter(
        (p) => new Date(p.date).toISOString().split("T")[0] === selectedDay
      );
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
  }, [
    filterType,
    selectedYear,
    selectedMonth,
    selectedWeek,
    selectedDay,
    customRange,
  ]);

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

  const clearAllFilters = () => {
    setFilterType(null);
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedWeek("");
    setSelectedDay("");
    setCustomRange({ from: "", to: "" });
    setFilteredPayments(payments); // Show all payments
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

  // Create chart data with all years from 2020-2025
  const chartData = availableYears.map((year) => ({
    year: year.toString(),
    amount: yearlyData[year] || 0,
  }));

  return (
    <>
      <Navbar />
      <div className="min-h-screen font-sans bg-gray-50 text-white p-4">
        <div className="container mx-auto p-6 max-w-7xl ">
          {/* Header Section */}
          <div
            className="mb-8 p-6 rounded-2xl shadow-lg"
            style={{ background: "linear-gradient(135deg, #1b73b9, #2980b9)" }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-3">
                    Payment History
                  </h1>
                  <p className="text-blue-100 mt-2 text-sm md:text-base">
                    Track and analyze payment transactions over time
                  </p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold">
                    ${totalPaymentsReceived.toFixed(2)}
                  </div>
                  <div className="text-blue-100 text-sm">Total Payments Received</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white border-gray-200 mb-8 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Options</h2>

            {/* Filter Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
              {["year", "month", "week", "day", "custom"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                    filterType === type
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
              <button
                onClick={clearAllFilters}
                className="px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
              >
                Clear All
              </button>
            </div>

            {/* Date Inputs */}
            <div className="space-y-4">
              {filterType === "year" && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
                    className="w-full sm:w-auto px-4 py-3 rounded-xl border bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
                    className="w-full sm:w-auto px-4 py-3 rounded-xl border bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}

              {filterType === "day" && (
                <input
                  type="date"
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}

              {filterType === "custom" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Custom Date Range</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="date"
                      value={customRange.from}
                      onChange={(e) =>
                        setCustomRange({ ...customRange, from: e.target.value })
                      }
                      placeholder="From Date"
                      className="flex-1 px-4 py-3 rounded-xl border bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                    <input
                      type="date"
                      value={customRange.to}
                      onChange={(e) =>
                        setCustomRange({ ...customRange, to: e.target.value })
                      }
                      placeholder="To Date"
                      className="flex-1 px-4 py-3 rounded-xl border bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                    <button
                      onClick={filterByCustomDate}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors duration-200 transform hover:scale-105"
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Export Button */}
          <div className="mb-8">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Download className="w-5 h-5" />
              Export to CSV
            </button>
          </div>

          {/* Chart Section */}
          <div className="bg-white border-gray-200 mb-8 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Payment Trends by Year
            </h2>
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
                  <Legend wrapperStyle={{ color: '#000000' }} />
                  <Bar
                    dataKey="amount"
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                    name="Payment Amount ($)"
                  />
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#1e40af"
                        stopOpacity={0.7}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Payment Records</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Payment Method
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment, index) => (
                      <tr
                        key={payment.id}
                        className={`transition-colors duration-200 hover:bg-gray-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {new Date(payment.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          ${parseFloat(payment.amount).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {payment.payment_method}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <div className="text-4xl mb-2">📄</div>
                          <p className="text-lg font-medium">
                            No payments found
                          </p>
                          <p className="text-sm">
                            Try adjusting your filter criteria
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentHistory;
