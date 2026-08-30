'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReadingProgressBar from '../../components/article/ReadingProgressBar';
import ArticleHero from '../../components/article/ArticleHero';
import ArticleSidebar from '../../components/article/ArticleSidebar';
import ArticleFooter from '../../components/article/ArticleFooter';
import { makeMarkdownComponents } from '../../components/article/MarkdownComponents';
import { getCategoryColor } from '../../lib/categoryColors';

export default function ArticleView({
  post,
  relatedPosts,
  previousPost,
  nextPost,
}) {

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
  }, [post.content]);

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
  }, [post.content]);

  const cat = getCategoryColor(post.category);
  const readTime = post.readingTime;

  // MDX components dengan aksen warna kategori
  const markdownComponents = useMemo(
    () => makeMarkdownComponents(cat.bg),
    [cat.bg]
  );

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar progress={scrollProgress} color={cat.bg} />

      <div className="grain-overlay-body" aria-hidden="true" />
      <Header />

      <main>
        {/* Hero */}
        <ArticleHero
          frontmatter={post}
          rawContent={post.content}
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
            <div className="article-prose" style={{
              maxWidth:   '68ch',
              fontFamily: 'Switzer, var(--font-sans)',
              fontSize:   '1.125rem',
              lineHeight: 1.85,
              color:      'var(--color-ink)',
            }}>
              {post.content ? (
                <ReactMarkdown
                  components={markdownComponents}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug, rehypeSanitize]}
                >
                  {post.content}
                </ReactMarkdown>
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
        <ArticleFooter prevPost={previousPost} nextPost={nextPost} />
      </main>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>
    </>
  );
}
