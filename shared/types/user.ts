/**
 * NextTern Shared Types: User and Role
 *
 * Spec Section 2: User Roles (STRICT)
 * Roles are NON-INTERCHANGEABLE.
 * Shared UI patterns must still respect role intent.
 */

/**
 * User roles in the system.
 * Spec 2.2: Roles are immutable after creation (for MVP).
 */
export enum UserRole {
  STUDENT = 'student',
  RECRUITER = 'recruiter',
}

/**
 * User role display metadata.
 */
export const USER_ROLE_META: Record<
  UserRole,
  {
    label: string;
    description: string;
    primaryGoals: string[];
  }
> = {
  [UserRole.STUDENT]: {
    label: 'Student',
    description: 'Seeking internship opportunities',
    primaryGoals: [
      'Express identity once',
      'Discover aligned opportunities',
      'Understand application state',
      'Reduce anxiety',
    ],
  },
  [UserRole.RECRUITER]: {
    label: 'Recruiter',
    description: 'Hiring interns for your organization',
    primaryGoals: [
      'Discover talent efficiently',
      'Evaluate proof quickly',
      'Shortlist with confidence',
      'Close loops cleanly',
    ],
  },
};

/**
 * Authentication status.
 */
export type AuthStatus =
  | 'anonymous' // Not logged in
  | 'pending' // Awaiting verification (magic link)
  | 'authenticated' // Logged in
  | 'onboarding'; // Logged in but profile incomplete

/**
 * Base user identity (authentication level).
 */
export interface UserIdentity {
  /** Unique user identifier */
  id: string;

  /** Email address (primary identifier) */
  email: string;

  /** Email verification status */
  emailVerified: boolean;

  /** Authentication status */
  authStatus: AuthStatus;

  /** Account creation timestamp */
  createdAt: Date;

  /** Last login timestamp */
  lastLoginAt?: Date;
}

/**
 * Full user object with role-specific data.
 */
export interface User extends UserIdentity {
  /** User role (immutable after onboarding) */
  role: UserRole;

  /** Role assigned timestamp */
  roleAssignedAt: Date;

  /** Whether onboarding is complete */
  onboardingComplete: boolean;

  /** Profile ID (ProfileCard for students, company profile for recruiters) */
  profileId?: string;

  /** User preferences */
  preferences: UserPreferences;
}

/**
 * User preferences.
 */
export interface UserPreferences {
  /** Email notification settings */
  notifications: {
    email: boolean;
    applicationUpdates: boolean;
    newMatches: boolean;
    messages: boolean;
  };

  /** Discovery preferences */
  discovery?: {
    /** Enable blind mode (hide pedigree signals) */
    blindMode?: boolean;
  };

  /** UI preferences */
  ui?: {
    /** Preferred discovery mode */
    defaultDiscoveryMode?: 'swipe' | 'list';
  };
}

/**
 * Student-specific user data.
 */
export interface StudentUser extends User {
  role: UserRole.STUDENT;

  /** Associated ProfileCard ID */
  profileId: string;

  /** Daily swipe count (for limit enforcement) */
  dailySwipeCount: number;

  /** Last swipe reset timestamp */
  lastSwipeReset: Date;
}

/**
 * Recruiter-specific user data.
 */
export interface RecruiterUser extends User {
  role: UserRole.RECRUITER;

  /** Company/organization ID */
  companyId: string;

  /** Posted internship IDs */
  internshipIds: string[];
}

/**
 * Type guard for StudentUser.
 */
export function isStudentUser(user: User): user is StudentUser {
  return user.role === UserRole.STUDENT;
}

/**
 * Type guard for RecruiterUser.
 */
export function isRecruiterUser(user: User): user is RecruiterUser {
  return user.role === UserRole.RECRUITER;
}

/**
 * Session data for authenticated users.
 */
export interface Session {
  /** Session identifier */
  id: string;

  /** User ID */
  userId: string;

  /** User role (for quick access) */
  userRole: UserRole;

  /** Session creation timestamp */
  createdAt: Date;

  /** Session expiration timestamp */
  expiresAt: Date;

  /** Whether session is valid */
  isValid: boolean;
}

/**
 * Magic link token for passwordless auth.
 */
export interface MagicLinkToken {
  /** Token identifier */
  id: string;

  /** Associated email */
  email: string;

  /** Token hash (not the actual token) */
  tokenHash: string;

  /** Creation timestamp */
  createdAt: Date;

  /** Expiration timestamp */
  expiresAt: Date;

  /** Whether token has been used */
  used: boolean;
}
