# NextTern

**Human-First Talent Discovery Platform**

A two-sided talent discovery system for internships, built on the principle that **discovery beats paperwork**.

## Vision

NextTern exists to represent **people**, not resumes. We connect students seeking internships with recruiters seeking talent through a card-based, intent-driven interface that prioritizes:

- **Clarity** over complexity
- **Proof** over claims
- **Discovery** over forms
- **Transparency** over silence

## Core Principles

1. **Humans Over Documents** — Build identity once, never fill forms repeatedly
2. **Effort Converts to Signal** — Every action produces visibility, clarity, or opportunity
3. **Anxiety Is a UX Bug** — Users always know their status and next steps
4. **Everything Is a Card** — ProfileCards, InternshipCards, ProjectCards, StatusCards

## For Students

- Build your professional identity once through structured ProfileCards
- Express skills with proof (projects, links, outcomes)
- Discover internships through swipe-based exploration
- Always know your application status—no ghosting, no silence

## For Recruiters

- Post clear internship cards with real expectations and outcomes
- Discover talent through proof-weighted matching
- Manage candidates through explicit pipeline stages
- Close loops—every candidate gets a decision

## Project Structure

```
app/                    # Frontend (React + TypeScript)
server/                 # Backend (Node.js + TypeScript)
design/                 # Design tokens and system
shared/                 # Shared types across frontend/backend
docs/                   # Documentation
specs/                  # Feature specifications
```

## Tech Stack

- **Frontend**: React 18+, TypeScript, TailwindCSS
- **Backend**: Node.js, Express/Fastify, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **Real-time**: WebSocket for chat

## Getting Started

```bash
# Install dependencies
npm install

# Start development
npm run dev
```

## Documentation

- [Constitution](docs/spec/constitution.md) — Core principles (non-negotiable)
- [Specification](docs/spec/specify.md) — Product requirements
- [Implementation Plan](docs/spec/plan.md) — Technical approach
- [Tasks](docs/spec/tasks.md) — Execution checklist

## License

MIT

---

*"Does this feel like paperwork or discovery?" — If paperwork, redesign.*
