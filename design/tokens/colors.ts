/**
 * NextTern Design Tokens: Colors
 *
 * Constitution Article II.1 - The Whiteboard Principle:
 * - White or near-white surfaces
 * - High-contrast typography
 * - Minimal color usage
 * - No decorative gradients
 * - No visual noise
 *
 * These tokens are MANDATORY dependencies (Article VIII.2).
 * They may NOT be bypassed for convenience.
 */

export const colors = {
  // === BACKGROUND SURFACES ===
  // Whiteboard principle: clean, white or near-white
  background: {
    primary: '#FFFFFF', // Main surfaces
    secondary: '#FAFAFA', // Subtle differentiation
    tertiary: '#F5F5F5', // Cards, panels
    inverse: '#1A1A1A', // Dark mode / inverse sections
  },

  // === TEXT COLORS ===
  // High contrast for readability
  text: {
    primary: '#111111', // Main content - maximum contrast
    secondary: '#4A4A4A', // Supporting text
    tertiary: '#717171', // Muted, hints
    inverse: '#FFFFFF', // Text on dark backgrounds
    disabled: '#9CA3AF', // Disabled state
  },

  // === BRAND / ACCENT ===
  // Minimal color usage - used sparingly for emphasis
  accent: {
    primary: '#2563EB', // Primary actions, links
    primaryHover: '#1D4ED8', // Hover state
    primaryActive: '#1E40AF', // Active/pressed state
    light: '#EFF6FF', // Light accent backgrounds
  },

  // === SEMANTIC COLORS ===
  // Functional colors for status and feedback
  success: {
    DEFAULT: '#059669', // Success states
    light: '#D1FAE5', // Success backgrounds
    dark: '#047857', // Success emphasis
  },

  warning: {
    DEFAULT: '#D97706', // Warning states
    light: '#FEF3C7', // Warning backgrounds
    dark: '#B45309', // Warning emphasis
  },

  danger: {
    DEFAULT: '#DC2626', // Error states, destructive actions
    light: '#FEE2E2', // Error backgrounds
    dark: '#B91C1C', // Error emphasis
  },

  // === APPLICATION STATE COLORS ===
  // Used in StatusCards and pipeline views
  state: {
    discovered: '#6B7280', // Gray - neutral starting state
    viewed: '#3B82F6', // Blue - engagement
    shortlisted: '#8B5CF6', // Purple - elevated interest
    contacted: '#F59E0B', // Amber - active communication
    interviewing: '#10B981', // Green - in process
    decided: '#059669', // Emerald - resolution
    closed: '#9CA3AF', // Gray - completed
  },

  // === BORDERS & DIVIDERS ===
  border: {
    light: '#E5E7EB', // Subtle borders
    DEFAULT: '#D1D5DB', // Standard borders
    dark: '#9CA3AF', // Emphasized borders
    focus: '#2563EB', // Focus rings
  },

  // === OVERLAYS ===
  overlay: {
    light: 'rgba(0, 0, 0, 0.04)', // Subtle hover states
    medium: 'rgba(0, 0, 0, 0.08)', // Card shadows base
    dark: 'rgba(0, 0, 0, 0.5)', // Modal backdrops
  },
} as const;

// Type exports for TypeScript consumers
export type Colors = typeof colors;
export type ColorKey = keyof Colors;
