/**
 * NextTern Shared Types: InternshipCard
 *
 * Spec FR-011: InternshipCard MUST contain:
 * - Role clarity, company context, learning outcomes
 * - Practical expectations, duration, compensation
 *
 * Spec FR-012: InternshipCard MUST NOT contain:
 * - Buzzwords without explanation
 * - Copy-pasted job descriptions
 * - Hidden requirements
 */

import type { Card, CardSummary, CardExpanded, CardAction } from './card';

/**
 * Company context for the internship.
 */
export interface CompanyContext {
  /** Company name */
  name: string;

  /** Company logo URL */
  logoUrl?: string;

  /** Brief company description */
  description: string;

  /** Industry/sector */
  industry: string;

  /** Company size */
  size: CompanySize;

  /** Company stage */
  stage: CompanyStage;

  /** Company website */
  website?: string;

  /** Location(s) */
  locations: string[];
}

export type CompanySize =
  | 'startup' // 1-10
  | 'small' // 11-50
  | 'medium' // 51-200
  | 'large' // 201-1000
  | 'enterprise'; // 1000+

export type CompanyStage =
  | 'early-stage'
  | 'growth'
  | 'established'
  | 'public';

/**
 * Role clarity - the "why" of the role.
 * Must answer: "Why does this role exist?"
 */
export interface RoleClarity {
  /** Role title */
  title: string;

  /** Team/department */
  team: string;

  /** Why this role exists (purpose) */
  purpose: string;

  /** Key responsibilities (structured list, not wall of text) */
  responsibilities: string[];

  /** Who you'll work with */
  collaboration: string[];
}

/**
 * Learning outcomes - what the intern will gain.
 * Must answer: "What will the intern learn?"
 */
export interface LearningOutcomes {
  /** Skills they will develop */
  skills: string[];

  /** Projects they will work on (types) */
  projectTypes: string[];

  /** Mentorship details */
  mentorship: {
    available: boolean;
    description?: string;
  };

  /** Growth opportunities */
  growthOpportunities: string[];
}

/**
 * Practical expectations - realistic requirements.
 * Constitution: No hidden requirements.
 */
export interface PracticalExpectations {
  /** Required skills (honest assessment) */
  requiredSkills: Array<{
    skill: string;
    level: 'familiar' | 'comfortable' | 'proficient';
  }>;

  /** Nice-to-have skills */
  preferredSkills: string[];

  /** Education requirements (if any) */
  education?: {
    level: 'any' | 'pursuing-degree' | 'degree-required';
    fields?: string[];
  };

  /** Work authorization requirements */
  workAuthorization?: string;

  /** Any other clear requirements */
  otherRequirements: string[];
}

/**
 * Compensation details.
 * Transparency is mandatory.
 */
export interface Compensation {
  /** Compensation type */
  type: 'paid' | 'stipend' | 'unpaid' | 'academic-credit';

  /** Amount (if applicable) */
  amount?: {
    value: number;
    currency: string;
    period: 'hourly' | 'weekly' | 'monthly' | 'total';
  };

  /** Additional benefits */
  benefits: string[];
}

/**
 * Duration and timing.
 */
export interface InternshipDuration {
  /** Start date or period */
  startDate: Date | 'flexible' | 'immediate';

  /** Duration in weeks/months */
  length: {
    min: number;
    max: number;
    unit: 'weeks' | 'months';
  };

  /** Hours per week */
  hoursPerWeek: {
    min: number;
    max: number;
  };

  /** Work arrangement */
  arrangement: 'remote' | 'hybrid' | 'onsite';

  /** Location (if onsite/hybrid) */
  location?: string;
}

/**
 * InternshipCard summary view data.
 */
export interface InternshipCardSummary extends CardSummary {
  /** Role title */
  title: string;

  /** Company snapshot */
  company: Pick<CompanyContext, 'name' | 'logoUrl' | 'industry'>;

  /** Key details for quick scan */
  quickFacts: {
    duration: string;
    location: string;
    compensation: string;
    arrangement: string;
  };

  /** Application deadline (if any) */
  deadline?: Date;
}

/**
 * InternshipCard expanded view data.
 */
export interface InternshipCardExpanded extends CardExpanded {
  /** Full company context */
  company: CompanyContext;

  /** Role clarity */
  role: RoleClarity;

  /** Learning outcomes */
  learning: LearningOutcomes;

  /** Practical expectations */
  expectations: PracticalExpectations;

  /** Compensation details */
  compensation: Compensation;

  /** Duration and timing */
  duration: InternshipDuration;

  /** Application process description */
  applicationProcess?: string;

  /** Application deadline */
  deadline?: Date;
}

/**
 * InternshipCard - Recruiter opportunity card.
 *
 * Constitution Article IV.2 - Cards Tell Stories:
 * Must answer: "Why does this role exist?" and "Is this worth my attention?"
 */
export interface InternshipCard extends Card<'internship'> {
  type: 'internship';

  /** Summary view */
  summary: InternshipCardSummary;

  /** Expanded view */
  expanded: InternshipCardExpanded;

  /** Recruiter/company who posted */
  recruiterId: string;

  /** Company ID */
  companyId: string;

  /** Number of positions available */
  positions: number;

  /** Number of positions filled */
  positionsFilled: number;

  /** Application count */
  applicationCount: number;

  /** Whether applications are open */
  acceptingApplications: boolean;

  /** Published timestamp */
  publishedAt?: Date;
}

/**
 * Default actions for InternshipCard.
 */
export const INTERNSHIP_CARD_ACTIONS: Record<string, CardAction> = {
  edit: {
    id: 'edit',
    label: 'Edit Internship',
    icon: 'edit',
    type: 'primary',
    enabled: true,
  },
  preview: {
    id: 'preview',
    label: 'Preview',
    icon: 'eye',
    type: 'secondary',
    enabled: true,
  },
  viewApplicants: {
    id: 'view-applicants',
    label: 'View Applicants',
    icon: 'users',
    type: 'secondary',
    enabled: true,
  },
  pause: {
    id: 'pause',
    label: 'Pause Applications',
    icon: 'pause',
    type: 'secondary',
    enabled: true,
    requiresConfirmation: true,
  },
  close: {
    id: 'close',
    label: 'Close Position',
    icon: 'x-circle',
    type: 'danger',
    enabled: true,
    requiresConfirmation: true,
  },
};

/**
 * Student-facing actions for InternshipCard.
 */
export const INTERNSHIP_CARD_STUDENT_ACTIONS: Record<string, CardAction> = {
  interested: {
    id: 'interested',
    label: 'I\'m Interested',
    icon: 'heart',
    type: 'primary',
    enabled: true,
  },
  notInterested: {
    id: 'not-interested',
    label: 'Not for Me',
    icon: 'x',
    type: 'secondary',
    enabled: true,
  },
  save: {
    id: 'save',
    label: 'Save for Later',
    icon: 'bookmark',
    type: 'secondary',
    enabled: true,
  },
};
