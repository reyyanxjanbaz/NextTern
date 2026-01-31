/**
 * NextTern Shared Types: ProjectCard
 *
 * Constitution Article V.2 - Proof Over Claims:
 * Skills without evidence are weak signals.
 * The system MUST guide users toward projects, links, outcomes, demonstrations.
 *
 * ProjectCard is the primary proof unit attached to ProfileCards.
 */

import type { Card, CardSummary, CardExpanded, CardAction } from './card.js';

/**
 * Project type/category.
 */
export type ProjectType =
  | 'personal' // Side project, hobby
  | 'academic' // Course work, thesis
  | 'professional' // Work experience
  | 'hackathon' // Competition project
  | 'open-source' // OSS contribution
  | 'freelance' // Client work
  | 'research'; // Research project

/**
 * Project outcome - the impact/result.
 */
export interface ProjectOutcome {
  /** Type of outcome */
  type: 'metric' | 'achievement' | 'learning' | 'recognition';

  /** Description of the outcome */
  description: string;

  /** Quantifiable value (if metric) */
  value?: string;
}

/**
 * Project link/media.
 */
export interface ProjectLink {
  /** Link type */
  type: 'demo' | 'repository' | 'website' | 'video' | 'article' | 'other';

  /** URL */
  url: string;

  /** Display label */
  label: string;
}

/**
 * Project media (images, screenshots).
 */
export interface ProjectMedia {
  /** Media type */
  type: 'image' | 'video';

  /** URL */
  url: string;

  /** Alt text for accessibility */
  alt: string;

  /** Is this the primary/featured image */
  isPrimary: boolean;
}

/**
 * Contribution details (for team projects).
 */
export interface Contribution {
  /** Role in the project */
  role: string;

  /** Specific contributions */
  contributions: string[];

  /** Team size (if team project) */
  teamSize?: number;

  /** Time invested */
  duration?: string;
}

/**
 * ProjectCard summary view data.
 */
export interface ProjectCardSummary extends CardSummary {
  /** Project title */
  title: string;

  /** Brief description (1-2 sentences) */
  brief: string;

  /** Primary image/thumbnail */
  thumbnail?: string;

  /** Project type */
  type: ProjectType;

  /** Key technologies/skills used */
  technologies: string[];

  /** Completion date */
  completedAt?: Date;
}

/**
 * ProjectCard expanded view data.
 */
export interface ProjectCardExpanded extends CardExpanded {
  /** Full project description */
  description: string;

  /** The problem being solved */
  problem: string;

  /** The solution/approach */
  solution: string;

  /** Personal contribution */
  contribution: Contribution;

  /** Outcomes and impact */
  outcomes: ProjectOutcome[];

  /** Technologies and skills demonstrated */
  technologies: Array<{
    name: string;
    category: 'language' | 'framework' | 'tool' | 'platform' | 'other';
  }>;

  /** Project links */
  links: ProjectLink[];

  /** Media gallery */
  media: ProjectMedia[];

  /** Timeline */
  timeline: {
    startDate?: Date;
    endDate?: Date;
    isOngoing: boolean;
  };
}

/**
 * ProjectCard - Skill proof card.
 *
 * Constitution Article IV.2 - Cards Tell Stories:
 * Must answer: "What did this person actually do/build?"
 */
export interface ProjectCard extends Card<'project'> {
  type: 'project';

  /** Summary view */
  summary: ProjectCardSummary;

  /** Expanded view */
  expanded: ProjectCardExpanded;

  /** Owner (student) user ID */
  userId: string;

  /** Associated ProfileCard ID */
  profileId: string;

  /** Skills this project demonstrates */
  demonstratedSkills: string[];

  /** Whether this is a featured project */
  isFeatured: boolean;

  /** Verification status (if applicable) */
  verification?: {
    status: 'unverified' | 'pending' | 'verified';
    verifiedBy?: string;
    verifiedAt?: Date;
  };
}

/**
 * Default actions for ProjectCard.
 */
export const PROJECT_CARD_ACTIONS: Record<string, CardAction> = {
  edit: {
    id: 'edit',
    label: 'Edit Project',
    icon: 'edit',
    type: 'primary',
    enabled: true,
  },
  feature: {
    id: 'feature',
    label: 'Feature on Profile',
    icon: 'star',
    type: 'secondary',
    enabled: true,
  },
  delete: {
    id: 'delete',
    label: 'Delete Project',
    icon: 'trash',
    type: 'danger',
    enabled: true,
    requiresConfirmation: true,
  },
};

/**
 * Project creation/edit form data.
 * Structured input to prevent free-form chaos.
 */
export interface ProjectFormData {
  title: string;
  brief: string;
  type: ProjectType;
  problem: string;
  solution: string;
  contribution: Contribution;
  outcomes: ProjectOutcome[];
  technologies: string[];
  links: ProjectLink[];
  media: ProjectMedia[];
  startDate?: Date;
  endDate?: Date;
  isOngoing: boolean;
}

/**
 * Validate project data completeness.
 */
export function validateProjectCompleteness(data: Partial<ProjectFormData>): {
  isComplete: boolean;
  missingFields: string[];
  score: number;
} {
  const required: (keyof ProjectFormData)[] = [
    'title',
    'brief',
    'type',
    'problem',
    'solution',
  ];

  const missingFields = required.filter((field) => !data[field]);

  // Calculate score based on completeness
  const totalFields = 11; // All fields
  const filledFields = Object.keys(data).filter(
    (key) => data[key as keyof ProjectFormData] !== undefined
  ).length;

  return {
    isComplete: missingFields.length === 0,
    missingFields,
    score: Math.round((filledFields / totalFields) * 100),
  };
}
