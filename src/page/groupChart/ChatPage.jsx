import React, { useEffect, useRef, useState } from 'react';
import SendMessage from '../../components/message/SendMessage';
import LeftMessage from '../../components/message/LeftMessage';
import RightMessage from '../../components/message/RightMessage';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

function ChatPage() {
  const [messages, setMessages] = useState([
    { text: 'Hey, are we still on for the meeting?', type: 'received', sender: 'Anjali', time: '10:30 AM' },
    { text: 'Yes, I’ll join in 5 minutes.', type: 'sent', time: '10:31 AM' },

  ]);

  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (message) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { text: message, type: 'sent', time }]);

    // Simulate a received message
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { text: `Reply: ${message}`, type: 'received', sender: 'Anjali', time: replyTime }]);
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollToBottom(false);
  };

  const handleScroll = () => {
    const container = messageContainerRef.current;
    if (!container) return;

    const isAtBottom = Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) < 10;
    setShowScrollToBottom(!isAtBottom);
  };

  return (
    <div style={styles.chatApp}>
      {/* Message list */}
      <div
        ref={messageContainerRef}
        style={styles.messagesContainer}
        onScroll={handleScroll}
      >
        {messages.map((msg, index) =>
          msg.type === 'sent' ? (
            <RightMessage key={index} message={msg.text} time={msg.time} />
          ) : (
            <LeftMessage key={index} message={msg.text} sender={msg.sender} time={msg.time} />
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom icon */}
      {showScrollToBottom && (
        <ArrowCircleDownIcon
          onClick={scrollToBottom}
          style={styles.scrollButton}
          titleAccess="Scroll to latest message"
        />
      )}

      {/* Send message input */}
      <div className=" h-[10vh]">
        <SendMessage onSend={handleSend} />
      </div>
    </div>
  );
}

const styles = {
  chatApp: {
    maxWidth: '500px',
    height: '80vh',
    border: '1px solid #ccc',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    margin: 'auto',
  },
  messagesContainer: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#eef1f5',
  },
  scrollButton: {
    position: 'absolute',
    bottom: '12vh',
    right: '15px',
    fontSize: '40px',
    color: '#007bff',
    cursor: 'pointer',
    backgroundColor: '#fff',
    borderRadius: '50%',
    padding: '4px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    zIndex: 10,
  },
};

export default ChatPage;
