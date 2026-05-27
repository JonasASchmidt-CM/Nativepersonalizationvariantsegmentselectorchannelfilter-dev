# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install     # Install dependencies
pnpm dev         # Start dev server (Vite)
pnpm build       # Production build → dist/
```

No test runner is configured. The app is deployed to GitHub Pages via CI on push to `main`.

## Architecture

This is a **Figma Make** prototype — a single-page React + Tailwind + Vite app demonstrating a UX variant for CoreMedia Content Studio's Native Personalization feature (segment/profile filtering by channel).

**Entry point:** `src/main.tsx` → `src/app/App.tsx`

**`App.tsx`** owns all feature-flag state (8 boolean toggles) and renders two things:
- `TagFilterVariant1` — the main segment-selector dropdown component (the thing being prototyped)
- `TweaksMenu` — a floating panel that exposes all the boolean toggles so the design variant can be explored interactively

**`TagFilterVariant1.tsx`** (`src/app/components/`) is the core prototype component (~33KB). It contains its own mock data (`mockTags`, `mockSegments`) with channels (tags) and segments/profiles. Feature flags passed as props control visibility of channel chips, sticky channels, profile counts, match highlighting, etc.

**`src/app/components/ui/`** — shadcn/ui component library (Radix UI primitives + Tailwind). Treat these as read-only primitives; do not modify them.

**`src/app/components/figma/`** — `ImageWithFallback.tsx`, a helper for Figma-exported image assets.

**`src/imports/`** — Figma Make import artifacts (not used at runtime, reference only).

**Path alias:** `@` maps to `src/`.

**Vite config** registers a custom `figma:asset/` module resolver that maps `figma:asset/<filename>` imports to `src/assets/<filename>`. Keep this resolver in place — it is required by Figma Make.

## Deployment

GitHub Actions (`.github/workflows/`) builds with pnpm and deploys to GitHub Pages. The `base` in `vite.config.ts` is set to `/Nativepersonalizationvariantsegmentselectorchannelfilter-dev/` — this must stay in sync with the Pages URL.
