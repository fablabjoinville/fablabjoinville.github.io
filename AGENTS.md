# Instructions for AI agents

Website of the Fab Lab Joinville: Astro 7 static site, React islands, deployed to GitHub Pages.
Read `README.md` for the full structure. This file lists what agents must follow.

## Commands

- `npm run dev` — dev server (http://localhost:4321)
- Before finishing any change run: `npm run lint && npm run check && npm run build && npm run parity`
- Never run `git push --force` or change repo/Pages settings unless the user asks.
- Do not commit unless asked. Commit messages end with the attribution line given in the session.

## Language and content

- All site copy is **Brazilian Portuguese**. Code, comments and commit messages are English.
- Site-wide facts (menu, address, hours, e-mail, social, links) live only in `src/data/site.ts`. Never hard-code them in components.
- Page text lives in `src/content/` (Markdown/YAML). YAML items need a unique `id`.
- Every image needs a meaningful pt-BR `alt`. Images go in `src/assets/`, referenced relative to the content file.
- Text migrated from the old site must stay verbatim. If you intentionally rewrite or drop it, record it in
  `scripts/migration/parity-exclusions/<page>.json`, otherwise `npm run parity` fails.
- Dead links from the old site are dropped with a `TODO(old-site)` comment; do not re-add them.

## Design system (enforced by `npm run lint`)

- Brand rules: `.claude/skills/fablab-joinville-design/readme.md`. Reference snapshot: `design-system/` (read-only, do not edit).
- Use tokens only: `var(--…)`. No raw hex colours or `NNpx` strings in `.astro`/`.tsx`.
- Import primitives only from `@/components/ui` and sections from `@/components/sections`; never component internals.
- At most **one orange (accent) button per view**. No gradients, blur or soft shadows; use the hard offset shadows.
- Headings are JetBrains Mono uppercase (set via CSS, write sentence case); body is IBM Plex Sans.

## Code conventions

- Prefer static `.astro`/TSX with no client JS. Only `src/components/islands/` ships JS, wrapped with `withIslandBoundary`, hydrated with `client:*`. Prefer native HTML (`<details>`, `<dialog>`) over new islands.
- Responsive images via `img()` from `src/lib/images.ts` / `astro:assets`; never hot-link external images.
- Click tracking: add `data-track="<id>"` (hyphenated) to CTAs and outbound links.
- Respect `prefers-reduced-motion`; keep keyboard focus visible.
- No emoji in the UI. Match the surrounding code style and comment density.

## Sentry and deploy

- Sentry is client-only (`sentry.client.config.ts`). Never commit tokens; `SENTRY_AUTH_TOKEN` is a GitHub secret.
- Source maps must never be published (`dist/` must contain no `*.map`).
- Pushing to `main` deploys via `.github/workflows/deploy.yml`.
- `/lab/*`, `/design-system` and `/sentry-test` are noindex, internal pages (excluded from sitemap and search).
