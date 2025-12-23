<!--
================================================================================
SYNC IMPACT REPORT
================================================================================
Version Change: N/A → 1.0.0 (Initial ratification)

Added Sections:
  - Article I: Core Philosophy (3 principles)
  - Article II: Design Language (3 principles)
  - Article III: Human-Centric UX Laws (3 principles)
  - Article IV: Card System (2 principles)
  - Article V: Student Experience Laws (3 principles)
  - Article VI: Recruiter Experience Laws (3 principles)
  - Article VII: Matching & Intelligence (2 principles)
  - Article VIII: Engineering Values (3 principles)
  - Article IX: Ethics & Scale (2 principles)
  - Article X: Immutable Rule (1 principle)
  - Governance section

Modified Principles: None (initial version)
Removed Sections: None (initial version)

Templates Requiring Updates:
  ✅ plan-template.md - Constitution Check section compatible
  ✅ spec-template.md - User scenarios align with human-centric principles
  ✅ tasks-template.md - Task organization supports independent story delivery

Follow-up TODOs: None
================================================================================
-->

# NextTern Constitution

## Human-First Talent Discovery Platform

**Version:** 1.0.0  
**Status:** Non-negotiable system contract  
**Audience:** Designers, Engineers, AI Agents, and Contributors

---

## PREAMBLE

This document defines the immutable principles governing the design, behavior, and evolution of this application.  
Any feature, interface, model, or implementation that violates this constitution is considered **invalid**, regardless of technical correctness or business value.

This is not documentation.  
This is **law**.

---

## ARTICLE I — CORE PHILOSOPHY

### I.1 Humans Over Documents

The platform exists to represent **people**, not resumes, PDFs, or forms.

Any flow that:
- forces repeated data entry
- prioritizes documents over identity
- reduces users to fields or keywords

**MUST be redesigned or removed.**

### I.2 Effort Must Convert to Signal

Every unit of user effort MUST produce:
- visibility
- clarity
- opportunity
- feedback

Effort that disappears into silence is a system failure.

### I.3 Anxiety Is a UX Bug

Uncertainty, silence, and ambiguity are treated as **defects**, not edge cases.

If a user can reasonably ask:
> "What is happening?"  
> "What should I do next?"

the system has failed to communicate state.

---

## ARTICLE II — DESIGN LANGUAGE

### II.1 The Whiteboard Principle

The interface MUST feel like ideas clearly sketched on a clean whiteboard.

Enforced properties:
- White or near-white surfaces
- High-contrast typography
- Minimal color usage
- No decorative gradients
- No visual noise

Clarity always outweighs decoration.

### II.2 Visual Hierarchy Is Sacred

Every screen MUST answer within **3 seconds**:
1. Where am I?
2. What matters most here?
3. What can I do next?

Hierarchy is enforced via:
- spacing
- typography scale
- layout order

### II.3 Motion Has Intent

Animations may exist **only** to:
- explain state transitions
- reduce cognitive load
- guide attention

Motion for aesthetic delight alone is forbidden.

---

## ARTICLE III — HUMAN-CENTRIC UX LAWS

### III.1 Progressive Disclosure Always

Information MUST be layered.

Rules:
- Essentials first
- Details on demand
- No forced reading

Depth MUST be discoverable, never mandatory.

### III.2 Choice Without Punishment

Actions such as swipes, clicks, or dismissals:
- MUST be reversible where reasonable
- MUST never punish exploration
- MUST never pressure commitment

Confidence is built through clarity, not friction.

### III.3 No Dead Ends

Every screen MUST provide at least one of:
- a clear next action
- a way to improve
- a path backward

If a user feels stuck, the design has failed.

---

## ARTICLE IV — CARD SYSTEM (FOUNDATIONAL)

### IV.1 Everything Is a Card

Cards are the atomic unit of the system.

Mandatory card types:
- Profile cards
- Internship cards
- Project cards
- Status cards

Cards MUST be:
- skimmable
- comparable
- expandable
- consistent

### IV.2 Cards Tell Stories

A card MUST answer a human question.

Examples:
- "Who is this person really?"
- "Why does this role exist?"
- "Is this worth my attention?"

Data without narrative context is invalid.

---

## ARTICLE V — STUDENT EXPERIENCE LAWS

### V.1 Identity Before Application

Students do not apply via forms.

They:
1. Build identity once
2. Express intent through interaction
3. Let the system handle repetition

Repeated data entry is forbidden.

### V.2 Proof Over Claims

Skills without evidence are weak signals.

The system MUST always guide users toward:
- projects
- links
- outcomes
- demonstrations

Never shame. Always scaffold.

### V.3 Visibility Is Earned, Not Purchased

Monetization MUST never:
- hide better candidates
- reward spam
- penalize honesty

Paid features may only amplify **already high-quality signals**.

---

## ARTICLE VI — RECRUITER EXPERIENCE LAWS

### VI.1 Recruiters Are Time-Poor

Design assumes recruiters want:
- clarity
- speed
- fewer decisions

The system MUST minimize:
- reading
- filtering
- back-and-forth

### VI.2 Hiring Is a Flow, Not a Search

Recruiter UX MUST be pipeline-first.

Explicit states are mandatory:
- discovered
- shortlisted
- contacted
- interviewing
- decided

Hidden states are forbidden.

### VI.3 Silence Is Not Neutral

If no action occurs:
- the system MUST surface status
- loops MUST eventually close
- candidates MUST NOT wait indefinitely

---

## ARTICLE VII — MATCHING & INTELLIGENCE

### VII.1 Explainability Is Mandatory

All matches, rankings, or recommendations MUST be explainable in plain language.

Black-box decisions are forbidden.

### VII.2 Behavior Over Keywords

The system prioritizes:
- actions
- consistency
- follow-through

Over:
- labels
- buzzwords
- pedigree signals

---

## ARTICLE VIII — ENGINEERING VALUES

### VIII.1 Simplicity Over Cleverness

Readable, maintainable code is prioritized over clever abstractions.

Any contributor MUST understand **why** a component exists quickly.

### VIII.2 Design Is a Dependency

Design tokens, spacing rules, and typography:
- are enforced
- are not optional
- may not be bypassed for convenience

### VIII.3 Offline-First Thinking

Every feature MUST assume users may be:
- distracted
- anxious
- time-constrained

If it only works for focused users, it fails.

---

## ARTICLE IX — ETHICS & SCALE

### IX.1 Bias Is Actively Designed Against

Where possible:
- reduce pedigree signals
- emphasize demonstrated work
- allow blind discovery

Bias is assumed and MUST be countered intentionally.

### IX.2 Growth Must Not Corrupt Experience

Any change that improves:
- engagement
- revenue
- metrics

but degrades:
- trust
- clarity
- dignity

**MUST be rejected.**

---

## ARTICLE X — IMMUTABLE RULE

### X.1 The Job Portal Test

At any point, ask:
> "Does this feel like paperwork or discovery?"

If it feels like paperwork, it violates the constitution.

---

## CLOSING CLAUSE

This constitution protects:
- humans from systems
- effort from waste
- attention from abuse

Any feature, model, or interface that violates these principles MUST be challenged, revised, or removed.

---

## Governance

### Amendment Procedure

1. Proposed amendments MUST be documented with rationale
2. Amendments MUST demonstrate alignment with the Preamble and Article X
3. All stakeholders (Designers, Engineers, AI Agents, Contributors) MUST be notified
4. Amendments require explicit approval before adoption
5. Migration plans MUST accompany breaking changes

### Versioning Policy

- **MAJOR**: Backward incompatible governance/principle removals or redefinitions
- **MINOR**: New principle/section added or materially expanded guidance
- **PATCH**: Clarifications, wording, typo fixes, non-semantic refinements

### Compliance Review

- All PRs/reviews MUST verify constitution compliance
- Features violating any Article are considered invalid regardless of technical correctness
- The Job Portal Test (Article X.1) serves as the ultimate validation criterion
- Complexity and deviations MUST be explicitly justified

---

**Version**: 1.0.0 | **Ratified**: 2025-12-23 | **Last Amended**: 2025-12-23
