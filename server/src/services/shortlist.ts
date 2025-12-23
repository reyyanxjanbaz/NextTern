import { prisma } from '../db/client.js';
import { ApplicationState } from '../generated/prisma/index.js';

export class ShortlistService {
  /**
   * Shortlist a candidate for an internship
   */
  async shortlistCandidate(recruiterId: string, internshipId: string, studentId: string) {
    // Check if application exists
    const existingApplication = await prisma.application.findUnique({
      where: {
        studentId_internshipId: {
          studentId,
          internshipId
        }
      }
    });

    if (existingApplication) {
      // Update state if not already further along
      // TODO: Add state machine logic validation
      return prisma.application.update({
        where: { id: existingApplication.id },
        data: {
          currentState: ApplicationState.SHORTLISTED,
          stateHistory: {
            push: {
              state: ApplicationState.SHORTLISTED,
              timestamp: new Date(),
              actorId: recruiterId
            }
          },
          recruiterViewed: true
        }
      });
    } else {
      // Create new application in SHORTLISTED state
      // We need profileId. Assuming we can get it from studentId
      const profile = await prisma.profile.findUnique({
        where: { userId: studentId }
      });

      if (!profile) {
        throw new Error('Student profile not found');
      }

      return prisma.application.create({
        data: {
          studentId,
          profileId: profile.id,
          recruiterId,
          internshipId,
          currentState: ApplicationState.SHORTLISTED,
          recruiterViewed: true,
          stateHistory: [
            {
              state: ApplicationState.SHORTLISTED,
              timestamp: new Date(),
              actorId: recruiterId
            }
          ]
        }
      });
    }
  }

  /**
   * Get shortlisted candidates for an internship
   */
  async getShortlistedCandidates(internshipId: string) {
    return prisma.application.findMany({
      where: {
        internshipId,
        currentState: ApplicationState.SHORTLISTED
      },
      include: {
        profile: {
          include: {
            skills: true,
            projects: true
          }
        }
      }
    });
  }

  /**
   * Remove from shortlist (Pass)
   */
  async passCandidate(recruiterId: string, internshipId: string, studentId: string) {
     // For now, maybe we just don't create an application, or we mark it as CLOSED/REJECTED?
     // Or maybe we have a 'PASSED' state? The enum doesn't have PASSED.
     // Maybe CLOSED with reason REJECTED?
     
     // If we are just swiping, maybe we don't create a record if passed?
     // But we want to avoid showing them again.
     // So we might need a way to track "seen but passed".
     // ApplicationState.VIEWED might be appropriate, or CLOSED/REJECTED.
     
     // Let's use CLOSED/REJECTED for now.
     
     const profile = await prisma.profile.findUnique({
        where: { userId: studentId }
      });

      if (!profile) {
        throw new Error('Student profile not found');
      }

     return prisma.application.create({
        data: {
          studentId,
          profileId: profile.id,
          recruiterId,
          internshipId,
          currentState: ApplicationState.CLOSED,
          closureReason: 'REJECTED',
          recruiterViewed: true,
          stateHistory: [
            {
              state: ApplicationState.CLOSED,
              timestamp: new Date(),
              actorId: recruiterId
            }
          ]
        }
      });
  }
}

export const shortlistService = new ShortlistService();
