import React from 'react';
import { ChatProvider, useChat } from '../contexts/ChatContext';
import { ChatList } from '../components/chat/ChatList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { cn } from '../utils/cn';

const ChatLayout: React.FC = () => {
  const { activeChat } = useChat();

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white overflow-hidden">
      {/* Sidebar - Chat List */}
      <div className={cn(
        "w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col bg-white",
        activeChat ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
        </div>
        <ChatList />
      </div>

      {/* Main Content - Chat Window */}
      <div className={cn(
        "flex-1 flex flex-col bg-gray-50",
        !activeChat ? "hidden md:flex" : "flex"
      )}>
        {activeChat ? (
          <ChatWindow />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Your Messages</h3>
            <p className="max-w-sm">Select a conversation from the list to start chatting with your matches.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ChatPage: React.FC = () => {
  return (
    <ChatProvider>
      <ChatLayout />
    </ChatProvider>
  );
};

export default ChatPage;
