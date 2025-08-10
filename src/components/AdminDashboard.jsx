import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineExclamationCircle,
  HiCheck,
  HiX,
  HiExclamation,
} from "react-icons/hi";
import { Button, Modal, Toast } from "flowbite-react";
import Navbar from "../components/NavbarStudent";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import {
  FaPaperclip,
  FaPaperPlane,
  FaRegCommentDots,
  FaFileAlt,
  FaTrash,
  FaUsers,
  FaGraduationCap,
  FaUserTie,
  FaMoneyBillWave,
  FaCertificate,
  FaPassport,
  FaTimes
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const userEmail = localStorage.getItem("userEmail") || "";
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [openChat, setOpenChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [toastState, setToastState] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({}); // Object to store unread counts per user

  const adminEmail = localStorage.getItem("userEmail"); // Logged-in admin user
  const selectedUserEmail = openChat ? openChat.email : null; // Selected user to chat with

  const fetchUnreadCounts = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/unread-messages-admin/${adminEmail}`
      );
      const data = await res.json();
      setUnreadCounts(data.unreadCounts || {});
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  };

  // Fetch unread counts for all users every 5 seconds
  useEffect(() => {
    if (adminEmail) {
      fetchUnreadCounts();
      const interval = setInterval(fetchUnreadCounts, 5000);
      return () => clearInterval(interval);
    }
  }, [adminEmail]);

  const showToast = (message, type, success = false) => {
    setToastState({ show: true, message, type });
    setLoginSuccess(success);
  };

  const handleToastClose = () => {
    setToastState({ show: false, message: "", type: "" });
  };

  const fetchMessages = async () => {
    if (!selectedUserEmail || !adminEmail) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages?sender=${adminEmail}&receiver=${selectedUserEmail}`
      );
      const data = await response.json();
      setMessages(data || []);
      localStorage.setItem(
        `adminChat_${selectedUserEmail}`,
        JSON.stringify(data || [])
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    loadUsers();
    loadPayments();
  }, [selectedDate]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/payments");
        if (res && res.data) {
          setPayments(res.data);
          setFilteredPayments(res.data);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const totalPaymentsReceived = payments.reduce(
    (sum, payment) => sum + parseFloat(payment.amount),
    0
  );

  const loadUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/register");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const loadPayments = async () => {
    // Replace with actual API call for payments
    setPayments([]);
  };

  const handleRemoveUser = async () => {
    if (!selectedUserId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/register/${selectedUserId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user.id !== selectedUserId));
    } catch (error) {
      console.error("Error removing user:", error);
    }

    setOpenModal(false);
  };

  // const filteredUsers = users.filter(user => {
  //   return (
  //     user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (roleFilter === "all" || user.role === roleFilter)
  //   );
  // });

  // Removed duplicate user fetching - users are already loaded via loadUsers() in useEffect above
  // The /api/students endpoint doesn't include role information which breaks filtering and notifications

  // Apply Search & Role Filtering
  const filteredUsers = users.filter((user) => {
    return (
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (roleFilter === "all" || user.role === roleFilter)
    );
  });
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleOpenChat = async (user) => {
    setOpenChat(user); // Open the chat with the selected user
    try {
      // Mark messages as read in the backend
      await fetch("http://localhost:5000/api/read-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderEmail: user.email,
          receiverEmail: adminEmail,
        }), // user.email is sender, admin is receiver
      });

      // Clear unread count for this specific user
      setUnreadCounts((prev) => ({
        ...prev,
        [user.email]: 0,
      }));

      fetchMessages(); // Fetch latest messages to update UI
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  useEffect(() => {
    if (!selectedUserEmail || !adminEmail) return;

    const fetchMessages = async () => {
      try {
        const url = `http://localhost:5000/api/messages?sender=${adminEmail}&receiver=${selectedUserEmail}`;
        console.log("Admin fetchMessages: Calling API with URL:", url);
        console.log(
          "Admin fetchMessages: adminEmail:",
          adminEmail,
          "selectedUserEmail:",
          selectedUserEmail
        );

        const response = await fetch(url);
        const data = await response.json();

        console.log("Admin fetching messages - Response:", data); // Debug log
        console.log("Admin fetching messages - Count:", data?.length || 0);
        console.log("Admin fetching messages - For user:", selectedUserEmail);

        setMessages(data || []); // ✅ Store messages in state
        localStorage.setItem(
          `chatMessages_${selectedUserEmail}`,
          JSON.stringify(data || [])
        ); // ✅ Persist messages in local storage
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    // Set up periodic fetching to get new messages from students/agents
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedUserEmail, adminEmail]);

  // Load messages from local storage on refresh
  useEffect(() => {
    if (!selectedUserEmail) return;
    const storedMessages = localStorage.getItem(
      `chatMessages_${selectedUserEmail}`
    );
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [selectedUserEmail]);

  const handleSendMessage = async () => {
    if (!adminEmail || !selectedUserEmail) {
      console.error("Sender or receiver email is missing.");
      return;
    }

    if (!message.trim() && !selectedFile) {
      console.error("Cannot send an empty message without a file.");
      return;
    }

    const formData = new FormData();
    formData.append("sender_email", adminEmail);
    formData.append("receiver_email", selectedUserEmail);
    formData.append("message", message);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const data = await response.json();

      // ✅ Update messages in state and local storage
      const newMessages = [
        ...messages,
        {
          sender_email: adminEmail,
          receiver_email: selectedUserEmail,
          message,
          file_url: data.file_url || null,
        },
      ];
      setMessages(newMessages);
      localStorage.setItem(
        `chatMessages_${selectedUserEmail}`,
        JSON.stringify(newMessages)
      ); // ✅ Update local storage

      setMessage("");
      setSelectedFile(null);
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  // Scroll to Bottom when New Message Arrives
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll when messages change

  // Handle Viewing Documents
  const handleViewDocuments = (userId) => {
    console.log("Viewing documents for user ID:", userId);
    // Navigate to the documents page or fetch user documents here
  };

  const handleDeleteChat = async () => {
    if (!selectedUserEmail || !adminEmail) return;

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: adminEmail,
          receiver: selectedUserEmail,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // ✅ Clear chat from state
        setMessages([]);

        // ✅ Remove from local storage
        localStorage.removeItem(`chatMessages_${selectedUserEmail}`);

        // ✅ Clear unread count for this specific user after deletion
        setUnreadCounts((prev) => ({
          ...prev,
          [selectedUserEmail]: 0,
        }));

        // ✅ Refresh unread counts from server to ensure consistency
        fetchUnreadCounts();

        toast.success("Chat history deleted successfully!");
      } else {
        toast.error("Failed to delete chat.");
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("An error occurred while deleting chat.");
    }

    setShowModal(false); // Close modal after deletion
  };

  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalStudents = users.filter((user) => user.role === "student").length;
  const totalAgents = users.filter((user) => user.role === "agent").length;
  const navigate = useNavigate();

  return (
    <div 
      className="dashboard-container" 
      style={{ 
        background: 'linear-gradient(135deg, #1b73b9, #2980b9)', 
        minHeight: '100vh' 
      }}
    >
      <Navbar />
      <div className="dashboard-content">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="welcome-section">
              <h1 className="dashboard-title">
                🏢 Admin Dashboard
              </h1>
              <p className="dashboard-subtitle">
                Manage <span className="highlight">users, payments,</span> and track system analytics effortlessly!
              </p>
              <div className="title-underline"></div>
            </div>
            
            <div className="header-actions">
              <button 
                className="action-btn primary" 
                onClick={() => navigate("/payment-history")}
              >
                Payment History
              </button>
              <button 
                className="action-btn primary" 
                onClick={() => navigate("/students-history")}
              >
                Students History
              </button>
              <button 
                className="action-btn success" 
                onClick={() => navigate("/agents-history")}
              >
                Agents History
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Stats Grid */}
        <div className="stats-grid">
          {/* Total Payments Card */}
          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-header">
              <div className="stat-icon-container money">
                <FaMoneyBillWave className="stat-icon" />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">TOTAL PAYMENTS</h3>
                <div className="stat-value">${totalPaymentsReceived.toFixed(2)}</div>
              </div>
            </div>
          </motion.div>

          {/* Students Enrolled Card */}
          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-header">
              <div className="stat-icon-container student">
                <FaGraduationCap className="stat-icon" />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">STUDENTS ENROLLED</h3>
                <div className="stat-value">{totalStudents}</div>
              </div>
            </div>
          </motion.div>

          {/* Agents Enrolled Card */}
          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-header">
              <div className="stat-icon-container agent">
                <FaUserTie className="stat-icon" />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">AGENTS ENROLLED</h3>
                <div className="stat-value">{totalAgents}</div>
              </div>
            </div>
          </motion.div>

          {/* Total Users Card */}
          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-header">
              <div className="stat-icon-container users">
                <FaUsers className="stat-icon" />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">TOTAL USERS</h3>
                <div className="stat-value">{totalStudents + totalAgents}</div>
              </div>
            </div>
          </motion.div>

          {/* Offer Letters Card */}
          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-header">
              <div className="stat-icon-container offer">
                <FaCertificate className="stat-icon" />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">OFFER LETTERS</h3>
                <div className="stat-value">0</div>
              </div>
            </div>
          </motion.div>

          {/* Visa Approved Card */}
          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-header">
              <div className="stat-icon-container visa">
                <FaPassport className="stat-icon" />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">VISA APPROVED</h3>
                <div className="stat-value">0</div>
              </div>
            </div>
          </motion.div>

          {/* Visa Rejected Card */}
          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-header">
              <div className="stat-icon-container visa-rejected">
                <FaTimes className="stat-icon" />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">VISA REJECTED</h3>
                <div className="stat-value">0</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="admin-content">
          <div className="user-management-section">
            <h2 className="section-title">User Management</h2>
            
            <div className="filters-section">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="role-select"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="agent">Agents</option>
              </select>
            </div>

            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr className="table-header-row">
                    <th className="table-header-cell">Full Name</th>
                    <th className="table-header-cell">Phone Number</th>
                    <th className="table-header-cell">Email</th>
                    <th className="table-header-cell">Role</th>
                    <th className="table-header-cell">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <tr key={user.id} className="table-row">
                        <td className="table-cell font-medium text-gray-900">{user.fullname}</td>
                        <td className="table-cell">
                          <a
                            href={`tel:${user.phone_number}`}
                            className="phone-link"
                          >
                            {user.phone_number}
                          </a>
                        </td>
                        <td className="table-cell">
                          <a href={`mailto:${user.email}`} className="email-link">
                            {user.email}
                          </a>
                        </td>
                        <td className="table-cell">
                          <span className={`role-badge role-${user.role?.toLowerCase()}`}>
                            {user.role?.toUpperCase()}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="action-buttons">
                            <button
                              className="action-btn remove-btn"
                              onClick={() => {
                                setSelectedUserId(user.id);
                                setOpenModal(true);
                              }}
                            >
                              <FaTrash className="btn-icon" />
                              Remove
                            </button>
                            <button
                              onClick={() => handleOpenChat(user)}
                              className="action-btn chat-btn relative"
                            >
                              <FaRegCommentDots className="btn-icon" />
                              Chat
                              {unreadCounts[user.email] > 0 && (
                                <span className="notification-badge">
                                  {unreadCounts[user.email]}
                                </span>
                              )}
                            </button>
                            <button
                              onClick={() => handleViewDocuments(user.id)}
                              className="action-btn docs-btn"
                            >
                              <FaFileAlt className="btn-icon" />
                              Docs
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="table-cell text-center text-gray-500 py-8">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {openChat && (
              <div className="chat-modal">
                <div className="chat-header">
                  <h3 className="chat-title">
                    💬 Chat with {openChat.fullname}
                  </h3>
                  <div className="chat-actions">
                    <button
                      className="chat-action-btn"
                      onClick={() => setShowModal(true)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => setOpenChat(null)}
                      className="chat-action-btn"
                    >
                      <IoMdClose />
                    </button>
                  </div>
                </div>

                <div
                  ref={chatContainerRef}
                  className="h-56 overflow-y-auto border p-2 mb-3 flex flex-col space-y-2"
                >
                  {messages.length > 0 ? (
                    (() => {
                      console.log("Admin Dashboard - All messages:", messages);
                      console.log(
                        "Admin Dashboard - Current chat with:",
                        selectedUserEmail
                      );
                      console.log("Admin Dashboard - Admin email:", adminEmail);
                      return messages;
                    })().map((msg, index) => {
                      // Check if message is from admin (current logged-in user)
                      const isAdminMessage = msg.sender_email === adminEmail;
                      console.log(
                        `Admin Dashboard - Message ${index}:`,
                        msg.message,
                        "from:",
                        msg.sender_email,
                        "to:",
                        msg.receiver_email,
                        "isAdminMessage:",
                        isAdminMessage
                      );

                      return (
                        <div
                          key={index}
                          className={`flex ${
                            isAdminMessage ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            style={{
                              maxWidth: "70%",
                              padding: "10px",
                              borderRadius: "10px",
                              wordBreak: "break-word",
                              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                              backgroundColor: isAdminMessage
                                ? "#007bff"
                                : "#28a745",
                              color: "white",
                              textAlign: isAdminMessage ? "right" : "left",
                            }}
                          >
                            {msg.message}
                            {msg.file_url && (
                              <div className="mt-2 p-2 bg-white bg-opacity-20 rounded-lg">
                                <a
                                  href={`http://localhost:5000${msg.file_url}`}
                                  download
                                  className="text-white flex items-center justify-between hover:bg-white hover:bg-opacity-10 p-2 rounded transition-all"
                                >
                                  <div className="flex items-center">
                                    <FaPaperclip className="mr-2" />
                                    <span className="text-sm">
                                      {msg.file_url.split("/").pop()}
                                    </span>
                                  </div>
                                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                                    Download
                                  </span>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-gray-700 text-sm text-center">
                      No messages yet. Start the conversation!
                    </span>
                  )}
                </div>

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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700 text-white"
                  }`}
                >
                  Previous
                </button>
                <span className="px-3 py-1 bg-gray-200 rounded">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700 text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

            {/* Confirmation Modal */}
            <Modal
              show={openModal}
              size="md"
              onClose={() => setOpenModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to remove this user?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={handleRemoveUser}
                      className="bg-red-500 hover:bg-red-700 text-white transition duration-300"
                    >
                      Yes, I'm sure
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
          {toastState.show && (
            <div className="fixed bottom-4 left-4 flex flex-col gap-4">
              <Toast className="flex items-center w-full p-4">
                <div className="flex items-center">
                  <div
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg 
                      ${
                        toastState.type === "success"
                          ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
                          : ""
                      }
                      ${
                        toastState.type === "error"
                          ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                          : ""
                      }
                      ${
                        toastState.type === "warning"
                          ? "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200"
                          : ""
                      }
                    `}
                  >
                    {toastState.type === "success" && (
                      <HiCheck className="h-5 w-5" />
                    )}
                    {toastState.type === "error" && <HiX className="h-5 w-5" />}
                    {toastState.type === "warning" && (
                      <HiExclamation className="h-5 w-5" />
                    )}
                  </div>

                  {/* Message with extra margin-right for spacing */}
                  <div className="ml-4 text-sm font-normal flex-1">
                    {toastState.message}
                  </div>

                  {/* Cancel Button - Pushed Right */}
                  <button
                    onClick={handleToastClose}
                    className="ml-8 flex items-center hover:bg-gray-300 text-gray-600 px-2 py-1 rounded-md text-sm"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>
              </Toast>
            </div>
          )}
          <Footer />
        </div>
      );
    };
    
    export default AdminDashboard;
