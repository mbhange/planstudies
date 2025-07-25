// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { MessageCircle, XCircle } from "lucide-react";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleToggle = () => setIsOpen(!isOpen);

//   const handleSend = async () => {
//     if (input.trim() === "") return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer YOUR_API_KEY_HERE`,
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [
//             { role: "system", content: "You are a helpful chatbot." },
//             ...messages.map((msg) => ({ role: msg.sender === "user" ? "user" : "assistant", content: msg.text })),
//             { role: "user", content: input },
//           ],
//         }),
//       });

//       const data = await response.json();
//       const botMessage = { sender: "bot", text: data.choices[0].message.content };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Error fetching chatbot response:", error);
//       const errorMessage = { sender: "bot", text: "Sorry, I couldn't process your request. Please try again." };
//       setMessages((prev) => [...prev, errorMessage]);
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.8 }}
//         transition={{ duration: 0.3 }}
//         className="flex flex-col items-end"
//       >
//         {isOpen && (
//           <motion.div
//             className="bg-white rounded-2xl shadow-lg w-80 max-h-[400px] flex flex-col p-4 overflow-hidden"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-bold text-lg">Chat with us</h3>
//               <XCircle
//                 className="cursor-pointer text-gray-500 hover:text-gray-700"
//                 onClick={handleToggle}
//               />
//             </div>
//             <div className="flex-1 overflow-y-auto mb-2">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`mb-2 p-2 rounded-lg text-sm max-w-[80%] ${
//                     msg.sender === "user"
//                       ? "bg-blue-500 text-white self-end"
//                       : "bg-gray-200 text-gray-800 self-start"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               ))}
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//               />
//               <button
//                 onClick={handleSend}
//                 className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//               >
//                 Send
//               </button>
//             </div>
//           </motion.div>
//         )}
//         <button
//           className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//           onClick={handleToggle}
//         >
//           <MessageCircle size={24} />
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm here to help you with your study abroad journey. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate API call with mock responses
    setTimeout(() => {
      const botResponses = [
        "That's a great question! I'd be happy to help you with information about studying abroad.",
        "Let me help you find the perfect study destination. What field are you interested in?",
        "I can assist you with university applications, visa requirements, and more. What would you like to know?",
        "Based on your interests, I can recommend some excellent programs. Tell me more about your preferences.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = {
        sender: "bot",
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="chat-details">
                  <h3>Study Abroad Assistant</h3>
                  <span className="chat-status">Online</span>
                </div>
              </div>
              <button className="close-btn" onClick={handleToggle}>
                ×
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message-wrapper ${msg.sender}`}>
                  <div className={`message ${msg.sender}`}>
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="message-wrapper bot">
                  <div className="message bot typing">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
              <div className="chat-input-wrapper">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="chat-input"
                />
                <button
                  onClick={handleSend}
                  className="send-btn"
                  disabled={!input.trim()}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chat-toggle"
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
