import React from "react";
import ChatbotIcon from "./ChatbotIcon";
import "../styles/AIChatbot.css";

const ChatMessage = ({ chat }) => {
    // Format timestamp for display
    const formatTime = (timestamp) => {
        if (!timestamp) return null;
        try {
            return new Date(timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        } catch (error) {
            return null;
        }
    };

    // Don't show hidden messages
    if (chat.hideInChat) return null;

    const messageClasses = `message ${
        chat.role === "model" ? 'bot' : 'user'
    }-message ${
        chat.isError ? "error" : ""
    } ${
        chat.isThinking ? "thinking" : ""
    }`;

    return (
        <div className={messageClasses}>
            {chat.role === "model" && <ChatbotIcon />}
            <div className="message-content">
                <p className="message-text">
                    {chat.isThinking ? (
                        <span className="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    ) : (
                        chat.text
                    )}
                </p>
                {chat.timestamp && !chat.isThinking && (
                    <small className="message-time">
                        {formatTime(chat.timestamp)}
                    </small>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;
