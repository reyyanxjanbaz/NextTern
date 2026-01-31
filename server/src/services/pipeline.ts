import { prisma } from '../db/client.js';
import { ApplicationState, ClosureReason } from '../generated/prisma/index.js';
import { applicationStateMachine } from './state/application-state-machine.js';
import { AppError } from '../api/middleware/error-handler.js';

export class PipelineService {
  /**
   * Get pipeline data for a recruiter
   */
  async getPipeline(recruiterId: string, internshipId?: string) {
    // Build query
    const where: any = {
      internship: {
        recruiterId
      }
    };

    if (internshipId) {
      where.internshipId = internshipId;
    }

    // Fetch applications
    const applications = await prisma.application.findMany({
      where,
      include: {
        student: {
          select: {
            email: true,
            profile: {
              select: {
                name: true,
                photoUrl: true,
                headline: true,
                skills: {
                  take: 3,
                  select: {
                    name: true,
                    proficiency: true
                  }
                }
              }
            }
          }
        },
        internship: {
          select: {
            id: true,
            title: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    // Group by state
    const pipeline: Record<ApplicationState, any[]> = {
      [ApplicationState.DISCOVERED]: [],
      [ApplicationState.VIEWED]: [],
      [ApplicationState.SHORTLISTED]: [],
      [ApplicationState.CONTACTED]: [],
      [ApplicationState.INTERVIEWING]: [],
      [ApplicationState.DECIDED]: [],
      [ApplicationState.CLOSED]: []
    };

    applications.forEach(app => {
      const state = app.currentState as ApplicationState;
      if (pipeline[state]) {
        pipeline[state].push(app);
      }
    });

    return pipeline;
  }

  /**
   * Move candidate to next stage
   */
  async moveCandidate(
    applicationId: string, 
    newState: ApplicationState, 
    recruiterId: string,
    note?: string,
    reason?: ClosureReason
  ) {
    // Verify ownership
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        internship: true
      }
    });

    if (!application) {
      throw new AppError('Application not found', 404);
    }

    if (application.internship.recruiterId !== recruiterId) {
      throw new AppError('Not authorized to manage this application', 403);
    }

    // Perform transition
    return await applicationStateMachine.transition(
      applicationId,
      newState as any,
      recruiterId, // Actor ID (recruiter's user ID)
      note,
      reason as any
    );
  }
}

export const pipelineService = new PipelineService();
