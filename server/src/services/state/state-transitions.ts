import { ApplicationState, VALID_STATE_TRANSITIONS } from '../../../../shared/types/application-state.js';

/**
 * Validates if a state transition is allowed.
 * 
 * @param from Current state
 * @param to Target state
 * @returns boolean
 */
export function isValidTransition(from: ApplicationState, to: ApplicationState): boolean {
  const allowed = VALID_STATE_TRANSITIONS[from];
  return allowed ? allowed.includes(to) : false;
}

/**
 * Get allowed next states.
 */
export function getAllowedTransitions(from: ApplicationState): ApplicationState[] {
  return VALID_STATE_TRANSITIONS[from] || [];
}
