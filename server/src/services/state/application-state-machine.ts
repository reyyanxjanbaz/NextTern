import { prisma } from '../../db/client.js';
import { ApplicationState } from '../../../../shared/types/application-state.js';
import { isValidTransition } from './state-transitions.js';
import { stateLogger } from './state-logger.js';

import { ClosureReason } from '../../../../shared/types/application-state.js';
import { loopClosureNotificationService } from '../notifications/loop-closure.js';

export class ApplicationStateMachine {
  /**
   * Transition an application to a new state.
   * 
   * @param applicationId ID of the application
   * @param newState Target state
   * @param actorId User ID performing the action
   * @param note Optional note
   * @param reason Optional closure reason
   */
  async transition(
    applicationId: string,
    newState: ApplicationState,
    actorId: string,
    note?: string,
    reason?: ClosureReason
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
      const updateData: any = {
        currentState: newState,
        stateEnteredAt: new Date(),
      };

      if (reason) {
        updateData.closureReason = reason;
        if (newState === ApplicationState.CLOSED || newState === ApplicationState.DECIDED) {
          updateData.closedAt = new Date();
        }
      }

      await prisma.application.update({
        where: { id: applicationId },
        data: updateData
      });

      // 4. Log transition
      await stateLogger.logTransition({
        applicationId,
        fromState: currentState,
        toState: newState,
        actorId,
        note
      });

      // 5. Send notifications for loop closure
      if (reason && (newState === ApplicationState.CLOSED || newState === ApplicationState.DECIDED)) {
        // Fire and forget notification
        loopClosureNotificationService.notifyStudent(applicationId, reason, note).catch(console.error);
      }
    }

    return { success: true, newState };
  }
}

export const applicationStateMachine = new ApplicationStateMachine();
