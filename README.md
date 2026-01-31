# NextTern

**Human-First Talent Discovery Platform**

A two-sided talent discovery system for internships, built on the principle that **discovery beats paperwork**.

> "Review humans, not resumes."

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
app/                    # Web Frontend (React + Vite + TypeScript)
mobile/                 # Mobile App (React Native + Expo)
server/                 # Backend API (Node.js + Express + TypeScript)
design/                 # Design tokens and system
shared/                 # Shared types across frontend/backend
docs/                   # Documentation
specs/                  # Feature specifications
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Web Frontend** | React 18, TypeScript, Vite, TailwindCSS |
| **Mobile App** | React Native, Expo, NativeWind (Tailwind) |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL, Prisma ORM |
| **Real-time** | WebSocket for chat |
| **Auth** | Magic Link (passwordless) |

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Eggshell White | `#FDFBF7` | Primary background |
| Deep Blue | `#0F172A` | Primary text, buttons |
| Slate Blue | `#334155` | Secondary text |
| Steel Gray | `#475569` | Muted text |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (for production) or use Mock Mode for testing
- Expo Go app (for mobile testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nexttern.git
cd nexttern

# Install dependencies for all packages
npm install
cd app && npm install
cd ../server && npm install
cd ../mobile && npm install
```

### Running the Backend

```bash
cd server

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

Server runs on `http://localhost:3001`

### Running the Web App

```bash
cd app
npm run dev
```

Web app runs on `http://localhost:5173`

### Running the Mobile App

```bash
cd mobile
npx expo start --clear
```

- Press `w` for web
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan QR code with Expo Go for physical device

### Mock Mode (Testing without Backend)

The mobile app includes a **Mock Mode** for testing without running the backend:

1. In `mobile/src/services/api.ts`, ensure `MOCK_MODE = true`
2. Run the mobile app
3. Login shortcuts:
   - Type **"student"** → instant login as Student
   - Type **"recruiter"** → instant login as Recruiter

## API Endpoints

### Authentication (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/request` | Request magic link |
| POST | `/api/v1/auth/verify` | Verify magic link token |
| POST | `/api/v1/auth/demo-login` | Demo login (dev only) |
| GET | `/api/v1/auth/me` | Get current user |
| POST | `/api/v1/auth/logout` | Logout |

### Protected Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Health check |
| * | `/api/v1/shortlist/*` | Shortlist management |
| * | `/api/v1/interest/*` | Interest/matching |
| * | `/api/v1/matches/*` | Match management |
| * | `/api/v1/chat/*` | Chat/messaging |
| * | `/api/v1/pipeline/*` | Recruiter pipeline |

## Documentation

- [Constitution](docs/spec/constitution.md) — Core principles (non-negotiable)
- [Specification](docs/spec/specify.md) — Product requirements
- [Implementation Plan](docs/spec/plan.md) — Technical approach
- [Tasks](docs/spec/tasks.md) — Execution checklist

## Scripts

| Package | Command | Description |
|---------|---------|-------------|
| server | `npm run dev` | Start dev server with hot reload |
| server | `npm run db:generate` | Generate Prisma client |
| server | `npm run db:migrate` | Run database migrations |
| app | `npm run dev` | Start Vite dev server |
| app | `npm run build` | Build for production |
| mobile | `npx expo start` | Start Expo dev server |

## License

MIT

---

*"Does this feel like paperwork or discovery?" — If paperwork, redesign.*
