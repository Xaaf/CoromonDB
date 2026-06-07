<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CoromonDB

Next.js 16 (App Router) + Supabase wiki for the game Coromon. Deployed on Vercel.

## Setup

```bash
npm install
```

Required env vars (see `.env`):
- `NEXT_PUBLIC_BASE_URL` — `http://localhost:3000` in dev
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` — anon key

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (flat config) |
| `npm run start` | Start production |

No tests exist.

## Branches

- `stable` — deployed to production
- `dev` — latest work, may be unstable

## Architecture

- `app/` — App Router pages, API routes, components organized by feature
- `lib/` — Supabase client, types, server-side data utils
- Pages are async server components by default; `"use client"` only used where interactivity is needed
- Data fetched via `fetch` to `NEXT_PUBLIC_BASE_URL/api/*` or direct imports from `lib/utils/`
- Supabase tables: `coromon`, `traits`, `coromon_traits`; also an RPC `get_random`
- Caching via `unstable_cache` with 24h revalidate
- Images stored in Supabase storage bucket `coromon_icons`
- Tailwind v4, `@theme` custom CSS properties, dark theme
- Path alias `@/` → project root

## Known issues / gotchas

- `app/components/coromon/CoromonDetail.tsx:101` — `TraitGrid` slug is hardcoded to `"cubzero"` (bug)
- `app/components/traits/TraitDetail.tsx:101` — chance percentage hardcoded as `"x%"`
- `app/components/coromon/details/SkillsList.tsx` — both skill sections are placeholder stubs
- `any` types used widely instead of the defined `Coromon`/`Trait` interfaces
- Coromon/API detail pages use `fetch` to self-API at build/dev time; requires `NEXT_PUBLIC_BASE_URL` to be reachable
- Route types auto-generated at `.next/dev/types/routes.d.ts`
