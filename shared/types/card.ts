/**
 * NextTern Shared Types: Card Base Interface
 *
 * Constitution Article IV.1 - Everything Is a Card:
 * Cards are the atomic unit of the system.
 *
 * Cards MUST be:
 * - Skimmable (answer key question in 3 seconds)
 * - Comparable
 * - Expandable
 * - Consistent
 *
 * Constitution Article IV.2 - Cards Tell Stories:
 * A card MUST answer a human question.
 */

/**
 * Card types supported by the system.
 * Spec FR-002: System MUST support four card types.
 */
export type CardType = 'profile' | 'internship' | 'project' | 'status';

/**
 * Card state represents the current lifecycle stage.
 */
export type CardState =
  | 'draft' // Being created/edited
  | 'active' // Published and visible
  | 'paused' // Temporarily hidden
  | 'archived' // No longer active but preserved
  | 'deleted'; // Soft deleted

/**
 * Action that can be performed on a card.
 */
export interface CardAction {
  /** Unique identifier for the action */
  id: string;

  /** Display label for the action */
  label: string;

  /** Icon identifier (for UI rendering) */
  icon?: string;

  /** Action type for routing/handling */
  type: 'primary' | 'secondary' | 'danger';

  /** Whether the action is currently available */
  enabled: boolean;

  /** Optional confirmation required before action */
  requiresConfirmation?: boolean;
}

/**
 * Summary view content for a card.
 * Constitution Article III.1 - Progressive Disclosure:
 * Essentials first, details on demand.
 */
export interface CardSummary {
  /** Primary headline/title - answers "What is this?" */
  headline: string;

  /** Secondary line - supporting context */
  subheadline?: string;

  /** Visual identifier (avatar, logo, icon) */
  visual?: {
    type: 'image' | 'icon' | 'initials';
    src?: string;
    alt?: string;
    fallback?: string;
  };

  /** Key metadata displayed in summary */
  metadata?: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;

  /** Quick status indicator */
  statusIndicator?: {
    label: string;
    variant: 'neutral' | 'positive' | 'warning' | 'negative';
  };
}

/**
 * Expanded view content for a card.
 * Progressive disclosure: full details available on demand.
 */
export interface CardExpanded {
  /** Full description/content */
  description?: string;

  /** Structured sections for organized content */
  sections?: Array<{
    id: string;
    title: string;
    content: unknown; // Type varies by card type
  }>;

  /** Related items/links */
  related?: Array<{
    type: CardType;
    id: string;
    label: string;
  }>;
}

/**
 * Base Card Interface
 *
 * Spec FR-001: System MUST implement all primary entities as cards
 * with mandatory properties: id, type, summary_view, expanded_view, state, actions.
 */
export interface Card<T extends CardType = CardType> {
  /** Unique identifier */
  id: string;

  /** Card type discriminator */
  type: T;

  /** Summary view data (always visible) */
  summary: CardSummary;

  /** Expanded view data (shown on expansion) */
  expanded: CardExpanded;

  /** Current card state */
  state: CardState;

  /** Available actions for this card */
  actions: CardAction[];

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;

  /** Owner/creator user ID */
  ownerId: string;
}

/**
 * Type guard to check if a value is a Card
 */
export function isCard(value: unknown): value is Card {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'type' in value &&
    'summary' in value &&
    'expanded' in value &&
    'state' in value &&
    'actions' in value
  );
}

/**
 * Type guard for specific card types
 */
export function isCardOfType<T extends CardType>(
  value: unknown,
  type: T
): value is Card<T> {
  return isCard(value) && value.type === type;
}
