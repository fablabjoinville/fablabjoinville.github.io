# Fab Lab Joinville — Design System

Fab Lab Joinville is a **non-profit makerspace in Joinville/SC, Brazil** offering open access to digital fabrication (laser cutting, 3D printing, CNC, electronics, robotics). It runs hands-on workshops (*oficinas*), hackathons (e.g. **LeRobot Arm Hackathon** with SO-101 arms) and community events, in partnership with universities (UDESC/MobiLab, UFSC) and industry (NVIDIA, Creality). Audience: students, makers, researchers, local companies.

**Surfaces:** website (fablabjoinville.com.br), event/hackathon posters & slides, workshop materials, social posts, partner proposals.

## Sources
- Uploaded logo files (`uploads/`): FLJ symbol (color / black / white) and horizontal lockups (blue / black / white) as SVG + PNG, app icon PNG. SVG fills were stripped in the originals; the copies in `assets/logo/` have inline fills restored (navy `#082C3B` sampled from the PNGs).
- Website https://fablabjoinville.com.br — **could not be fetched** during authoring. No codebase, Figma or decks were provided. Fonts, the accent color and the UI kit are therefore proposals.

## Index
- `styles.css` — entry point (imports only) → `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`
- `assets/logo/` — marca-{azul,branco,preto}.{svg,png}, simbolo-{cor,preto,branco}.svg, icon-app.png
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/` — React primitives (below), one `.card.html` per folder
- `ui_kits/website/` — click-through website proposal
- `thumbnail.html`, `SKILL.md`

## Components
- core: **Button**, **IconButton**, **Icon**
- forms: **Input**, **Select**, **Checkbox**, **Radio**, **Switch**
- display: **Card**, **EventCard**, **Badge**, **Tag**
- navigation: **Tabs**
- feedback: **Dialog**, **Toast**, **Tooltip**

No source defined a component inventory, so this is a standard set sized to the brand. *Intentional additions:* **Icon** (Lucide CDN wrapper so icons inherit color), **EventCard** (events/workshops are the core content type).

---

## CONTENT FUNDAMENTALS
- **Language:** Brazilian Portuguese first; English for international partners/events (bilingual titles OK: "LeRobot Arm Hackathon — Joinville").
- **Voice:** open, hands-on, collaborative, educational. Practical and a bit technical, never intimidating. Speak to the reader as **você**; the lab speaks as **nós/a gente** ("Quem constrói com a gente").
- **Verbs first, short sentences.** "Aprenda fazendo." "Do arquivo ao objeto." "Inscreva-se." "Conheça o espaço."
- **Beginner-friendly:** always say who it's for and what's needed ("Iniciante · não precisa de experiência · traga seu notebook").
- **Technical specifics are a feature:** machine specs, materials, dimensions in mono (`1300×900 mm`, `SO-101 · 6 DOF`, `CO₂ 100W`).
- **Casing:** Display headlines and buttons UPPERCASE (set via CSS, write in sentence case). Body copy in sentence case. Labels/eyebrows as mono uppercase prefixed with `//` ("// AGENDA", "// MAKERSPACE · JOINVILLE/SC") — a code-comment nod.
- **Dates/times:** Brazilian format — "sáb, 25/10, 14h", "09h–18h", month abbreviations OUT, NOV.
- **Emoji:** not in brand materials or UI. Acceptable sparingly in social captions only.
- Examples: "Inscrições abertas" · "Últimas vagas" · "Oficina de corte a laser: do vetor à peça" · "Toda máquina exige uma oficina introdutória de segurança."

## VISUAL FOUNDATIONS
- **Color:** one deep **navy #082C3B** (from the mark) carries the brand — text, borders, solid fills, inverse sections. White and warm **paper #F5F3EE** are the grounds. A proposed **laser orange #FF5A1F** is the single accent: CTAs, eyebrows, focus rings, hover shadows on navy buttons. Use ≤1 accent CTA per view. Semantic green/yellow/red/blue only for status.
- **Type:** Display = **JetBrains Mono** 700–800, uppercase, tight (-0.02em) — matches the squared, mono-like wordmark. Body = **IBM Plex Sans** (engineering heritage, very legible). Mono labels 12px/700/+0.08em.
- **Motif — offset layers:** the FLJ symbol is built from stacked, offset duplicates (solid navy + thin outline). Reuse as **hard, unblurred offset shadows** (`--shadow-offset*`) and as stacked frames behind hero photos. No soft drop shadows except `--shadow-float` for floating menus.
- **Borders:** 2px solid navy is the default stroke on cards, inputs, buttons, dividers. 1px navy-100 for subtle separators. Dashed 2px = draft/cut-line feeling (diagrams, clear-space).
- **Corners:** near-square — 2px radius on controls/cards, 0 for sections and photos. Pills only for Tags. Chamfered corner (`--chamfer`, clip-path) echoes the symbol's cut corner — use sparingly on badges/frames.
- **Backgrounds:** flat solid fields (white / paper / navy). No gradients, no textures. Full-bleed navy bands separate sections. Imagery: real lab photography — hands, machines, people working; natural light, slightly cool/neutral, not overly saturated. Placeholder `[foto]` blocks until provided.
- **Layout:** 1200px container, 24px gutter, 4px spacing base, generous vertical rhythm (96px section padding). Sticky white header with 2px bottom rule. Grids with strong ruled lines (partner grid) feel like a workshop bench.
- **Hover:** buttons & interactive cards **lift** (-3/-4px translate) and reveal the hard offset shadow; ghost elements get navy-50 fill; links turn orange.
- **Press:** element drops back +1px with shadow removed — physical, mechanical.
- **Focus:** orange 3px offset shadow on inputs.
- **Animation:** short and mechanical — 120–200ms, `cubic-bezier(.2,.7,.2,1)`. No bounces, no long fades.
- **Transparency/blur:** avoided. Only the dialog backdrop (navy at 55%).
- **Cards:** white, 2px navy border, 2px radius, no shadow at rest; offset shadow on hover. Event cards have a navy date block pinned top-left of the image.

## ICONOGRAPHY
- No icon set was provided. Substituted **Lucide** (https://lucide.dev) via CDN (`lucide-static@0.460.0`), 2px stroke, outline style — matches the 2px border system. Use the `Icon` component (`<Icon name="printer" />`), which masks the SVG so it takes `currentColor`.
- Common: printer, scissors, bot, cpu, wrench, users, calendar, clock, map-pin, mail, arrow-right.
- No emoji as icons. Unicode only for ✓ (checkbox), × (tag remove), ▼ (select), → in copy.
- The FLJ symbol may be used as a graphic device (large, cropped, white on navy) on posters/slides.
