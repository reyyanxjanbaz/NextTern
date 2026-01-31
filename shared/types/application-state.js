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
export var ApplicationState;
(function (ApplicationState) {
    /**
     * Initial state when student expresses interest.
     * Student has swiped right or clicked interest.
     */
    ApplicationState["DISCOVERED"] = "discovered";
    /**
     * Recruiter has viewed the student's profile.
     * Student can see that their profile was viewed.
     */
    ApplicationState["VIEWED"] = "viewed";
    /**
     * Recruiter has added student to shortlist.
     * This triggers chat unlock when combined with student interest.
     */
    ApplicationState["SHORTLISTED"] = "shortlisted";
    /**
     * Communication has been initiated.
     * At least one message has been exchanged.
     */
    ApplicationState["CONTACTED"] = "contacted";
    /**
     * Interview process is active.
     * Could be phone screen, technical, or on-site.
     */
    ApplicationState["INTERVIEWING"] = "interviewing";
    /**
     * A decision has been made (offer or rejection).
     * The loop is closing.
     */
    ApplicationState["DECIDED"] = "decided";
    /**
     * Application is fully closed.
     * Either accepted, rejected, or withdrawn.
     */
    ApplicationState["CLOSED"] = "closed";
})(ApplicationState || (ApplicationState = {}));
/**
 * Application state display metadata.
 * Used for consistent UI rendering across the platform.
 */
export const APPLICATION_STATE_META = {
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
export const VALID_STATE_TRANSITIONS = {
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
export function isValidStateTransition(from, to) {
    return VALID_STATE_TRANSITIONS[from].includes(to);
}
/**
 * Get possible next states from current state.
 * Spec FR-017: Students MUST see next possible outcomes.
 */
export function getNextPossibleStates(current) {
    return VALID_STATE_TRANSITIONS[current];
}
/**
 * Check if a state is terminal (no further transitions).
 */
export function isTerminalState(state) {
    return APPLICATION_STATE_META[state].isTerminal;
}
/**
 * Closure reason for closed applications.
 */
export var ClosureReason;
(function (ClosureReason) {
    ClosureReason["ACCEPTED"] = "accepted";
    ClosureReason["REJECTED"] = "rejected";
    ClosureReason["WITHDRAWN"] = "withdrawn";
    ClosureReason["EXPIRED"] = "expired";
    ClosureReason["CANCELLED"] = "cancelled";
})(ClosureReason || (ClosureReason = {}));
/**
 * Closure reason display metadata.
 */
export const CLOSURE_REASON_META = {
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
//# sourceMappingURL=application-state.js.map