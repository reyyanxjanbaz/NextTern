/**
 * NextTern Shared Types: StatusCard
 *
 * Constitution Article I.3 - Anxiety Is a UX Bug:
 * If a user can reasonably ask "What is happening?" or
 * "What should I do next?", the system has failed.
 *
 * Constitution Article VI.3 - Silence Is Not Neutral:
 * The system MUST surface status. Loops MUST eventually close.
 * Candidates MUST NOT wait indefinitely.
 *
 * Spec FR-017: Students MUST always see:
 * - Current state
 * - Time spent in state
 * - Next possible outcomes
 */

import type { Card, CardSummary, CardExpanded, CardAction } from './card.js';
import { ApplicationState, ClosureReason } from './application-state.js';

/**
 * Time-in-state tracking.
 * Spec FR-017: Time spent in state must be visible.
 */
export interface TimeInState {
  /** When this state was entered */
  enteredAt: Date;

  /** Duration in this state (calculated) */
  duration: {
    days: number;
    hours: number;
    minutes: number;
  };

  /** Human-readable duration string */
  durationText: string;

  /** Is this considered "stale"? */
  isStale: boolean;

  /** Stale threshold for this state (in days) */
  staleThresholdDays: number;
}

/**
 * State history entry for transparency.
 */
export interface StateHistoryEntry {
  /** Previous state */
  fromState: ApplicationState | null;

  /** New state */
  toState: ApplicationState;

  /** Transition timestamp */
  timestamp: Date;

  /** Who triggered the transition */
  triggeredBy: 'student' | 'recruiter' | 'system';

  /** Optional note/reason */
  note?: string;
}

/**
 * Next possible outcome from current state.
 */
export interface NextOutcome {
  /** The possible next state */
  state: ApplicationState;

  /** Human-readable description */
  description: string;

  /** Who can trigger this transition */
  triggeredBy: 'student' | 'recruiter' | 'either' | 'system';

  /** Likelihood indicator (if known) */
  likelihood?: 'likely' | 'possible' | 'unlikely';
}

/**
 * StatusCard summary view data.
 */
export interface StatusCardSummary extends CardSummary {
  /** Current application state */
  currentState: ApplicationState;

  /** State display info */
  stateDisplay: {
    label: string;
    color: string;
    icon: string;
  };

  /** Related internship summary */
  internship: {
    id: string;
    title: string;
    company: string;
    logoUrl?: string;
  };

  /** Time in current state */
  timeInState: TimeInState;

  /** Quick action hint */
  actionHint?: string;
}

/**
 * StatusCard expanded view data.
 */
export interface StatusCardExpanded extends CardExpanded {
  /** Full state history */
  stateHistory: StateHistoryEntry[];

  /** Next possible outcomes */
  nextOutcomes: NextOutcome[];

  /** Related internship ID */
  internshipId: string;

  /** Chat availability (if matched) */
  chatAvailable: boolean;

  /** Chat ID (if available) */
  chatId?: string;

  /** Closure details (if closed) */
  closure?: {
    reason: ClosureReason;
    closedAt: Date;
    feedback?: string;
  };

  /** Actions available to the student */
  studentActions: string[];
}

/**
 * StatusCard - Application state visibility card.
 *
 * Constitution Article IV.2 - Cards Tell Stories:
 * Must answer: "What is happening with my application?"
 */
export interface StatusCard extends Card<'status'> {
  type: 'status';

  /** Summary view */
  summary: StatusCardSummary;

  /** Expanded view */
  expanded: StatusCardExpanded;

  /** Associated application ID */
  applicationId: string;

  /** Student user ID */
  studentId: string;

  /** Internship ID */
  internshipId: string;

  /** Recruiter user ID */
  recruiterId: string;

  /** Current application state */
  currentState: ApplicationState;

  /** State entered timestamp */
  stateEnteredAt: Date;

  /** Whether student has viewed latest state */
  studentViewed: boolean;

  /** Whether recruiter has viewed latest state */
  recruiterViewed: boolean;
}

/**
 * Default actions for StatusCard (Student view).
 */
export const STATUS_CARD_STUDENT_ACTIONS: Record<string, CardAction> = {
  viewDetails: {
    id: 'view-details',
    label: 'View Details',
    icon: 'info',
    type: 'primary',
    enabled: true,
  },
  openChat: {
    id: 'open-chat',
    label: 'Open Chat',
    icon: 'message-circle',
    type: 'primary',
    enabled: false, // Enabled only when chat is available
  },
  withdraw: {
    id: 'withdraw',
    label: 'Withdraw Application',
    icon: 'x-circle',
    type: 'danger',
    enabled: true,
    requiresConfirmation: true,
  },
};

/**
 * Calculate time in state.
 */
export function calculateTimeInState(
  enteredAt: Date,
  staleThresholdDays: number = 7
): TimeInState {
  const now = new Date();
  const diffMs = now.getTime() - enteredAt.getTime();

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  let durationText: string;
  if (days > 0) {
    durationText = days === 1 ? '1 day' : `${days} days`;
  } else if (hours > 0) {
    durationText = hours === 1 ? '1 hour' : `${hours} hours`;
  } else {
    durationText = minutes <= 1 ? 'Just now' : `${minutes} minutes`;
  }

  return {
    enteredAt,
    duration: { days, hours, minutes },
    durationText,
    isStale: days >= staleThresholdDays,
    staleThresholdDays,
  };
}

/**
 * Get next possible outcomes for a state.
 */
export function getNextOutcomes(currentState: ApplicationState): NextOutcome[] {
  const outcomes: NextOutcome[] = [];

  switch (currentState) {
    case ApplicationState.DISCOVERED:
      outcomes.push(
        {
          state: ApplicationState.VIEWED,
          description: 'Recruiter views your profile',
          triggeredBy: 'recruiter',
          likelihood: 'likely',
        },
        {
          state: ApplicationState.CLOSED,
          description: 'You can withdraw your interest',
          triggeredBy: 'student',
        }
      );
      break;

    case ApplicationState.VIEWED:
      outcomes.push(
        {
          state: ApplicationState.SHORTLISTED,
          description: 'Recruiter adds you to shortlist',
          triggeredBy: 'recruiter',
          likelihood: 'possible',
        },
        {
          state: ApplicationState.CLOSED,
          description: 'Application may be closed',
          triggeredBy: 'either',
        }
      );
      break;

    case ApplicationState.SHORTLISTED:
      outcomes.push(
        {
          state: ApplicationState.CONTACTED,
          description: 'Recruiter initiates conversation',
          triggeredBy: 'recruiter',
          likelihood: 'likely',
        },
        {
          state: ApplicationState.CLOSED,
          description: 'Application may be closed',
          triggeredBy: 'either',
        }
      );
      break;

    case ApplicationState.CONTACTED:
      outcomes.push(
        {
          state: ApplicationState.INTERVIEWING,
          description: 'Interview process begins',
          triggeredBy: 'recruiter',
          likelihood: 'likely',
        },
        {
          state: ApplicationState.DECIDED,
          description: 'Decision without formal interview',
          triggeredBy: 'recruiter',
          likelihood: 'possible',
        },
        {
          state: ApplicationState.CLOSED,
          description: 'Application may be closed',
          triggeredBy: 'either',
        }
      );
      break;

    case ApplicationState.INTERVIEWING:
      outcomes.push(
        {
          state: ApplicationState.DECIDED,
          description: 'A decision will be made',
          triggeredBy: 'recruiter',
          likelihood: 'likely',
        },
        {
          state: ApplicationState.CLOSED,
          description: 'Process may be cancelled',
          triggeredBy: 'either',
        }
      );
      break;

    case ApplicationState.DECIDED:
      outcomes.push({
        state: ApplicationState.CLOSED,
        description: 'Application will be finalized',
        triggeredBy: 'either',
        likelihood: 'likely',
      });
      break;

    case ApplicationState.CLOSED:
      // Terminal state - no outcomes
      break;
  }

  return outcomes;
}

/**
 * Stale thresholds by state (in days).
 * Constitution Article VI.3: Silence is not neutral.
 */
export const STATE_STALE_THRESHOLDS: Record<ApplicationState, number> = {
  [ApplicationState.DISCOVERED]: 14, // 2 weeks to view
  [ApplicationState.VIEWED]: 7, // 1 week to shortlist/decide
  [ApplicationState.SHORTLISTED]: 7, // 1 week to contact
  [ApplicationState.CONTACTED]: 7, // 1 week to schedule
  [ApplicationState.INTERVIEWING]: 14, // 2 weeks for interview process
  [ApplicationState.DECIDED]: 3, // 3 days to finalize
  [ApplicationState.CLOSED]: Infinity, // Never stale (terminal)
};
