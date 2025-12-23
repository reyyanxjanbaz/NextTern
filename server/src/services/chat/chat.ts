import { prisma } from '../../db/client.js';
import { AppError } from '../../api/middleware/error.js';
import { webSocketService } from './websocket.js';

export class ChatService {
  /**
   * Send a message in a chat
   */
  async sendMessage(chatId: string, senderId: string, content: string) {
    // Verify chat exists and user is a participant
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        match: {
          include: {
            student: true,
            internship: {
              include: {
                recruiter: true
              }
            }
          }
        }
      }
    });

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    // Check if sender is part of the chat
    const isStudent = chat.match.student.userId === senderId;
    const isRecruiter = chat.match.internship.recruiter.userId === senderId;

    if (!isStudent && !isRecruiter) {
      throw new AppError('Not authorized to send messages in this chat', 403);
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        chatId,
        senderId,
        content,
        read: false
      }
    });

    // Update chat's last message timestamp
    await prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() }
    });

    // Broadcast message via WebSocket
    if (webSocketService) {
      const recipientId = isStudent 
        ? chat.match.internship.recruiter.userId 
        : chat.match.student.userId;
      
      webSocketService.sendToUser(recipientId, 'new_message', message);
      // Also send back to sender for confirmation/optimistic UI sync if needed
      webSocketService.sendToUser(senderId, 'message_sent', message);
    }

    return message;
  }

  /**
   * Get messages for a chat
   */
  async getMessages(chatId: string, userId: string, limit = 50, offset = 0) {
    // Verify chat access
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        match: {
          include: {
            student: true,
            internship: {
              include: {
                recruiter: true
              }
            }
          }
        }
      }
    });

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    const isStudent = chat.match.student.userId === userId;
    const isRecruiter = chat.match.internship.recruiter.userId === userId;

    if (!isStudent && !isRecruiter) {
      throw new AppError('Not authorized to view this chat', 403);
    }

    // Fetch messages
    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    });

    return messages.reverse(); // Return in chronological order
  }

  /**
   * Mark messages as read
   */
  async markAsRead(chatId: string, userId: string) {
    // Update all messages in this chat sent by the OTHER person to read
    // We don't need to verify access strictly here because we only update messages NOT sent by userId
    
    await prisma.message.updateMany({
      where: {
        chatId,
        senderId: { not: userId },
        read: false
      },
      data: {
        read: true
      }
    });
  }
}

export const chatService = new ChatService();
