import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from 'nativewind';
import { MessageSquare, Send, Search, User } from 'lucide-react-native';
import { api, Conversation, Message } from '../services/api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(TextInput);

interface ChatScreenProps {
  user: {
    id: string;
    email: string;
    role: 'STUDENT' | 'RECRUITER' | null;
  } | null;
}

export default function ChatScreen({ user }: ChatScreenProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  const fetchConversations = async () => {
    try {
      const response = await api.getConversations();
      setConversations(response.conversations);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await api.getMessages(conversationId);
      setMessages(response.messages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    fetchMessages(conversation.id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setSendingMessage(true);
    try {
      const response = await api.sendMessage(selectedConversation.id, newMessage);
      setMessages([...messages, response.message]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleBack = () => {
    setSelectedConversation(null);
    setMessages([]);
  };

  if (loading) {
    return (
      <StyledView className="flex-1 bg-eggshell items-center justify-center">
        <ActivityIndicator size="large" color="#A8D5BA" />
        <StyledText className="mt-4 text-steelGray">Loading conversations...</StyledText>
      </StyledView>
    );
  }

  // Message thread view
  if (selectedConversation) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <StyledView className="flex-1 bg-eggshell">
          {/* Header */}
          <StyledView className="bg-white px-4 pt-4 pb-4 border-b border-softGray flex-row items-center">
            <StyledTouchableOpacity onPress={handleBack} className="mr-3 p-2">
              <StyledText className="text-pastelGreenDark font-semibold">Back</StyledText>
            </StyledTouchableOpacity>
            <StyledView className="w-10 h-10 bg-pastelGreenLight rounded-full items-center justify-center mr-3">
              <User color="#81C784" size={20} />
            </StyledView>
            <StyledView className="flex-1">
              <StyledText className="text-deepBlue font-semibold">{selectedConversation.participantName}</StyledText>
              <StyledText className="text-steelGray text-xs">{selectedConversation.jobTitle}</StyledText>
            </StyledView>
          </StyledView>

          {/* Messages */}
          <StyledScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} isOwn={message.senderId === user?.id} />
            ))}
          </StyledScrollView>

          {/* Input */}
          <StyledView className="bg-white px-4 py-3 border-t border-softGray flex-row items-center">
            <StyledTextInput
              className="flex-1 bg-eggshell rounded-full px-4 py-3 text-deepBlue mr-3"
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
            />
            <StyledTouchableOpacity
              onPress={handleSendMessage}
              disabled={sendingMessage || !newMessage.trim()}
              className={`w-12 h-12 rounded-full items-center justify-center ${
                newMessage.trim() ? 'bg-pastelGreen' : 'bg-softGray'
              }`}
            >
              {sendingMessage ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Send color={newMessage.trim() ? 'white' : '#9CA3AF'} size={20} />
              )}
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </KeyboardAvoidingView>
    );
  }

  // Conversation list view
  return (
    <StyledView className="flex-1 bg-eggshell">
      {/* Header */}
      <StyledView className="bg-white px-6 pt-4 pb-4 border-b border-softGray">
        <StyledText className="text-2xl font-bold text-deepBlue">Chat</StyledText>
        <StyledText className="text-steelGray text-sm mt-1">Your conversations</StyledText>
      </StyledView>

      {/* Search */}
      <StyledView className="px-4 py-3">
        <StyledView className="bg-white rounded-full flex-row items-center px-4 py-2 border border-softGray">
          <Search color="#9CA3AF" size={18} />
          <StyledTextInput
            className="flex-1 ml-2 text-deepBlue"
            placeholder="Search conversations..."
            placeholderTextColor="#9CA3AF"
          />
        </StyledView>
      </StyledView>

      <StyledScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {conversations.length === 0 ? (
          <StyledView className="items-center justify-center py-16">
            <StyledView className="w-16 h-16 bg-pastelGreenLight rounded-full items-center justify-center mb-4">
              <MessageSquare color="#81C784" size={32} />
            </StyledView>
            <StyledText className="text-deepBlue font-semibold text-lg mb-2">No conversations yet</StyledText>
            <StyledText className="text-steelGray text-center px-8">
              Start swiping to match with {user?.role === 'RECRUITER' ? 'candidates' : 'recruiters'} and begin chatting
            </StyledText>
          </StyledView>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              onPress={() => handleSelectConversation(conversation)}
            />
          ))
        )}
      </StyledScrollView>
    </StyledView>
  );
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <StyledView className={`mb-3 ${isOwn ? 'items-end' : 'items-start'}`}>
      <StyledView
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isOwn ? 'bg-pastelGreen rounded-br-sm' : 'bg-white rounded-bl-sm border border-softGray'
        }`}
      >
        <StyledText className={isOwn ? 'text-white' : 'text-deepBlue'}>{message.content}</StyledText>
      </StyledView>
      <StyledText className="text-steelGray text-xs mt-1 px-1">{message.timestamp}</StyledText>
    </StyledView>
  );
}

interface ConversationItemProps {
  conversation: Conversation;
  onPress: () => void;
}

function ConversationItem({ conversation, onPress }: ConversationItemProps) {
  return (
    <StyledTouchableOpacity
      onPress={onPress}
      className="bg-white mx-4 mb-2 p-4 rounded-xl border border-softGray flex-row items-center"
    >
      <StyledView className="w-12 h-12 bg-pastelGreenLight rounded-full items-center justify-center mr-3">
        <User color="#81C784" size={24} />
      </StyledView>
      <StyledView className="flex-1">
        <StyledView className="flex-row items-center justify-between">
          <StyledText className="text-deepBlue font-semibold">{conversation.participantName}</StyledText>
          <StyledText className="text-steelGray text-xs">{conversation.lastMessageTime}</StyledText>
        </StyledView>
        <StyledText className="text-slateBlue text-xs mt-0.5">{conversation.jobTitle}</StyledText>
        <StyledText className="text-steelGray text-sm mt-1" numberOfLines={1}>
          {conversation.lastMessage}
        </StyledText>
      </StyledView>
      {conversation.unreadCount > 0 && (
        <StyledView className="w-6 h-6 bg-pastelRed rounded-full items-center justify-center ml-2">
          <StyledText className="text-white text-xs font-bold">{conversation.unreadCount}</StyledText>
        </StyledView>
      )}
    </StyledTouchableOpacity>
  );
}
