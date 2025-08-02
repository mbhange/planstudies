import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaUserCircle,
  FaClipboardList,
  FaSearch,
  FaFileAlt,
  FaUserGraduate,
  FaArrowRight,
} from "react-icons/fa";
import Navbar from "./NavbarStudent";
import Footer from "./Footer";
import { IoClose } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/AgentDashboard.css";

export default function StudentDashboard() {
  const userEmail = localStorage.getItem("userEmail") || "";
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [notifications, setNotifications] = useState(0);
  const [selectedUniversity, setSelectedUniversity] = useState("University A");
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [studentName, setStudentName] = useState("Student");
  const chatContainerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Get receiver email from localStorage (receiver is logged in)
  const receiverEmail = localStorage.getItem("userEmail"); // Logged-in user (Receiver)
  const senderEmail = openChat ? openChat.email : null;

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/unread-messages/${receiverEmail}`
      );
      const data = await res.json();
      setNotifications(data.unreadCount);
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  };

  // Fetch unread count every 5 seconds
  useEffect(() => {
    if (receiverEmail) {
      fetchUnreadCount(); // Initial fetch
      const interval = setInterval(fetchUnreadCount, 5000); // Every 5 seconds
      return () => clearInterval(interval);
    }
  }, [senderEmail, receiverEmail]);

  const fetchMessages = async () => {
    if (!receiverEmail || !senderEmail) return;

    try {
      // Use consistent parameter naming - agent as sender, admin as receiver for fetch
      const response = await fetch(
        `http://localhost:5000/api/messages?sender=${receiverEmail}&receiver=${senderEmail}`
      );
      const data = await response.json();

      console.log("Agent fetching messages:", data); // Debug log
      setMessages(data || []);
      localStorage.setItem(
        `chatMessages_${receiverEmail}`,
        JSON.stringify(data || [])
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // ✅ Fetch Messages on Component Mount & Polling
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [receiverEmail, senderEmail]);

  // ✅ Load Messages from Local Storage on Page Load
  useEffect(() => {
    if (!receiverEmail) return;

    const storedMessages = localStorage.getItem(
      `chatMessages_${receiverEmail}`
    );
    setMessages(storedMessages ? JSON.parse(storedMessages) : []);
  }, [receiverEmail]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ Send Message to Backend
  const handleSendMessage = async () => {
    if (!receiverEmail || !senderEmail || (!message.trim() && !selectedFile))
      return;

    const formData = new FormData();
    // ✅ FIXED: Agent should be sender, Admin should be receiver
    formData.append("sender_email", receiverEmail); // Agent's email
    formData.append("receiver_email", senderEmail); // Admin's email
    formData.append("message", message);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        body: formData, // ✅ Use FormData for file uploads
      });

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();

      const newMessage = {
        sender_email: receiverEmail, // Agent's email
        receiver_email: senderEmail, // Admin's email
        message,
        file_url: data.file_url || null, // ✅ Ensure file_url is included
      };

      setMessages((prev) => [...prev, newMessage]);
      localStorage.setItem(
        `chatMessages_${receiverEmail}`,
        JSON.stringify([...messages, newMessage])
      );

      setMessage("");
      setSelectedFile(null); // ✅ Clear file input
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };
  // ✅ Scroll Chat to Bottom
  const scrollToBottom = () => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Open Chat Window
  // const handleOpenChat = (user) => {
  //   setOpenChat(user);
  //   fetchMessages();
  // };
  const handleOpenChat = async (user) => {
    setOpenChat(user); // Open the chat with the selected user
    try {
      // Mark messages as read in the backend
      const response = await fetch("http://localhost:5000/api/read-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderEmail: user.email,
          receiverEmail: receiverEmail,
        }), // user.email is sender, agent is receiver
      });

      if (response.ok) {
        // Only reset notifications after successful API call
        setNotifications(0);
        fetchUnreadCount(); // Refresh unread count from server
      }

      fetchMessages(); // Fetch latest messages to update UI
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const handleDeleteChat = async () => {
    if (!receiverEmail || !senderEmail) return;

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: senderEmail, receiver: receiverEmail }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages([]);

        localStorage.removeItem(`chatMessages_${receiverEmail}`);

        toast.success("Chat history deleted successfully!");
      } else {
        toast.error("Failed to delete chat.");
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("An error occurred while deleting chat.");
    }

    setShowModal(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/student-dashboard?university=${selectedUniversity}`
        );
        const data = await response.json();
        setOffers(data.offers);
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedUniversity]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      console.log("Selected Image:", file);
    } else {
      console.error("No file selected!");
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(null); // Reset state
    // document.getElementById("profileImageInput").value = "";
  };

  console.log("Full Name:", fullName);
  console.log("Email:", email);
  console.log("Phone Number:", phoneNumber);
  console.log("Profile Image:", profileImage);

  const handleSaveChanges = async () => {
    if (!fullName || !email || !phoneNumber) {
      alert("Please fill in all required fields before saving.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await fetch("http://localhost:5000/api/add-profile", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Profile saved successfully:", result);
        alert("Profile saved successfully! ✅");
        setIsOpen(false); // Close modal
      } else {
        console.error("Profile addition failed:", result.error);
        alert(`Failed to save profile! ❌ ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Try again later!");
    }
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail"); // Get email from localStorage

    if (!userEmail) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/user?email=${userEmail}`)
      .then((res) => {
        setFullName(res.data.fullname);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("User not found.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div
      className="dashboard-container"
      style={{
        // background: "linear-gradient(135deg, #1b73b9, #2980b9)",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className="dashboard-content">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="welcome-section">
              <h1 className="dashboard-title">🏢 Agent Dashboard</h1>
              <p className="dashboard-subtitle">
                Manage your <span className="highlight">students</span> and{" "}
                <span className="highlight">applications,</span> and track
                progress effortlessly!
              </p>
              <div className="title-underline"></div>
            </div>

            <div className="header-actions">
              <button
                className="notification-btn"
                onClick={() =>
                  handleOpenChat({
                    email: "admin@planstudies.com",
                    name: "Admin",
                  })
                }
              >
                <FaBell size={24} />
                {notifications > 0 && (
                  <span className="notification-badge">{notifications}</span>
                )}
              </button>
              <Link to="/fees">
                <button className="action-btn primary">Pay Fees</button>
              </Link>

              <Link to="/request">
                <button className="action-btn success">
                  + Request Course Options
                </button>
              </Link>

              <Link to="/docs">
                <button className="action-btn success">
                  + Add New Student
                </button>
              </Link>
            </div>
          </div>
        </div>

        {openChat && (
          <div className="fixed bottom-10 right-10 w-96 z-50 bg-white/30 backdrop-blur-lg shadow-2xl rounded-xl p-4 border border-white/30 transition-all duration-500 transform scale-100 ">
            <div className="flex justify-between items-center mb-3 border-b pb-2">
              <h3 className="font-bold text-lg text-gray-900">
                💬 Chat with Admin
              </h3>
              <div className="flex space-x-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowModal(true)}
                >
                  <FaTrash size={20} />
                </button>
                {showModal && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded shadow-lg">
                      <h2 className="text-lg font-semibold">
                        Confirm Deletion
                      </h2>
                      <p>Are you sure you want to delete this chat?</p>

                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          className="px-4 py-2 bg-gray-300 rounded"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded"
                          onClick={handleDeleteChat}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setOpenChat(null)}
                  className="text-red-600 hover:text-red-800"
                >
                  <IoMdClose size={22} />
                </button>
              </div>
            </div>

            <div
              ref={chatContainerRef}
              className="h-64 overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-4 mb-4 space-y-3 border border-slate-200"
            >
              {messages.length > 0 ? (
                messages.map((msg, index) => {
                  const loggedInAgentEmail = localStorage.getItem("userEmail"); // Get logged-in agent email
                  // Fix: Check if message is from admin emails (properly)
                  const adminEmails = [
                    "admin@planstudies.com",
                    "yashd@gmail.com",
                    "usadmin@gmail.com",
                    "europe@gmail.com",
                    "canada@gmail.com",
                    "uk@gmail.com",
                    "aus@gmail.com",
                  ];
                  const isAdminMessage = adminEmails.includes(msg.sender_email);

                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isAdminMessage ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div className="max-w-xs lg:max-w-md">
                        {/* Message bubble */}
                        <div
                          className={`px-4 py-3 rounded-2xl shadow-lg ${
                            isAdminMessage
                              ? "bg-white text-slate-800 border border-slate-200"
                              : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {msg.message}
                          </p>

                          {/* File attachment */}
                          {msg.file_url && (
                            <div className="mt-3 p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                              <a
                                href={`http://localhost:5000${msg.file_url}`}
                                download
                                className="text-current hover:opacity-80 flex items-center justify-between transition-all duration-200"
                              >
                                <div className="flex items-center space-x-2">
                                  <FaPaperclip className="text-sm" />
                                  <span className="text-xs font-medium truncate">
                                    {msg.file_url.split("/").pop()}
                                  </span>
                                </div>
                                <span className="text-xs bg-white/30 px-2 py-1 rounded-full ml-2">
                                  Download
                                </span>
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Timestamp */}
                        <div
                          className={`text-xs text-slate-500 mt-1 px-1 ${
                            isAdminMessage ? "text-left" : "text-right"
                          }`}
                        >
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-6xl mb-4 text-slate-300">💬</div>
                    <p className="text-slate-500 text-sm">
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className=" relative flex flex-col p-2  w-full">
              {/* Show selected file name above input */}
              {selectedFile && (
                <div className="flex items-center justify-between bg-blue-50 p-2 rounded-lg mb-2">
                  <div className="flex items-center text-blue-700 text-sm">
                    <FaPaperclip className="mr-2" size={14} />
                    <span>{selectedFile.name}</span>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="relative flex items-center">
                <label
                  className=" absolute left-3 cursor-pointer text-gray-700 hover:text-gray-900 transition-all duration-200"
                  style={{ marginLeft: "5px" }}
                >
                  <FaPaperclip size={20} />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400 pl-10 pr-12"
                  placeholder={
                    selectedFile
                      ? "Type a message to send with file..."
                      : "Type a message..."
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <button
                  className="absolute right-3 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
                  onClick={handleSendMessage}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Card */}
        <div className="px-6 pb-6">
          <div className="agent-content">
            <div className="p-6 flex flex-wrap lg:flex-nowrap items-center gap-x-6 lg:gap-x-12 justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <div
                  className="p-4 flex items-center gap-4"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  {profileImage ? (
                    <img
                      src={
                        typeof profileImage === "string"
                          ? profileImage
                          : URL.createObjectURL(profileImage)
                      }
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                  ) : (
                    <FaUserCircle className="text-5xl text-blue-500" />
                  )}

                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Welcome, {fullName}
                    </h2>
                    <p className="text-gray-600">
                      Check your latest updates below
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Profile Management Modal */}
              {isOpen && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <button
                      className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <IoClose size={24} />
                    </button>

                    {/* Profile Picture */}
                    <div className="text-center mb-4">
                      {profileImage ? (
                        <img
                          src={
                            typeof profileImage === "string"
                              ? profileImage
                              : URL.createObjectURL(profileImage)
                          }
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover border"
                        />
                      ) : (
                        <FaUserCircle className="text-5xl text-blue-500" />
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        className="mt-2 text-sm"
                        onChange={(e) => handleImageUpload(e)}
                      />
                      {profileImage && (
                        <button
                          onClick={handleRemovePhoto}
                          className="mt-2 text-red-500 text-sm hover:text-red-600"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-gray-700 font-semibold block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="border rounded-lg px-3 py-2 w-full"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 font-semibold block">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border rounded-lg px-3 py-2 w-full"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 font-semibold block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="border rounded-lg px-3 py-2 w-full"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="mt-4 text-center">
                      <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Filters Section */}
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-center gap-4 mb-4">
                  {/* Date Inputs */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="w-full sm:w-1/2">
                      <label className="filter-label">From Date:</label>
                      <input type="date" className="filter-input" />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="filter-label">To Date:</label>
                      <input type="date" className="filter-input" />
                    </div>
                  </div>

                  {/* Country Selection */}
                  <div className="w-full">
                    <label className="filter-label">Select Country:</label>
                    <select className="filter-select">
                      <option value="">All Countries</option>
                      <option>USA</option>
                      <option>Canada</option>
                      <option>UK</option>
                      <option>Australia</option>
                      <option>New Zealand</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Italy</option>
                      <option>Dubai</option>
                      <option>Finland</option>
                      <option>Singapore</option>
                      <option>Poland</option>
                      <option>Cyprus</option>
                      <option>Malta</option>
                      <option>Ireland</option>
                    </select>
                  </div>

                  {/* Intake Selection */}
                  <div className="w-full">
                    <label className="filter-label">Select Intake:</label>
                    <select className="filter-select">
                      <option value="">All Intakes</option>
                      <option>Spring</option>
                      <option>Fall</option>
                      <option>Winter</option>
                    </select>
                  </div>

                  {/* Year Selection */}
                  <div className="w-full">
                    <label className="filter-label">Select Year:</label>
                    <select className="filter-select">
                      <option value="">All Years</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                    </select>
                  </div>
                </div>

                {/* Apply Filter Button Below */}
                <div className="w-full">
                  <button className="action-btn primary w-full">
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="agent-stats-container">
          <div className="agent-stats">
            {/* Application Status Box */}
            <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <FaClipboardList
                    className="mr-2"
                    style={{ color: "#60a5fa" }}
                  />
                  <span className="stat-title">Applications</span>
                  <div className="ml-2 mt-2" style={{ marginTop: "13px" }}>
                    <select
                      className="filter-select"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <option>All Applications</option>
                      <option>On hold</option>
                      <option>Submitted</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                </div>
                <p className="stat-value mt-4">0</p>
              </div>
            </motion.div>

            {/* Offers Box */}
            <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <FaClipboardList
                    className="mr-2"
                    style={{ color: "#60a5fa" }}
                  />
                  <span className="stat-title">Offers</span>
                  <div className="ml-2 mt-2" style={{ marginTop: "13px" }}>
                    <select
                      className="filter-select"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <option>Offers</option>
                      <option>Conditional</option>
                      <option>Unconditional</option>
                    </select>
                  </div>
                </div>
                <p className="stat-value mt-4">0</p>
              </div>
            </motion.div>

            {/* Payment Box */}
            <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
              <div className="p-4">
                <h3 className="stat-title mb-2 flex items-center">
                  <FaUniversity className="mr-2" /> Payment Status
                </h3>
                <p className="stat-value">0</p>
              </div>
            </motion.div>

            {/* Additional Sections (Visa, Non-Enrollments, etc.) */}
            {[
              "Visas Received",
              "Visas Rejected",
              "Non-Enrollments",
              "Deferrals",
            ].map((title, index) => (
              <motion.div
                key={index}
                className="stat-card"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-4">
                  <h3 className="stat-title mb-2 flex items-center">
                    <FaUniversity className="mr-2" /> {title}
                  </h3>
                  <p className="stat-value">0</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="action-cards-container">
          <div className="action-cards-grid">
            {/* Search Programs Card */}
            <motion.div className="action-card" whileHover={{ scale: 1.05 }}>
              <div className="action-card-content">
                <div className="flex items-center gap-3 mb-3">
                  <FaSearch className="text-3xl text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Search Programs
                  </h3>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Discover 150,000+ programs with PlanStudies. Filter, compare,
                  and apply to multiple institutions effortlessly.
                </p>
                <Link to="/course-finder">
                  <div className="action-card-button">
                    <span>Explore Programs</span>
                    <FaArrowRight className="ml-2" />
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Students Card */}
            <motion.div className="action-card" whileHover={{ scale: 1.05 }}>
              <div className="action-card-content">
                <div className="flex items-center gap-3 mb-3">
                  <FaUserGraduate className="text-3xl text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Students
                  </h3>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Manage your students and track their application progress
                  efficiently.
                </p>
                <div className="space-y-2">
                  <Link to="/manage-students">
                    <div className="action-card-link">
                      <span>Manage Students</span>
                      <FaArrowRight className="ml-2 text-xs" />
                    </div>
                  </Link>
                  <Link to="/manage-applications">
                    <div className="action-card-link">
                      <span>Manage Applications</span>
                      <FaArrowRight className="ml-2 text-xs" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
