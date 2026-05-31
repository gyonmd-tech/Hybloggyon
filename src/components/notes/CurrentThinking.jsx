// src/components/notes/CurrentThinking.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const THINKING = [
  { label: 'Membaca sekarang', value: 'The Anatomy of Melancholy — Robert Burton' },
  { label: 'Mendengarkan', value: 'Portishead — Dummy (loop ke-4 minggu ini)' },
  { label: 'Memikirkan', value: 'Bagaimana arsip digital berubah menjadi identitas' },
  { label: 'Sedang ditulis', value: 'Esai panjang tentang "Attention Economy"' },
  { label: 'Mempertanyakan', value: 'Apakah kuantitas konten adalah lawan dari kualitas pikiran?' },
];

export default function CurrentThinking() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (quoteRef.current) {
        const split = new SplitType(quoteRef.current, { types: 'lines,words' });
        gsap.set(split.lines, { overflow: 'hidden' });
        gsap.fromTo(split.words,
          { y: '110%' },
          {
            y: '0%', duration: 1.0, stagger: 0.04, ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
          }
        );
      }
      gsap.fromTo('.thinking-row',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.7, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: '.thinking-list', start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--color-background-ash)', borderBottom: '1px solid var(--color-ink)', padding: '80px 60px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

        {/* Left: Quote Block */}
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-espresso)', display: 'block', marginBottom: '40px' }}>
            Current Thinking
          </span>
          <blockquote
            ref={quoteRef}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
              borderLeft: '3px solid var(--color-accent-green)',
              paddingLeft: '32px',
              marginBottom: '32px',
            }}
          >
            "Menulis adalah cara satu-satunya saya bisa berpikir dengan jelas — bukan sebelum menulis, melainkan selama dan sesudahnya."
          </blockquote>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.1em' }}>
            — Catatan, Maret 2026
          </p>
        </div>

        {/* Right: Status List */}
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-espresso)', display: 'block', marginBottom: '40px' }}>
            Status / Live Update
          </span>
          <div className="thinking-list" style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            {THINKING.map((item, i) => (
              <div
                key={i}
                className="thinking-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: '24px',
                  padding: '20px 0',
                  borderBottom: '1px solid rgba(0,0,0,0.07)',
                  alignItems: 'start',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', paddingTop: '2px' }}>
                  {item.label}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-ink)', lineHeight: 1.5 }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
