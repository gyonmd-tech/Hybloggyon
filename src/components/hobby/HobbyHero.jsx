// src/components/hobby/HobbyHero.jsx
// Section 1 — 100vh "Typographic Fog"
// Direvisi: Perbaikan flow teks agar membungkus secara natural, 
// perbaikan animasi SplitType (tanpa line wrappers yang merusak spasi),
// dan mempertahankan background minimalis editorial.

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export default function HobbyHero() {
  const line1Ref    = useRef(null);
  const line2Ref    = useRef(null);
  const subtitleRef = useRef(null);
  const labelRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hanya split by words dan chars agar flow teks inline tetap natural
      // (menghindari div.line dari SplitType yang bisa merusak line-height)
      const split1 = new SplitType(line1Ref.current, { types: 'words,chars' });
      const split2 = new SplitType(line2Ref.current, { types: 'words,chars' });

      // Sembunyikan karakter sebelum dianimasikan
      gsap.set([split1.chars, split2.chars], { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Label pojok kiri atas
      tl.fromTo(
        labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0
      );

      // Bagian 1 — stagger per karakter
      tl.to(
        split1.chars,
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.02 },
        0.3
      );

      // Bagian 2 — melanjutkan kalimat
      tl.to(
        split2.chars,
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.02 },
        0.6
      );

      // Kalimat pendukung
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        '>-0.2'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        height: '100vh',
        minHeight: '600px',
        position: 'relative',
        backgroundColor: 'var(--color-background-ash)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(20px, 6vw, 80px)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .hobby-hero-title {
          margin: 0 0 32px 0;
          font-family: var(--font-heading);
          font-weight: 300;
          font-size: clamp(2.4rem, 7.5vw, 9.5rem);
          line-height: 1.1;
          letter-spacing: -0.04em;
        }
        .hobby-hero-subtitle { max-width: 480px; border-top: 1px solid rgba(18,18,20,0.15); padding-top: 20px; }
        @media (max-width: 768px) {
          .hobby-hero-title { font-size: clamp(2rem, 9vw, 3.5rem); line-height: 1.15; letter-spacing: -0.025em; margin-bottom: 24px; }
          .hobby-hero-subtitle { max-width: 100%; }
        }
      `}</style>
      {/* Dekorasi Background: Minimalist Grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(18,18,20,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(18,18,20,0.035) 1px, transparent 1px)',
          backgroundSize: 'clamp(40px, 4vw, 80px) clamp(40px, 4vw, 80px)',
          zIndex: 0,
        }}
      />
      
      {/* Dekorasi Aksen Garis Tipis (Editorial feel) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 'clamp(24px, 6vw, 80px)',
          width: '1px',
          backgroundColor: 'rgba(18,18,20,0.06)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Kontainer Teks Utama */}
      <div style={{ position: 'relative', zIndex: 1, paddingLeft: '16px', maxWidth: '1200px' }}>
        {/* Teks h1 menggunakan inline spans agar kalimat mengalir (wrap) secara natural tanpa jeda aneh */}
        <h1 className="hobby-hero-title">
          <span
            ref={line1Ref}
            style={{ color: 'var(--color-ink)' }}
          >
            Bukan apa yang kamu{' '}
          </span>
          <span
            ref={line2Ref}
            style={{ color: 'var(--color-espresso)' }}
          >
            tulis — yang membentukmu.
          </span>
        </h1>

        <div
          ref={subtitleRef}
          className="hobby-hero-subtitle"
        >
          <p
            style={{
              fontFamily: 'Switzer, var(--font-sans)',
              fontWeight: 400,
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: 'var(--color-espresso)',
              opacity: 0.8,
              margin: 0,
            }}
          >
            Musik. Film. Kata-kata. Dan hal-hal di antaranya. 
            Sebuah kurasi personal sebagai biografi yang lebih jujur.
          </p>
        </div>
      </div>
    </section>
  );
}
