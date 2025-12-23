import { prisma } from '../../db/client.js';
import { ApplicationState } from '../../../../shared/types/application-state.js';

interface StateLogEntry {
  applicationId: string;
  fromState: ApplicationState | null;
  toState: ApplicationState;
  actorId: string; // User ID who triggered the change
  note?: string;
}

export class StateLogger {
  /**
   * Log a state transition to the application history.
   * Note: This updates the `stateHistory` JSON field on the Application model.
   */
  async logTransition(entry: StateLogEntry) {
    const { applicationId, fromState, toState, actorId, note } = entry;

    const historyEntry = {
      fromState,
      toState,
      timestamp: new Date(),
      triggeredBy: 'system', // Default, should be refined based on actor role lookup if needed
      actorId,
      note
    };

    // We need to fetch the current history first to append
    // Or use Prisma's atomic update if supported for JSON arrays (Postgres specific)
    // For safety/portability, we'll fetch-then-update or use raw query if needed.
    // Prisma supports `push` for JSON arrays in Postgres.
    
    await prisma.application.update({
      where: { id: applicationId },
      data: {
        stateHistory: {
          push: historyEntry
        }
      }
    });
  }
}

export const stateLogger = new StateLogger();
