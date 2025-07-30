import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUniversity, FaUserCircle, FaClipboardList } from "react-icons/fa";
import Navbar from "./NavbarStudent";
import Footer from "./Footer";
import { FaBell } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/StudentDsh.css";

export default function StudentDashboard() {
    const userEmail = localStorage.getItem("userEmail") || "";
    const navigate = useNavigate();
    const [offers, setOffers] = useState([]);
    const [notifications, setNotifications] = useState(0);
    const [receiveEmail, setReceiverEmail] = useState(userEmail);
    const [selectedUniversity, setSelectedUniversity] = useState("University A");
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // const [profileImage, setProfileImage] = useState(null);
    const loggedInEmail = localStorage.getItem("userEmail"); // Get logged-in user's email

    const [profileImage, setProfileImage] = useState(() => {
        return localStorage.getItem(`profileImage_${loggedInEmail}`) || null;
    });



    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [openChat, setOpenChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [studentName, setStudentName] = useState("Student");
    const [error, setError] = useState("");
    const chatContainerRef = useRef(null);
    const [file, setFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const receiverEmail = localStorage.getItem("userEmail");
    const senderEmail = openChat ? openChat.email : null;

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
            fetchUnreadCount(); // Initial fetch
            const interval = setInterval(fetchUnreadCount, 5000); // Every 5 seconds
            return () => clearInterval(interval);
        }
    }, [receiverEmail]);

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

    useEffect(() => {
        if (receiverEmail && senderEmail) {
            fetchMessages();
            const interval = setInterval(fetchMessages, 2000);
            return () => clearInterval(interval);
        }
    }, [receiverEmail, senderEmail]);

    useEffect(() => {
        if (!receiverEmail) return;

        const storedMessages = localStorage.getItem(`chatMessages_${receiverEmail}`);
        setMessages(storedMessages ? JSON.parse(storedMessages) : []);
    }, [receiverEmail]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

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

    const scrollToBottom = () => {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleOpenChat = async (user) => {
        setOpenChat(user); // Open the chat with the selected user
        try {
            // Mark messages as read in the backend
            const response = await fetch("http://localhost:5000/api/read-messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ senderEmail: user.email, receiverEmail: receiverEmail }), // user.email is sender, student is receiver
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


    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // const handleImageUpload = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         const file = e.target.files[0];

    //         // Convert file to Base64
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onloadend = () => {
    //             const base64Image = reader.result; // Base64 format
    //             setProfileImage(base64Image);
    //             localStorage.setItem("profileImage", base64Image); // Store in localStorage
    //         };

    //         console.log("Selected Image:", file);
    //     } else {
    //         console.error("No file selected!");
    //     }
    // };
    const handleImageUpload = (e) => {
        const loggedInEmail = localStorage.getItem("userEmail"); // Get logged-in user's email

        if (e.target.files && e.target.files[0] && loggedInEmail) {
            const file = e.target.files[0];

            // Convert file to Base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64Image = reader.result; // Convert to Base64

                // Store profile image with user's email as key
                localStorage.setItem(`profileImage_${loggedInEmail}`, base64Image);
                setProfileImage(base64Image);
            };

            console.log("Selected Image:", file);
        } else {
            console.error("No file selected or user not logged in!");
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
            // setMessage("Please fill in all required fields before saving.");
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
                toast.success("Profile saved successfully!");
                setIsOpen(false); // Close modal
            } else {
                console.error("Profile addition failed:", result.error);
                toast.error(`All fields are required. ${result.error}`);
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

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
                // ✅ Clear chat from state
                setMessages([]);

                // ✅ Remove from local storage
                localStorage.removeItem(`chatMessages_${receiverEmail}`);

                // ✅ Clear notification count after deletion
                setNotifications(0);

                // ✅ Refresh unread count from server to ensure consistency
                fetchUnreadCount();

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

    return (
        <div>
            <Navbar />

            {/* Header Section */}
            <div>
                <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-center sm:text-left space-y-3">
                        <h1 className="text-4xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 text-transparent bg-clip-text animate-pulse">
                            <span className="text-black">📚</span> Welcome to Your Dashboard
                        </h1>
                        <p className="text-base sm:text-lg text-gray-700 font-normal">
                            Manage your <span className="text-blue-600 font-medium">courses, applications,</span> and track your progress effortlessly!
                        </p>

                        <div className="h-1 w-24 bg-blue-600 rounded-full mx-auto sm:mx-0"></div>
                    </div>

                    <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 mt-4 sm:mt-0">
                        <button
                            className="relative bg-gray-200 p-2 rounded-full"
                            onClick={() => handleOpenChat({ email: "admin@planstudies.com", name: "Admin" })}
                        >
                            <FaBell className="text-gray-700" size={24} />
                            {notifications > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {notifications}
                                </span>
                            )}
                        </button>


                        {openChat && (
                            <div className="fixed bottom-10 right-10 w-96 z-50 bg-white shadow-lg rounded-lg p-4 border transition-all duration-500">

                                <div className="flex justify-between items-center mb-3 border-b pb-2">
                                    <h3 className="font-bold text-lg text-gray-900">💬 Chat with Admin</h3>
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
                                                    <h2 className="text-lg font-semibold">Confirm Deletion</h2>
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

                                {/* <div
                                    ref={chatContainerRef}
                                    className="h-56 overflow-y-auto border p-2 mb-3 flex flex-col space-y-2"
                                >
                                    {messages.length > 0 ? (
                                        messages
                                            .filter(
                                                (msg) =>
                                                    (msg.sender_email === receiverEmail && msg.receiver_email === senderEmail) ||
                                                    (msg.sender_email === senderEmail && msg.receiver_email === receiverEmail)
                                            )
                                            .map((msg, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex ${msg.sender_email === senderEmail ? "justify-end" : "justify-start"
                                                        }`}
                                                >
                                                    <div
                                                        style={{
                                                            maxWidth: "70%",
                                                            padding: "10px",
                                                            borderRadius: "10px",
                                                            wordBreak: "break-word",
                                                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                                                            backgroundColor: msg.sender_email === senderEmail ? "#007bff" : "#28a745",
                                                            color: "white",
                                                            textAlign: msg.sender_email === senderEmail ? "right" : "left",
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
                                    <span className="text-sm">{msg.file_url.split("/").pop()}</span>
                                  </div>
                                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Download</span>
                                </a>
                              </div>
                            )}

                                                    </div>
                                                </div>
                                            ))
                                    )
                                        : (
                                            <span className="text-gray-700 text-sm text-center">No messages yet. Start the conversation!</span>
                                        )}

                                </div> */}
                                <div
                                  ref={chatContainerRef}
                                  className="h-56 overflow-y-auto border p-2 mb-3 flex flex-col space-y-2"
                                >
                                  {messages.length > 0 ? (
                                    (() => {
                                      console.log("All messages:", messages);
                                      console.log("Filtering with receiverEmail:", receiverEmail, "senderEmail:", senderEmail);
                                      
                                      const filteredMessages = messages.filter(
                                        (msg) => {
                                          const match = (msg.sender_email === receiverEmail && msg.receiver_email === senderEmail) ||
                                                       (msg.sender_email === senderEmail && msg.receiver_email === receiverEmail);
                                          console.log("Message:", msg.message, "match:", match, "sender:", msg.sender_email, "receiver:", msg.receiver_email);
                                          return match;
                                        }
                                      );
                                      
                                      console.log("Filtered messages:", filteredMessages);
                                      return filteredMessages;
                                    })()
                                      .map((msg, index) => {
                                        const loggedInStudentEmail = localStorage.getItem("userEmail"); // Get logged-in student email
                                        // Fix: Check if message is from admin emails (properly)
                                        const adminEmails = ["admin@planstudies.com", "yashd@gmail.com", "usadmin@gmail.com", "europe@gmail.com", "canada@gmail.com", "uk@gmail.com", "aus@gmail.com"];
                                        const isAdminMessage = adminEmails.includes(msg.sender_email);

                                        console.log("Message:", msg.message, "isAdminMessage:", isAdminMessage, "sender:", msg.sender_email);

                                        return (
                                          <div
                                            key={index}
                                            className={`flex ${isAdminMessage ? "justify-start" : "justify-end"}`}
                                          >
                                            <div
                                              style={{
                                                maxWidth: "70%",
                                                padding: "10px",
                                                borderRadius: "10px",
                                                wordBreak: "break-word",
                                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                                                backgroundColor: isAdminMessage ? "#28a745" : "#007bff",
                                                color: "white",
                                                textAlign: isAdminMessage ? "left" : "right",
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
                                                      <span className="text-sm">{msg.file_url.split("/").pop()}</span>
                                                    </div>
                                                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Download</span>
                                                  </a>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })
                                  ) : (
                                    <span className="text-gray-700 text-sm text-center">No messages yet. Start the conversation!</span>
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
                                    <label className=" absolute left-3 cursor-pointer text-gray-700 hover:text-gray-900 transition-all duration-200" style={{ marginLeft: "5px" }}>
                                      <FaPaperclip size={20} />
                                      <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />
                                    </label>
                                    <input
                                      type="text"
                                      className="w-full p-3 border rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400 pl-10 pr-12"
                                      placeholder={selectedFile ? "Type a message to send with file..." : "Type a message..."}
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

                        <Link to="/course-finder">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 w-full sm:w-auto">Find Courses</button>
                        </Link>
                        <Link to="/enroll">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 w-full sm:w-auto">Enroll now</button>
                        </Link>
                        <Link to="/fees">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 w-full sm:w-auto">Pay Fees</button>
                        </Link>
                        <Link to="/request">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 w-full sm:w-auto">+ Request Course Options from PlanStudies</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Welcome Card */}
            <div className="px-6 pb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white shadow-lg rounded-xl flex flex-wrap lg:flex-nowrap items-center gap-x-6 lg:gap-x-12 justify-between">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        {/* <div className="p-4 shadow-lg border rounded-lg bg-white flex items-center gap-4">
                            {profileImage ? (
                                <img
                                    src={typeof profileImage === "string" ? profileImage : URL.createObjectURL(profileImage)}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full object-cover border"
                                />
                            ) : (
                                <FaUserCircle className="text-5xl text-blue-500" />
                            )}
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Welcome, {fullName}
                                </h2>
                                {error && <p className="text-red-500">{error}</p>}
                                <p className="text-gray-500">Check your latest updates below</p>
                            </div>
                        </div> */}
                        <div className="p-4 shadow-lg border rounded-lg bg-white flex items-center gap-4">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full object-cover border"
                                />
                            ) : (
                                <FaUserCircle className="text-5xl text-blue-500" />
                            )}
                            <div>
                                <h2 className="text-xl font-semibold">Welcome, {fullName}</h2>
                                {error && <p className="text-red-500">{error}</p>}
                                <p className="text-gray-500">Check your latest updates below</p>
                            </div>
                        </div>

                    </motion.div>

                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
                                <button
                                    className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <IoClose size={24} />
                                </button>

                                <div className="text-center mb-4">
                                    {profileImage ? (
                                        <img
                                            src={typeof profileImage === "string" ? profileImage : URL.createObjectURL(profileImage)}
                                            alt="Profile"
                                            className="w-16 h-16 rounded-full object-cover border"
                                        />
                                    ) : (
                                        <FaUserCircle className="text-6xl text-gray-400 mx-auto" />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="mt-2 text-sm"
                                        onChange={handleImageUpload}
                                    />
                                    {profileImage && (
                                        <button
                                            onClick={handleRemoveProfileImage}
                                            className="mt-2 text-red-500 text-sm hover:text-red-600"
                                        >
                                            Remove Photo
                                        </button>


                                    )}
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-gray-700 font-semibold block">Full Name</label>
                                        <input type="text" value={fullName}
                                            onChange={(e) => setFullName(e.target.value)} className="border rounded-lg px-3 py-2 w-full" placeholder="Enter your name" />
                                    </div>

                                    <div>
                                        <label className="text-gray-700 font-semibold block">Email</label>
                                        <input type="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)} className="border rounded-lg px-3 py-2 w-full" placeholder="Enter your email" />
                                    </div>

                                    <div>
                                        <label className="text-gray-700 font-semibold block">Phone Number</label>
                                        <input type="tel" value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)} className="border rounded-lg px-3 py-2 w-full" placeholder="Enter your phone number" />
                                    </div>
                                    {message && <p className="mt-4 text-center text-red-600 text-sm">{message}</p>}
                                </div>

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

                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 flex-grow justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-center gap-4 w-full">

                            {/* Date Inputs */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <div className="w-full sm:w-1/2">
                                    <label className="text-gray-700 font-semibold block mb-1">From Date:</label>
                                    <input type="date" className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 transition" />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <label className="text-gray-700 font-semibold block mb-1">To Date:</label>
                                    <input type="date" className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 transition" />
                                </div>
                            </div>

                            {/* Country Selection */}
                            <div className="w-full">
                                <label className="text-gray-700 font-semibold block mb-1">Select Country:</label>
                                <select className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 transition">
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
                                <label className="text-gray-700 font-semibold block mb-1">Select Intake:</label>
                                <select className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 transition">
                                    <option value="">All Intakes</option>
                                    <option>Spring</option>
                                    <option>Fall</option>
                                    <option>Winter</option>
                                </select>
                            </div>

                            {/* Year Selection */}
                            <div className="w-full">
                                <label className="text-gray-700 font-semibold block mb-1">Select Year:</label>
                                <select className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 transition">
                                    <option value="">All Years</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                    <option>2026</option>
                                </select>
                            </div>

                        </div>
                    </div>


                    <div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300">
                            Apply Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Application Status Box */}
                <motion.div className="col-span-1" whileHover={{ scale: 1.05 }}>
                    <div className="p-4 shadow-lg border rounded-lg bg-white">
                        <div className="flex items-center mb-2">
                            <FaClipboardList className="mr-2 text-blue-500" />
                            <span className="text-lg font-semibold">Applications</span>
                            <div className="ml-2 mt-2" style={{ marginTop: "13px" }}>
                                <select className="border rounded px-3 py-1 cursor-pointer">
                                    <option>All Applications</option>
                                    <option>On hold</option>
                                    <option>Submitted</option>
                                    <option>Rejected</option>
                                </select>
                            </div>
                        </div>
                        <p className="font-semibold text-blue-500 text-3xl mt-4">0</p>
                    </div>
                </motion.div>

                {/* Offers Box */}
                <motion.div className="col-span-1" whileHover={{ scale: 1.05 }}>
                    <div className="p-4 shadow-lg border rounded-lg bg-white">
                        <div className="flex items-center mb-2">
                            <FaClipboardList className="mr-2 text-blue-500" />
                            <span className="text-lg font-semibold">Offers</span>
                            <div className="ml-2 mt-2" style={{ marginTop: "13px" }}>
                                <select className="border rounded px-3 py-1 cursor-pointer">
                                    <option>Offers</option>
                                    <option>Conditional</option>
                                    <option>Unconditional</option>
                                </select>
                            </div>
                        </div>
                        <p className="font-semibold text-blue-500 text-3xl mt-4">0</p>
                    </div>
                </motion.div>

                {/* Payment Box */}
                <motion.div className="col-span-1" whileHover={{ scale: 1.05 }}>
                    <div className="p-4 shadow-lg border rounded-lg bg-white">
                        <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-900">
                            <FaUniversity className="mr-2 text-blue-500" /> Payment Status
                        </h3>
                        <p className="font-semibold text-blue-500 text-3xl">0</p>
                    </div>
                </motion.div>

                {/* Additional Sections (Visa, Non-Enrollments, etc.) */}
                {["Visas Received", "Visas Rejected", "Non-Enrollments", "Deferrals"].map((title, index) => (
                    <motion.div key={index} className="col-span-1" whileHover={{ scale: 1.05 }}>
                        <div className="p-4 shadow-lg border rounded-lg bg-white">
                            <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-900">
                                <FaUniversity className="mr-2 text-blue-500" /> {title}
                            </h3>
                            <p className="font-semibold text-blue-500 text-3xl">0</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Footer />
        </div>
    );
}