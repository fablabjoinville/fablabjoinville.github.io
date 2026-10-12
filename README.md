# Fab Lab Joinville — website

Source of **[fablabjoinville.github.io](https://fablabjoinville.github.io)**, the public website of the
Fab Lab Joinville (future domain: www.fablabjoinville.com.br).

Static site built with [Astro](https://astro.build) + React islands, styled with the
**Fab Lab Joinville Design System** (from Claude Design), deployed to GitHub Pages and monitored
with Sentry. Content is in Brazilian Portuguese and lives in Markdown/YAML files under
`src/content/`.

> The old Docusaurus wiki moved to [fablabjoinville/wiki](https://github.com/fablabjoinville/wiki)
> (wiki.fablabjoinville.com.br).

## Quick start

Requirements: **Node 24** (see `.nvmrc`; Astro needs ≥ 22.12) and npm.

```sh
npm install
npm run dev        # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build to `dist/` (also builds the Pagefind search index) |
| `npm run preview` | Serves `dist/` locally (production-like, use it to test search and Sentry) |
| `npm run lint` | ESLint, including the design-system adherence rules (0 warnings allowed) |
| `npm run check` | Astro/TypeScript type check |
| `npm run parity` | After a build: checks that every text from the old site is still on the new pages |

Before pushing, run `npm run lint && npm run check && npm run build && npm run parity`.

> **Search in dev:** the search box reads the Pagefind index from the last `npm run build`.
> Run a build after changing content if you want search results in `npm run dev`.

## Project structure

```
.
├── astro.config.mjs          # Integrations: React, sitemap, Partytown, Pagefind, Sentry; redirects
├── sentry.client.config.ts   # Sentry browser SDK (errors, tracing, replay, logs, metrics)
├── eslint.config.js          # Lint + design-system adherence rules
├── .github/workflows/deploy.yml  # Build & deploy to GitHub Pages (push, manual, daily cron)
├── design-system/            # Read-only snapshot of the Claude Design project (reference)
├── public/                   # Copied as-is: favicon, og-default.png, robots.txt
├── scripts/migration/        # Old-site migration data and the parity checker
└── src/
    ├── pages/                # One file per route (see "Pages")
    ├── content/              # Site content (Markdown + YAML) — edit text here
    ├── content.config.ts     # Content collections and their schemas
    ├── data/site.ts          # Site-wide facts: nav, contact, address, hours, social, links
    ├── assets/               # Images (optimized at build time)
    │   ├── brand/            #   Logos (marca-*, simbolo-*), app icon
    │   └── old-site/<page>/  #   Photos migrated from the old site
    ├── components/
    │   ├── ui/               # Design-system primitives (Button, Card, Icon, Tabs, Dialog…)
    │   ├── sections/         # Page building blocks (PhotoHero, Section, PageHeader, QaList…)
    │   ├── layout/           # BaseLayout, Seo, SiteHeader, SiteFooter
    │   ├── islands/          # The only components that run JS in the browser
    │   └── lab/              # Temporary design experiments (used by /lab pages)
    ├── styles/               # Design tokens (tokens/*.css) + global.css
    ├── lib/                  # images.ts (responsive images), content-guard.ts
    ├── loaders/              # Content loaders (Instagram feed via Behold, markdown fields)
    └── scripts/track.ts      # Click tracking (data-track → Sentry metrics)
```

### Pages

| Route | File | Content |
|---|---|---|
| `/` | `src/pages/index.astro` | `content/pages/home.md`, Instagram feed |
| `/sobre` | `src/pages/sobre.astro` | `pages/sobre.md`, `team.yaml`, `sponsors.yaml` |
| `/faca-parte` | `src/pages/faca-parte.astro` | `pages/faca-parte.md`, `memberships.yaml`, `benefits.yaml` |
| `/estrutura` | `src/pages/estrutura.astro` | `pages/estrutura.md`, `resources.yaml` |
| `/cultura` (Fab Charter) | `src/pages/cultura.astro` | `pages/cultura.md`, `charter.yaml` |
| `/portfolio` | `src/pages/portfolio.astro` | `pages/portfolio.md`, `projects/*.md` |
| `/lerobot` | `src/pages/lerobot.astro` | `pages/lerobot.md`, `lerobot-videos.yaml` |
| `/faq` | `src/pages/faq.astro` | `pages/faq.md`, `faq.yaml` |
| `/404` | `src/pages/404.astro` | — |

Internal/noindex pages (excluded from the sitemap and search): `/design-system` (preview of every
component), `/sentry-test` (Sentry checks), `/lab/*` (temporary design alternatives).
Redirects for old URLs (`/home`, `/faça-parte`) are configured in `astro.config.mjs`.

## Editing content

Most changes don't need code:

- **Text of a page** → `src/content/pages/<page>.md` (title, description, lead) or the page's YAML file.
- **Contact, address, opening hours, social links, menu** → `src/data/site.ts`
  (used by the header, footer, hero, contact map and SEO/JSON-LD).
- **Team, sponsors, machines, memberships, FAQ, Fab Charter** → the matching `src/content/*.yaml`.
- **Portfolio projects** → one Markdown file per project in `src/content/projects/`.
- **Images** → put the file in `src/assets/...` and reference it with a path **relative to the YAML/MD
  file** (e.g. `../assets/old-site/sobre/foto.jpg`). Always write a pt-BR `alt` text.

Rules that the build enforces:

- Every YAML item needs a unique `id`.
- Expected item counts are checked by `src/lib/content-guard.ts` (`CONTENT_GUARD=strict` in CI) —
  update the numbers there when you add/remove team members, projects, etc.
- If you intentionally remove or rewrite text that came from the old site, add it to
  `scripts/migration/parity-exclusions/<page>.json` with the reason, or `npm run parity` fails.

## Design system

The look comes from the **Fab Lab Joinville Design System** (Claude Design project
`83fd60d9-c5e1-4e38-ab51-3a3a33961db3`). A snapshot is kept in `design-system/`, and the brand
rules are summarized in `.claude/skills/fablab-joinville-design/readme.md`.

- **Tokens** (`src/styles/tokens/*.css`): always use `var(--…)` — navy `--brand-primary`,
  laser-orange `--brand-accent`, `--space-*`, `--fs-*`, `--shadow-offset*`, etc.
- **Primitives**: import only from `@/components/ui` (e.g. `import { Button } from '@/components/ui'`).
- **Sections**: import from `@/components/sections`.
- Brand rules in short: JetBrains Mono uppercase headings, IBM Plex Sans body, `// LABEL` mono
  eyebrows, 2px navy borders, hard offset shadows (no blur), flat backgrounds (no gradients),
  **at most one orange button per view**.

`npm run lint` enforces this: no raw hex colours or `px` strings in components, only
valid props/variants for design-system components, and no imports of component internals.

### Interactivity (islands)

Pages render to static HTML. Only components in `src/components/islands/` ship JavaScript
(mobile menu, search, carousel, video facades), hydrated with `client:*` directives and wrapped
in `withIslandBoundary` so React errors are reported to Sentry. Prefer CSS/native elements
(`<details>`, `<dialog>`) before adding a new island.

## Integrations

- **Sitemap** — `@astrojs/sitemap`, generated at build (`/sitemap-index.xml`).
- **Search** — Pagefind, indexed at build; `<main data-pagefind-body>` limits what is indexed.
- **Partytown** — installed for future third-party scripts (e.g. analytics); none are used yet.
- **Instagram feed** — fetched at build time from Behold (`src/loaders/behold.ts`). The daily
  scheduled deploy keeps it fresh. In CI a failed fetch fails the build instead of publishing an
  empty feed.
- **Sentry** — `@sentry/astro` (client only; the site is static). Config in
  `sentry.client.config.ts`; project `fab-lab-joinville/fablabjoinville-website`.
  Source maps are uploaded in CI (`SENTRY_AUTH_TOKEN` repository secret) and deleted from `dist/`.
  Use `/sentry-test` on a build/preview to send a test error, log and metric.
  For local builds with source-map upload, put the token in `.env.sentry-build-plugin` (git-ignored).

## Deploy

Pushing to `main` deploys automatically through `.github/workflows/deploy.yml`
(`withastro/action` → `actions/deploy-pages`). The workflow also runs daily (Instagram refresh)
and can be started manually from the Actions tab. GitHub disables scheduled workflows after
60 days without commits — re-enable it in the Actions tab if that happens. The scheduled run
sends a check-in to the Sentry cron monitor `site-daily-rebuild`; create that monitor in Sentry
(daily schedule) to get an alert when the run stops.

Repository settings: Pages source = **GitHub Actions**; secret `SENTRY_AUTH_TOKEN`.

### Custom domain (pending)

To serve www.fablabjoinville.com.br: point the `www` DNS record (Cloudflare) to
`fablabjoinville.github.io`, set the custom domain in the repository Pages settings, and change
`site` in `astro.config.mjs` and `url` in `src/data/site.ts` to the new domain.

## Migration from the old site

The old site (Google Sites) was scraped into `scripts/migration/old-site.json`; image captures are
logged in `scripts/migration/images-captured.tsv`. `npm run parity` compares the built pages with
that inventory. Links that were already broken on the old site were dropped and marked with
`TODO(old-site)` comments in the code.
