import React, { useState,useRef,useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add user message
    const userMessage = { text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    try {
      // Make an asynchronous API call
      const response = await axios.post("http://localhost:3001/api/chat", { userInput: input });
  
      // Assuming the response from the backend contains the AI's message
      const aiResponse = response.data.message;
  
      // Add AI response
      const aiMessage = { text: aiResponse, isUser: false };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
  
      // Add error response
      const errorMessage = { text: "AI Response: An error occurred.", isUser: false };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  
    // Clear input
    setInput('');
  };
   useEffect(() => {
  const chatMessages = chatContainerRef.current.querySelector('.chat-messages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}, [messages]);

  return (
    <div className="chat-container" ref={chatContainerRef}>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div className='parent'>
            {message.isUser?<h3>User-input:</h3>:<h3>AI response:</h3>}
          <span key={index} className={message.isUser ? 'user-message' : 'ai-message'}>
            {message.text}
          </span>
          </div>
        ))}
      </div>
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
