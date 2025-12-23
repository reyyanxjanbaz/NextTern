import { prisma } from '../db/client.js';
import { ApplicationState, ClosureReason } from '../generated/prisma/index.js';
import { swipeLimiter } from './swipe-limiter.js';
import { matchDetector } from './matching/match-detector.js';

export class InterestService {
  /**
   * Record a student's swipe decision (interested or pass)
   */
  async recordSwipe(studentId: string, internshipId: string, action: 'interested' | 'pass') {
    // 1. Check daily limit
    const { reached } = await swipeLimiter.hasReachedLimit(studentId);
    if (reached) {
      throw new Error('Daily swipe limit reached');
    }

    // 2. Get the student's profile ID (needed for Application and Match)
    const profile = await prisma.profile.findUnique({
      where: { userId: studentId },
    });

    if (!profile) {
      throw new Error('Student profile not found');
    }

    // 3. Get the internship to find the recruiter
    const internship = await prisma.internship.findUnique({
      where: { id: internshipId },
    });

    if (!internship) {
      throw new Error('Internship not found');
    }

    // Use transaction for atomicity
    return prisma.$transaction(async (tx) => {
      // Double-check limit inside transaction to prevent race conditions
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const dailyCount = await tx.application.count({
        where: {
          studentId,
          createdAt: {
            gte: todayStart,
            lte: todayEnd,
          },
        },
      });

      if (dailyCount >= 50) {
        throw new Error('Daily swipe limit reached');
      }

      // 4. Create or update the Application record
      const application = await tx.application.upsert({
        where: {
          studentId_internshipId: {
            studentId,
            internshipId,
          },
        },
        update: {
          studentViewed: true,
          currentState: action === 'interested' ? ApplicationState.DISCOVERED : ApplicationState.CLOSED,
          closureReason: action === 'pass' ? ClosureReason.REJECTED : undefined,
          closedAt: action === 'pass' ? new Date() : undefined,
        },
        create: {
          studentId,
          profileId: profile.id,
          internshipId,
          recruiterId: internship.recruiterId,
          currentState: action === 'interested' ? ApplicationState.DISCOVERED : ApplicationState.CLOSED,
          closureReason: action === 'pass' ? ClosureReason.REJECTED : undefined,
          closedAt: action === 'pass' ? new Date() : undefined,
          studentViewed: true,
        },
      });

      // 5. Manage the Match record
      if (action === 'interested') {
        // We can't use matchDetector inside transaction easily if it uses the global prisma instance.
        // But we can replicate the logic or pass the tx to matchDetector (if we refactor it).
        // For now, let's just do the match update here to keep the transaction benefits.
        
        const match = await tx.match.upsert({
          where: {
            profileId_internshipId: {
              profileId: profile.id,
              internshipId,
            },
          },
          update: {
            studentInterested: true,
            studentInterestedAt: new Date(),
            applicationId: application.id,
          },
          create: {
            profileId: profile.id,
            internshipId,
            applicationId: application.id,
            studentInterested: true,
            studentInterestedAt: new Date(),
          },
        });

        // Check for Mutual Match
        if (match.recruiterInterested && !match.isMatched) {
           const updatedMatch = await tx.match.update({
            where: { id: match.id },
            data: {
              isMatched: true,
              matchedAt: new Date(),
              chatUnlocked: true,
            },
          });
          
          // Create Chat
          await tx.chat.create({
            data: {
              matchId: match.id,
              applicationId: application.id,
              participants: {
                create: [
                  { userId: studentId },
                  { userId: internship.recruiterId },
                ],
              },
            },
          });
          
          // We should emit the event, but outside the transaction or after it.
          // We'll return a flag.
          return { application, match: updatedMatch, matched: true };
        }
        return { application, match, matched: false };
      } else {
        // Pass action - ensure no match
         const match = await tx.match.upsert({
          where: {
            profileId_internshipId: {
              profileId: profile.id,
              internshipId,
            },
          },
          update: {
            studentInterested: false,
          },
          create: {
            profileId: profile.id,
            internshipId,
            applicationId: application.id,
            studentInterested: false,
          },
        });
        return { application, match, matched: false };
      }
    });
  }

  /**
   * Get a list of internships the student has liked (interested)
   */
  async getInterestedInternships(studentId: string) {
    const profile = await prisma.profile.findUnique({
      where: { userId: studentId },
    });

    if (!profile) return [];

    return prisma.match.findMany({
      where: {
        profileId: profile.id,
        studentInterested: true,
      },
      include: {
        internship: {
          include: {
            company: true,
          },
        },
      },
      orderBy: {
        studentInterestedAt: 'desc',
      },
    });
  }
  /**
   * Get internships for discovery (not yet swiped)
   */
  async getDiscoverableInternships(studentId: string, limit = 10) {
    // Get IDs of internships the student has already interacted with
    const interactedInternships = await prisma.application.findMany({
      where: { studentId },
      select: { internshipId: true },
    });

    const excludedIds = interactedInternships.map(a => a.internshipId);

    // Find internships not in the excluded list
    return prisma.internship.findMany({
      where: {
        id: { notIn: excludedIds },
        state: 'ACTIVE',
        acceptingApplications: true,
      },
      include: {
        company: true,
      },
      take: limit,
    });
  }
}

export const interestService = new InterestService();
