/**
 * NextTern Design Tokens: Motion
 *
 * Constitution Article II.3 - Motion Has Intent:
 * Animations may exist ONLY to:
 * - Explain state transitions
 * - Reduce cognitive load
 * - Guide attention
 *
 * Motion for aesthetic delight alone is FORBIDDEN.
 *
 * These tokens are MANDATORY dependencies (Article VIII.2).
 */

export const motion = {
  // === DURATIONS ===
  // Based on human perception thresholds
  duration: {
    // Instant - imperceptible, for micro-interactions
    instant: '50ms',

    // Fast - quick feedback, hover states, small movements
    fast: '100ms',

    // Normal - standard transitions, most UI changes
    normal: '150ms',

    // Moderate - larger movements, card expand/collapse
    moderate: '200ms',

    // Slow - complex animations, page transitions
    slow: '300ms',

    // Slower - elaborate sequences, onboarding
    slower: '400ms',

    // Slowest - dramatic reveals, only when necessary
    slowest: '500ms',
  },

  // === EASING CURVES ===
  // Optimized for natural, purposeful motion
  easing: {
    // Linear - constant speed, use sparingly
    linear: 'linear',

    // Ease - general purpose
    ease: 'ease',

    // Ease In - starts slow, ends fast (exits)
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',

    // Ease Out - starts fast, ends slow (entries)
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',

    // Ease In Out - symmetric, balanced
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Emphasized - more dramatic ease out
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',

    // Bounce - subtle bounce for playful feedback
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',

    // Spring - natural spring physics feel
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // === TRANSITIONS ===
  // Pre-composed transitions for common use cases
  transition: {
    // None - instant, no animation
    none: 'none',

    // Colors - background, text, border color changes
    colors: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',

    // Opacity - fade in/out
    opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',

    // Shadow - elevation changes
    shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',

    // Transform - movement, scale
    transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',

    // All common properties
    all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',

    // Card hover - combined for cards
    card: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',

    // Expand - for card expansion
    expand: 'all 200ms cubic-bezier(0.2, 0, 0, 1)',
  },

  // === ANIMATIONS ===
  // Keyframe animation definitions
  keyframes: {
    // Fade in
    fadeIn: {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },

    // Fade out
    fadeOut: {
      from: { opacity: '1' },
      to: { opacity: '0' },
    },

    // Slide up (for entries)
    slideUp: {
      from: { transform: 'translateY(8px)', opacity: '0' },
      to: { transform: 'translateY(0)', opacity: '1' },
    },

    // Slide down (for exits)
    slideDown: {
      from: { transform: 'translateY(0)', opacity: '1' },
      to: { transform: 'translateY(8px)', opacity: '0' },
    },

    // Scale in (for modals, popovers)
    scaleIn: {
      from: { transform: 'scale(0.95)', opacity: '0' },
      to: { transform: 'scale(1)', opacity: '1' },
    },

    // Pulse (for loading states)
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },

    // Swipe feedback - left
    swipeLeft: {
      from: { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
      to: { transform: 'translateX(-100%) rotate(-10deg)', opacity: '0' },
    },

    // Swipe feedback - right
    swipeRight: {
      from: { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
      to: { transform: 'translateX(100%) rotate(10deg)', opacity: '0' },
    },
  },

  // === ANIMATION PRESETS ===
  // Ready-to-use animation strings
  animation: {
    fadeIn: 'fadeIn 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
    fadeOut: 'fadeOut 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
    slideUp: 'slideUp 200ms cubic-bezier(0.2, 0, 0, 1) forwards',
    slideDown: 'slideDown 200ms cubic-bezier(0.4, 0, 1, 1) forwards',
    scaleIn: 'scaleIn 200ms cubic-bezier(0.2, 0, 0, 1) forwards',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    swipeLeft: 'swipeLeft 300ms cubic-bezier(0.4, 0, 1, 1) forwards',
    swipeRight: 'swipeRight 300ms cubic-bezier(0.4, 0, 1, 1) forwards',
  },
} as const;

// Type exports
export type Motion = typeof motion;
export type Duration = keyof typeof motion.duration;
export type Easing = keyof typeof motion.easing;
export type Transition = keyof typeof motion.transition;
