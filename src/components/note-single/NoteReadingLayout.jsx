// src/components/note-single/NoteReadingLayout.jsx
// Full two-column editorial magazine reading layout
// Left: article prose | Right: sticky sidebar (connected notes + image)
// Bottom: horizontal metadata bar | Then: reflection, CTA

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// ─── Prose CSS injected once ────────────────────────────────────────────────
const PROSE_CSS = `
  .nrl-article {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 16px;
    line-height: 1.8;
    color: rgba(0,0,0,0.85);
    letter-spacing: -0.01em;
  }
  .nrl-article p { margin-bottom: 1.6em; }

  .nrl-article h2 {
    font-family: var(--font-heading);
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 900;
    letter-spacing: -0.04em;
    color: var(--color-ink);
    text-transform: uppercase;
    margin: 2.2em 0 0.7em;
    line-height: 1;
  }
  .nrl-article h3 {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--color-ink);
    margin: 1.8em 0 0.5em;
  }

  /* Drop cap on first paragraph */
  .nrl-article .note-drop-cap::first-letter {
    float: left;
    font-family: var(--font-heading);
    font-size: 5.2em;
    font-weight: 900;
    line-height: 0.75;
    margin: 0.08em 16px 0 0;
    color: var(--color-ink);
    letter-spacing: -0.05em;
  }

  /* Code-block styled blockquote — matches reference */
  .nrl-article blockquote {
    background: rgba(0,0,0,0.03);
    border: 1px solid rgba(0,0,0,0.12);
    border-left: 3px solid var(--color-ink);
    padding: 24px 28px;
    margin: 1.8em 0;
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.75;
    color: rgba(0,0,0,0.7);
    font-style: normal;
  }
  .nrl-article blockquote::before {
    content: '// PROTOCOL ALERT';
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    color: rgba(0,0,0,0.35);
    margin-bottom: 12px;
  }

  .nrl-article strong {
    font-weight: 700;
    color: var(--color-ink);
  }
  .nrl-article em { font-style: italic; }

  .nrl-article hr {
    border: none;
    border-top: 1px solid rgba(0,0,0,0.1);
    margin: 2.4em 0;
  }
  .nrl-article .note-annotation {
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.3);
    margin: -0.8em 0 1.5em;
    border-left: 2px solid rgba(0,0,0,0.12);
    padding-left: 12px;
  }

  /* In-article images */
  .nrl-article img {
    width: 100%;
    height: auto;
    filter: grayscale(100%);
    margin: 2em 0;
    border: 1px solid rgba(0,0,0,0.1);
  }
  .nrl-article .img-caption {
    font-family: var(--font-mono);
    font-size: 10px;
    color: rgba(0,0,0,0.4);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: -1.5em;
    margin-bottom: 2em;
  }

  /* Sidebar connected notes */
  .nrl-sidebar-note {
    border-bottom: 1px solid rgba(0,0,0,0.08);
    padding: 16px 0;
    transition: background-color 0.2s;
    cursor: pointer;
  }
  .nrl-sidebar-note:hover { background-color: rgba(0,0,0,0.02); }
  .nrl-sidebar-note:first-child { border-top: 1px solid rgba(0,0,0,0.08); }

  /* Metadata bar cells */
  .nrl-meta-cell {
    flex: 1;
    min-width: 120px;
    padding: 18px 20px;
    border-right: 1px solid rgba(0,0,0,0.08);
  }
  .nrl-meta-cell:last-child { border-right: none; }

  /* Prev/Next panels */
  .nrl-nav-panel {
    flex: 1;
    padding: 32px 36px;
    text-decoration: none;
    color: var(--color-ink);
    display: block;
    transition: background-color 0.2s;
  }
  .nrl-nav-panel:hover { background-color: var(--color-background-ash); }
  .nrl-nav-panel.dark { background-color: var(--color-ink); color: #fff; }
  .nrl-nav-panel.dark:hover { background-color: #1e1e20; }
  /* Responsive mobile */
  @media (max-width: 768px) {
    .nrl-wrapper {
      padding: 70px 20px 0 !important;
    }
    .nrl-body {
      flex-direction: column !important;
      gap: 40px !important;
    }
    .nrl-sidebar {
      display: none !important;
    }
    .nrl-reflection {
      padding: 40px 20px !important;
    }
    .nrl-nav-padding {
      padding: 0 20px !important;
    }
    .nrl-nav-panel {
      padding: 32px 24px !important;
      min-height: 200px !important;
    }
    .nrl-nav-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

// ─── Sub-components ──────────────────────────────────────────────────────────

function TopMetaBar({ tag, date, readTime }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
        borderTop: '1px solid rgba(0,0,0,0.2)',
        borderBottom: '2px solid var(--color-ink)',
        marginBottom: '56px',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>
          PUBLISHED: {date}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>//</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>
          CATEGORY: {tag}
        </span>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>
        ◈ READING TIME: {readTime}
      </span>
    </div>
  );
}

function Sidebar({ connectedNotes, sidebarImage, sidebarImageCaption }) {
  return (
    <aside
      style={{
        position: 'sticky',
        top: '100px',
        width: '260px',
        flexShrink: 0,
        alignSelf: 'flex-start',
      }}
    >
      {/* Connected Notes */}
      <div style={{ marginBottom: '28px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.35)',
            display: 'block',
            marginBottom: '0',
          }}
        >
          Connected Notes
        </span>
        {connectedNotes.map((note, i) => (
          <a key={i} href={note.href} className="nrl-sidebar-note" style={{ display: 'block', textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.3)',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {'→'}
            </span>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '-0.01em',
                lineHeight: 1.25,
                color: 'var(--color-ink)',
                textTransform: 'uppercase',
              }}
            >
              {note.title}
            </p>
          </a>
        ))}
      </div>

      {/* Sidebar image */}
      {sidebarImage && (
        <div>
          <div
            style={{
              width: '100%',
              height: '180px',
              backgroundImage: `url('${sidebarImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%)',
              border: '1px solid rgba(0,0,0,0.12)',
            }}
          />
          {sidebarImageCaption && (
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.35)',
                marginTop: '6px',
                lineHeight: 1.4,
              }}
            >
              {sidebarImageCaption}
            </p>
          )}
        </div>
      )}
    </aside>
  );
}

function MetadataBar({ metadata }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginTop: '48px',
      }}
    >
      {metadata.map((item, i) => (
        <div key={i} className="nrl-meta-cell">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.3)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            {item.label}
          </span>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: item.highlight ? 'var(--color-accent-green)' : 'var(--color-ink)',
              fontWeight: item.highlight ? 700 : 400,
              lineHeight: 1.4,
            }}
          >
            {item.value}
          </p>
        </div>
      ))}

      {/* Status badges on the right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '18px 20px', marginLeft: 'auto' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            backgroundColor: 'var(--color-accent-green)',
            padding: '4px 12px',
            color: 'var(--color-ink)',
          }}
        >
          ACTIVE
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            backgroundColor: 'var(--color-ink)',
            padding: '4px 12px',
            color: '#fff',
          }}
        >
          DRAFT
        </span>
      </div>
    </div>
  );
}

// ─── Main exported component ─────────────────────────────────────────────────

export default function NoteReadingLayout({
  tag, date, readTime, title,
  content, connectedNotes, metadata,
  sidebarImage, sidebarImageCaption,
  reflection, closingNote,
  prevNote, nextNote,
}) {
  const titleRef = useRef(null);
  const articleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title word reveal
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: 'lines,words' });
        gsap.set(split.lines, { overflow: 'hidden' });
        gsap.fromTo(split.words,
          { y: '115%' },
          { y: '0%', duration: 1.1, stagger: 0.05, ease: 'power4.out', delay: 0.3 }
        );
      }
      // Article fade in
      gsap.fromTo(articleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <style>{PROSE_CSS}</style>

      {/* ── Article body wrapper ── */}
      <div
        className="nrl-wrapper"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '100px 60px 0',
        }}
      >
        {/* Title at the very top */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(40px, 8vw, 88px)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: 'var(--color-ink)',
            textTransform: 'uppercase',
            marginBottom: '32px',
            width: '100%',
          }}
        >
          {title}
        </h1>

        {/* Top meta bar now below title */}
        <TopMetaBar tag={tag} date={date} readTime={readTime} />

        {/* Two-column body */}
        <div className="nrl-body" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>

          {/* Left: Article prose */}
          <div ref={articleRef} style={{ flex: 1, minWidth: 0 }}>
            <div
              className="nrl-article"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Metadata bar — inside left column, below article */}
            <MetadataBar metadata={metadata} />
          </div>

          {/* Right: Sticky sidebar */}
          <div className="nrl-sidebar">
            <Sidebar
              connectedNotes={connectedNotes}
              sidebarImage={sidebarImage}
              sidebarImageCaption={sidebarImageCaption}
            />
          </div>
        </div>
      </div>

      {/* ── Reflection ── */}
      {(reflection || closingNote) && (
        <div
          className="nrl-reflection"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '64px 60px',
            borderTop: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {reflection && (
            <blockquote
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                fontSize: 'clamp(22px, 3vw, 36px)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
                borderLeft: '4px solid var(--color-accent-green)',
                paddingLeft: '32px',
                marginBottom: '36px',
                fontStyle: 'normal',
              }}
            >
              {reflection}
            </blockquote>
          )}
          {closingNote && (
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                lineHeight: 1.8,
                color: 'rgba(0,0,0,0.5)',
                maxWidth: '560px',
              }}
            >
              {closingNote}
            </p>
          )}
        </div>
      )}

      {/* ── Prev / Next navigation ── */}
      {(prevNote || nextNote) && (
        <div>
          {/* Section header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '0 60px',
            marginTop: '0',
            borderTop: '1px solid rgba(0,0,0,0.1)',
          }} className="nrl-nav-padding">
            <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(0,0,0,0.08)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.3)',
              padding: '20px 0',
              flexShrink: 0,
            }}>
              Lanjut Membaca
            </span>
            <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(0,0,0,0.08)' }} />
          </div>

          {/* Two-panel navigation */}
          <div className="nrl-nav-grid" style={{
            display: 'grid',
            gridTemplateColumns: prevNote && nextNote ? '1fr 1fr' : '1fr',
            gap: '1px',
            backgroundColor: 'var(--color-ink)',
          }}>
            {/* PREV */}
            {prevNote && (
              <a
                href={prevNote.href}
                style={{
                  position: 'relative',
                  backgroundColor: 'var(--color-background-ash)',
                  padding: '52px 60px',
                  textDecoration: 'none',
                  color: 'var(--color-ink)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  minHeight: '280px',
                  overflow: 'hidden',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ebebeb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background-ash)'}
              >
                {/* Giant background arrow */}
                <span style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '24px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '220px',
                  lineHeight: 1,
                  color: 'rgba(0,0,0,0.04)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  letterSpacing: '-0.05em',
                }}>←</span>

                {/* Direction label */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.35)',
                  display: 'block',
                  marginBottom: '20px',
                }}>
                  ← Sebelumnya
                </span>

                {/* Tag */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--color-wasabi)',
                  padding: '4px 10px',
                  display: 'inline-block',
                  marginBottom: '16px',
                  alignSelf: 'flex-start',
                }}>
                  {prevNote.tag}
                </span>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(20px, 2.5vw, 30px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: 'var(--color-ink)',
                  marginBottom: '16px',
                  maxWidth: '380px',
                }}>
                  {prevNote.title}
                </h3>

                {/* Read time + arrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.4)' }}>
                    {prevNote.readTime}
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.15)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'rgba(0,0,0,0.3)' }}>←</span>
                </div>
              </a>
            )}

            {/* NEXT */}
            {nextNote && (
              <a
                href={nextNote.href}
                style={{
                  position: 'relative',
                  backgroundColor: 'var(--color-ink)',
                  padding: '52px 60px',
                  textDecoration: 'none',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  minHeight: '280px',
                  overflow: 'hidden',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1c1c1e'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ink)'}
              >
                {/* Giant background arrow */}
                <span style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '24px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '220px',
                  lineHeight: 1,
                  color: 'rgba(255,255,255,0.04)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  letterSpacing: '-0.05em',
                }}>→</span>

                {/* Direction label */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  display: 'block',
                  marginBottom: '20px',
                }}>
                  Selanjutnya →
                </span>

                {/* Tag */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--color-accent-green)',
                  color: 'var(--color-ink)',
                  padding: '4px 10px',
                  display: 'inline-block',
                  marginBottom: '16px',
                  alignSelf: 'flex-start',
                }}>
                  {nextNote.tag}
                </span>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(20px, 2.5vw, 30px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: '#ffffff',
                  marginBottom: '16px',
                  maxWidth: '380px',
                }}>
                  {nextNote.title}
                </h3>

                {/* Read time + arrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>→</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                    {nextNote.readTime}
                  </span>
                </div>
              </a>
            )}
          </div>

          {/* Back to all notes footer strip */}
          <div style={{
            backgroundColor: 'var(--color-background-ash)',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}>
            <a
              href="/notes"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.4)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-ink)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
            >
              <span>←</span>
              <span>Semua Catatan</span>
              <span style={{ opacity: 0.3 }}>/ /</span>
              <span>Notes Index</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
