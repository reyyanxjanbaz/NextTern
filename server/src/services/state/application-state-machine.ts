import { prisma } from '../../db/client.js';
import { ApplicationState } from '../../../../shared/types/application-state.js';
import { isValidTransition } from './state-transitions.js';
import { stateLogger } from './state-logger.js';

export class ApplicationStateMachine {
  /**
   * Transition an application to a new state.
   * 
   * @param applicationId ID of the application
   * @param newState Target state
   * @param actorId User ID performing the action
   * @param note Optional note
   */
  async transition(
    applicationId: string,
    newState: ApplicationState,
    actorId: string,
    note?: string
  ) {
    // 1. Fetch current state
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true, currentState: true }
    });

    if (!application) {
      throw new Error('Application not found');
    }

    const currentState = application.currentState as ApplicationState;

    // 2. Validate transition
    if (currentState !== newState && !isValidTransition(currentState, newState)) {
      throw new Error(`Invalid state transition from ${currentState} to ${newState}`);
    }

    // 3. Perform update
    if (currentState !== newState) {
      await prisma.application.update({
        where: { id: applicationId },
        data: {
          currentState: newState,
          stateEnteredAt: new Date(),
          // stateHistory is updated via logger
        }
      });

      // 4. Log transition
      await stateLogger.logTransition({
        applicationId,
        fromState: currentState,
        toState: newState,
        actorId,
        note
      });
    }

    return { success: true, newState };
  }
}

export const applicationStateMachine = new ApplicationStateMachine();
