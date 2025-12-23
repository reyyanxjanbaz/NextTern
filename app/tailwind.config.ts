/**
 * NextTern TailwindCSS Configuration
 *
 * This configuration extends Tailwind with our design tokens.
 * All custom values are derived from design/tokens/ to ensure
 * consistency and enforce Constitution Article VIII.2.
 *
 * DO NOT add arbitrary values that bypass design tokens.
 */

import { colors } from '../design/tokens/colors';
import { typography } from '../design/tokens/typography';
import { spacing } from '../design/tokens/spacing';
import { shadows, radius } from '../design/tokens/shadows';
import { motion } from '../design/tokens/motion';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    // === COLORS ===
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',

      // Background
      background: colors.background,

      // Text
      text: colors.text,

      // Accent
      accent: colors.accent,

      // Semantic
      success: colors.success,
      warning: colors.warning,
      danger: colors.danger,

      // State (for application states)
      state: colors.state,

      // Border
      border: colors.border,

      // Overlay
      overlay: colors.overlay,
    },

    // === FONT FAMILY ===
    fontFamily: {
      sans: [typography.fontFamily.sans],
      mono: [typography.fontFamily.mono],
    },

    // === FONT SIZE ===
    fontSize: typography.fontSize,

    // === FONT WEIGHT ===
    fontWeight: typography.fontWeight,

    // === LINE HEIGHT ===
    lineHeight: typography.lineHeight,

    // === LETTER SPACING ===
    letterSpacing: typography.letterSpacing,

    // === SPACING ===
    spacing: {
      px: spacing.px,
      0: spacing[0],
      0.5: spacing[0.5],
      1: spacing[1],
      1.5: spacing[1.5],
      2: spacing[2],
      2.5: spacing[2.5],
      3: spacing[3],
      3.5: spacing[3.5],
      4: spacing[4],
      5: spacing[5],
      6: spacing[6],
      7: spacing[7],
      8: spacing[8],
      9: spacing[9],
      10: spacing[10],
      11: spacing[11],
      12: spacing[12],
      14: spacing[14],
      16: spacing[16],
      20: spacing[20],
      24: spacing[24],
      28: spacing[28],
      32: spacing[32],
      36: spacing[36],
      40: spacing[40],
      44: spacing[44],
      48: spacing[48],
      52: spacing[52],
      56: spacing[56],
      60: spacing[60],
      64: spacing[64],
      72: spacing[72],
      80: spacing[80],
      96: spacing[96],
    },

    // === BORDER RADIUS ===
    borderRadius: {
      none: radius.none,
      sm: radius.sm,
      DEFAULT: radius.DEFAULT,
      md: radius.md,
      lg: radius.lg,
      xl: radius.xl,
      '2xl': radius['2xl'],
      full: radius.full,
    },

    // === BOX SHADOW ===
    boxShadow: {
      none: shadows.boxShadow.none,
      xs: shadows.boxShadow.xs,
      sm: shadows.boxShadow.sm,
      DEFAULT: shadows.boxShadow.DEFAULT,
      md: shadows.boxShadow.md,
      lg: shadows.boxShadow.lg,
      xl: shadows.boxShadow.xl,
      '2xl': shadows.boxShadow['2xl'],
      inner: shadows.boxShadow.inner,
      // Card-specific
      'card-rest': shadows.card.rest,
      'card-hover': shadows.card.hover,
      'card-active': shadows.card.active,
      'card-expanded': shadows.card.expanded,
      // Focus rings
      'focus-ring': shadows.focusRing.DEFAULT,
      'focus-ring-error': shadows.focusRing.error,
      'focus-ring-success': shadows.focusRing.success,
    },

    // === TRANSITION DURATION ===
    transitionDuration: {
      0: '0ms',
      instant: motion.duration.instant,
      fast: motion.duration.fast,
      DEFAULT: motion.duration.normal,
      normal: motion.duration.normal,
      moderate: motion.duration.moderate,
      slow: motion.duration.slow,
      slower: motion.duration.slower,
      slowest: motion.duration.slowest,
    },

    // === TRANSITION TIMING FUNCTION ===
    transitionTimingFunction: {
      linear: motion.easing.linear,
      ease: motion.easing.ease,
      'ease-in': motion.easing.easeIn,
      'ease-out': motion.easing.easeOut,
      'ease-in-out': motion.easing.easeInOut,
      emphasized: motion.easing.emphasized,
      bounce: motion.easing.bounce,
      spring: motion.easing.spring,
    },

    // === EXTEND (additions, not replacements) ===
    extend: {
      // Max width
      maxWidth: {
        prose: spacing.layout.maxWidthProse,
        ...spacing.layout,
      },

      // Animation
      animation: {
        'fade-in': motion.animation.fadeIn,
        'fade-out': motion.animation.fadeOut,
        'slide-up': motion.animation.slideUp,
        'slide-down': motion.animation.slideDown,
        'scale-in': motion.animation.scaleIn,
        pulse: motion.animation.pulse,
        'swipe-left': motion.animation.swipeLeft,
        'swipe-right': motion.animation.swipeRight,
      },

      // Keyframes
      keyframes: {
        fadeIn: motion.keyframes.fadeIn,
        fadeOut: motion.keyframes.fadeOut,
        slideUp: motion.keyframes.slideUp,
        slideDown: motion.keyframes.slideDown,
        scaleIn: motion.keyframes.scaleIn,
        pulse: motion.keyframes.pulse,
        swipeLeft: motion.keyframes.swipeLeft,
        swipeRight: motion.keyframes.swipeRight,
      },
    },
  },

  plugins: [],
};
