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
/**
 * Default actions for ProfileCard.
 */
export const PROFILE_CARD_ACTIONS = {
    edit: {
        id: 'edit',
        label: 'Edit Profile',
        icon: 'edit',
        type: 'primary',
        enabled: true,
    },
    share: {
        id: 'share',
        label: 'Share',
        icon: 'share',
        type: 'secondary',
        enabled: true,
    },
    preview: {
        id: 'preview',
        label: 'View as Recruiter',
        icon: 'eye',
        type: 'secondary',
        enabled: true,
    },
};
//# sourceMappingURL=profile-card.js.map