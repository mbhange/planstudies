import { useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/AIChatbot.css";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage || isSubmitting) return;
        
        setIsSubmitting(true);
        inputRef.current.value = "";
        
        // Add user message with timestamp
        const userMessageObj = {
            role: "user",
            text: userMessage,
            timestamp: new Date().toISOString()
        };
        
        setChatHistory((history) => [...history, userMessageObj]);

        // Generate bot response
        try {
            await generateBotResponse([
                ...chatHistory, 
                { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }
            ]);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input 
                ref={inputRef} 
                type="text" 
                placeholder={isSubmitting ? "Sending..." : "Message..."}
                className="message-input" 
                disabled={isSubmitting}
                required 
            />
            <button type="submit" disabled={isSubmitting}>
                <FaArrowUp size={24} />
            </button>
        </form>
    )
}

export default ChatForm;