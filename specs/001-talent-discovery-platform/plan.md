# Implementation Plan: Human-First Talent Discovery Platform

**Branch**: `001-talent-discovery-platform` | **Date**: 2025-12-23 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-talent-discovery-platform/spec.md`

## Summary

Build a two-sided talent discovery platform optimized for internships. The system uses a card-based, intent-driven architecture where students build identity once and recruiters discover talent through proof-weighted matching. Core principle: discovery over paperwork. The platform enforces strict application state visibility and closes loops to eliminate user anxiety.

## Technical Context

**Language/Version**: TypeScript 5.x (full-stack)  
**Primary Dependencies**: 
- Frontend: React 18+, TailwindCSS (design tokens)
- Backend: Node.js with Express or Fastify
- Real-time: WebSocket for chat

**Storage**: PostgreSQL (relational data), Redis (sessions, caching)  
**Testing**: Vitest (unit), Playwright (E2E), API contract tests  
**Target Platform**: Web (responsive, mobile-first)  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: <200ms card load, 60fps swipe animations, <500ms state transitions  
**Constraints**: Offline-resilient UI state, no silent failures, all states visible  
**Scale/Scope**: MVP targets 1000 students, 100 recruiters, 500 internships

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Article | Principle | Status | Implementation Notes |
|---------|-----------|--------|---------------------|
| I.1 | Humans Over Documents | ✅ Pass | ProfileCard system, no required PDFs |
| I.2 | Effort Must Convert to Signal | ✅ Pass | All actions produce visibility/opportunity |
| I.3 | Anxiety Is a UX Bug | ✅ Pass | 7 explicit application states, time-in-state visible |
| II.1 | Whiteboard Principle | ✅ Pass | Design tokens enforce white surfaces, high contrast |
| II.2 | Visual Hierarchy | ✅ Pass | 3-second rule enforced per screen |
| II.3 | Motion Has Intent | ✅ Pass | Animations only for state transitions |
| III.1 | Progressive Disclosure | ✅ Pass | Summary/expanded card views |
| III.2 | Choice Without Punishment | ✅ Pass | Reversible actions, no commitment pressure |
| III.3 | No Dead Ends | ✅ Pass | Every screen has clear next action |
| IV.1 | Everything Is a Card | ✅ Pass | 4 card types: Profile, Internship, Project, Status |
| IV.2 | Cards Tell Stories | ✅ Pass | Cards answer human questions |
| V.1 | Identity Before Application | ✅ Pass | Build once, discover through interaction |
| V.2 | Proof Over Claims | ✅ Pass | Skills require linked evidence |
| V.3 | Visibility Earned | ✅ Pass | No pay-to-win, proof-weighted ranking |
| VI.1 | Recruiters Time-Poor | ✅ Pass | Swipe + review modes, minimal reading |
| VI.2 | Pipeline-First | ✅ Pass | Explicit states: discovered→decided |
| VI.3 | Silence Not Neutral | ✅ Pass | Status surfacing, loop closure |
| VII.1 | Explainability | ✅ Pass | Plain-language match explanations |
| VII.2 | Behavior Over Keywords | ✅ Pass | Actions weighted over labels |
| VIII.1 | Simplicity | ✅ Pass | Clear naming, minimal abstraction |
| VIII.2 | Design Lock | ✅ Pass | Tokens are mandatory dependencies |
| VIII.3 | Offline-First | ✅ Pass | UI assumes distracted users |
| IX.1 | Bias Reduction | ✅ Pass | Blind discovery toggle, de-emphasized pedigree |
| IX.2 | Growth Integrity | ✅ Pass | No features that degrade trust/clarity |
| X.1 | Job Portal Test | ✅ Pass | Discovery, not paperwork |

## Project Structure

### Documentation (this feature)

```text
specs/001-talent-discovery-platform/
├── plan.md              # This file
├── spec.md              # Feature specification
├── data-model.md        # Entity definitions
├── quickstart.md        # Test scenarios
├── contracts/           # API endpoint contracts
├── checklists/          # Quality validation
└── tasks.md             # Task breakdown (speckit.tasks output)
```

### Source Code (repository root)

```text
app/                           # Frontend application
├── src/
│   ├── components/
│   │   ├── cards/             # Card components (Profile, Internship, Project, Status)
│   │   ├── discovery/         # Swipe/review mode components
│   │   ├── pipeline/          # Recruiter pipeline views
│   │   ├── chat/              # Chat components
│   │   └── common/            # Shared UI components
│   ├── pages/
│   │   ├── student/           # Student flows
│   │   ├── recruiter/         # Recruiter flows
│   │   └── auth/              # Authentication pages
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # API clients
│   ├── stores/                # State management
│   └── utils/                 # Helpers
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── public/

server/                        # Backend services
├── src/
│   ├── models/                # Data models (Card, Profile, Internship, etc.)
│   ├── services/              # Business logic
│   │   ├── matching/          # Match engine
│   │   ├── state/             # Application state machine
│   │   └── chat/              # Chat service
│   ├── api/
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth, validation
│   │   └── controllers/       # Request handlers
│   └── utils/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── contract/
└── prisma/                    # Database schema & migrations

design/                        # Design system
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── shadows.ts
│   └── motion.ts
├── components/                # Design component specs
└── guidelines/                # Usage documentation

docs/                          # Project documentation
├── onboarding.md
├── contributing.md
├── architecture.md
└── api/
```

**Structure Decision**: Web application structure selected based on two-sided marketplace requirements. Frontend (`app/`) handles student and recruiter experiences with role-based routing. Backend (`server/`) provides API, matching engine, state machine, and chat. Design tokens (`design/`) are a shared dependency enforced across both.

## Phased Implementation

### Phase 0: Foundational Setup
- Repository structure creation
- Design token definition (colors, typography, spacing, shadows, motion)
- Base configuration (TypeScript, linting, formatting)

### Phase 1: Core Data & Card System
- Card base interface (shared schema)
- ProfileCard, InternshipCard, ProjectCard, StatusCard schemas
- Generic card renderer with summary/expanded states

### Phase 2: Auth & Role System
- Authentication (magic link or OAuth)
- Role assignment (Student/Recruiter) at onboarding
- Role-based routing and UI loading

### Phase 3: Student MVP
- Profile builder (structured blocks)
- Resume import with verification
- Internship discovery (swipe mode)

### Phase 4: Recruiter MVP
- Internship editor with mandatory fields
- Candidate discovery (swipe + review modes)
- Pipeline view (visual states)

### Phase 5: Matching & Chat
- Match trigger logic (mutual interest)
- Chat system (match-only, context-aware)

### Phase 6: Application State System
- State machine implementation
- Student application tracker
- Time-in-state indicators

### Phase 7: Marketplace Mode
- List-based discovery view
- Same cards, same logic

### Phase 8: Quality & Guardrails
- Visibility decay for inactivity
- Proof-weighted ranking
- Blind discovery toggle

### Phase 9: Polish & Validation
- UX anxiety audit
- Performance baseline
- MVP freeze

## Complexity Tracking

> No constitution violations requiring justification. All features align with established principles.

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Separate frontend/backend | Web app structure | Two-sided marketplace with distinct user experiences requires clear separation |
| Design tokens as dependency | Mandatory | Constitution Article VIII.2 requires design enforcement |
| State machine | Strict 7-state model | Constitution Article VI.2 requires explicit states, no hidden states |
