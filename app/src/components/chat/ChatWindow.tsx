import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import { MessageBubble } from './MessageBubble';
import { SilenceIndicator } from './SilenceIndicator';
import { Send, ArrowLeft } from 'lucide-react';

export const ChatWindow: React.FC = () => {
  const { activeChat, messages, sendMessage, setActiveChat, isLoadingMessages } = useChat();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!activeChat || !user) return null;

  const isStudent = user.role === 'student';
  const otherParty = isStudent 
    ? activeChat.match.internship.recruiter 
    : activeChat.match.student;
  
  const title = isStudent 
    ? `${otherParty.firstName} ${otherParty.lastName} • ${activeChat.match.internship.title}`
    : `${otherParty.firstName} ${otherParty.lastName} • ${activeChat.match.internship.title}`;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await sendMessage(newMessage);
      setNewMessage('');
    } catch (error) {
      // Error handled in context
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button 
          onClick={() => setActiveChat(null)}
          className="mr-3 p-2 -ml-2 rounded-full hover:bg-gray-100 md:hidden"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-3">
            {otherParty.avatarUrl ? (
              <img src={otherParty.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              `${otherParty.firstName[0]}${otherParty.lastName[0]}`
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {otherParty.firstName} {otherParty.lastName}
            </h3>
            <p className="text-xs text-gray-500 truncate max-w-[200px]">
              {activeChat.match.internship.title}
            </p>
          </div>
        </div>
        
        {activeChat.lastMessage && (
          <div className="ml-auto hidden md:block">
            <SilenceIndicator lastActivity={activeChat.lastMessage.createdAt} />
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {isLoadingMessages ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
            <p>No messages yet.</p>
            <p>Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
