import { useEffect, useState, useRef } from "react";
import ChatbotIcon from "../components/ChatbotIcon";
import ChatForm from "../components/ChatForm";
import ChatMessage from "../components/ChatMessage";
import { FaComment } from "react-icons/fa";
import { MdClose, MdRefresh } from "react-icons/md";
import { companyInfo } from "../companyInfo";
import "../styles/AIChatbot.css";

const Chatbot = () => {
  // Load chat history from localStorage or initialize with default
  const loadChatHistory = () => {
    try {
      const saved = localStorage.getItem('chatbot-history');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
    return [
      {
        hideInChat: true,
        role: "model",
        text: companyInfo
      }
    ];
  };

  const [chatHistory, setChatHistory] = useState(loadChatHistory());
  const [showChatbot, setShowChatbot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatBodyRef = useRef();

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('chatbot-history', JSON.stringify(chatHistory));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  }, [chatHistory]);

  // Clear chat history
  const clearChatHistory = () => {
    const initialHistory = [
      {
        hideInChat: true,
        role: "model",
        text: companyInfo
      }
    ];
    setChatHistory(initialHistory);
    setError(null);
  };

  const generateBotResponse = async (history) => {
    setIsLoading(true);
    setError(null);
    
    const updateHistory = (text, isError = false, timestamp = new Date().toISOString()) => {
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text, isError, timestamp }
      ]);
      setIsLoading(false);
    };

    // Add thinking message
    setChatHistory(prev => [...prev, { role: "model", text: "Thinking...", isThinking: true }]);

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history })
    };

    try {
      const apiUrl = process.env.REACT_APP_API_KEY;
      if (!apiUrl) {
        throw new Error("API configuration is missing. Please check your setup.");
      }

      const response = await fetch(apiUrl, requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message ||
          `API Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.candidates?.length > 0) {
        const contentParts = data.candidates[0]?.content?.parts;
        const apiResponseText = contentParts?.[0]?.text
          ?.replace(/\*\*(.*?)\*\*/g, "$1")
          ?.trim();

        if (apiResponseText) {
          updateHistory(apiResponseText);
        } else {
          throw new Error("Received empty response from AI service.");
        }
      } else {
        throw new Error("No response generated. Please try again.");
      }
    } catch (error) {
      console.error('Chatbot API Error:', error);
      setError(error.message);
      updateHistory(
        `Sorry, I'm having trouble responding right now. ${error.message} Please try again later.`,
        true
      );
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot(prev => !prev)} id="chatbot-toggler">
        <span><FaComment size={24} /></span>
        <span><MdClose size={24} /></span>
      </button>

      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <div>
              <h2 className="logo-text">PlanStudies AI</h2>
              {isLoading && <small className="status-text">Typing...</small>}
            </div>
          </div>
          <div className="header-actions">
            <button 
              onClick={clearChatHistory} 
              className="clear-chat-btn"
              title="Clear Chat History"
            >
              <MdRefresh size={18} />
            </button>
            <button 
              onClick={() => setShowChatbot(prev => !prev)} 
              className="close-chat-btn"
              title="Close Chat"
            >
              <MdClose size={20} />
            </button>
          </div>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hello there 👋 <br /> How can I help you today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;