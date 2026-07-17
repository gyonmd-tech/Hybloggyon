# Design System

HyBloggyon’s visual language: **Neo-Brutalist Editorial** (tamed brutalism) — print-magazine honesty with controlled kinetic storytelling.

Primary reference vibe: independent magazine layouts (tight grids, hairline rules, large thin type over photography).

Source of truth for tokens in code: **`src/styles/global.css`**.

---

## Philosophy

| Brutalism | Editorial |
|---|---|
| Honest structure, hard edges, no decoration for decoration’s sake | Precise typography, intentional whitespace, long-form reading comfort |

Motion should feel like **pages of a magazine assembling**, not playful UI bounce.

---

## Hard rules

Follow these when editing UI:

1. **`border-radius: 0`** on every element (images, buttons, inputs, cards).
2. **Hard block shadows only** — e.g. `box-shadow: 4px 4px 0 var(--color-ink)`. No soft/blur shadows.
3. **Hairline borders** — `1px solid` using ink tokens as structural dividers.
4. **Token colors only** — use CSS variables / Tailwind theme tokens from `global.css`. Do not invent ad-hoc Tailwind palette colors (`blue-500`, `orange-600`, etc.).
5. **Headings stay thin** — weight `300`–`400`. Avoid `font-bold` / `font-black` on display headings.
6. **Motion is editorial** — GSAP scroll reveals + Framer micro-interactions. No bounce, elastic, or spring “toy” easing.

---

## Color tokens (core)

| Token | Role |
|---|---|
| `--color-background-ash` / `--color-background` | Page surfaces |
| `--color-ink` | Primary text and borders |
| `--color-espresso` | Secondary text, dark tags |
| `--color-accent-green` | Category labels (music / film) |
| `--color-accent-warm` | Active hover / CTA accent |
| `--color-wasabi` / `--color-muted-apricot` | Soft highlight surfaces |
| Overlay tokens | Dark scrims over hero photography |

Exact hex values live in `@theme` inside `src/styles/global.css` — change them there when rebranding.

---

## Typography

| Role | Family (typical) | Character |
|---|---|---|
| Headings | Satoshi (or theme `--font-*`) | Large, tight tracking, thin weight |
| Body | Switzer / body token | Comfortable long-form |
| Meta / labels | Space Mono | Small caps / monospace indices |

Heading line-height stays tight (~1.0–1.15). Body should remain readable for essays.

Fonts are loaded in `index.html` (Fontshare / Google Fonts). Swap families there + update CSS variables when customizing.

---

## Layout habits

- Prefer **12-column editorial grids** and full-bleed image planes on heroes.
- Use borders and type hierarchy before cards/shadows.
- One job per section: one headline, one short support line, one primary visual idea.
- Homepage is a **narrative scroll**, not a dashboard of widgets.

---

## Animation stack

| Tool | Use |
|---|---|
| GSAP + ScrollTrigger | Page intro, scroll reveals, parallax |
| SplitType | Character / line text splits |
| Framer Motion | Presence, loaders, light UI transitions |

Keep motion intentional (2–3 strong beats per major page), not noise.

---

## Anti-patterns

Avoid introducing:

- Rounded corners or pill chips
- Soft multi-layer shadows / glow
- Generic purple gradients or “AI SaaS” looks
- Dense card grids in the hero
- Bounce / elastic micro-interactions
- Random Tailwind color utilities outside the token set

---

## Where to edit

| Change | File |
|---|---|
| Colors, fonts, spacing tokens | `src/styles/global.css` |
| Homepage sequence | `src/pages/HomePage.jsx` + `src/components/*` |
| Intro animation | `src/animations/introSequence.js` |
| Article MDX elements | `src/components/article/MDXComponents.jsx` |

When in doubt: match an existing section’s borders, type scale, and motion — don’t invent a new visual dialect.
