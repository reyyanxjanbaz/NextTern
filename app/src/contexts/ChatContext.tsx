import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { Message, Chat } from '@nexttern/shared';
import { api } from '../services/api';

interface ChatContextType {
  chats: Chat[];
  activeChat: Chat | null;
  messages: Message[];
  isLoadingChats: boolean;
  isLoadingMessages: boolean;
  setActiveChat: (chat: Chat | null) => void;
  sendMessage: (content: string) => Promise<void>;
  markAsRead: (chatId: string) => Promise<void>;
  refreshChats: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  // Fetch chats on mount
  const fetchChats = useCallback(async () => {
    if (!user) return;
    setIsLoadingChats(true);
    try {
      const response = await api.get('/matches');
      // Filter for matches that have a chat initiated
      const matchesWithChat = response.data.filter((m: any) => m.chat);
      const chatList = matchesWithChat.map((m: any) => ({
        ...m.chat,
        match: m
      }));
      setChats(chatList);
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    } finally {
      setIsLoadingChats(false);
    }
  }, [user]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Fetch messages when active chat changes
  useEffect(() => {
    if (!activeChat) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      setIsLoadingMessages(true);
      try {
        const response = await api.get(`/chat/${activeChat.id}/messages`);
        setMessages(response.data);
        // Mark as read
        await api.post(`/chat/${activeChat.id}/read`);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [activeChat]);

  // WebSocket connection
  useEffect(() => {
    if (!user || !token) return;

    const wsUrl = `${import.meta.env.VITE_API_URL?.replace('http', 'ws') || 'ws://localhost:3001'}/ws?token=${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Connected to Chat WebSocket');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'new_message') {
          const message = data.payload;
          
          // If message belongs to active chat, append it
          if (activeChat && message.chatId === activeChat.id) {
            setMessages(prev => [...prev, message]);
            // Mark as read immediately if looking at it
            api.post(`/chat/${activeChat.id}/read`);
          }

          // Update chat list (move to top, update last message)
          setChats(prev => {
            const chatIndex = prev.findIndex(c => c.id === message.chatId);
            if (chatIndex === -1) return prev; // Should fetch fresh list if new chat

            const updatedChat = {
              ...prev[chatIndex],
              lastMessage: message,
              updatedAt: message.createdAt,
              unreadCount: (activeChat?.id !== message.chatId) 
                ? (prev[chatIndex].unreadCount || 0) + 1 
                : 0
            };

            const newChats = [...prev];
            newChats.splice(chatIndex, 1);
            return [updatedChat, ...newChats];
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    ws.onclose = () => {
      console.log('Chat WebSocket disconnected');
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [user, token, activeChat]);

  const sendMessage = async (content: string) => {
    if (!activeChat) return;

    try {
      const response = await api.post(`/chat/${activeChat.id}/messages`, { content });
      const message = response.data;
      setMessages(prev => [...prev, message]);
      
      // Update chat list
      setChats(prev => {
        const chatIndex = prev.findIndex(c => c.id === activeChat.id);
        if (chatIndex === -1) return prev;

        const updatedChat = {
          ...prev[chatIndex],
          lastMessage: message,
          updatedAt: message.createdAt
        };

        const newChats = [...prev];
        newChats.splice(chatIndex, 1);
        return [updatedChat, ...newChats];
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const markAsRead = async (chatId: string) => {
    try {
      await api.post(`/chat/${chatId}/read`);
      setChats(prev => prev.map(c => 
        c.id === chatId ? { ...c, unreadCount: 0 } : c
      ));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  return (
    <ChatContext.Provider value={{
      chats,
      activeChat,
      messages,
      isLoadingChats,
      isLoadingMessages,
      setActiveChat,
      sendMessage,
      markAsRead,
      refreshChats: fetchChats
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
