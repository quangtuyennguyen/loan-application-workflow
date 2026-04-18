# Loan Application Workflow

A minimal full-stack loan application workflow built with Next.js (App Router), a shared React component library, and an Express REST API — all managed as a Turborepo monorepo.

---

## Summary

### Main Application

| Package | Path | Description |
|---------|------|-------------|
| `platform` | `apps/platform` | Next.js 16 loan application UI — the primary consumer app |

### Shared Libraries

| Package | Path | Description |
|---------|------|-------------|
| `@tuyennq/ui` | `packages/ui` | Foundation UI component library shared by `platform` |

### Configuration Packages

| Package | Path | Description |
|---------|------|-------------|
| `@tuyennq/eslint-config` | `packages/eslint-config` | Shared ESLint flat configs (`base`, `react-internal`, `next`) |
| `@tuyennq/typescript-config` | `packages/typescript-config` | Shared `tsconfig.json` bases used across all packages |
| `@tuyennq/storybook-config` | `packages/storybook-config` | Shared Storybook preview config (`defaultParameters`, story sort) |

### Backend

| Package | Path | Description |
|---------|------|-------------|
| `server` | `apps/server` | Express REST API — handles loan application submissions and retrieval |

---

## Setup

**Prerequisites:** Node.js 20+, pnpm 10.33.0 ([install via Corepack](https://pnpm.io/installation#using-corepack))

```sh
# Install dependencies
pnpm install

# Copy environment variables
cp apps/server/.env.example apps/server/.env
cp apps/platform/.env.local.example apps/platform/.env.local

# Start all dev servers (Next.js :3000, Express :3001)
pnpm dev

# Start all Storybook instances (UI :6005, Platform :6006)
pnpm storybook
```

Open [http://localhost:3000](http://localhost:3000) to use the loan application form.

---

## Key Tradeoffs & Improvements

### Frontend

- **Step-based wizard** — the current flow spans two separate pages (form → result); a step-based wizard with a shared progress indicator and back/next navigation would make the submit → result flow feel more intentional and keep users oriented throughout.
- **Authentication** — would add auth to the Next.js app, then use `iron-session` for encrypted cookie sessions backed by DynamoDB as the session store.
- **Accessibility** — a full a11y audit has not been done; would review the entire app using Storybook's built-in `addon-a11y`, which flags issues per component during development. As the app scales with more complex components, would adopt Base UI or Radix UI to get correct keyboard interaction and a11y semantics by default.
- **No unit tests** — current Storybook tests cover both visual and interaction scenarios, which is sufficient for now. Unit tests will be added as more logic, helper functions, and custom hooks are introduced.
- **Error handling helper** — the current `'error' in result` pattern could be extracted into an `isApiError()` type guard for better readability and to centralize the error shape assumption across the codebase.
- **No Playwright E2E tests** — would add Playwright for real integration testing across the full user flow.
- **No CI/CD pipeline** — would set up a GitHub Actions workflow that: runs lint, type-check, and Storybook tests on every PR; uploads coverage to Codecov for visibility; and auto-deploys to AWS on merge to `main` using infrastructure as code (e.g. SST).
- **No visual regression gating** — would set up Chromatic for visual regression testing and require it to pass as a branch-protection check before a PR can be merged.
- **Fetch wrapper** — when authentication is added, a centralized fetch wrapper should manage tokens, error handling, and response parsing to avoid scattering that logic across server actions and functions.
- **Webpack instead of Turbopack** — `next dev` currently uses `--webpack` because Turbopack lacks complete support for monorepo (Turborepo) setups; should switch to Turbopack (the default) once stable — it replaces Webpack entirely as the bundler, with significantly faster startup, HMR, and transforms across the full dev pipeline.
- **Icon management** — pre-converting SVGs to typed React components in a `packages/shared-assets` package (organized by category, using `currentColor`) eliminates SVG loaders, enables tree-shaking, and keeps icons consistent across all apps.

### Backend

- **In-memory storage** — data is lost on restart and can't scale across processes. Would replace the `Map` with MongoDB + Mongoose or PostgreSQL for a relational approach with migrations.
- **No auth** — would add authentication to protect endpoints.
- **No unit tests** — not added for now; will be added as the service layer grows.
- **No rate limiting or logging** — would add `express-rate-limit` on `POST` and a structured logging class that writes to file for observability.
- **No API documentation** — would build a pipeline or script to auto-generate a Swagger UI from OpenAPI spec.
