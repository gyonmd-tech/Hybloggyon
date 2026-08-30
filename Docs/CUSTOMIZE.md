# Customize / Fork Guide

Use this after cloning HyBloggyon to turn it into **your** blog.

---

## 1. Replace sample content

1. Delete or rewrite MDX files in `src/content/posts/`.
2. Add your own posts using [CONTENT.md](./CONTENT.md).
3. Replace covers under `public/images/covers/{category}/`.
4. Update hero / about images under `public/images/hero/` and `public/images/about/`.

Keep at least one valid MDX file while developing so list pages are not empty.

---

## 2. About page

Edit **`src/content/about-data.js`**:

| Field | Purpose |
|---|---|
| `openerText` | Full-viewport opening line |
| `name` | Display name |
| `shortBio` | Short editorial bio |
| `meta` | Label/value rows (base, focus, status, …) |
| `manifestoParagraphs` | Long-form manifesto blocks |
| `beliefs` | Short belief list |
| `contactEmail` | Contact CTA |
| `socialLinks` | External profile links |

Portrait image is wired in `src/components/about/AboutPortrait.jsx` (typically under `public/images/`).

---

## 3. Hobby page

Edit **`src/content/hobby-data.js`** for music, books, films, and side glances.

Film posters can use TMDb IDs when `NEXT_PUBLIC_TMDB_API_KEY` is set (see README). Without a key, typography fallbacks still render.

---

## 4. Branding & SEO

| Task | Where |
|---|---|
| Site title / nav mark | `src/components/Header.jsx` |
| Per-page titles & descriptions | `<Helmet>` in each `src/pages/*.jsx` |
| Favicon / icons | `public/` |
| HTML document shell | `index.html` |
| Open Graph images | `public/images/og/` (wire into Helmet as needed) |

Search the repo for `HyBloggyon` and replace strings that should become your brand name.

---

## 5. Visual identity

1. Read [DESIGN.md](./DESIGN.md).
2. Change tokens in `src/styles/global.css` (`@theme` block).
3. Swap fonts in `index.html` + matching CSS variables.
4. Keep the hard rules (no radius, hard shadows, token colors) unless you intentionally redesign the system.

---

## 6. Routes you may keep or drop

Defined in `src/App.jsx`:

| Path | Page |
|---|---|
| `/` | Homepage editorial |
| `/notes` | Notes index |
| `/about` | Manifesto about |
| `/hobby` | Curated consumption |
| `/archive` | Full archive + filters |
| `/:category/:slug` | Article reader |

To remove a page: delete the route, nav link in `Header.jsx`, and unused components.

---

## 7. Environment

```env
# .env (local) — never commit
NEXT_PUBLIC_TMDB_API_KEY=your_key
```

On Vercel: **Settings → Environment Variables** → same key → Redeploy.

---

## 8. Before you go public

- [ ] Own posts + images only (or clearly licensed assets)
- [ ] About / hobby / social links updated
- [ ] Brand name and meta titles updated
- [ ] `.env` not committed (confirm `.gitignore`)
- [ ] `LICENSE` chosen and added
- [ ] README demo URL / clone URL updated
- [ ] `npm run build` passes
- [ ] Vercel deploy + deep routes checked (`/archive`, article URLs, dan halaman 404)

---

## 9. Optional cleanups

- Remove unused mock posts (`mock-*.mdx`) if present.
- Remove legacy root `content/` if you do not need sample backups.
- Trim `original_html.html` / design export leftovers if they are not part of your public repo story.
