import { prisma } from '../db/client.js';
import { ApplicationState, ClosureReason } from '../../../../shared/types/application-state.js';
import { applicationStateMachine } from './state/application-state-machine.js';
import { AppError } from '../../api/middleware/error.js';

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
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatarUrl: true
              }
            },
            profile: {
              select: {
                headline: true,
                location: true,
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
      newState,
      recruiterId, // Actor ID (recruiter's user ID)
      note,
      reason
    );
  }
}

export const pipelineService = new PipelineService();
