# Feature Specification: Human-First Talent Discovery Platform

**Feature Branch**: `001-talent-discovery-platform`  
**Created**: 2025-12-23  
**Status**: Draft  
**Input**: Product Specification Contract - Two-sided talent discovery system for internships

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Student Profile Creation (Priority: P1)

As a student, I want to build my professional identity once through a structured card-based system, so that I can express who I am without repetitive form-filling or document uploads.

**Why this priority**: Core platform value proposition—students must be able to create their identity before any other feature matters. This is the foundation upon which all discovery depends.

**Independent Test**: Can be fully tested by a new student signing up, completing their ProfileCard with identity snapshot, role intent, availability, and at least one skill proof. Delivers immediate value: a shareable, discoverable professional identity.

**Acceptance Scenarios**:

1. **Given** a new student user, **When** they complete the onboarding flow, **Then** they have a complete ProfileCard with identity snapshot, role intent, and availability visible in their profile
2. **Given** a student with a resume file, **When** they upload it during onboarding, **Then** the system auto-extracts structured data into their ProfileCard and prompts them to verify and enhance each section
3. **Given** a student editing their profile, **When** they add a skill claim, **Then** the system guides them to attach proof (project link, portfolio, demonstration) without shaming for missing evidence
4. **Given** a student viewing their profile, **When** they complete a section, **Then** they receive immediate feedback showing their profile strength and next improvement suggestions

---

### User Story 2 - Recruiter Internship Posting (Priority: P1)

As a recruiter, I want to create clear internship cards that explain the role, expectations, and outcomes, so that I attract aligned candidates without wading through irrelevant applications.

**Why this priority**: Equal foundation to student profiles—recruiters need to create opportunities before matching can occur. Two-sided marketplace requires both supply and demand.

**Independent Test**: Can be fully tested by a recruiter creating an InternshipCard with role clarity, company context, learning outcomes, duration, and compensation. Delivers immediate value: a discoverable opportunity ready for matching.

**Acceptance Scenarios**:

1. **Given** a recruiter creating a new internship, **When** they complete all required fields, **Then** the InternshipCard displays role clarity, company context, learning outcomes, practical expectations, duration, and compensation
2. **Given** a recruiter entering role description, **When** they use buzzwords without explanation, **Then** the system prompts them to clarify or expand with concrete details
3. **Given** a recruiter viewing their posted internship, **When** they check the card preview, **Then** it answers "Why does this role exist?" and "What will the intern learn?" within a 3-second scan

---

### User Story 3 - Student Discovery Mode (Priority: P2)

As a student, I want to swipe through internship opportunities in a high-velocity, low-commitment interface, so that I can quickly express interest in aligned roles without filling out applications.

**Why this priority**: Primary interaction model for students—enables the "discovery over paperwork" experience. Depends on P1 stories being complete for both sides.

**Independent Test**: Can be fully tested with a student account and at least 5 InternshipCards in the system. Student swipes through cards, expressing interest or passing, with intent recorded and daily limits enforced.

**Acceptance Scenarios**:

1. **Given** a student in discovery mode with available internships, **When** they swipe left on a card, **Then** the system records "not aligned" and shows the next opportunity
2. **Given** a student viewing an internship card, **When** they swipe right, **Then** the system records "interest" and the internship appears in their interested list
3. **Given** a student who wants to express strong interest, **When** they long-press or confirm on a card, **Then** additional friction captures their heightened intent
4. **Given** a student who has reached their daily swipe limit, **When** they try to continue swiping, **Then** they see a clear message explaining the limit and when it resets

---

### User Story 4 - Recruiter Candidate Discovery (Priority: P2)

As a recruiter, I want to discover student profiles through both swipe-based and list-based modes, so that I can efficiently find and evaluate potential candidates using proof over claims.

**Why this priority**: Core recruiter workflow—enables talent discovery with flexibility for different evaluation styles. Depends on student profiles existing.

**Independent Test**: Can be fully tested with a recruiter account and at least 10 ProfileCards. Recruiter can switch between swipe mode (high-velocity) and review mode (filterable list), shortlisting candidates in either.

**Acceptance Scenarios**:

1. **Given** a recruiter in discovery mode, **When** they view a ProfileCard, **Then** they see identity snapshot, role intent, skill proofs with evidence, and project references
2. **Given** a recruiter evaluating candidates, **When** they switch from swipe to review mode, **Then** they see the same candidates in a filterable, comparable list view
3. **Given** a recruiter viewing skill claims, **When** a skill has attached proof, **Then** the proof is prominently displayed and accessible with one tap
4. **Given** a recruiter shortlisting a candidate, **When** they add them to shortlist, **Then** the candidate's application state changes to "shortlisted" immediately

---

### User Story 5 - Application State Visibility (Priority: P2)

As a student, I want to see the exact state of every opportunity I've expressed interest in, so that I never wonder "what is happening?" or feel ghosted by the system.

**Why this priority**: Addresses Constitution Article I.3 (Anxiety Is a UX Bug)—students must always know their status. Core trust-building feature.

**Independent Test**: Can be fully tested by a student who has expressed interest in multiple internships. They can view a StatusCard for each showing current state, time in state, and possible next outcomes.

**Acceptance Scenarios**:

1. **Given** a student who expressed interest in an internship, **When** they view their applications, **Then** each shows exactly one of: discovered, viewed, shortlisted, contacted, interviewing, decided, or closed
2. **Given** a student viewing an application status, **When** they check the details, **Then** they see how long they've been in the current state
3. **Given** a student in any application state, **When** they view the StatusCard, **Then** they see the possible next outcomes and what actions (if any) they can take
4. **Given** an application that has been inactive for an extended period, **When** the student views it, **Then** the system surfaces this information proactively (silence is not neutral)

---

### User Story 6 - Mutual Interest Chat Unlock (Priority: P3)

As a student who has been shortlisted by a recruiter, I want chat to unlock automatically, so that we can communicate directly without cold messaging or waiting for external coordination.

**Why this priority**: Enables the next step after matching—but only after mutual interest is established. Follows strict chat unlock rules from the specification.

**Independent Test**: Can be fully tested with one student and one recruiter where student has expressed interest AND recruiter has shortlisted. Chat becomes available to both parties.

**Acceptance Scenarios**:

1. **Given** a student who expressed interest AND a recruiter who shortlisted them, **When** both conditions are met, **Then** chat is unlocked for both parties
2. **Given** only student interest (recruiter hasn't shortlisted), **When** the student tries to message, **Then** chat remains locked with clear explanation
3. **Given** an unlocked chat, **When** either party sends a message, **Then** the conversation is hiring-context only with structured prompts available
4. **Given** a chat with no activity for an extended period, **When** either party views it, **Then** the silence is surfaced as a visible status (not hidden)

---

### User Story 7 - Recruiter Pipeline Management (Priority: P3)

As a recruiter, I want to manage all candidates through explicit pipeline stages, so that I can track progress, make decisions confidently, and ensure no candidate is left in limbo.

**Why this priority**: Supports recruiter efficiency and ensures Constitution Article VI.3 (Silence Is Not Neutral) is enforced. Depends on earlier discovery and shortlisting stories.

**Independent Test**: Can be fully tested with a recruiter who has shortlisted candidates. They can move candidates through stages, and the system prevents hidden or ambiguous states.

**Acceptance Scenarios**:

1. **Given** a recruiter viewing their pipeline, **When** they see candidates, **Then** each candidate is in exactly one explicit state: discovered, viewed, shortlisted, contacted, interviewing, or decided
2. **Given** a recruiter moving a candidate to "decided", **When** they complete the action, **Then** the candidate receives notification and the loop is closed
3. **Given** candidates who have been in a stage too long, **When** the recruiter views the pipeline, **Then** the system highlights stale candidates and prompts action
4. **Given** a recruiter trying to leave a candidate in an ambiguous state, **When** they attempt to exit without decision, **Then** the system requires explicit state selection

---

### User Story 8 - Match Explainability (Priority: P3)

As a student or recruiter viewing a suggested match, I want to understand why this match was recommended in plain language, so that I can trust the system and make informed decisions.

**Why this priority**: Addresses Constitution Article VII.1 (Explainability Is Mandatory)—no black-box decisions allowed. Builds trust in the matching system.

**Independent Test**: Can be fully tested by viewing any match suggestion. The system displays plain-language explanation of match factors without opaque scores.

**Acceptance Scenarios**:

1. **Given** a student viewing a suggested internship, **When** they tap "why this match?", **Then** they see a plain-language explanation citing specific alignment factors
2. **Given** a recruiter viewing a suggested candidate, **When** they check match reasoning, **Then** they see skill overlap (proof-weighted), availability alignment, and behavioral signals
3. **Given** any match suggestion, **When** displayed, **Then** there are no opaque numerical scores or unexplained rankings
4. **Given** a match based on behavior history, **When** explained, **Then** the explanation cites actions and consistency, not labels or pedigree

---

### Edge Cases

- What happens when a student has no skill proofs attached? System guides them to add evidence without blocking profile completion or shaming them
- What happens when a recruiter posts an internship with vague requirements? System prompts for clarification before publishing, enforcing InternshipCard quality
- What happens when a match has no strong alignment factors? System shows the match with honest explanation of limited alignment rather than hiding it
- How does the system handle students who exhaust daily swipe limits? Clear messaging explains the limit, why it exists, and when it resets
- What happens when chat remains idle? Silence surfaces as visible status; after threshold period, both parties are prompted to close or continue
- How does the system handle a recruiter who never decides on shortlisted candidates? System surfaces stale candidates and sends reminders to close loops
- What happens when a student's application is rejected? Clear "closed" state with optional feedback path; no silent ghosting

## Requirements *(mandatory)*

### Functional Requirements

**Card System (Core)**
- **FR-001**: System MUST implement all primary entities as cards with mandatory properties: id, type, summary_view, expanded_view, state, and actions
- **FR-002**: System MUST support four card types: ProfileCard, InternshipCard, ProjectCard, and StatusCard
- **FR-003**: Cards MUST be skimmable (answer key question in 3 seconds), comparable, expandable, and visually consistent

**Student Experience**
- **FR-004**: System MUST allow students to build their identity once through structured ProfileCard creation
- **FR-005**: ProfileCard MUST contain: identity snapshot, role intent, availability, skill proofs (linked), project references, and editable metadata
- **FR-006**: ProfileCard MUST NOT contain: free-form long text blocks, redundant data fields, or required PDFs
- **FR-007**: System MUST support resume upload that auto-generates ProfileCard with extracted structured data requiring verification
- **FR-008**: System MUST guide students toward adding proof (projects, links, outcomes, demonstrations) for skill claims without shaming
- **FR-009**: System MUST provide swipe-based discovery mode with left (not aligned), right (interest), and strong interest (long press/confirm) gestures
- **FR-010**: System MUST enforce daily swipe limits in discovery mode

**Recruiter Experience**
- **FR-011**: System MUST allow recruiters to create InternshipCards with: role clarity, company context, learning outcomes, practical expectations, duration, and compensation
- **FR-012**: InternshipCard MUST NOT contain: buzzwords without explanation, copy-pasted job descriptions, or hidden requirements
- **FR-013**: System MUST provide both swipe-based (discovery) and list-based (review) modes for candidate evaluation
- **FR-014**: Review mode MUST be filterable and enable candidate comparison

**Application State System**
- **FR-015**: Every application MUST exist in exactly one state: discovered, viewed, shortlisted, contacted, interviewing, decided, or closed
- **FR-016**: System MUST NOT allow ambiguous or hidden application states
- **FR-017**: Students MUST always see: current state, time spent in state, and next possible outcomes for each application
- **FR-018**: System MUST surface inactive applications proactively—silence is not neutral

**Matching System**
- **FR-019**: Match suggestions MUST consider: skill overlap (proof-weighted), availability alignment, behavior history, intent strength, and responsiveness
- **FR-020**: All matches MUST be explainable in plain language—no opaque scoring
- **FR-021**: Matching MUST NOT use keyword-only ranking or college-first weighting
- **FR-022**: Matching MUST prioritize behavior (actions, consistency, follow-through) over labels, buzzwords, or pedigree signals

**Communication System**
- **FR-023**: Chat MUST unlock only when: student expresses interest AND recruiter shortlists
- **FR-024**: System MUST NOT allow cold messaging
- **FR-025**: Chat MUST be hiring-context only with structured prompts available
- **FR-026**: Chat silence MUST surface as visible status—no infinite idle states

**Design System**
- **FR-027**: Interface MUST use white or near-white backgrounds with high-contrast text
- **FR-028**: System MUST use limited accent colors, soft functional shadows only, and no decorative gradients
- **FR-029**: Every screen MUST answer within 3 seconds: Where am I? What matters most? What can I do next?
- **FR-030**: All editing MUST use predefined blocks maintaining layout integrity—no free-form layout control

**Error Handling & Trust**
- **FR-031**: All errors MUST explain what happened, suggest recovery, and preserve user trust
- **FR-032**: System MUST NOT fail silently
- **FR-033**: All actions (swipes, clicks, dismissals) MUST be reversible where reasonable

### Key Entities

- **ProfileCard**: Represents a student's professional identity. Contains identity snapshot (name, photo, headline), role intent (what they're seeking), availability, linked skill proofs, project references. State tracks profile completeness. Actions include edit, share, and view-as-recruiter.

- **InternshipCard**: Represents an opportunity posted by a recruiter. Contains role title, company context, learning outcomes, practical expectations, duration, compensation. State tracks active/paused/closed. Actions include edit, preview, view-applicants.

- **ProjectCard**: Represents a piece of demonstrated work attached to a profile. Contains project title, description, outcomes, links/media, skills demonstrated. Linked to ProfileCard as skill proof.

- **StatusCard**: Represents the state of a student-internship relationship. Contains current state (one of 7 mandatory states), timestamps, time-in-state, possible next outcomes. Visible to both student and recruiter with role-appropriate detail.

- **Match**: Represents a suggested pairing between ProfileCard and InternshipCard. Contains alignment factors (skill overlap, availability, behavior signals), plain-language explanation, confidence indicators. No opaque scores.

- **Chat**: Represents a communication channel between student and recruiter. Only exists when both interest AND shortlist conditions met. Contains messages, structured prompts, activity timestamps, silence indicators.

## Success Criteria *(mandatory)*

### Measurable Outcomes

**User Efficiency**
- **SC-001**: Students can create a complete ProfileCard (identity, intent, availability, 1+ skill proof) in under 10 minutes
- **SC-002**: Recruiters can create a complete InternshipCard in under 5 minutes
- **SC-003**: Recruiters can evaluate 20 candidates in discovery mode within 10 minutes
- **SC-004**: Any user can answer "Where am I? What matters? What can I do?" within 3 seconds on any screen

**Anxiety Reduction**
- **SC-005**: 100% of applications display one of the 7 mandatory states at all times (zero ambiguous states)
- **SC-006**: Students report knowing their application status without having to ask or search in 90%+ of cases
- **SC-007**: No student waits more than 14 days without a status update or loop closure

**Quality of Matches**
- **SC-008**: 80%+ of match explanations are rated "understandable" by users
- **SC-009**: Recruiters shortlist at least 1 in 10 suggested candidates (indicating relevance)
- **SC-010**: Students express interest in at least 1 in 15 suggested internships (indicating alignment)

**Trust & Loop Closure**
- **SC-011**: 95%+ of applications reach a terminal state (decided/closed) within 30 days
- **SC-012**: Zero cold messages sent through the platform (chat unlock rules enforced)
- **SC-013**: 90%+ of users can reverse an accidental swipe or action when needed

**Job Portal Test**
- **SC-014**: In user testing, 80%+ of participants describe the experience as "discovery" rather than "paperwork"
- **SC-015**: Task completion rate for primary user journeys exceeds 85% on first attempt

## Assumptions

- Students are primarily seeking internship opportunities (not full-time roles initially)
- Platform launches with internships first; job postings and other opportunity types are future extensions
- Daily swipe limits default to a reasonable number (e.g., 50) to encourage quality over quantity—exact number to be determined through testing
- "Extended period" for chat silence and stale applications defaults to 7 days before surfacing warnings, 14 days before stronger prompts
- Resume parsing uses structured extraction; accuracy may vary and always requires user verification
- Authentication method will follow standard patterns (email/password with option for social login)—specifics to be determined in planning phase
- Design tokens (colors, typography, spacing) will be defined as a dependency before UI implementation
