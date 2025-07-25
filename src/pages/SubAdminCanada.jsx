import React, { useEffect, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal, TextInput, Select } from "flowbite-react";
import Navbar from "../components/NavbarStudent";
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegCommentDots, FaFileAlt, FaTrash, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
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
  const chatContainerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const senderEmail = localStorage.getItem("userEmail"); // Logged-in user
  const receiverEmail = openChat ? openChat.email : null;

  useEffect(() => {
    loadUsers();
    loadPayments();
  }, [selectedDate]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/payments").then((res) => {
      setPayments(res.data);
      setFilteredPayments(res.data);
    });
  }, []);

  const totalPaymentsReceived = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

  const loadUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sub-admin");
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
      const response = await fetch(`http://localhost:5000/api/register/${selectedUserId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter(user => user.id !== selectedUserId));
    } catch (error) {
      console.error("Error removing user:", error);
    }

    setOpenModal(false);
  };

  const filteredUsers = users.filter(user => {
    return (
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (roleFilter === "all" || user.role === roleFilter)
    );
  });

  // useEffect(() => {
  //   axios.get("http://localhost:5000/students")
  //     .then((res) => setStudents(res.data))
  //     .catch((err) => console.error("Error fetching students:", err));
  // }, []);

  // // Fetch messages when a chat is opened
  // const handleOpenChat = (student) => {
  //   setOpenChat(student);
  //   axios.get(`http://localhost:5000/messages/admin/${student.id}`)
  //     .then((res) => setMessages(res.data))
  //     .catch((err) => console.error("Error fetching messages:", err));
  // };

  // // Send message
  // const handleSendMessage = () => {
  //   if (message.trim() === "" || !openChat) return;

  //   const messageData = {
  //     sender_id: "admin",
  //     receiver_id: openChat.id,
  //     message,
  //   };

  //   axios.post("http://localhost:5000/messages", messageData)
  //     .then((res) => setMessages([...messages, res.data]))
  //     .catch((err) => console.error("Error sending message:", err));

  //   setMessage("");
  // };
  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then((res) => users(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  // Fetch Messages when Chat is Opened
  const handleOpenChat = async (user) => {
    setOpenChat(user); // Open the chat with the selected user
    try {
      // Mark messages as read in the backend
      await fetch("http://localhost:5000/api/read-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderEmail: user.email, receiverEmail: receiverEmail }), // Fix key names
      });

      // setNotifications(0); // Reset notifications after API call is successful
      // fetchMessages(); // Fetch latest messages to update UI
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  useEffect(() => {
    if (!receiverEmail) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/messages/${senderEmail}/${receiverEmail}`);
        const data = await response.json();
        setMessages(data); // ✅ Store messages in state
        localStorage.setItem(`chatMessages_${receiverEmail}`, JSON.stringify(data)); // ✅ Persist messages in local storage
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [receiverEmail]);

  // Load messages from local storage on refresh
  useEffect(() => {
    if (!receiverEmail) return;
    const storedMessages = localStorage.getItem(`chatMessages_${receiverEmail}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [receiverEmail]);

  const handleSendMessage = async () => {
    if (!senderEmail || !receiverEmail) {
      console.error("Sender or receiver email is missing.");
      return;
    }

    if (!message.trim() && !selectedFile) {
      console.error("Cannot send an empty message without a file.");
      return;
    }

    const formData = new FormData();
    formData.append("sender_email", senderEmail);
    formData.append("receiver_email", receiverEmail);
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
        { sender_email: senderEmail, receiver_email: receiverEmail, message, file_url: data.file_url || null },
      ];
      setMessages(newMessages);
      localStorage.setItem(`chatMessages_${receiverEmail}`, JSON.stringify(newMessages)); // ✅ Update local storage

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
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
  const totalStudents = users.filter(user => user.role === "student").length;
  const totalAgents = users.filter(user => user.role === "agent").length;
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 tracking-wide uppercase border-2 border-indigo-500 p-3 rounded-lg bg-white shadow-md text-center sm:text-left">
          🏢 Admin Dashboard (Canada)
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "20px" }}>
          <div
            className="bg-white shadow-md p-6 rounded-lg text-center cursor-pointer hover:bg-gray-100"
            onClick={() => navigate("/payment-history")}
          >
            <h2 className="text-lg font-bold">Total Payments</h2>
            <p className="text-2xl font-semibold">${totalPaymentsReceived.toFixed(2)}</p>
          </div>

          <div
            className="bg-white shadow-md p-6 rounded-lg text-center cursor-pointer hover:bg-gray-100"
            onClick={() => navigate("/students-history")}
          >
            <h2 className="text-lg font-bold">Students Enrolled</h2>
            <p className="text-2xl font-semibold">{totalStudents}</p>
          </div>

          {/* <div
            className="bg-white shadow-md p-6 rounded-lg text-center cursor-pointer hover:bg-gray-100"
            onClick={() => navigate("/agents-history")}
          >
            <h2 className="text-lg font-bold">Agents Enrolled</h2>
            <p className="text-2xl font-semibold">{totalAgents}</p>
          </div> */}
          {/* <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h2 className="text-lg font-bold">Total Users</h2>
            <p className="text-2xl font-semibold">{totalStudents + totalAgents}</p>
          </div> */}
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h2 className="text-lg font-bold">Total Offer Letters</h2>
            <p className="text-2xl font-semibold">0</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h2 className="text-lg font-bold">Total Visa Received</h2>
            <p className="text-2xl font-semibold">0</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h2 className="text-lg font-bold">Total Visa Rejected</h2>
            <p className="text-2xl font-semibold">0</p>
          </div>
          {/* <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h2 className="text-lg font-bold">Filter Payments</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            />
          </div> */}
        </div>

        <div className="mt-6 bg-white shadow-md p-6 rounded-lg overflow-x-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <TextInput
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 p-2 border rounded"
            />

            {/* <div className="w-full md:w-auto">
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full md:w-60 p-2 border rounded"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="agent">Agents</option>
              </Select>
            </div> */}

          </div>


          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Full Name</th>
                <th className="p-3 border">Phone Number</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="text-center border">
                    <td className="p-3 border">{user.fullname}</td>
                    <td className="p-3 border">
                      <a href={`tel:${user.phone_number}`} className="text-blue-500 hover:underline">
                        {user.phone_number}
                      </a>
                    </td>

                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border">{user.role}</td>
                    <td className="p-3 border">
                      <div className="flex justify-center">
                        <Button
                          className="bg-red-500 hover:bg-red-700 text-white  rounded transition duration-300"
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setOpenModal(true);
                          }}
                        >
                          Remove
                        </Button>
                        <button
                          onClick={() => handleOpenChat(user)}
                          className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded transition duration-300 flex items-center ml-2"
                        >
                          <FaRegCommentDots className="mr-1" /> Chat
                        </button>
                        <button
                          onClick={() => handleViewDocuments(user.id)}
                          className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded transition duration-300 flex items-center ml-2"
                        >
                          <FaFileAlt className="mr-1" /> Docs
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 border text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
            {openChat && (
              <div className="fixed bottom-10 right-10 w-96 z-50 bg-white/30 backdrop-blur-lg shadow-2xl rounded-xl p-4 border border-white/30 transition-all duration-500 transform scale-100 ">

                <div className="flex justify-between items-center mb-3 border-b pb-2">
                  <h3 className="font-bold text-lg text-gray-900">💬 Chat with {openChat.fullname}</h3>
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
                          className={`flex ${msg.sender_email === senderEmail ? "justify-start" : "justify-end"
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
                              // textAlign: msg.sender_email === senderEmail ? "right" : "left",
                            }}
                          >
                            {msg.message}
                            {msg.file_url && (
                              <a
                                href={`http://localhost:5000${msg.file_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white underline block mt-1 flex items-center"
                              >
                                <FaPaperclip className="mr-1" /> {msg.file_url.split("/").pop()}
                              </a>
                            )}

                          </div>
                        </div>
                      ))
                  ) : (
                    <span className="text-gray-700 text-sm text-center">No messages yet. Start the conversation!</span>
                  )}
                </div> */}
                <div ref={chatContainerRef} className="h-56 overflow-y-auto border p-2 mb-3 flex flex-col space-y-2">
                  {messages.length > 0 ? (
                    messages
                      .filter(
                        (msg) =>
                          (msg.sender_email === receiverEmail && msg.receiver_email === senderEmail) ||
                          (msg.sender_email === senderEmail && msg.receiver_email === receiverEmail)
                      )
                      .map((msg, index) => {
                        // Ensure consistent property names
                        const isAdminSender = msg.sender_email.toLowerCase() === "usadmin@gmail.com";

                        console.log(`Message #${index + 1}`);
                        console.log("Message Sender:", msg.sender_email);
                        console.log("Logged-in Student:", senderEmail);
                        console.log("Is Admin Message:", isAdminSender);

                        return (
                          <div key={index} className={`flex ${isAdminSender ? "justify-end" : "justify-start"}`}>
                            <div
                              style={{
                                maxWidth: "70%",
                                padding: "10px",
                                borderRadius: "10px",
                                wordBreak: "break-word",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                                backgroundColor: isAdminSender ? "#007bff" : "#28a745", // Blue for Admin, Green for others
                                color: "white",
                              }}
                            >
                              {msg.message}
                              {msg.file_url && (
                                <a
                                  href={`http://localhost:5000${msg.file_url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white underline block mt-1 flex items-center"
                                >
                                  <FaPaperclip className="mr-1" /> {msg.file_url.split("/").pop()}
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <span className="text-gray-700 text-sm text-center">No messages yet. Start the conversation!</span>
                  )}
                </div>



                <div className=" relative flex items-center p-2  w-full">
                  <label className=" absolute left-3 cursor-pointer text-gray-700 hover:text-gray-900 transition-all duration-200" style={{ marginLeft: "5px", marginBottom: "15px" }}>
                    <FaPaperclip size={20} />
                    <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400 pl-10 pr-12"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  <button
                    className="absolute right-3 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
                    onClick={handleSendMessage}
                    style={{ marginBottom: "15px" }}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            )}
          </table>
        </div>

        {/* <div className="mt-6 bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Payment Trends</h2>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <LineChart width={600} height={300} data={payments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </div>
          </div>
        </div> */}

        {/* Confirmation Modal */}
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to remove this user?
              </h3>
              <div className="flex justify-center gap-4">
                <Button onClick={handleRemoveUser} className="bg-red-500 hover:bg-red-700 text-white transition duration-300">
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
      <Footer />
    </div>
  );
};

export default AdminDashboard;