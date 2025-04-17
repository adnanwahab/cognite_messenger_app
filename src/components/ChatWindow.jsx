// File: src/components/ChatWindow.js
import React, { useState, useRef, useEffect } from 'react';
import MessageInput from './MessageInput';

function ChatWindow({ friend, messages, onSendMessage, isMobileView, onBack }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        {isMobileView && (
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
        )}
        <div className="chat-friend-info">
          <div className="friend-avatar">{friend.avatar}</div>
          <div className="friend-name">{friend.name}</div>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>No messages yet. Send a message to start chatting!</p>
          </div>
        ) : (
          messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'user' ? 'user-message' : 'friend-message'}`}
            >
              <div className="message-bubble">
                <div className="message-text">{message.text}</div>
                <div className="message-time">{message.timestamp}</div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default ChatWindow;
