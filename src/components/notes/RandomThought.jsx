// src/components/notes/RandomThought.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const THOUGHTS = [
  'Kenapa kita lebih mudah membayangkan kiamat daripada hari tanpa internet?',
  'Sebuah catatan yang tidak pernah dibaca ulang bukan catatan — itu terapi.',
  'Perhatian adalah mata uang yang paling berharga dan paling mudah dicuri.',
  'Buku yang selesai dibaca bukan akhir — itu awal dari buku yang ada di kepala kita.',
  'Keheningan adalah hal pertama yang dijual oleh modernitas.',
  'Jadwal yang terlalu padat adalah bukti kita takut duduk dengan pikiran kita sendiri.',
  'Tidak ada ide yang benar-benar baru. Ada cuma koneksi yang belum pernah dibuat.',
  'Nostalgia adalah kerinduan akan perasaan, bukan kenangan spesifik.',
];

export default function RandomThought() {
  const sectionRef = useRef(null);
  const thoughtRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const shuffle = () => {
    if (animating) return;
    setAnimating(true);
    gsap.to(thoughtRef.current, {
      opacity: 0, y: -20, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setCurrent((prev) => (prev + 1) % THOUGHTS.length);
        gsap.fromTo(thoughtRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
        setAnimating(false);
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-accent-green)',
        borderBottom: '1px solid var(--color-ink)',
        padding: '80px 60px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>

        <div style={{ flex: 1, minWidth: '300px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', display: 'block', marginBottom: '32px' }}>
            Random Thought // Generator Acak
          </span>
          <p
            ref={thoughtRef}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(22px, 3vw, 40px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
              maxWidth: '700px',
            }}
          >
            "{THOUGHTS[current]}"
          </p>
        </div>

        <div style={{ flexShrink: 0, textAlign: 'center' }}>
          <button
            onClick={shuffle}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              border: '2px solid var(--color-ink)',
              backgroundColor: 'transparent',
              padding: '24px 36px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-mono)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-ink)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-ink)'; }}
          >
            <span style={{ fontSize: '28px' }}>⟳</span>
            <span style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Lainnya
            </span>
          </button>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(0,0,0,0.45)', marginTop: '12px', letterSpacing: '0.05em' }}>
            {current + 1} / {THOUGHTS.length}
          </p>
        </div>

      </div>
    </section>
  );
}
