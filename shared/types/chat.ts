export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  read: boolean;
  createdAt: string; // ISO date string
}

export interface Chat {
  id: string;
  matchId: string;
  createdAt: string;
  updatedAt: string;
  match: {
    student: {
      userId: string;
      firstName: string;
      lastName: string;
      avatarUrl?: string;
    };
    internship: {
      id: string;
      title: string;
      recruiter: {
        userId: string;
        firstName: string;
        lastName: string;
        avatarUrl?: string;
      };
    };
  };
  lastMessage?: Message;
  unreadCount?: number;
}
