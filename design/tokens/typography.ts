/**
 * NextTern Design Tokens: Typography
 *
 * Constitution Article II.2 - Visual Hierarchy Is Sacred:
 * Every screen must answer within 3 seconds:
 * 1. Where am I?
 * 2. What matters most here?
 * 3. What can I do next?
 *
 * Hierarchy enforced via typography scale and weight.
 * No decorative fonts - readability over branding.
 *
 * These tokens are MANDATORY dependencies (Article VIII.2).
 */

export const typography = {
  // === FONT FAMILIES ===
  fontFamily: {
    // System font stack for maximum compatibility and performance
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'sans-serif',
    ].join(', '),
    // Monospace for code, data, technical content
    mono: [
      'JetBrains Mono',
      'Fira Code',
      'SF Mono',
      'Consolas',
      'Liberation Mono',
      'monospace',
    ].join(', '),
  },

  // === FONT SIZES ===
  // Based on 16px base, using major third scale (1.25)
  fontSize: {
    xs: '0.75rem', // 12px - Fine print, captions
    sm: '0.875rem', // 14px - Secondary text, labels
    base: '1rem', // 16px - Body text
    lg: '1.125rem', // 18px - Emphasized body
    xl: '1.25rem', // 20px - Card titles
    '2xl': '1.5rem', // 24px - Section headers
    '3xl': '1.875rem', // 30px - Page titles
    '4xl': '2.25rem', // 36px - Hero text
    '5xl': '3rem', // 48px - Display text
  },

  // === FONT WEIGHTS ===
  fontWeight: {
    normal: '400', // Body text
    medium: '500', // Emphasized text
    semibold: '600', // Headings, buttons
    bold: '700', // Strong emphasis
  },

  // === LINE HEIGHTS ===
  lineHeight: {
    none: '1', // Headings, single line
    tight: '1.25', // Compact text
    snug: '1.375', // Slightly compact
    normal: '1.5', // Body text - optimal readability
    relaxed: '1.625', // Spacious reading
    loose: '2', // Very spacious
  },

  // === LETTER SPACING ===
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // === PREDEFINED TEXT STYLES ===
  // Use these for consistency across the app
  styles: {
    // Display - Hero sections, major announcements
    display: {
      fontSize: '3rem',
      fontWeight: '700',
      lineHeight: '1',
      letterSpacing: '-0.025em',
    },

    // Page Title - Main heading on each page
    pageTitle: {
      fontSize: '1.875rem',
      fontWeight: '700',
      lineHeight: '1.25',
      letterSpacing: '-0.025em',
    },

    // Section Header - Section divisions
    sectionHeader: {
      fontSize: '1.5rem',
      fontWeight: '600',
      lineHeight: '1.25',
      letterSpacing: '-0.025em',
    },

    // Card Title - ProfileCard, InternshipCard headers
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      lineHeight: '1.25',
      letterSpacing: '0',
    },

    // Body - Primary content
    body: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0',
    },

    // Body Small - Secondary content
    bodySmall: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0',
    },

    // Label - Form labels, metadata
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.25',
      letterSpacing: '0',
    },

    // Caption - Fine print, timestamps
    caption: {
      fontSize: '0.75rem',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0.025em',
    },

    // Button - Action text
    button: {
      fontSize: '0.875rem',
      fontWeight: '600',
      lineHeight: '1',
      letterSpacing: '0.025em',
    },
  },
} as const;

// Type exports
export type Typography = typeof typography;
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type TextStyle = keyof typeof typography.styles;
