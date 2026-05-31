// src/components/about/AboutManifesto.jsx
// Section 3 — Long-form teks manifesto dengan drop cap, pull-quote, ScrollTrigger fade per paragraf

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Satu paragraf dengan drop cap pada huruf pertama
function ManifestoParagraph({ text, isFirst, isQuote }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  if (isQuote) {
    return (
      <blockquote
        ref={ref}
        style={{
          margin: '48px 0',
          padding: '0 0 0 24px',
          borderLeft: '3px solid var(--color-accent-warm)',
          fontFamily: 'Switzer, var(--font-sans)',
          fontWeight: 300,
          fontSize: '1.45rem',
          lineHeight: 1.6,
          color: 'var(--color-espresso)',
          letterSpacing: '-0.01em',
        }}
      >
        {text}
      </blockquote>
    );
  }

  const firstChar  = text.charAt(0);
  const restOfText = text.slice(1);

  return (
    <p
      ref={ref}
      style={{
        fontFamily: 'Switzer, var(--font-sans)',
        fontWeight: 400,
        fontSize: '1.15rem',
        lineHeight: 1.85,
        color: 'var(--color-ink)',
        margin: 0,
      }}
    >
      {isFirst ? (
        <>
          <span
            style={{
              float: 'left',
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              fontSize: 'clamp(4rem, 8vw, 6.5rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              marginRight: '12px',
              marginTop: '8px',
            }}
          >
            {firstChar}
          </span>
          {restOfText}
        </>
      ) : (
        text
      )}
    </p>
  );
}

// Horizontal mini divider antara paragraf
function MiniDivider() {
  return (
    <hr
      style={{
        width: '80px',
        height: '1px',
        border: 'none',
        backgroundColor: 'var(--color-ink)',
        margin: '48px 0',
      }}
    />
  );
}

export default function AboutManifesto({ paragraphs }) {
  const sectionRef = useRef(null);
  const labelRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-background-ash)',
        borderTop: '1px solid var(--color-ink)',
        borderBottom: '1px solid var(--color-ink)',
        padding: 'min(15vh, 120px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
        }}
      >
        {/* Section label */}
        <span
          ref={labelRef}
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-warm)',
            marginBottom: '56px',
          }}
        >
          MANIFESTO —
        </span>

        {/* Paragraf dengan divider */}
        {paragraphs.map((text, i) => (
          <div key={i}>
            <ManifestoParagraph
              text={text}
              isFirst={i === 0}
              isQuote={false}
            />
            {i < paragraphs.length - 1 && <MiniDivider />}
          </div>
        ))}
      </div>
    </section>
  );
}
