/**
 * NextTern Design Tokens: Shadows & Radius
 *
 * Constitution Article II.1 - The Whiteboard Principle:
 * - Soft, functional shadows only
 * - No decorative effects
 *
 * Shadows must serve a purpose:
 * - Indicate elevation/layering
 * - Show interactive states
 * - Guide attention
 *
 * These tokens are MANDATORY dependencies (Article VIII.2).
 */

export const shadows = {
  // === BOX SHADOWS ===
  // Soft, subtle shadows that don't distract
  boxShadow: {
    none: 'none',

    // Subtle - Barely visible, for slight elevation
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',

    // Small - Cards at rest, inputs
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',

    // Default - Cards on hover, dropdowns
    DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',

    // Medium - Active cards, popovers
    md: '0 6px 10px -2px rgba(0, 0, 0, 0.06), 0 4px 6px -3px rgba(0, 0, 0, 0.05)',

    // Large - Modals, dialogs
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',

    // Extra large - Full-screen overlays
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',

    // 2XL - Maximum elevation
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',

    // Inner shadow - Inset for inputs, pressed states
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
  },

  // === FOCUS RINGS ===
  // Accessibility-focused, visible focus states
  focusRing: {
    // Default focus ring
    DEFAULT: '0 0 0 2px #FFFFFF, 0 0 0 4px #2563EB',

    // Error state focus
    error: '0 0 0 2px #FFFFFF, 0 0 0 4px #DC2626',

    // Success state focus
    success: '0 0 0 2px #FFFFFF, 0 0 0 4px #059669',

    // Inset focus (for dark backgrounds)
    inset: 'inset 0 0 0 2px #2563EB',
  },

  // === CARD-SPECIFIC SHADOWS ===
  // Designed for the card system
  card: {
    rest: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
    hover: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
    active: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    expanded: '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
  },
} as const;

export const radius = {
  // === BORDER RADIUS ===
  // Consistent, subtle rounding
  none: '0',
  sm: '4px', // Subtle rounding
  DEFAULT: '6px', // Default for most elements
  md: '8px', // Cards, inputs
  lg: '12px', // Large cards, panels
  xl: '16px', // Modals, large surfaces
  '2xl': '24px', // Pills, special elements
  full: '9999px', // Circles, fully rounded
} as const;

// Type exports
export type Shadows = typeof shadows;
export type Radius = typeof radius;
export type ShadowKey = keyof typeof shadows.boxShadow;
export type RadiusKey = keyof typeof radius;
