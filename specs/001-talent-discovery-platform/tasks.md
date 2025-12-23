# Tasks: Human-First Talent Discovery Platform

**Input**: Design documents from `/specs/001-talent-discovery-platform/`
**Prerequisites**: plan.md ✓, spec.md ✓

**Tests**: Tests are NOT explicitly requested in the specification. Test tasks are omitted per template guidelines.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend**: `app/src/`
- **Backend**: `server/src/`
- **Design**: `design/`
- **Shared Types**: `shared/types/`

---

## Phase 1: Setup (Project Bootstrap) ✅ COMPLETE

**Purpose**: Repository initialization and foundational structure

- [x] T001 Create repository with README.md containing project summary at root
- [x] T002 [P] Create folder structure: app/, server/, design/, docs/ at repository root
- [x] T003 [P] Create shared types folder at shared/types/ for cross-platform schemas
- [x] T004 [P] Initialize TypeScript configuration at app/tsconfig.json
- [x] T005 [P] Initialize TypeScript configuration at server/tsconfig.json
- [x] T006 [P] Configure ESLint and Prettier at root eslint.config.js and .prettierrc
- [x] T007 [P] Create package.json with workspaces configuration at root
- [x] T008 [P] Add spec files to docs/spec/ (constitution.md, specify.md, plan.md, tasks.md)
- [x] T009 Create .gitignore with node_modules, dist, .env patterns at root

---

## Phase 2: Foundational (Design System & Core Infrastructure)

**Purpose**: Design tokens and shared infrastructure that MUST be complete before ANY user story

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Design Token Lock (Constitution Article VIII.2) ✅ COMPLETE

- [x] T010 Define color tokens (background, primary, secondary, accent, danger, success) in design/tokens/colors.ts
- [x] T011 [P] Define typography scale (font family, sizes, weights, line heights) in design/tokens/typography.ts
- [x] T012 [P] Define spacing scale (base unit, increments, layout margins) in design/tokens/spacing.ts
- [x] T013 [P] Define radius and shadow tokens (soft shadows only, consistent radius) in design/tokens/shadows.ts
- [x] T014 [P] Define motion timing rules (state transitions only) in design/tokens/motion.ts
- [x] T015 Export all tokens from design/tokens/index.ts
- [x] T016 Create TailwindCSS configuration using design tokens at app/tailwind.config.ts

### Core Data Models (Shared) ✅ COMPLETE

- [x] T017 Define Card base interface (id, type, summary, expanded, state, actions) in shared/types/card.ts
- [x] T018 [P] Define ProfileCard schema extending Card in shared/types/profile-card.ts
- [x] T019 [P] Define InternshipCard schema extending Card in shared/types/internship-card.ts
- [x] T020 [P] Define ProjectCard schema extending Card in shared/types/project-card.ts
- [x] T021 [P] Define StatusCard schema extending Card in shared/types/status-card.ts
- [x] T022 [P] Define ApplicationState enum (discovered, viewed, shortlisted, contacted, interviewing, decided, closed) in shared/types/application-state.ts
- [x] T023 [P] Define User and Role types (Student, Recruiter) in shared/types/user.ts
- [x] T024 Export all types from shared/types/index.ts

### Database Schema ✅ COMPLETE

- [x] T025 Initialize Prisma with PostgreSQL configuration at server/prisma/schema.prisma
- [x] T026 Define User model with role field in server/prisma/schema.prisma
- [x] T027 [P] Define Profile model (student identity) in server/prisma/schema.prisma
- [x] T028 [P] Define Internship model in server/prisma/schema.prisma
- [x] T029 [P] Define Project model in server/prisma/schema.prisma
- [x] T030 [P] Define Application model with state machine field in server/prisma/schema.prisma
- [x] T031 [P] Define Match model in server/prisma/schema.prisma
- [x] T032 [P] Define Chat and Message models in server/prisma/schema.prisma
- [x] T033 Generate Prisma client and create initial migration at server/prisma/

### Backend Core Infrastructure

- [ ] T034 Setup Express/Fastify server with middleware at server/src/index.ts
- [ ] T035 [P] Implement authentication middleware at server/src/api/middleware/auth.ts
- [ ] T036 [P] Implement role-based access middleware at server/src/api/middleware/role-guard.ts
- [ ] T037 [P] Implement error handling middleware (explain, suggest recovery) at server/src/api/middleware/error-handler.ts
- [ ] T038 Setup API router structure at server/src/api/routes/index.ts

### Frontend Core Infrastructure

- [ ] T039 Initialize React app with Vite at app/
- [ ] T040 [P] Configure React Router with role-based routing at app/src/router/index.tsx
- [ ] T041 [P] Create auth context and hooks at app/src/contexts/AuthContext.tsx
- [ ] T042 [P] Create API client service at app/src/services/api.ts
- [ ] T043 Setup state management (Zustand or similar) at app/src/stores/index.ts

### Card Rendering Engine

- [ ] T044 Build generic CardRenderer component with summary/expanded states at app/src/components/cards/CardRenderer.tsx
- [ ] T045 [P] Implement expand/collapse animation (motion tokens) at app/src/components/cards/CardAnimations.tsx
- [ ] T046 [P] Create CardActions slot component at app/src/components/cards/CardActions.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Student Profile Creation (Priority: P1) 🎯 MVP

**Goal**: Students can build their professional identity once through structured ProfileCard creation

**Independent Test**: New student signs up, completes ProfileCard with identity snapshot, role intent, availability, and at least one skill proof

### Authentication (Student Path)

- [ ] T047 [US1] Implement magic link authentication flow at server/src/services/auth/magic-link.ts
- [ ] T048 [US1] Create login page at app/src/pages/auth/Login.tsx
- [ ] T049 [US1] Create magic link verification page at app/src/pages/auth/Verify.tsx
- [ ] T050 [US1] Implement student onboarding role selection at app/src/pages/auth/Onboarding.tsx

### Profile Builder

- [ ] T051 [US1] Create ProfileCard component (summary view) at app/src/components/cards/ProfileCard.tsx
- [ ] T052 [US1] Create ProfileCard expanded view at app/src/components/cards/ProfileCardExpanded.tsx
- [ ] T053 [US1] Build profile builder wizard container at app/src/pages/student/ProfileBuilder.tsx
- [ ] T054 [P] [US1] Create identity snapshot block (name, photo, headline) at app/src/components/profile/IdentityBlock.tsx
- [ ] T055 [P] [US1] Create role intent block (what they're seeking) at app/src/components/profile/RoleIntentBlock.tsx
- [ ] T056 [P] [US1] Create availability block at app/src/components/profile/AvailabilityBlock.tsx
- [ ] T057 [P] [US1] Create skills block with proof linking at app/src/components/profile/SkillsBlock.tsx
- [ ] T058 [P] [US1] Create projects reference block at app/src/components/profile/ProjectsBlock.tsx
- [ ] T059 [US1] Implement profile strength indicator at app/src/components/profile/ProfileStrength.tsx
- [ ] T060 [US1] Implement proof guidance (scaffold, don't shame) at app/src/components/profile/ProofGuidance.tsx

### Project Cards (Skill Proof)

- [ ] T061 [US1] Create ProjectCard component at app/src/components/cards/ProjectCard.tsx
- [ ] T062 [US1] Create project creation modal at app/src/components/profile/ProjectModal.tsx

### Backend Profile API

- [ ] T063 [US1] Implement profile service at server/src/services/profile.ts
- [ ] T064 [US1] Create profile routes (CRUD) at server/src/api/routes/profile.ts
- [ ] T065 [US1] Create project routes (CRUD) at server/src/api/routes/project.ts

### Resume Import

- [ ] T066 [US1] Implement resume upload endpoint at server/src/api/routes/resume.ts
- [ ] T067 [US1] Implement resume parser service (structured extraction) at server/src/services/resume-parser.ts
- [ ] T068 [US1] Create resume upload component at app/src/components/profile/ResumeUpload.tsx
- [ ] T069 [US1] Create verification step UI (must confirm before save) at app/src/components/profile/ResumeVerification.tsx

**Checkpoint**: User Story 1 complete - Students can create profiles with proof-linked skills

---

## Phase 4: User Story 2 - Recruiter Internship Posting (Priority: P1) 🎯 MVP

**Goal**: Recruiters can create clear InternshipCards with role clarity, expectations, and outcomes

**Independent Test**: Recruiter creates InternshipCard with all mandatory fields, system enforces quality (no buzzwords without explanation)

### Authentication (Recruiter Path)

- [ ] T070 [US2] Implement recruiter onboarding flow at app/src/pages/auth/RecruiterOnboarding.tsx
- [ ] T071 [US2] Create recruiter dashboard shell at app/src/pages/recruiter/Dashboard.tsx

### Internship Card

- [ ] T072 [US2] Create InternshipCard component (summary view) at app/src/components/cards/InternshipCard.tsx
- [ ] T073 [US2] Create InternshipCard expanded view at app/src/components/cards/InternshipCardExpanded.tsx

### Internship Editor

- [ ] T074 [US2] Build internship editor container at app/src/pages/recruiter/InternshipEditor.tsx
- [ ] T075 [P] [US2] Create role clarity block at app/src/components/internship/RoleClarityBlock.tsx
- [ ] T076 [P] [US2] Create company context block at app/src/components/internship/CompanyContextBlock.tsx
- [ ] T077 [P] [US2] Create learning outcomes block at app/src/components/internship/LearningOutcomesBlock.tsx
- [ ] T078 [P] [US2] Create practical expectations block at app/src/components/internship/ExpectationsBlock.tsx
- [ ] T079 [P] [US2] Create duration and compensation block at app/src/components/internship/CompensationBlock.tsx
- [ ] T080 [US2] Implement buzzword detection and clarification prompts at app/src/components/internship/QualityValidator.tsx
- [ ] T081 [US2] Create preview mode before publish at app/src/components/internship/InternshipPreview.tsx

### Backend Internship API

- [ ] T082 [US2] Implement internship service at server/src/services/internship.ts
- [ ] T083 [US2] Create internship routes (CRUD) at server/src/api/routes/internship.ts
- [ ] T084 [US2] Implement content quality validation at server/src/services/content-validator.ts

**Checkpoint**: User Story 2 complete - Recruiters can post quality internships

---

## Phase 5: User Story 3 - Student Discovery Mode (Priority: P2)

**Goal**: Students can swipe through internships in a high-velocity, low-commitment interface

**Independent Test**: Student swipes through InternshipCards, system records interest/pass, enforces daily limits

### Swipe Discovery UI

- [ ] T085 [US3] Build swipe container component at app/src/components/discovery/SwipeContainer.tsx
- [ ] T086 [US3] Implement swipe gesture handler (left/right/long-press) at app/src/hooks/useSwipeGesture.ts
- [ ] T087 [US3] Create swipe feedback animations at app/src/components/discovery/SwipeFeedback.tsx
- [ ] T088 [US3] Build student discovery page at app/src/pages/student/Discovery.tsx
- [ ] T089 [US3] Implement daily swipe limit UI at app/src/components/discovery/SwipeLimitIndicator.tsx

### Interest Recording

- [ ] T090 [US3] Implement interest service (record swipe decisions) at server/src/services/interest.ts
- [ ] T091 [US3] Create interest routes at server/src/api/routes/interest.ts
- [ ] T092 [US3] Implement daily limit enforcement at server/src/services/swipe-limiter.ts
- [ ] T093 [US3] Create interested internships list view at app/src/pages/student/InterestedList.tsx

**Checkpoint**: User Story 3 complete - Students can discover and express interest

---

## Phase 6: User Story 4 - Recruiter Candidate Discovery (Priority: P2)

**Goal**: Recruiters can discover ProfileCards through swipe and review modes with shortlisting

**Independent Test**: Recruiter switches between swipe and review modes, can shortlist candidates in either

### Recruiter Discovery Modes

- [ ] T094 [US4] Build recruiter discovery page with mode toggle at app/src/pages/recruiter/CandidateDiscovery.tsx
- [ ] T095 [US4] Implement recruiter swipe mode at app/src/components/discovery/RecruiterSwipeMode.tsx
- [ ] T096 [US4] Implement review mode (filterable list) at app/src/components/discovery/ReviewMode.tsx
- [ ] T097 [US4] Create filter controls component at app/src/components/discovery/FilterControls.tsx
- [ ] T098 [US4] Create candidate comparison view at app/src/components/discovery/ComparisonView.tsx

### Shortlisting

- [ ] T099 [US4] Implement shortlist service at server/src/services/shortlist.ts
- [ ] T100 [US4] Create shortlist routes at server/src/api/routes/shortlist.ts
- [ ] T101 [US4] Build shortlist action component at app/src/components/discovery/ShortlistAction.tsx
- [ ] T102 [US4] Create shortlisted candidates view at app/src/pages/recruiter/Shortlist.tsx

**Checkpoint**: User Story 4 complete - Recruiters can discover and shortlist candidates

---

## Phase 7: User Story 5 - Application State Visibility (Priority: P2)

**Goal**: Students always see exact state, time-in-state, and next outcomes for each application

**Independent Test**: Student views StatusCards showing current state, duration, and possible next steps

### State Machine

- [ ] T103 [US5] Implement application state machine at server/src/services/state/application-state-machine.ts
- [ ] T104 [US5] Define valid state transitions at server/src/services/state/state-transitions.ts
- [ ] T105 [US5] Implement state transition logging at server/src/services/state/state-logger.ts

### Status Card

- [ ] T106 [US5] Create StatusCard component at app/src/components/cards/StatusCard.tsx
- [ ] T107 [US5] Implement time-in-state calculator at app/src/utils/time-in-state.ts
- [ ] T108 [US5] Create next outcomes display at app/src/components/status/NextOutcomes.tsx
- [ ] T109 [US5] Implement stale application indicator at app/src/components/status/StaleIndicator.tsx

### Student Application Tracker

- [ ] T110 [US5] Build application tracker page at app/src/pages/student/ApplicationTracker.tsx
- [ ] T111 [US5] Create visual application flow component at app/src/components/status/ApplicationFlow.tsx
- [ ] T112 [US5] Implement proactive silence surfacing at app/src/components/status/SilenceAlert.tsx

**Checkpoint**: User Story 5 complete - Students never wonder "what is happening?"

---

## Phase 8: User Story 6 - Mutual Interest Chat Unlock (Priority: P3)

**Goal**: Chat unlocks automatically when student interest + recruiter shortlist conditions are met

**Independent Test**: Chat becomes available only when both parties have expressed mutual interest

### Match Detection

- [ ] T113 [US6] Implement match detection service at server/src/services/matching/match-detector.ts
- [ ] T114 [US6] Create match event emitter at server/src/services/matching/match-events.ts
- [ ] T115 [US6] Create match routes at server/src/api/routes/match.ts

### Chat System

- [ ] T116 [US6] Implement chat service at server/src/services/chat/chat.ts
- [ ] T117 [US6] Create chat routes at server/src/api/routes/chat.ts
- [ ] T118 [US6] Setup WebSocket for real-time messaging at server/src/services/chat/websocket.ts
- [ ] T119 [US6] Build chat container component at app/src/components/chat/ChatContainer.tsx
- [ ] T120 [US6] Create message input with structured prompts at app/src/components/chat/MessageInput.tsx
- [ ] T121 [US6] Create message list component at app/src/components/chat/MessageList.tsx
- [ ] T122 [US6] Implement chat unlock indicator at app/src/components/chat/ChatUnlockStatus.tsx
- [ ] T123 [US6] Implement silence status display at app/src/components/chat/SilenceIndicator.tsx

**Checkpoint**: User Story 6 complete - Matched parties can communicate

---

## Phase 9: User Story 7 - Recruiter Pipeline Management (Priority: P3)

**Goal**: Recruiters manage candidates through explicit pipeline stages with no ambiguous states

**Independent Test**: Recruiter moves candidates through stages, system enforces explicit state selection

### Pipeline View

- [ ] T124 [US7] Build pipeline page at app/src/pages/recruiter/Pipeline.tsx
- [ ] T125 [US7] Create pipeline column component at app/src/components/pipeline/PipelineColumn.tsx
- [ ] T126 [US7] Create pipeline card component at app/src/components/pipeline/PipelineCard.tsx
- [ ] T127 [US7] Implement drag-and-drop state transitions at app/src/hooks/usePipelineDragDrop.ts
- [ ] T128 [US7] Create stale candidate highlight at app/src/components/pipeline/StaleHighlight.tsx
- [ ] T129 [US7] Implement decision enforcement modal at app/src/components/pipeline/DecisionModal.tsx

### Backend Pipeline API

- [ ] T130 [US7] Implement pipeline service at server/src/services/pipeline.ts
- [ ] T131 [US7] Create pipeline routes at server/src/api/routes/pipeline.ts
- [ ] T132 [US7] Implement loop closure notifications at server/src/services/notifications/loop-closure.ts

**Checkpoint**: User Story 7 complete - No candidate left in limbo

---

## Phase 10: User Story 8 - Match Explainability (Priority: P3)

**Goal**: All match suggestions are explainable in plain language with no opaque scores

**Independent Test**: Any match displays plain-language explanation citing specific alignment factors

### Matching Engine

- [ ] T133 [US8] Implement matching algorithm at server/src/services/matching/match-algorithm.ts
- [ ] T134 [US8] Implement skill overlap calculator (proof-weighted) at server/src/services/matching/skill-overlap.ts
- [ ] T135 [US8] Implement availability alignment scorer at server/src/services/matching/availability-scorer.ts
- [ ] T136 [US8] Implement behavior history analyzer at server/src/services/matching/behavior-analyzer.ts
- [ ] T137 [US8] Implement plain-language explanation generator at server/src/services/matching/explanation-generator.ts

### Match Explanation UI

- [ ] T138 [US8] Create match explanation component at app/src/components/matching/MatchExplanation.tsx
- [ ] T139 [US8] Add "Why this match?" button to card views at app/src/components/cards/WhyThisMatch.tsx
- [ ] T140 [US8] Create alignment factors display at app/src/components/matching/AlignmentFactors.tsx

**Checkpoint**: User Story 8 complete - Trust through explainability

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Quality, guardrails, and final validation

### Quality Guardrails

- [ ] T141 Implement visibility decay for inactive profiles at server/src/services/visibility/decay.ts
- [ ] T142 [P] Implement proof-weighted ranking at server/src/services/ranking/proof-weighted.ts
- [ ] T143 [P] Implement blind discovery toggle at app/src/components/discovery/BlindModeToggle.tsx
- [ ] T144 Implement blind mode service (de-emphasize pedigree) at server/src/services/blind-mode.ts

### UX Anxiety Audit

- [ ] T145 Audit all flows for visible state (no silent states)
- [ ] T146 [P] Audit all flows for clear next steps
- [ ] T147 [P] Audit all screens for 3-second rule compliance
- [ ] T148 Add loading states with context to all async operations

### Performance

- [ ] T149 Implement card loading optimization (<200ms target)
- [ ] T150 [P] Optimize swipe animation performance (60fps target)
- [ ] T151 [P] Add API response caching where appropriate

### Documentation

- [ ] T152 [P] Create onboarding documentation at docs/onboarding.md
- [ ] T153 [P] Create contributing guide at docs/contributing.md
- [ ] T154 [P] Create architecture documentation at docs/architecture.md

### MVP Validation

- [ ] T155 Run Job Portal Test: "Does this feel like discovery or paperwork?"
- [ ] T156 Validate all success criteria from spec.md
- [ ] T157 MVP Freeze: Lock scope, no new features

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-10)**: All depend on Foundational phase completion
  - US1 and US2 (both P1) can proceed in parallel
  - US3 depends on US1 + US2 (needs profiles AND internships)
  - US4 depends on US1 (needs profiles to discover)
  - US5 depends on US3 + US4 (needs interest/shortlist actions to track)
  - US6 depends on US3 + US4 (needs mutual interest for chat unlock)
  - US7 depends on US4 (needs shortlisted candidates)
  - US8 can start after US3 + US4 (needs discovery to show explanations)
- **Polish (Phase 11)**: Depends on all desired user stories being complete

### User Story Dependencies

```
US1 (Student Profile) ──┬──→ US3 (Student Discovery) ──┬──→ US5 (State Visibility)
                        │                              │
US2 (Recruiter Post) ───┘                              ├──→ US6 (Chat Unlock)
                        │                              │
                        └──→ US4 (Recruiter Discovery) ┼──→ US7 (Pipeline)
                                                       │
                                                       └──→ US8 (Explainability)
```

### Parallel Opportunities

- **Within Phase 2**: All design tokens (T010-T015) can run in parallel; all data models (T018-T024) can run in parallel
- **Within Phase 3**: Profile blocks (T054-T058) can run in parallel
- **Within Phase 4**: Internship blocks (T075-T079) can run in parallel
- **US1 + US2**: Can be developed in parallel by different developers
- **Once US1 + US2 complete**: US3, US4, US5, US6, US7, US8 can progress based on their dependencies

---

## Parallel Example: Phase 2 Design Tokens

```bash
# Launch all design token tasks together:
Task T010: "Define color tokens in design/tokens/colors.ts"
Task T011: "Define typography scale in design/tokens/typography.ts"
Task T012: "Define spacing scale in design/tokens/spacing.ts"
Task T013: "Define radius and shadow tokens in design/tokens/shadows.ts"
Task T014: "Define motion timing rules in design/tokens/motion.ts"
```

---

## Implementation Strategy

### MVP First (P1 Stories Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Student Profile)
4. Complete Phase 4: User Story 2 (Recruiter Posting)
5. **STOP and VALIDATE**: Both sides can create cards - core marketplace exists
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 + US2 → Test independently → Deploy (Two-sided MVP!)
3. Add US3 + US4 → Discovery enabled → Deploy
4. Add US5 → Anxiety eliminated → Deploy
5. Add US6 + US7 → Communication + Pipeline → Deploy
6. Add US8 → Trust through explainability → Deploy
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With 3 developers after Foundation complete:

- **Developer A**: US1 → US3 → US6
- **Developer B**: US2 → US4 → US7
- **Developer C**: Foundation polish → US5 → US8

---

## Summary

| Metric | Count |
|--------|-------|
| **Total Tasks** | 157 |
| **Phase 1 (Setup)** | 9 |
| **Phase 2 (Foundational)** | 37 |
| **User Story Tasks** | 96 |
| **Polish Tasks** | 15 |
| **Parallelizable Tasks** | 68 (marked [P]) |

### Tasks Per User Story

| Story | Priority | Tasks |
|-------|----------|-------|
| US1 - Student Profile | P1 | 24 |
| US2 - Recruiter Posting | P1 | 15 |
| US3 - Student Discovery | P2 | 9 |
| US4 - Recruiter Discovery | P2 | 9 |
| US5 - State Visibility | P2 | 10 |
| US6 - Chat Unlock | P3 | 11 |
| US7 - Pipeline | P3 | 9 |
| US8 - Explainability | P3 | 8 |

### MVP Scope (Suggested)

For fastest path to value, complete:
- Phase 1 + Phase 2 (Foundation)
- US1 + US2 (Both P1 - two-sided marketplace exists)
- US3 + US4 (Discovery enabled)

This delivers a functional discovery platform where students and recruiters can find each other.

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- **Job Portal Test**: If anything feels like paperwork, stop and redesign
