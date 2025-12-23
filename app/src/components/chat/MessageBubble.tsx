import React from 'react';
import { Message } from '@nexttern/shared';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { user } = useAuth();
  const isOwn = message.senderId === user?.id;

  return (
    <div className={cn(
      "flex w-full mb-4",
      isOwn ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[70%] rounded-2xl px-4 py-2 text-sm",
        isOwn 
          ? "bg-blue-600 text-white rounded-br-none" 
          : "bg-gray-100 text-gray-900 rounded-bl-none"
      )}>
        <p>{message.content}</p>
        <div className={cn(
          "text-[10px] mt-1 text-right",
          isOwn ? "text-blue-100" : "text-gray-500"
        )}>
          {format(new Date(message.createdAt), 'HH:mm')}
        </div>
      </div>
    </div>
  );
};
