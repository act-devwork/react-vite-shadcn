# Frameflow AI Video Studio

Production-minded frontend base for an internal AI video generation workspace.

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when connecting a backend.

## Commands

- `npm run dev` — local development
- `npm run build` — type-check and production build
- `npm run lint` — ESLint
- `npm run preview` — preview the production build

## Architecture

Shared app shell and primitives live in `components`, while domain behavior is grouped in `features`. API access, global state, routes, types, constants, and utilities stay in their dedicated top-level folders.
