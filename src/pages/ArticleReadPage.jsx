// src/pages/ArticleReadPage.jsx
// Halaman baca artikel utama — route: /:category/:slug
// Menggabungkan semua komponen: Hero, Progress Bar, Body (Content + Sidebar), Footer.

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReadingProgressBar   from '../components/article/ReadingProgressBar';
import ArticleHero          from '../components/article/ArticleHero';
import ArticleSidebar       from '../components/article/ArticleSidebar';
import ArticleFooter        from '../components/article/ArticleFooter';
import { makeMdxComponents } from '../components/article/MDXComponents';
import { getCategoryColor }  from '../lib/categoryColors';

// ─── Load semua MDX ──────────────────────────────────────────────────────────
const mdxModules = import.meta.glob('/src/content/posts/*.mdx', { eager: true });

const ALL_POSTS = Object.values(mdxModules)
  .map(mod => ({ ...mod.frontmatter, _MDXContent: mod.default }))
  .filter(p => p?.slug);

// ─── Helpers ─────────────────────────────────────────────────────────────────
function estimateReadTime(text = '') {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Ekstrak headings h2 dari konten MDX (untuk TOC)
function extractHeadings(MDXContent) {
  // Karena kita tidak punya raw string, kita baca dari DOM setelah render.
  // Ini di-handle via useEffect di component.
  return [];
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ArticleReadPage() {
  const { slug } = useParams();

  // Cari artikel
  const post = useMemo(() =>
    ALL_POSTS.find(p => p.slug === slug),
    [slug]
  );

  // Artikel terkait (same category, max 3, exclude self)
  const relatedPosts = useMemo(() =>
    ALL_POSTS
      .filter(p => p.slug !== slug && p.category === post?.category)
      .slice(0, 3),
    [slug, post]
  );

  // Prev / Next berdasarkan urutan tanggal
  const sorted = useMemo(() =>
    [...ALL_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  );
  const idx  = sorted.findIndex(p => p.slug === slug);
  const prevPost = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const nextPost = idx > 0                  ? sorted[idx - 1] : null;

  // Scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Headings untuk TOC — baca dari DOM setelah render
  const [headings, setHeadings] = useState([]);
  useEffect(() => {
    if (!articleRef.current) return;
    const h2els = articleRef.current.querySelectorAll('h2[id]');
    setHeadings(
      Array.from(h2els).map(el => ({
        id:   el.id,
        text: el.textContent,
      }))
    );
  }, [post]);

  // Tambahkan id pada h2 yang tidak punya id (untuk IntersectionObserver)
  useEffect(() => {
    if (!articleRef.current) return;
    articleRef.current.querySelectorAll('h2:not([id])').forEach(el => {
      const id = el.textContent
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      el.id = id;
    });
    // Re-extract headings setelah id ditambahkan
    const h2els = articleRef.current.querySelectorAll('h2[id]');
    setHeadings(
      Array.from(h2els).map(el => ({
        id:   el.id,
        text: el.textContent,
      }))
    );
  }, [post]);

  // Scroll ke atas saat slug berganti
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // ─── 404 ──────────────────────────────────────────────────────────────────
  if (!post) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--color-background)',
      }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.1em', opacity: 0.5 }}>404</span>
        <p style={{ fontSize: '1rem', color: 'var(--color-ink)' }}>Artikel tidak ditemukan.</p>
        <a href="/archive" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--color-accent-warm)' }}>
          ← Kembali ke Arsip
        </a>
      </div>
    );
  }

  const cat         = getCategoryColor(post.category);
  const MDXContent  = post._MDXContent;
  // Estimasi read time dari title + excerpt (approximasi, karena tidak punya raw string di eager mode)
  const approxWords = ((post.title ?? '') + ' ' + (post.excerpt ?? '')).split(/\s+/).length * 20;
  const readTime    = Math.max(3, Math.ceil(approxWords / 200));

  // MDX components dengan aksen warna kategori
  const mdxComponents = useMemo(
    () => makeMdxComponents(cat.bg),
    [cat.bg]
  );

  return (
    <>
      <Helmet>
        <title>{post.title} — HyBloggyon</title>
        {post.excerpt && <meta name="description" content={post.excerpt} />}
        <meta property="og:title"       content={post.title} />
        {post.excerpt && <meta property="og:description" content={post.excerpt} />}
      </Helmet>

      {/* Reading Progress Bar */}
      <ReadingProgressBar progress={scrollProgress} color={cat.bg} />

      <div className="grain-overlay-body" aria-hidden="true" />
      <Header />

      <main>
        {/* Hero */}
        <ArticleHero
          frontmatter={post}
          rawContent={post.excerpt ?? post.title ?? ''}
        />

        <style>{`
          .article-body {
            padding-top: clamp(32px, 6vh, 64px);
            padding-bottom: clamp(32px, 6vh, 64px);
            padding-left: clamp(20px, 6vw, 80px);
            padding-right: clamp(20px, 6vw, 80px);
            background-color: var(--color-background);
            display: flex;
            gap: clamp(40px, 6vw, 80px);
            align-items: flex-start;
          }
          .article-sidebar-desktop {
            width: 300px;
            flex-shrink: 0;
          }
          .article-sidebar-mobile {
            padding-left: clamp(20px, 6vw, 80px);
            padding-right: clamp(20px, 6vw, 80px);
            padding-bottom: 40px;
            border-top: 1px solid var(--color-background-ash);
            background-color: var(--color-background);
            display: none;
          }
          @media (max-width: 768px) {
            .article-sidebar-desktop { display: none !important; }
            .article-sidebar-mobile { display: block !important; }
          }
        `}</style>

        {/* Body: Konten + Sidebar */}
        <div className="article-body">
          {/* Konten Artikel */}
          <div
            ref={articleRef}
            style={{
              flex:     1,
              minWidth: 0,
            }}
          >
            {/* Prose wrapper styling */}
            <div style={{
              maxWidth:   '68ch',
              fontFamily: 'Switzer, var(--font-sans)',
              fontSize:   '1.125rem',
              lineHeight: 1.85,
              color:      'var(--color-ink)',
            }}>
              {MDXContent ? (
                <MDXContent components={mdxComponents} />
              ) : (
                <p style={{ opacity: 0.5, fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  Konten artikel belum tersedia.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar Desktop — kanan konten */}
          <div className="article-sidebar-desktop">
            <ArticleSidebar
              frontmatter={post}
              headings={headings}
              relatedPosts={relatedPosts}
              accentColor={cat.bg}
              readTime={readTime}
            />
          </div>
        </div>

        {/* Sidebar Mobile — di bawah konten */}
        <div className="article-sidebar-mobile">
          <ArticleSidebar
            frontmatter={post}
            headings={headings}
            relatedPosts={relatedPosts}
            accentColor={cat.bg}
            readTime={readTime}
          />
        </div>

        {/* Footer Artikel */}
        <ArticleFooter prevPost={prevPost} nextPost={nextPost} />
      </main>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>
    </>
  );
}
