import { ClosureReason } from '../../generated/prisma/index.js';
import { prisma } from '../../db/client.js';

export class LoopClosureNotificationService {
  /**
   * Notify student when their application loop is closed
   */
  async notifyStudent(
    applicationId: string,
    reason: ClosureReason,
    note?: string
  ) {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        student: true,
        internship: {
          include: {
            company: true
          }
        }
      }
    });

    if (!application) return;

    const { student, internship } = application;

    // In a real system, this would send an email or push notification
    console.log(`
      [NOTIFICATION] Loop Closed for ${student.email}
      Internship: ${internship.title || 'Untitled Internship'} at ${internship.company?.name || 'Unknown Company'}
      Reason: ${reason}
      Note: ${note || 'No additional feedback provided.'}
    `);
    
    // We could also create an in-app notification record here
    // await prisma.notification.create({ ... })
  }
}

export const loopClosureNotificationService = new LoopClosureNotificationService();
