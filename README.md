# HyBloggyon

**Personal editorial blog** built as a static React app — long-form essays, learning notes, and pop-culture writing (music, film & anime), with a Neo-Brutalist Editorial visual language.

No CMS. No backend. You write MDX, push to Git, and Vercel deploys.

**Live demo:** [hybloggyon.vercel.app](https://hybloggyon.vercel.app/)

---

## Features

- **MDX content** — write posts as Markdown + React components
- **Four categories** — `esai`, `notes`, `musik`, `film-anime`
- **Editorial homepage** — scrollytelling layout with GSAP + Framer Motion
- **Reading experience** — article pages with TOC, reading progress, related notes
- **Archive & search** — filter by category; notes search by tag
- **About & Hobby pages** — manifesto + curated books / music / films
- **Design system** — CSS tokens, zero border-radius, hard shadows, hairline borders
- **SEO-ready** — `react-helmet-async` per page
- **One-click deploy** — Vercel SPA rewrites included

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router v7 |
| Content | MDX (`@mdx-js/rollup`) |
| Styling | Tailwind CSS v4 + CSS design tokens |
| Animation | GSAP 3 + Framer Motion 12 |
| SEO | react-helmet-async |
| Deploy | Vercel |

---

## Quick Start

**Requirements:** Node.js 20+

```bash
git clone https://github.com/YOUR_USERNAME/HyBloggyon.git
cd HyBloggyon
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

| Script | Description |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

### Optional: TMDb API key

The Hobby page can load film posters from [TMDb](https://www.themoviedb.org/). Create a `.env` file (already gitignored):

```env
VITE_TMDB_API_KEY=your_tmdb_v3_api_key
```

Without it, the page falls back to typography-only cards.

---

## Project Structure

```
HyBloggyon/
├── public/images/          # Covers, hero, about, OG images
├── src/
│   ├── content/
│   │   ├── posts/          # ← All MDX articles live here
│   │   ├── about-data.js   # About page copy
│   │   └── hobby-data.js   # Hobby page lists
│   ├── components/         # UI by domain (about, article, notes, …)
│   ├── pages/              # Route pages
│   ├── hooks/              # Article data hooks
│   ├── utils/              # MDX helpers, dates, reading time
│   ├── animations/         # GSAP intro sequences
│   └── styles/global.css   # Design tokens + Tailwind
├── Docs/                   # Guides (content, design, customize)
├── vercel.json             # SPA rewrites
└── package.json
```

> **Note:** A root `content/` folder may exist as legacy samples. The site reads **`src/content/posts/`** only.

---

## Adding a Post

1. Create `src/content/posts/your-slug.mdx`
2. Add frontmatter + body
3. Put cover at `public/images/covers/{category}/your-slug.webp`
4. Commit and push — Vercel redeploys automatically

```mdx
---
title: "Your Title"
subtitle: "Optional subtitle"
category: "esai"
tags: ["tag1", "tag2"]
date: "2026-07-01"
slug: "your-slug"
featured: false
excerpt: "One-sentence summary for cards and SEO."
coverImage: "/images/covers/esai/your-slug.webp"
readingTime: 5
pullQuote: "Optional short quote."
---

Your writing starts here…
```

**`slug` must match the filename** (without `.mdx`).

URL pattern: `/{category}/{slug}`  
Example: `/esai/tentang-keheningan-sebagai-bahasa`

Full workflow, templates, and image rules → **[Docs/CONTENT.md](Docs/CONTENT.md)**

---

## Deploy to Vercel

1. Push the repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Confirm settings:

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 20.x |

4. (Optional) Add `VITE_TMDB_API_KEY` under **Environment Variables**
5. Deploy

`vercel.json` already rewrites all routes to `index.html` for client-side routing. Every push to `main` triggers a new deploy.

**Custom domain:** Project Settings → Domains in the Vercel dashboard.

---

## Customize for Your Blog

| What | Where |
|---|---|
| Site name / nav | `src/components/Header.jsx`, page `<Helmet>` titles |
| About copy | `src/content/about-data.js` |
| Hobby lists | `src/content/hobby-data.js` |
| Colors, fonts, rules | `src/styles/global.css` + [Docs/DESIGN.md](Docs/DESIGN.md) |
| Sample posts | Replace files in `src/content/posts/` |

Step-by-step forking guide → **[Docs/CUSTOMIZE.md](Docs/CUSTOMIZE.md)**

---

## Documentation

| Doc | Purpose |
|---|---|
| [Docs/CONTENT.md](Docs/CONTENT.md) | Write & publish posts, templates, images |
| [Docs/DESIGN.md](Docs/DESIGN.md) | Visual system, tokens, anti-patterns |
| [Docs/CUSTOMIZE.md](Docs/CUSTOMIZE.md) | Make this blog yours after forking |

---

## Design Principles (short)

- **Neo-Brutalist Editorial** — print-magazine grid, hairline borders, thin large type
- **No rounded corners** — `border-radius: 0` everywhere
- **Hard shadows only** — e.g. `4px 4px 0`, never soft blur
- **Token colors only** — use CSS variables, not generic Tailwind palette colors
- **Controlled motion** — editorial reveals; no bounce/elastic playfulness

Details → [Docs/DESIGN.md](Docs/DESIGN.md)

---

## Contributing

Issues and PRs are welcome — especially bug fixes, accessibility, docs, and content tooling.

1. Fork and create a branch
2. Keep changes aligned with the design system
3. Run `npm run build` before opening a PR
4. Describe *why* the change helps

---

## License

This project is intended to be open source. Add a `LICENSE` file of your choice (e.g. MIT) before publishing the public repo.

---

*A digital workshop for preserving thought — built to be forked, rewritten, and made your own.*
