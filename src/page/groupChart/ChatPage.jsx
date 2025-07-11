import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SendMessage from '../../components/message/SendMessage';
import LeftMessage from '../../components/message/LeftMessage';
import RightMessage from '../../components/message/RightMessage';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const socket = io(import.meta.env.VITE_BACKEND_URL);

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for incoming messages
  useEffect(() => {
    const receiveMessage = (data) => {
      const isOwnMessage = data.id === socket.id;

      if (!isOwnMessage) {
        setMessages((prev) => [
          ...prev,
          {
            text: data.message,
            type: 'received',
            sender: data.id.slice(0, 5),
            time: data.time,
          },
        ]);
      }
    };

    socket.on('receiveMessage', receiveMessage);
    return () => socket.off('receiveMessage', receiveMessage);
  }, []);

  const handleSend = (messageText) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    socket.emit('sendMessage', messageText);

    setMessages((prev) => [
      ...prev,
      { text: messageText, type: 'sent', sender: 'You', time },
    ]);
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
    <div className="max-w-md h-[80vh] mx-auto shadow-lg rounded-xl flex flex-col border border-gray-300 bg-white relative">
      {/* Chat body */}
      <div
        ref={messageContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-3"
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

      {/* Scroll to bottom FAB */}
      {showScrollToBottom && (
        <ArrowCircleDownIcon
          className="text-blue-600 text-4xl cursor-pointer absolute bottom-[70px] right-4 bg-white rounded-full shadow-md"
          titleAccess="Scroll to latest message"
          onClick={scrollToBottom}
        />
      )}

      {/* Message input */}
      <div className="h-[10vh] border-t border-gray-200 p-2 bg-white">
        <SendMessage onSend={handleSend} />
      </div>
    </div>
  );
}
