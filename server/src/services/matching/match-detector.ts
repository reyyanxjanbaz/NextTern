import { prisma } from '../../db/client.js';
import { matchEvents } from './match-events.js';
import { ApplicationState } from '../../../../shared/types/application-state.js';

export class MatchDetector {
  /**
   * Process a student interest signal (swipe right).
   */
  async processStudentInterest(studentId: string, internshipId: string) {
    const profile = await prisma.profile.findUnique({ where: { userId: studentId } });
    if (!profile) throw new Error('Profile not found');

    // Find or create Match record
    // We need an application to link to. If it doesn't exist, we might need to create one?
    // Or maybe Match can exist without Application initially?
    // Schema says `applicationId` is required on Match.
    // So we must ensure Application exists.
    
    let application = await prisma.application.findUnique({
      where: { studentId_internshipId: { studentId, internshipId } }
    });

    if (!application) {
      // Create application in DISCOVERED state if not exists
      // But wait, if student swipes right, is it DISCOVERED?
      // Yes, ApplicationState.DISCOVERED is "Initial state when student expresses interest".
      application = await prisma.application.create({
        data: {
          studentId,
          profileId: profile.id,
          // We need recruiterId. Internship has recruiterId.
          recruiterId: (await prisma.internship.findUniqueOrThrow({ where: { id: internshipId } })).recruiterId,
          internshipId,
          currentState: ApplicationState.DISCOVERED,
          stateHistory: [{
            state: ApplicationState.DISCOVERED,
            timestamp: new Date(),
            triggeredBy: 'student',
            actorId: studentId
          }]
        }
      });
    }

    // Upsert Match record
    const match = await prisma.match.upsert({
      where: {
        profileId_internshipId: {
          profileId: profile.id,
          internshipId
        }
      },
      update: {
        studentInterested: true,
        studentInterestedAt: new Date(),
        applicationId: application.id
      },
      create: {
        profileId: profile.id,
        internshipId,
        applicationId: application.id,
        studentInterested: true,
        studentInterestedAt: new Date()
      }
    });

    await this.checkAndUnlockMatch(match.id);
  }

  /**
   * Process a recruiter interest signal (shortlist).
   */
  async processRecruiterInterest(recruiterId: string, internshipId: string, studentId: string) {
    const profile = await prisma.profile.findUnique({ where: { userId: studentId } });
    if (!profile) throw new Error('Profile not found');

    const application = await prisma.application.findUnique({
      where: { studentId_internshipId: { studentId, internshipId } }
    });

    if (!application) throw new Error('Application should exist before shortlisting');

    // Upsert Match record
    const match = await prisma.match.upsert({
      where: {
        profileId_internshipId: {
          profileId: profile.id,
          internshipId
        }
      },
      update: {
        recruiterInterested: true,
        recruiterInterestedAt: new Date(),
        applicationId: application.id
      },
      create: {
        profileId: profile.id,
        internshipId,
        applicationId: application.id,
        recruiterInterested: true,
        recruiterInterestedAt: new Date()
      }
    });

    await this.checkAndUnlockMatch(match.id);
  }

  /**
   * Check if conditions are met for a match and unlock chat.
   */
  private async checkAndUnlockMatch(matchId: string) {
    const match = await prisma.match.findUnique({ where: { id: matchId } });
    if (!match) return;

    if (match.studentInterested && match.recruiterInterested && !match.isMatched) {
      // It's a match!
      const updatedMatch = await prisma.match.update({
        where: { id: matchId },
        data: {
          isMatched: true,
          matchedAt: new Date(),
          chatUnlocked: true
        },
        include: {
          application: true
        }
      });

      // Create Chat
      await prisma.chat.create({
        data: {
          matchId: updatedMatch.id,
          applicationId: updatedMatch.applicationId,
          participants: {
            create: [
              { userId: updatedMatch.application.studentId },
              { userId: updatedMatch.application.recruiterId }
            ]
          }
        }
      });

      // Emit event
      matchEvents.emitMatch(
        updatedMatch.id,
        updatedMatch.application.studentId,
        updatedMatch.application.recruiterId
      );
    }
  }
}

export const matchDetector = new MatchDetector();
