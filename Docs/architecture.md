# architecture.md
## HyBloggyon — Technical Architecture (Updated: Mei 2026)

---

## Stack Overview

```
React 19 + Vite 8 (Static Site)
├── Routing        → React Router v7
├── Content        → MDX files + @mdx-js/rollup
├── Styling        → Tailwind CSS v4 + CSS Modules (hybrid)
│   ├── Tailwind   → Layout utilities, spacing, responsive
│   ├── CSS Modules→ Komponen dengan state/animasi (scoped)
│   └── CSS Vars   → Design tokens (warna, font, spacing)
├── Animation      → GSAP 3 (ScrollTrigger) + Framer Motion 12
│   ├── Scroll     → Lenis (smooth scroll)
│   └── Text       → SplitType
├── MDX Parsing    → @mdx-js/rollup + remark/rehype plugins
├── Reading Time   → reading-time (npm)
├── SEO            → react-helmet-async
└── Deployment     → Vercel / Cloudflare Pages
```

---

## Directory Structure

```
hybloggyon/
├── public/
│   ├── images/
│   │   ├── covers/
│   │   │   ├── esai/          # Cover images artikel Esai
│   │   │   ├── notes/         # Cover images Notes
│   │   │   ├── musik/         # Cover images artikel Musik
│   │   │   └── film-anime/    # Cover images Film & Anime
│   │   ├── hero/              # Hero landing page (featured.webp)
│   │   ├── about/             # Foto author
│   │   ├── og/                # Open Graph images
│   │   └── placeholders/      # Placeholder images
│   └── _redirects             # SPA fallback routing
│
├── content/
│   ├── esai/
│   │   └── judul-artikel.mdx
│   ├── notes/
│   │   └── catatan-belajar.mdx
│   ├── musik/
│   │   └── analisis-album.mdx
│   ├── film-anime/
│   │   └── review-film.mdx
│   └── about.mdx
│
├── stitch/                    # Stitch design exports (HTML + screenshots)
│   ├── homepage/
│   │   ├── code.html          # Stitch HTML export
│   │   ├── screen.png         # Design screenshot
│   │   └── DESIGN.md          # Design spec ringkasan
│   ├── about/
│   ├── archive/
│   ├── notes/
│   └── article/
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── home/              # Homepage section components
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── MarqueeTicker.jsx
│   │   │   ├── IntroDescription.jsx
│   │   │   ├── LatestTopics.jsx
│   │   │   ├── FeaturedEssays.jsx
│   │   │   ├── AccentQuote.jsx
│   │   │   ├── HorizontalScroll.jsx
│   │   │   ├── CuratedConsumption.jsx
│   │   │   ├── LoggedObservations.jsx
│   │   │   ├── ClassificationGrid.jsx
│   │   │   ├── Timeline.jsx
│   │   │   └── ManifestoClosing.jsx
│   │   ├── article/
│   │   │   ├── ArticleHeader.jsx
│   │   │   ├── ArticleBody.jsx
│   │   │   └── RelatedArticles.jsx
│   │   ├── ui/
│   │   │   ├── CategoryTag.jsx
│   │   │   ├── ReadingTimeTag.jsx
│   │   │   └── ArticleCard.jsx
│   │   └── mdx/
│   │       └── MDXComponents.jsx   # Custom MDX component overrides
│   │
│   ├── pages/
│   │   ├── HomePage.jsx       # Dibangun dari stitch/homepage/code.html
│   │   ├── NotesPage.jsx      # Dibangun dari stitch/notes/code.html
│   │   ├── ArchivePage.jsx    # Dibangun dari stitch/archive/code.html
│   │   ├── AboutPage.jsx      # Dibangun dari stitch/about/code.html
│   │   └── ArticlePage.jsx    # Dibangun dari stitch/article/code.html
│   │
│   ├── animations/
│   │   ├── introSequence.js   # GSAP page load animation
│   │   └── scrollReveals.js   # GSAP ScrollTrigger reveals
│   │
│   ├── hooks/
│   │   ├── useAllArticles.js       # Aggregate semua MDX dari /content
│   │   └── useArticlesByCategory.js
│   │
│   ├── utils/
│   │   ├── gsapSetup.js       # GSAP + ScrollTrigger registration
│   │   ├── smoothScroll.js    # Lenis init
│   │   ├── mdxLoader.js       # Vite glob import untuk MDX files
│   │   ├── readingTime.js     # Hitung estimasi baca
│   │   └── formatDate.js
│   │
│   ├── styles/
│   │   ├── global.css         # @import "tailwindcss" + CSS variables + reset
│   │   └── components/        # Legacy CSS modules (jika ada)
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── Docs/                      # Dokumentasi project
│   ├── PRD.md
│   ├── architecture.md        ← (file ini)
│   ├── design-system.md
│   ├── claude.md
│   ├── context.md
│   ├── plan.md
│   ├── plan-homepage.md
│   ├── IMAGE-STRUCTURE.md
│   ├── tailwind-integration.md  ← (panduan Tailwind v4)
│   └── stitch-workflow.md       ← (panduan konversi Stitch → React)
│
├── vite.config.js
├── package.json
└── .gitignore
```

---

## Content Loading Strategy

Karena tidak ada CMS, konten di-load menggunakan **Vite's `import.meta.glob`**:

```js
// src/utils/mdxLoader.js
const modules = import.meta.glob('/content/**/*.mdx', { eager: true });

export function getAllArticles() {
  return Object.entries(modules).map(([filepath, module]) => {
    const { frontmatter } = module;
    const slug = filepath
      .replace('/content/', '')
      .replace('.mdx', '');
    return {
      slug,
      ...frontmatter,
      Component: module.default,
    };
  });
}
```

---

## Routing Structure

```
/                    → HomePage
/notes               → NotesPage
/archive             → ArchivePage
/about               → AboutPage
/esai/:slug          → ArticlePage (category: esai)
/notes/:slug         → ArticlePage (category: notes)
/musik/:slug         → ArticlePage (category: musik)
/film-anime/:slug    → ArticlePage (category: film-anime)
```

---

## Vite Configuration

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  plugins: [
    tailwindcss(),
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
      ],
    }),
    react(),
  ],
});
```

---

## Key Dependencies

```json
{
  "dependencies": {
    "react": "^19",
    "react-dom": "^19",
    "react-router-dom": "^7",
    "@mdx-js/rollup": "^3",
    "remark-frontmatter": "^5",
    "remark-mdx-frontmatter": "^5",
    "remark-gfm": "^4",
    "reading-time": "^1",
    "react-helmet-async": "^3",
    "gsap": "^3",
    "@studio-freight/lenis": "^1",
    "framer-motion": "^12",
    "split-type": "^0.3"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6",
    "@tailwindcss/vite": "^4",
    "tailwindcss": "^4",
    "vite": "^8"
  }
}
```

---

## Styling Architecture

### Tailwind v4 + CSS Modules Hybrid

```
global.css
├── @import "tailwindcss"    ← Tailwind base + utilities
├── :root { ... }            ← CSS design tokens/variables
├── .block-shadow { ... }    ← Global utility classes
└── .notes-row { ... }       ← Global interaction classes

ComponentName.module.css
└── Komponen-spesifik styles (animasi state, dll)
```

### Tailwind Custom Config (via global.css)

```css
@theme {
  --color-ink: #121214;
  --color-espresso: #2D221E;
  --color-wasabi: #D9E3C0;
  --color-accent-green: #7A8A63;
  --color-accent-warm: #C87A53;
  --color-background-ash: #F4F4F5;
  --font-heading-display: 'Satoshi', 'Plus Jakarta Sans', sans-serif;
  --font-meta-mono: 'Space Mono', monospace;
  --font-body-md: 'Switzer', 'General Sans', sans-serif;
}
```

---

## Deployment

**Target:** Vercel (recommended) atau Cloudflare Pages

```bash
# Build command
vite build

# Output directory
dist/
```

Karena menggunakan React Router, perlu konfigurasi **SPA fallback**:
- Vercel: tambahkan `vercel.json` dengan rewrites ke `index.html`
- Cloudflare Pages: tambahkan `_redirects` file di `/public`

```
# public/_redirects
/*  /index.html  200
```

---

## SEO Strategy

Gunakan `react-helmet-async` untuk meta tags dinamis per halaman:

```jsx
// Di setiap page
<Helmet>
  <title>{frontmatter.title} — HyBloggyon</title>
  <meta name="description" content={frontmatter.excerpt} />
  <meta property="og:image" content={frontmatter.coverImage} />
</Helmet>
```
