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
export declare enum ApplicationState {
    /**
     * Initial state when student expresses interest.
     * Student has swiped right or clicked interest.
     */
    DISCOVERED = "discovered",
    /**
     * Recruiter has viewed the student's profile.
     * Student can see that their profile was viewed.
     */
    VIEWED = "viewed",
    /**
     * Recruiter has added student to shortlist.
     * This triggers chat unlock when combined with student interest.
     */
    SHORTLISTED = "shortlisted",
    /**
     * Communication has been initiated.
     * At least one message has been exchanged.
     */
    CONTACTED = "contacted",
    /**
     * Interview process is active.
     * Could be phone screen, technical, or on-site.
     */
    INTERVIEWING = "interviewing",
    /**
     * A decision has been made (offer or rejection).
     * The loop is closing.
     */
    DECIDED = "decided",
    /**
     * Application is fully closed.
     * Either accepted, rejected, or withdrawn.
     */
    CLOSED = "closed"
}
/**
 * Application state display metadata.
 * Used for consistent UI rendering across the platform.
 */
export declare const APPLICATION_STATE_META: Record<ApplicationState, {
    label: string;
    description: string;
    color: string;
    icon: string;
    isTerminal: boolean;
}>;
/**
 * Valid state transitions.
 * Constitution Article VI.2: State transitions must be explicit.
 */
export declare const VALID_STATE_TRANSITIONS: Record<ApplicationState, ApplicationState[]>;
/**
 * Check if a state transition is valid.
 */
export declare function isValidStateTransition(from: ApplicationState, to: ApplicationState): boolean;
/**
 * Get possible next states from current state.
 * Spec FR-017: Students MUST see next possible outcomes.
 */
export declare function getNextPossibleStates(current: ApplicationState): ApplicationState[];
/**
 * Check if a state is terminal (no further transitions).
 */
export declare function isTerminalState(state: ApplicationState): boolean;
/**
 * Closure reason for closed applications.
 */
export declare enum ClosureReason {
    ACCEPTED = "accepted",// Student accepted offer
    REJECTED = "rejected",// Recruiter rejected
    WITHDRAWN = "withdrawn",// Student withdrew
    EXPIRED = "expired",// Time-based expiration
    CANCELLED = "cancelled"
}
/**
 * Closure reason display metadata.
 */
export declare const CLOSURE_REASON_META: Record<ClosureReason, {
    label: string;
    description: string;
    variant: 'positive' | 'negative' | 'neutral';
}>;
//# sourceMappingURL=application-state.d.ts.map