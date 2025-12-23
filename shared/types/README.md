# Shared Types

This directory contains TypeScript types shared between frontend and backend.

## Contents

- `card.ts` — Base card interface
- `profile-card.ts` — ProfileCard schema
- `internship-card.ts` — InternshipCard schema
- `project-card.ts` — ProjectCard schema
- `status-card.ts` — StatusCard schema
- `application-state.ts` — Application state enum
- `user.ts` — User and role types
- `index.ts` — Re-exports all types

## Usage

```typescript
import { Card, ProfileCard, ApplicationState } from '@nexttern/shared';
```
