/**
 * NextTern Shared Types: ProfileCard
 *
 * Constitution Article V.1 - Identity Before Application:
 * Students build identity ONCE, express intent through interaction.
 *
 * Spec FR-005: ProfileCard MUST contain:
 * - Identity snapshot, role intent, availability
 * - Skill proofs (linked), project references, editable metadata
 *
 * Spec FR-006: ProfileCard MUST NOT contain:
 * - Free-form long text blocks
 * - Redundant data fields
 * - Required PDFs
 */
import type { Card, CardSummary, CardExpanded, CardAction } from './card';
/**
 * Skill with proof linking.
 * Constitution Article V.2 - Proof Over Claims:
 * Skills without evidence are weak signals.
 */
export interface Skill {
    /** Unique identifier */
    id: string;
    /** Skill name */
    name: string;
    /** Skill category */
    category: SkillCategory;
    /** Proficiency level (self-assessed) */
    proficiency: ProficiencyLevel;
    /** Linked proof (project IDs, links) */
    proofs: SkillProof[];
    /** Whether this skill has verified proof */
    hasProof: boolean;
}
/**
 * Skill categories for organization.
 */
export type SkillCategory = 'technical' | 'design' | 'business' | 'communication' | 'leadership' | 'other';
/**
 * Proficiency levels.
 */
export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
/**
 * Proof attached to a skill.
 */
export interface SkillProof {
    /** Proof type */
    type: 'project' | 'link' | 'certification';
    /** Reference ID (project ID) or URL */
    reference: string;
    /** Display label */
    label: string;
}
/**
 * Role intent - what the student is seeking.
 */
export interface RoleIntent {
    /** Desired role types */
    roleTypes: string[];
    /** Preferred industries */
    industries: string[];
    /** What they want to learn */
    learningGoals: string[];
    /** Brief statement (structured, not free-form) */
    statement?: string;
}
/**
 * Availability information.
 */
export interface Availability {
    /** Available to start */
    startDate: Date;
    /** Duration preference */
    duration: DurationPreference;
    /** Hours per week */
    hoursPerWeek: HoursPreference;
    /** Location preferences */
    locationPreferences: LocationPreference[];
    /** Timezone */
    timezone?: string;
}
export type DurationPreference = '1-3-months' | '3-6-months' | '6-12-months' | '12-plus-months' | 'flexible';
export type HoursPreference = 'part-time' | 'full-time' | 'flexible';
export type LocationPreference = 'remote' | 'hybrid' | 'onsite' | string;
/**
 * Identity snapshot - the "who" at a glance.
 */
export interface IdentitySnapshot {
    /** Display name */
    name: string;
    /** Profile photo URL */
    photoUrl?: string;
    /** Professional headline (short) */
    headline: string;
    /** Current education/institution */
    education?: {
        institution: string;
        degree: string;
        field: string;
        graduationYear: number;
    };
    /** Location (city, country) */
    location?: string;
}
/**
 * ProfileCard summary view data.
 */
export interface ProfileCardSummary extends CardSummary {
    /** Identity snapshot */
    identity: IdentitySnapshot;
    /** Top skills (max 3-5 for summary) */
    topSkills: Pick<Skill, 'name' | 'hasProof'>[];
    /** Availability summary */
    availabilitySummary: string;
    /** Profile completeness percentage */
    completeness: number;
}
/**
 * ProfileCard expanded view data.
 */
export interface ProfileCardExpanded extends CardExpanded {
    /** Full identity details */
    identity: IdentitySnapshot;
    /** Complete role intent */
    roleIntent: RoleIntent;
    /** Full availability */
    availability: Availability;
    /** All skills with proofs */
    skills: Skill[];
    /** Project references (IDs) */
    projectIds: string[];
    /** Additional links (portfolio, LinkedIn, GitHub) */
    links: Array<{
        type: 'portfolio' | 'linkedin' | 'github' | 'other';
        url: string;
        label?: string;
    }>;
}
/**
 * ProfileCard - Student identity card.
 *
 * Constitution Article IV.2 - Cards Tell Stories:
 * Must answer: "Who is this person really?"
 */
export interface ProfileCard extends Card<'profile'> {
    type: 'profile';
    /** Summary view with identity snapshot */
    summary: ProfileCardSummary;
    /** Expanded view with full details */
    expanded: ProfileCardExpanded;
    /** User ID who owns this profile */
    userId: string;
    /** Profile visibility */
    visibility: 'public' | 'discoverable' | 'private';
    /** Last activity timestamp (for freshness) */
    lastActiveAt: Date;
    /** Whether profile is complete enough for discovery */
    isDiscoverable: boolean;
}
/**
 * Profile strength calculation.
 * Used to guide users toward a complete profile.
 */
export interface ProfileStrength {
    /** Overall score (0-100) */
    score: number;
    /** Breakdown by section */
    sections: {
        identity: {
            score: number;
            maxScore: number;
            missing: string[];
        };
        skills: {
            score: number;
            maxScore: number;
            missing: string[];
        };
        projects: {
            score: number;
            maxScore: number;
            missing: string[];
        };
        availability: {
            score: number;
            maxScore: number;
            missing: string[];
        };
    };
    /** Suggestions for improvement (scaffold, don't shame) */
    suggestions: string[];
}
/**
 * Default actions for ProfileCard.
 */
export declare const PROFILE_CARD_ACTIONS: Record<string, CardAction>;
//# sourceMappingURL=profile-card.d.ts.map