/**
 * NextTern Design Tokens
 *
 * Central export for all design tokens.
 *
 * Constitution Article VIII.2 - Design Is a Dependency:
 * Design tokens, spacing rules, and typography:
 * - Are enforced
 * - Are NOT optional
 * - May NOT be bypassed for convenience
 *
 * Import from this file:
 * ```typescript
 * import { colors, typography, spacing, shadows, radius, motion } from '@/design/tokens';
 * ```
 */

export { colors } from './colors';
export type { Colors, ColorKey } from './colors';

export { typography } from './typography';
export type { Typography, FontSize, FontWeight, TextStyle } from './typography';

export { spacing } from './spacing';
export type { Spacing, SpacingKey } from './spacing';

export { shadows, radius } from './shadows';
export type { Shadows, Radius, ShadowKey, RadiusKey } from './shadows';

export { motion } from './motion';
export type { Motion, Duration, Easing, Transition } from './motion';

// Re-export everything as a single tokens object for convenience
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { shadows, radius } from './shadows';
import { motion } from './motion';

export const tokens = {
  colors,
  typography,
  spacing,
  shadows,
  radius,
  motion,
} as const;

export type Tokens = typeof tokens;
