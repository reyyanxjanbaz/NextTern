import { PrismaClient, ApplicationState, ClosureReason } from '@prisma/client';
import { swipeLimiter } from './swipe-limiter';

const prisma = new PrismaClient();

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
      // This tracks the interaction and counts towards the daily limit
      const application = await tx.application.upsert({
        where: {
          studentId_internshipId: {
            studentId,
            internshipId,
          },
        },
        update: {
          // If updating, we might be changing state, but usually swipes happen once per discovery
          studentViewed: true,
          currentState: action === 'interested' ? ApplicationState.VIEWED : ApplicationState.CLOSED,
          closureReason: action === 'pass' ? ClosureReason.REJECTED : undefined,
          closedAt: action === 'pass' ? new Date() : undefined,
        },
        create: {
          studentId,
          profileId: profile.id,
          internshipId,
          recruiterId: internship.recruiterId,
          currentState: action === 'interested' ? ApplicationState.VIEWED : ApplicationState.CLOSED,
          closureReason: action === 'pass' ? ClosureReason.REJECTED : undefined,
          closedAt: action === 'pass' ? new Date() : undefined,
          studentViewed: true,
        },
      });

      // 5. Manage the Match record
      // We always create a match record to track the specific "studentInterested" signal
      // even if it's false (pass), so we know not to show it again.
      const match = await tx.match.upsert({
        where: {
          profileId_internshipId: {
            profileId: profile.id,
            internshipId,
          },
        },
        update: {
          studentInterested: action === 'interested',
          studentInterestedAt: new Date(),
          // Check for mutual match if student is interested
          isMatched: action === 'interested' ? undefined : false, // If pass, definitely not matched
        },
        create: {
          profileId: profile.id,
          internshipId,
          applicationId: application.id,
          studentInterested: action === 'interested',
          studentInterestedAt: new Date(),
        },
      });

      // 6. Check for Mutual Match (Unlock Chat)
      if (action === 'interested' && match.recruiterInterested) {
        await tx.match.update({
          where: { id: match.id },
          data: {
            isMatched: true,
            matchedAt: new Date(),
            chatUnlocked: true,
          },
        });
        
        // Create the Chat
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
      }

      return { application, match };
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
