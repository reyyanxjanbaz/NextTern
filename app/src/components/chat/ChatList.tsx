import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import { formatDistanceToNow } from 'date-fns';

export const ChatList: React.FC = () => {
  const { chats, activeChat, setActiveChat, isLoadingChats } = useChat();
  const { user } = useAuth();

  if (!user) return null;

  const isStudent = user.role === 'student';

  if (isLoadingChats) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="mb-2">No matches yet.</p>
        <p className="text-sm">Keep swiping to find your match!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {chats.map((chat) => {
        const otherParty = isStudent 
          ? chat.match.internship.recruiter 
          : chat.match.student;
        
        const isActive = activeChat?.id === chat.id;
        const hasUnread = (chat.unreadCount || 0) > 0;

        return (
          <button
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className={cn(
              "flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left w-full",
              isActive && "bg-blue-50 hover:bg-blue-50"
            )}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-lg">
                {otherParty.avatarUrl ? (
                  <img src={otherParty.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  `${otherParty.firstName[0]}${otherParty.lastName[0]}`
                )}
              </div>
              {hasUnread && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">{chat.unreadCount}</span>
                </div>
              )}
            </div>
            
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={cn(
                  "font-medium truncate pr-2",
                  hasUnread ? "text-gray-900 font-semibold" : "text-gray-700"
                )}>
                  {otherParty.firstName} {otherParty.lastName}
                </h3>
                {chat.lastMessage && (
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {formatDistanceToNow(new Date(chat.lastMessage.createdAt), { addSuffix: false })}
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <p className={cn(
                  "text-sm truncate",
                  hasUnread ? "text-gray-900 font-medium" : "text-gray-500"
                )}>
                  {chat.lastMessage ? chat.lastMessage.content : "New match! Say hello 👋"}
                </p>
              </div>
              
              <p className="text-xs text-blue-600 mt-1 truncate">
                {chat.match.internship.title}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
