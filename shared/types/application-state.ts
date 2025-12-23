/**
 * NextTern Shared Types: Application State
 *
 * Constitution Article VI.2 - Hiring Is a Flow, Not a Search:
 * Explicit states are mandatory. Hidden states are forbidden.
 *
 * Spec FR-015: Every application MUST exist in exactly one state.
 * Spec FR-016: System MUST NOT allow ambiguous or hidden application states.
 */

/**
 * Application State Enum
 *
 * These are the ONLY valid states for an application.
 * No other states are allowed (Constitution compliance).
 */
export enum ApplicationState {
  /**
   * Initial state when student expresses interest.
   * Student has swiped right or clicked interest.
   */
  DISCOVERED = 'discovered',

  /**
   * Recruiter has viewed the student's profile.
   * Student can see that their profile was viewed.
   */
  VIEWED = 'viewed',

  /**
   * Recruiter has added student to shortlist.
   * This triggers chat unlock when combined with student interest.
   */
  SHORTLISTED = 'shortlisted',

  /**
   * Communication has been initiated.
   * At least one message has been exchanged.
   */
  CONTACTED = 'contacted',

  /**
   * Interview process is active.
   * Could be phone screen, technical, or on-site.
   */
  INTERVIEWING = 'interviewing',

  /**
   * A decision has been made (offer or rejection).
   * The loop is closing.
   */
  DECIDED = 'decided',

  /**
   * Application is fully closed.
   * Either accepted, rejected, or withdrawn.
   */
  CLOSED = 'closed',
}

/**
 * Application state display metadata.
 * Used for consistent UI rendering across the platform.
 */
export const APPLICATION_STATE_META: Record<
  ApplicationState,
  {
    label: string;
    description: string;
    color: string;
    icon: string;
    isTerminal: boolean;
  }
> = {
  [ApplicationState.DISCOVERED]: {
    label: 'Discovered',
    description: 'You expressed interest in this opportunity',
    color: 'state-discovered',
    icon: 'eye',
    isTerminal: false,
  },
  [ApplicationState.VIEWED]: {
    label: 'Viewed',
    description: 'The recruiter has viewed your profile',
    color: 'state-viewed',
    icon: 'user-check',
    isTerminal: false,
  },
  [ApplicationState.SHORTLISTED]: {
    label: 'Shortlisted',
    description: 'You have been shortlisted for this role',
    color: 'state-shortlisted',
    icon: 'star',
    isTerminal: false,
  },
  [ApplicationState.CONTACTED]: {
    label: 'Contacted',
    description: 'Communication has been initiated',
    color: 'state-contacted',
    icon: 'message-circle',
    isTerminal: false,
  },
  [ApplicationState.INTERVIEWING]: {
    label: 'Interviewing',
    description: 'Interview process is in progress',
    color: 'state-interviewing',
    icon: 'video',
    isTerminal: false,
  },
  [ApplicationState.DECIDED]: {
    label: 'Decision Made',
    description: 'A decision has been made on your application',
    color: 'state-decided',
    icon: 'check-circle',
    isTerminal: false,
  },
  [ApplicationState.CLOSED]: {
    label: 'Closed',
    description: 'This application has been closed',
    color: 'state-closed',
    icon: 'archive',
    isTerminal: true,
  },
};

/**
 * Valid state transitions.
 * Constitution Article VI.2: State transitions must be explicit.
 */
export const VALID_STATE_TRANSITIONS: Record<ApplicationState, ApplicationState[]> = {
  [ApplicationState.DISCOVERED]: [
    ApplicationState.VIEWED,
    ApplicationState.CLOSED, // Student can withdraw
  ],
  [ApplicationState.VIEWED]: [
    ApplicationState.SHORTLISTED,
    ApplicationState.CLOSED, // Rejected without shortlist
  ],
  [ApplicationState.SHORTLISTED]: [
    ApplicationState.CONTACTED,
    ApplicationState.CLOSED, // Removed from shortlist
  ],
  [ApplicationState.CONTACTED]: [
    ApplicationState.INTERVIEWING,
    ApplicationState.DECIDED, // Direct decision without interview
    ApplicationState.CLOSED, // Communication ended
  ],
  [ApplicationState.INTERVIEWING]: [
    ApplicationState.DECIDED,
    ApplicationState.CLOSED, // Process cancelled
  ],
  [ApplicationState.DECIDED]: [
    ApplicationState.CLOSED, // Final closure after decision
  ],
  [ApplicationState.CLOSED]: [], // Terminal state - no transitions out
};

/**
 * Check if a state transition is valid.
 */
export function isValidStateTransition(
  from: ApplicationState,
  to: ApplicationState
): boolean {
  return VALID_STATE_TRANSITIONS[from].includes(to);
}

/**
 * Get possible next states from current state.
 * Spec FR-017: Students MUST see next possible outcomes.
 */
export function getNextPossibleStates(current: ApplicationState): ApplicationState[] {
  return VALID_STATE_TRANSITIONS[current];
}

/**
 * Check if a state is terminal (no further transitions).
 */
export function isTerminalState(state: ApplicationState): boolean {
  return APPLICATION_STATE_META[state].isTerminal;
}

/**
 * Closure reason for closed applications.
 */
export enum ClosureReason {
  ACCEPTED = 'accepted', // Student accepted offer
  REJECTED = 'rejected', // Recruiter rejected
  WITHDRAWN = 'withdrawn', // Student withdrew
  EXPIRED = 'expired', // Time-based expiration
  CANCELLED = 'cancelled', // Role cancelled
}

/**
 * Closure reason display metadata.
 */
export const CLOSURE_REASON_META: Record<
  ClosureReason,
  {
    label: string;
    description: string;
    variant: 'positive' | 'negative' | 'neutral';
  }
> = {
  [ClosureReason.ACCEPTED]: {
    label: 'Accepted',
    description: 'Congratulations! You accepted this opportunity.',
    variant: 'positive',
  },
  [ClosureReason.REJECTED]: {
    label: 'Not Selected',
    description: 'This opportunity has moved forward with other candidates.',
    variant: 'negative',
  },
  [ClosureReason.WITHDRAWN]: {
    label: 'Withdrawn',
    description: 'You withdrew from this opportunity.',
    variant: 'neutral',
  },
  [ClosureReason.EXPIRED]: {
    label: 'Expired',
    description: 'This opportunity has expired.',
    variant: 'neutral',
  },
  [ClosureReason.CANCELLED]: {
    label: 'Cancelled',
    description: 'This role is no longer available.',
    variant: 'neutral',
  },
};
