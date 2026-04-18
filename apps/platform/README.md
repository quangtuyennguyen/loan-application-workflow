# Platform

Next.js (App Router) loan application UI — the primary consumer app in this monorepo.

## Key Technologies

| | |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Styling** | Tailwind CSS 4 |
| **Component library** | `@tuyennq/ui` (shared) + `src/components/` (app-level) |
| **Server state** | TanStack Query (React Query) |
| **Forms** | React Hook Form + Zod |
| **API mocking** | Mock Service Worker (MSW v2) |
| **Testing** | Storybook interaction tests (addon-vitest + addon-a11y) |

## Directory Structure

```
apps/platform/
├── app/                        # Next.js App Router pages and layouts
│   ├── error.tsx               # Global error boundary
│   ├── not-found.tsx           # Global 404 page
│   ├── layout.tsx              # Root layout (Providers, fonts)
│   ├── globals.css             # Tailwind + design tokens
│   └── loan-application/
│       ├── page.tsx            # Form page (/loan-application)
│       └── [id]/page.tsx       # Result page (/loan-application/:id)
├── src/
│   ├── components/             # App-level shared components (e.g. Provider, form fields)
│   ├── lib/                    # Shared config/utilities (e.g. API_BASE_URL)
│   └── modules/
│       └── loanApplication/    # Feature module
│           ├── components/     # LoanApplicationForm, LoanApplicationResult
│           ├── server/         # Server actions (fetch to Express API)
│           ├── model.ts        # Types: LoanApplicationInput, LoanApplicationResponse, ApiError
│           ├── loanApplicationQueryKeys.ts
│           ├── useLoanApplicationQuery.ts
│           └── useSubmitLoanApplicationMutation.ts
└── mocks/                      # MSW handlers and fixture responses
```

## Getting Started

```sh
# From the repo root
pnpm dev                        # Starts Next.js on :3000 and Express API on :3001
pnpm storybook                  # Starts platform Storybook on :6006
```

See the root [README](../../README.md) for full setup instructions.

## Environment Variables

Copy `.env.local.example` to `.env.local`:

```sh
cp .env.local.example .env.local
```

| Variable | Default | Description |
|---|---|---|
| `API_URL` | `http://localhost:3001` | Base URL for the Express REST API |
