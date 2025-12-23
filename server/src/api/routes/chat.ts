import { Router } from 'express';
import { chatService } from '../../services/chat/chat.js';
import { AppError } from '../middleware/error.js';

const router = Router();

// Get messages for a chat
router.get('/:chatId/messages', async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { limit, offset } = req.query;
    const userId = req.user!.id;

    const messages = await chatService.getMessages(
      chatId,
      userId,
      limit ? parseInt(limit as string) : undefined,
      offset ? parseInt(offset as string) : undefined
    );

    res.json({
      status: 'success',
      data: messages
    });
  } catch (error) {
    next(error);
  }
});

// Send a message
router.post('/:chatId/messages', async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const userId = req.user!.id;

    if (!content) {
      throw new AppError('Message content is required', 400);
    }

    const message = await chatService.sendMessage(chatId, userId, content);

    res.status(201).json({
      status: 'success',
      data: message
    });
  } catch (error) {
    next(error);
  }
});

// Mark messages as read
router.post('/:chatId/read', async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const userId = req.user!.id;

    await chatService.markAsRead(chatId, userId);

    res.json({
      status: 'success',
      message: 'Messages marked as read'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
