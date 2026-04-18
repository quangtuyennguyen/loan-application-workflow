# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This repo uses **pnpm 10.33.0** exclusively. Do not use npm or yarn.

## Commands

Run from the repo root unless noted otherwise:

```sh
pnpm dev                          # Start all apps/packages in dev mode
pnpm build                        # Build all packages (topological order via Turborepo)
pnpm lint                         # ESLint across all packages
pnpm format                       # Prettier format all TS/TSX/MD files
pnpm check-types                  # TypeScript type checking across all packages
pnpm storybook                    # Start all Storybook instances

# Filter to a specific package
pnpm exec turbo dev --filter=platform
pnpm exec turbo storybook --filter=@tuyennq/ui

```

**Ports:**
- `apps/platform` Next.js app: `3000`
- `apps/server` Express API: `3001`
- `packages/ui` Storybook: `6005`
- `apps/platform` Storybook: `6006`

## Architecture

**Turborepo monorepo with pnpm workspaces** (`apps/*`, `packages/*`).

### Packages

| Package | Path | Purpose |
|---|---|---|
| `@tuyennq/ui` | `packages/ui/` | React component library — source of truth for all components |
| `@tuyennq/eslint-config` | `packages/eslint-config/` | Shared ESLint flat configs (`base`, `react-internal`, `next`) |
| `@tuyennq/typescript-config` | `packages/typescript-config/` | Shared `tsconfig.json` bases |
| `@tuyennq/storybook-config` | `packages/storybook-config/` | Shared Storybook preview config (`defaultParameters`, story sort) |

### Apps

| App | Path | Purpose |
|---|---|---|
| `platform` | `apps/platform/` | Next.js consumer app; imports from `@tuyennq/ui` or uses its own components from `src/components/` |
| `server` | `apps/server/` | Express REST API for loan applications (`/api/v1/applications`) |

### Component Library (`packages/ui`)

- Components live in `src/components/<name>/` with co-located `.stories.tsx` files.
- Use **`class-variance-authority` (CVA)** for variant-based styling (see `Button` for the pattern).
- Use the `cn()` utility from `src/lib/utils.ts` (combines `clsx` + `tailwind-merge`) for conditional classes.
- Primitives will be built on **`@base-ui/react`** for complex components or those requiring full a11y semantics (not yet in use).
- Tailwind CSS 4 is configured via `@import "tailwindcss"` in `src/index.css`.
- Path alias `@/*` resolves to `./src/*` within this package.
- Exports are direct source file paths: `"./src/*.tsx"` (no separate build step for the package).

### Storybook

Two separate Storybook instances:
- `packages/ui`: `@storybook/react-vite` — stories for the component library, with Tailwind via Vite plugin.
- `apps/platform`: `@storybook/nextjs-vite` — platform-level stories; includes addon-a11y and addon-vitest.

### Next.js (`apps/platform`)

> **Important:** This project targets a recent Next.js version that may differ from training data. Before writing any Next.js code, check `node_modules/next/dist/docs/` for breaking changes and heed deprecation notices.

Path alias `@/*` resolves to `./` (the app root).

### Shared Tooling

- **ESLint 9+ flat config** format throughout. Configs in `packages/eslint-config/` are consumed as `eslint.config.mjs` in each package/app.
- **TypeScript** strict mode, `NodeNext` module resolution in base config; React JSX via `react-library.json`.
- Turborepo task graph: `build` and `lint` are topologically ordered (`^build`, `^lint`). `dev` is persistent with caching disabled.
