import { PrismaClient } from '@prisma/client';
import { startOfDay, endOfDay } from 'date-fns';

const prisma = new PrismaClient();

const DAILY_SWIPE_LIMIT = 50;

export class SwipeLimiterService {
  /**
   * Check if the student has reached their daily swipe limit.
   */
  async hasReachedLimit(studentId: string): Promise<{ reached: boolean; remaining: number; limit: number }> {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    // Count applications created today (assuming every swipe creates an application interaction)
    // We filter by studentId and createdAt within today's range
    const swipeCount = await prisma.application.count({
      where: {
        studentId: studentId,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    return {
      reached: swipeCount >= DAILY_SWIPE_LIMIT,
      remaining: Math.max(0, DAILY_SWIPE_LIMIT - swipeCount),
      limit: DAILY_SWIPE_LIMIT,
    };
  }

  /**
   * Get the current swipe count for today
   */
  async getDailySwipeCount(studentId: string): Promise<number> {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    return prisma.application.count({
      where: {
        studentId: studentId,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });
  }
}

export const swipeLimiter = new SwipeLimiterService();
