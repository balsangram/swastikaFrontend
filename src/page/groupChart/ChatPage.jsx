import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import SendMessage from '../../components/message/SendMessage';
import LeftMessage from '../../components/message/LeftMessage';
import RightMessage from '../../components/message/RightMessage';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

// Connect to backend
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ['websocket', 'polling'],
});

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  // Format time
  const formatTime = (isoTime) => {
    return new Date(isoTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Fetch latest messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/swastic/chat/messages?limit=50`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const formatted = data.messages.map((msg) => ({
          text: msg.message,
          type: msg.senderId === socket.id ? 'sent' : 'received',
          sender: msg.senderId === socket.id ? 'You' : msg.senderId.slice(0, 5),
          time: formatTime(msg.time),
          id: msg._id,
        }));
        setMessages(formatted.sort((a, b) => new Date(a.time) - new Date(b.time)));
      } catch (err) {
        console.error('Failed to fetch messages:', err);
        setError(`Unable to load messages: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Handle socket events
  useEffect(() => {
    const handleInitialMessages = (msgs) => {
      const formatted = msgs.map((msg) => ({
        text: msg.message,
        type: msg.senderId === socket.id ? 'sent' : 'received',
        sender: msg.senderId === socket.id ? 'You' : msg.senderId.slice(0, 5),
        time: formatTime(msg.time),
        id: msg._id,
      }));

      setMessages((prev) => {
        const existingIds = new Set(prev.map((msg) => msg.id));
        const newMessages = formatted.filter((msg) => !existingIds.has(msg.id));
        return [...prev, ...newMessages]
          .sort((a, b) => new Date(a.time) - new Date(b.time))
          .slice(-50);
      });

      setConnectionError(null);
    };

    const handleConnect = () => {
      console.log('Socket.IO connected:', socket.id);
      setConnectionError(null);
    };

    const handleConnectError = (err) => {
      console.error('Socket.IO connection error:', err.message);
      setConnectionError('Unable to connect to chat server. Retrying...');
    };

    const handleReconnectAttempt = () => {
      console.log('Reconnecting... attempts:', socket.io.reconnectionAttempts);
    };

    socket.on('connect', handleConnect);
    socket.on('initialMessages', handleInitialMessages);
    socket.on('connect_error', handleConnectError);
    socket.on('reconnect_attempt', handleReconnectAttempt);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('initialMessages', handleInitialMessages);
      socket.off('connect_error', handleConnectError);
      socket.off('reconnect_attempt', handleReconnectAttempt);
    };
  }, []);

  // Listen for real-time messages
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      const isOwnMessage = data.id === socket.id;
      const newMsg = {
        text: data.message,
        type: isOwnMessage ? 'sent' : 'received',
        sender: isOwnMessage ? 'You' : data.id.slice(0, 5),
        time: formatTime(data.time),
        id: data._id || `${data.id}-${data.time}`,
      };

      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === newMsg.id);
        if (!exists) {
          return [...prev, newMsg]
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .slice(-50);
        }
        return prev;
      });
    };

    socket.on('receiveMessage', handleReceiveMessage);
    return () => socket.off('receiveMessage', handleReceiveMessage);
  }, []);

  // Send message
  const handleSend = (messageText) => {
    if (messageText.trim() && socket.connected) {
      socket.emit('sendMessage', messageText.trim());
      console.log('Sending message:', messageText.trim());
    } else {
      setConnectionError('Cannot send message: Not connected to server.');
    }
  };

  // Auto-scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollToBottom(false);
  };

  const handleScroll = () => {
    const container = messageContainerRef.current;
    if (!container) return;
    const isAtBottom =
      Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) < 10;
    setShowScrollToBottom(!isAtBottom);
  };

  return (
    <div className="max-w-md h-[80vh] mx-auto shadow-lg rounded-xl flex flex-col border border-gray-300 bg-white relative">
      {connectionError && <p className="text-center text-red-500 p-2">{connectionError}</p>}
      {error && <p className="text-center text-red-500 p-2">{error}</p>}

      <div
        ref={messageContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-3"
        onScroll={handleScroll}
      >
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 && !connectionError ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, index) =>
            msg.type === 'sent' ? (
              <RightMessage key={msg.id || index} message={msg.text} time={msg.time} />
            ) : (
              <LeftMessage
                key={msg.id || index}
                message={msg.text}
                sender={msg.sender}
                time={msg.time}
              />
            )
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      {showScrollToBottom && (
        <ArrowCircleDownIcon
          className="text-blue-600 text-4xl cursor-pointer absolute bottom-[70px] right-4 bg-white rounded-full shadow-md"
          onClick={scrollToBottom}
          titleAccess="Scroll to latest message"
        />
      )}

      <div className="h-[10vh] border-t border-gray-200 p-2 bg-white">
        <SendMessage onSend={handleSend} />
      </div>
    </div>
  );
}
