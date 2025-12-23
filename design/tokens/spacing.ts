/**
 * NextTern Design Tokens: Spacing
 *
 * Constitution Article II.2 - Visual Hierarchy Is Sacred:
 * Hierarchy enforced via spacing.
 *
 * Constitution Article II.1 - The Whiteboard Principle:
 * Generous whitespace, no cramped layouts.
 * Whitespace is functional, not empty.
 *
 * These tokens are MANDATORY dependencies (Article VIII.2).
 */

// Base unit: 4px
const BASE_UNIT = 4;

export const spacing = {
  // === SPACING SCALE ===
  // Based on 4px base unit for mathematical consistency
  px: '1px', // Borders, fine adjustments
  0: '0',
  0.5: `${BASE_UNIT * 0.5}px`, // 2px
  1: `${BASE_UNIT * 1}px`, // 4px
  1.5: `${BASE_UNIT * 1.5}px`, // 6px
  2: `${BASE_UNIT * 2}px`, // 8px
  2.5: `${BASE_UNIT * 2.5}px`, // 10px
  3: `${BASE_UNIT * 3}px`, // 12px
  3.5: `${BASE_UNIT * 3.5}px`, // 14px
  4: `${BASE_UNIT * 4}px`, // 16px - Base
  5: `${BASE_UNIT * 5}px`, // 20px
  6: `${BASE_UNIT * 6}px`, // 24px
  7: `${BASE_UNIT * 7}px`, // 28px
  8: `${BASE_UNIT * 8}px`, // 32px
  9: `${BASE_UNIT * 9}px`, // 36px
  10: `${BASE_UNIT * 10}px`, // 40px
  11: `${BASE_UNIT * 11}px`, // 44px
  12: `${BASE_UNIT * 12}px`, // 48px
  14: `${BASE_UNIT * 14}px`, // 56px
  16: `${BASE_UNIT * 16}px`, // 64px
  20: `${BASE_UNIT * 20}px`, // 80px
  24: `${BASE_UNIT * 24}px`, // 96px
  28: `${BASE_UNIT * 28}px`, // 112px
  32: `${BASE_UNIT * 32}px`, // 128px
  36: `${BASE_UNIT * 36}px`, // 144px
  40: `${BASE_UNIT * 40}px`, // 160px
  44: `${BASE_UNIT * 44}px`, // 176px
  48: `${BASE_UNIT * 48}px`, // 192px
  52: `${BASE_UNIT * 52}px`, // 208px
  56: `${BASE_UNIT * 56}px`, // 224px
  60: `${BASE_UNIT * 60}px`, // 240px
  64: `${BASE_UNIT * 64}px`, // 256px
  72: `${BASE_UNIT * 72}px`, // 288px
  80: `${BASE_UNIT * 80}px`, // 320px
  96: `${BASE_UNIT * 96}px`, // 384px

  // === SEMANTIC SPACING ===
  // Named tokens for common use cases
  semantic: {
    // Component internal spacing
    componentXs: `${BASE_UNIT * 1}px`, // 4px - Tight internal
    componentSm: `${BASE_UNIT * 2}px`, // 8px - Compact internal
    componentMd: `${BASE_UNIT * 3}px`, // 12px - Default internal
    componentLg: `${BASE_UNIT * 4}px`, // 16px - Spacious internal

    // Card spacing
    cardPadding: `${BASE_UNIT * 5}px`, // 20px - Card internal padding
    cardGap: `${BASE_UNIT * 4}px`, // 16px - Gap between card elements

    // Section spacing
    sectionGap: `${BASE_UNIT * 8}px`, // 32px - Between sections
    sectionPadding: `${BASE_UNIT * 6}px`, // 24px - Section internal

    // Page layout
    pageMargin: `${BASE_UNIT * 6}px`, // 24px - Page edge margin (mobile)
    pageMarginLg: `${BASE_UNIT * 8}px`, // 32px - Page edge margin (desktop)
    pageGap: `${BASE_UNIT * 6}px`, // 24px - Between page sections

    // Stack spacing (vertical)
    stackXs: `${BASE_UNIT * 1}px`, // 4px
    stackSm: `${BASE_UNIT * 2}px`, // 8px
    stackMd: `${BASE_UNIT * 4}px`, // 16px
    stackLg: `${BASE_UNIT * 6}px`, // 24px
    stackXl: `${BASE_UNIT * 8}px`, // 32px

    // Inline spacing (horizontal)
    inlineXs: `${BASE_UNIT * 1}px`, // 4px
    inlineSm: `${BASE_UNIT * 2}px`, // 8px
    inlineMd: `${BASE_UNIT * 3}px`, // 12px
    inlineLg: `${BASE_UNIT * 4}px`, // 16px

    // Form elements
    inputPaddingX: `${BASE_UNIT * 3}px`, // 12px
    inputPaddingY: `${BASE_UNIT * 2.5}px`, // 10px
    inputGap: `${BASE_UNIT * 4}px`, // 16px between inputs

    // Button
    buttonPaddingX: `${BASE_UNIT * 4}px`, // 16px
    buttonPaddingY: `${BASE_UNIT * 2.5}px`, // 10px
    buttonGap: `${BASE_UNIT * 2}px`, // 8px between icon and text
  },

  // === LAYOUT CONSTRAINTS ===
  layout: {
    // Max widths
    maxWidthXs: '320px',
    maxWidthSm: '384px',
    maxWidthMd: '448px',
    maxWidthLg: '512px',
    maxWidthXl: '576px',
    maxWidth2xl: '672px',
    maxWidth3xl: '768px',
    maxWidth4xl: '896px',
    maxWidth5xl: '1024px',
    maxWidth6xl: '1152px',
    maxWidth7xl: '1280px',
    maxWidthFull: '100%',
    maxWidthProse: '65ch', // Optimal reading width

    // Container
    containerPadding: `${BASE_UNIT * 4}px`, // 16px mobile
    containerPaddingLg: `${BASE_UNIT * 8}px`, // 32px desktop

    // Card widths
    cardWidthSm: '280px',
    cardWidthMd: '320px',
    cardWidthLg: '400px',
    cardWidthFull: '100%',
  },
} as const;

// Type exports
export type Spacing = typeof spacing;
export type SpacingKey = keyof typeof spacing;
