import React from "react";
import "./ChatContainer.css"; // Assuming you have a separate CSS file for ChatContainer styles

const ChatContainer = ({ messages }) => {
  console.log(messages);
  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${index === messages.length - 1 ? "message-container-right" : "message-container"}`}
          >
            <div className={`${index === messages.length - 1 ? "message-color" : "message"}`}>
              {message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatContainer;
