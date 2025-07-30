import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    FaUniversity, 
    FaClipboardList, 
    FaBell, 
    FaUserCircle, 
    FaGraduationCap,
    FaMoneyBillWave,
    FaPassport,
    FaTimes,
    FaPaperclip,
    FaPaperPlane,
    FaTrash
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Navbar from "./NavbarStudent";
import Footer from "./Footer";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/StudentDsh.css";

export default function StudentDashboard() {
    const userEmail = localStorage.getItem("userEmail") || "";
    const navigate = useNavigate();
    const loggedInEmail = localStorage.getItem("userEmail");
    
    // State variables
    const [offers, setOffers] = useState([]);
    const [notifications, setNotifications] = useState(0);
    const [profileImage, setProfileImage] = useState(() => {
        return localStorage.getItem(`profileImage_${loggedInEmail}`) || null;
    });
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [openChat, setOpenChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const chatContainerRef = useRef(null);

    const receiverEmail = localStorage.getItem("userEmail");
    const senderEmail = openChat ? openChat.email : null;

    // Fetch messages
    useEffect(() => {
        if (openChat) {
            fetchMessages();
            const interval = setInterval(fetchMessages, 3000);
            return () => clearInterval(interval);
        }
    }, [openChat]);

    const fetchMessages = async () => {
        if (!receiverEmail || !senderEmail) {
            console.log("fetchMessages: Missing emails - receiverEmail:", receiverEmail, "senderEmail:", senderEmail);
            return;
        }
        
        try {
            // Use consistent parameter naming - student as sender, admin as receiver for fetch
            const url = `http://localhost:5000/api/messages?sender=${receiverEmail}&receiver=${senderEmail}`;
            console.log("fetchMessages: Calling API with URL:", url);
            const response = await fetch(url);
            const data = await response.json();
            
            console.log("Student fetching messages - Response:", data); // Debug log
            console.log("Number of messages received:", data?.length || 0);
            setMessages(data || []);
            localStorage.setItem(`chatMessages_${receiverEmail}`, JSON.stringify(data || []));
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = async () => {
        if (!receiverEmail || !senderEmail || (!message.trim() && !selectedFile)) return;

        const formData = new FormData();
        // ✅ FIXED: Student should be sender, Admin should be receiver
        formData.append("sender_email", receiverEmail); // Student's email
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
                sender_email: receiverEmail, // Student's email
                receiver_email: senderEmail, // Admin's email
                message,
                file_url: data.file_url || null, // ✅ Ensure file_url is included
            };

            setMessages((prev) => [...prev, newMessage]);
            localStorage.setItem(`chatMessages_${receiverEmail}`, JSON.stringify([...messages, newMessage]));

            setMessage("");
            setSelectedFile(null); // ✅ Clear file input
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        }
    };

    const handleDeleteChat = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/delete-messages", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    senderEmail: openChat.email,
                    receiverEmail: receiverEmail,
                }),
            });
            
            if (response.ok) {
                setMessages([]);
                setShowModal(false);
                toast.success("Chat history deleted successfully!");
            }
        } catch (error) {
            console.error("Error deleting chat:", error);
            toast.error("Failed to delete chat history.");
        }
    };

    // Fetch user data
    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:5000/api/user?email=${userEmail}`)
            .then(res => {
                setFullName(res.data.fullname);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching user data:", err);
                setError("User not found.");
                setLoading(false);
            });
    }, []);

    // Fetch unread messages count
    const fetchUnreadCount = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/unread-messages/${receiverEmail}`);
            const data = await res.json();
            setNotifications(data.unreadCount);
        } catch (error) {
            console.error("Error fetching unread messages:", error);
        }
    };

    // Fetch unread count every 5 seconds
    useEffect(() => {
        if (receiverEmail) {
            fetchUnreadCount();
            const interval = setInterval(fetchUnreadCount, 5000);
            return () => clearInterval(interval);
        }
    }, [receiverEmail]);

    // Chat functions
    const handleOpenChat = async (user) => {
        setOpenChat(user);
        try {
            const response = await fetch("http://localhost:5000/api/read-messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ senderEmail: user.email, receiverEmail: receiverEmail }),
            });
            if (response.ok) {
                setNotifications(0);
                fetchUnreadCount();
            }
        } catch (error) {
            console.error("Error marking messages as read:", error);
        }
    };

    const handleImageUpload = (e) => {
        const loggedInEmail = localStorage.getItem("userEmail");
        if (e.target.files && e.target.files[0] && loggedInEmail) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64Image = reader.result;
                localStorage.setItem(`profileImage_${loggedInEmail}`, base64Image);
                setProfileImage(base64Image);
            };
        }
    };

    const handleRemoveProfileImage = () => {
        const loggedInEmail = localStorage.getItem("userEmail");
        if (loggedInEmail) {
            localStorage.removeItem(`profileImage_${loggedInEmail}`);
            setProfileImage(null);
        }
    };

    const handleSaveChanges = async () => {
        if (!fullName || !email || !phoneNumber) {
            toast.error("Please fill in all required fields before saving.");
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
                toast.success("Profile saved successfully!");
                setIsProfileModalOpen(false);
            } else {
                toast.error(`All fields are required. ${result.error}`);
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Error saving profile. Try again later!");
        }
    };

    if (loading) return <div className="loading-container"><p>Loading...</p></div>;
    if (error) return <div className="error-container"><p className="text-red-500">{error}</p></div>;

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
            
            {/* Main Dashboard Content */}
            <div className="dashboard-content">
                {/* Header Section */}
                <div className="dashboard-header">
                    <div className="header-content">
                        <div className="welcome-section">
                            <h1 className="dashboard-title">
                                📚 Welcome to Your Dashboard
                            </h1>
                            <p className="dashboard-subtitle">
                                Manage your <span className="highlight">courses, applications,</span> and track your progress effortlessly!
                            </p>
                            <div className="title-underline"></div>
                        </div>

                        <div className="header-actions">
                            <button
                                className="notification-btn"
                                onClick={() => handleOpenChat({ email: "admin@planstudies.com", name: "Admin" })}
                            >
                                <FaBell />
                                {notifications > 0 && (
                                    <span className="notification-badge">
                                        {notifications}
                                    </span>
                                )}
                            </button>

                            <Link to="/course-finder">
                                <button className="action-btn primary">Find Courses</button>
                            </Link>
                            <Link to="/enroll">
                                <button className="action-btn primary">Enroll Now</button>
                            </Link>
                            <Link to="/fees">
                                <button className="action-btn primary">Pay Fees</button>
                            </Link>
                            <Link to="/request">
                                <button className="action-btn success">+ Request Course Options</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="profile-card">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="profile-content"
                        onClick={() => setIsProfileModalOpen(true)}
                    >
                        <div className="profile-info">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="profile-image"
                                />
                            ) : (
                                <FaUserCircle className="default-profile-icon" />
                            )}
                            <div className="profile-text">
                                <h2 className="profile-name">Welcome, {fullName}</h2>
                                <p className="profile-subtitle">Check your latest updates below</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Dashboard Stats Grid */}
                <div className="stats-grid">
                    {/* Applications Card */}
                    <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
                        <div className="stat-header">
                            <span className="stat-icon">📋</span>
                            <div className="stat-content">
                                <h3 className="stat-title">Applications</h3>
                                <div className="stat-value">0</div>
                            </div>
                        </div>
                        <select className="stat-filter">
                            <option>All Applications</option>
                            <option>On hold</option>
                            <option>Submitted</option>
                            <option>Rejected</option>
                        </select>
                    </motion.div>

                    {/* Offers Card */}
                    <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
                        <div className="stat-header">
                            <span className="stat-icon">🎓</span>
                            <div className="stat-content">
                                <h3 className="stat-title">Offers</h3>
                                <div className="stat-value">0</div>
                            </div>
                        </div>
                        <select className="stat-filter">
                            <option>All Offers</option>
                            <option>Conditional</option>
                            <option>Unconditional</option>
                        </select>
                    </motion.div>

                    {/* Payment Status Card */}
                    <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
                        <div className="stat-header">
                            <span className="stat-icon">💰</span>
                            <div className="stat-content">
                                <h3 className="stat-title">Payment Status</h3>
                                <div className="stat-value">0</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Additional Stats */}
                    {[
                        { title: "Visas Received", icon: "✅" },
                        { title: "Visas Rejected", icon: "❌" },
                        { title: "Non-Enrollments", icon: "🚫" },
                        { title: "Deferrals", icon: "⏸️" }
                    ].map((stat, index) => (
                        <motion.div key={index} className="stat-card" whileHover={{ scale: 1.05 }}>
                            <div className="stat-header">
                                <span className="stat-icon">{stat.icon}</span>
                                <div className="stat-content">
                                    <h3 className="stat-title">{stat.title}</h3>
                                    <div className="stat-value">0</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="modal-close"
                            onClick={() => setIsProfileModalOpen(false)}
                        >
                            <IoMdClose />
                        </button>

                        <div className="modal-header">
                            <h2>Edit Profile</h2>
                        </div>

                        <div className="profile-image-section">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="modal-profile-image"
                                />
                            ) : (
                                <FaUserCircle className="modal-default-icon" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="file-input"
                                onChange={handleImageUpload}
                            />
                            {profileImage && (
                                <button
                                    onClick={handleRemoveProfileImage}
                                    className="remove-photo-btn"
                                >
                                    Remove Photo
                                </button>
                            )}
                        </div>

                        <div className="form-fields">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="save-btn"
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Component - Structure from AdminDashboard */}
            {openChat && (
                <div className="chat-modal">
                    <div className="chat-header">
                        <h3 className="chat-title">💬 Chat with Admin</h3>
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

                    <div ref={chatContainerRef} className="chat-messages">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => {
                                const adminEmails = ["admin@planstudies.com", "yashd@gmail.com", "usadmin@gmail.com"];
                                const isAdminMessage = adminEmails.includes(msg.sender_email);
                                
                                return (
                                    <div key={index} className={`message ${isAdminMessage ? "admin" : "user"}`}>
                                        <div className={`message-bubble ${isAdminMessage ? "admin" : "user"}`}>
                                            {msg.message}
                                            {msg.file_url && (
                                                <div className="file-attachment">
                                                    <a
                                                        href={`http://localhost:5000${msg.file_url}`}
                                                        download
                                                        className="file-link"
                                                    >
                                                        <FaPaperclip />
                                                        <span>{msg.file_url.split("/").pop()}</span>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <span className="empty-state">No messages yet. Start the conversation!</span>
                        )}
                    </div>

                    <div className="chat-input-container">
                        {selectedFile && (
                            <div className="file-preview">
                                <div className="file-info">
                                    <FaPaperclip />
                                    <span>{selectedFile.name}</span>
                                </div>
                                <button
                                    onClick={() => setSelectedFile(null)}
                                    className="file-remove"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        <div className="chat-input-wrapper">
                            <label className="file-input-label">
                                <FaPaperclip />
                                <input
                                    type="file"
                                    className="file-input"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />
                            </label>
                            <input
                                type="text"
                                className="chat-input"
                                placeholder={selectedFile ? "Type a message to send with file..." : "Type a message..."}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button
                                className="chat-send-btn"
                                onClick={handleSendMessage}
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Chat Confirmation Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-icon">
                            <FaTrash />
                        </div>
                        <h3 className="modal-title">Delete Chat History</h3>
                        <p className="modal-message">
                            Are you sure you want to delete this chat history? This action cannot be undone.
                        </p>
                        <div className="modal-actions">
                            <button onClick={handleDeleteChat} className="btn btn-confirm">
                                Yes, Delete
                            </button>
                            <button onClick={() => setShowModal(false)} className="btn btn-cancel">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            </div>
            <Footer />
        </>
    );
}
