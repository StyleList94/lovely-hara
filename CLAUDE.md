# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev           # dev server
bun run build         # production build (Cloudflare Workers)
bun run preview       # build + wrangler local preview
bun run deploy        # build + deploy to Cloudflare
bun run lint          # eslint
bun run test          # vitest run (all tests)
bun vitest run src/features/color-picker/ui.test.tsx  # single test
```

## Architecture

Astro 5 + React 19 + Tailwind CSS 4 on Cloudflare Workers.

**Feature-Sliced Design (FSD)** structure:

- `src/features/` — isolated feature modules, each with `index.ts` barrel export as public API
- `src/shared/` — shared UI, lib, styles
- `src/pages/`, `src/layouts/`, `src/actions/`, `src/middleware.ts` — Astro fixed locations

### Layer Rules

- `shared/` must never import from `features/` (no upward references)
- No cross-imports between features
- External consumers must use public API (`index.ts`), never internal files
- Relative paths within the same layer, `@/` absolute paths across layers

### Feature Structure

```text
feature-name/
├── index.ts        # Public API: export { default as ComponentName } from './ui'
├── ui.tsx          # Main component (default export)
├── ui.test.tsx     # Colocated test
└── types.ts        # Types (optional)
```

Exception: `blog-feed/` and `play-ball/` use `index.astro` as entry point (Astro hybrid rendering features).

### Astro + React Pattern

- React components use `client:only="react"` (UI library does not support SSR)
- Components from `@stylelist94/nine-beauty-actress` must share the same React tree — wrap each feature as a single React component

## Conventions

- **Named exports only** in public API (`export { default as X } from './ui'`). `export { default }` is banned by ESLint `no-restricted-exports`
- **bun** as package manager (not npm/npx)
- **ESLint v9** flat config (`eslint.config.mjs`), self-excluded via globalIgnores — must stay in globalIgnores or `eslint-plugin-import` fails to parse it
- **Prettier** with `prettier-plugin-astro`
- **Husky** + **lint-staged** pre-commit hook
- `import/prefer-default-export: off`
