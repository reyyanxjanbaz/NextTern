/**
 * NextTern Shared Types
 *
 * Central export for all shared type definitions.
 * Used by both frontend (app/) and backend (server/).
 *
 * Import from this file:
 * ```typescript
 * import { Card, ProfileCard, ApplicationState, User } from '@nexttern/shared';
 * ```
 */

// === Card System ===
export {
  type Card,
  type CardType,
  type CardState,
  type CardAction,
  type CardSummary,
  type CardExpanded,
  isCard,
  isCardOfType,
} from './card';

// === Application State ===
export {
  ApplicationState,
  APPLICATION_STATE_META,
  VALID_STATE_TRANSITIONS,
  isValidStateTransition,
  getNextPossibleStates,
  isTerminalState,
  ClosureReason,
  CLOSURE_REASON_META,
} from './application-state';

// === User & Auth ===
export {
  UserRole,
  USER_ROLE_META,
  type AuthStatus,
  type UserIdentity,
  type User,
  type UserPreferences,
  type StudentUser,
  type RecruiterUser,
  isStudentUser,
  isRecruiterUser,
  type Session,
  type MagicLinkToken,
} from './user';

// === ProfileCard ===
export {
  type ProfileCard,
  type ProfileCardSummary,
  type ProfileCardExpanded,
  type Skill,
  type SkillCategory,
  type ProficiencyLevel,
  type SkillProof,
  type RoleIntent,
  type Availability,
  type DurationPreference,
  type HoursPreference,
  type LocationPreference,
  type IdentitySnapshot,
  type ProfileStrength,
  PROFILE_CARD_ACTIONS,
} from './profile-card';

// === InternshipCard ===
export {
  type InternshipCard,
  type InternshipCardSummary,
  type InternshipCardExpanded,
  type CompanyContext,
  type CompanySize,
  type CompanyStage,
  type RoleClarity,
  type LearningOutcomes,
  type PracticalExpectations,
  type Compensation,
  type InternshipDuration,
  INTERNSHIP_CARD_ACTIONS,
  INTERNSHIP_CARD_STUDENT_ACTIONS,
} from './internship-card';

// === ProjectCard ===
export {
  type ProjectCard,
  type ProjectCardSummary,
  type ProjectCardExpanded,
  type ProjectType,
  type ProjectOutcome,
  type ProjectLink,
  type ProjectMedia,
  type Contribution,
  type ProjectFormData,
  PROJECT_CARD_ACTIONS,
  validateProjectCompleteness,
} from './project-card';

// === StatusCard ===
export {
  type StatusCard,
  type StatusCardSummary,
  type StatusCardExpanded,
  type TimeInState,
  type StateHistoryEntry,
  type NextOutcome,
  STATUS_CARD_STUDENT_ACTIONS,
  calculateTimeInState,
  getNextOutcomes,
  STATE_STALE_THRESHOLDS,
} from './status-card';

// === Utility Types ===

/**
 * All card types union.
 */
export type AnyCard =
  | import('./profile-card').ProfileCard
  | import('./internship-card').InternshipCard
  | import('./project-card').ProjectCard
  | import('./status-card').StatusCard;

/**
 * Card type to card interface mapping.
 */
export interface CardTypeMap {
  profile: import('./profile-card').ProfileCard;
  internship: import('./internship-card').InternshipCard;
  project: import('./project-card').ProjectCard;
  status: import('./status-card').StatusCard;
}

/**
 * Get card type from CardType literal.
 */
export type CardOfType<T extends import('./card').CardType> = CardTypeMap[T];
