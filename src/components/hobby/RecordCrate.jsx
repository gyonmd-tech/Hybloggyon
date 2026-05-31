// src/components/hobby/RecordCrate.jsx
// Section 2 — Horizontal scroll "record crate" dengan custom scrollbar, navigasi, dan infinite loop (tak terbatas).

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MusicCard from './MusicCard';

gsap.registerPlugin(ScrollTrigger);

export default function RecordCrate({ music }) {
  const sectionRef    = useRef(null);
  const scrollAreaRef = useRef(null);
  const setRef        = useRef(null); // Referensi untuk menghitung lebar 1 set (1 putaran)
  
  const isDragging    = useRef(false);
  const startX        = useRef(0);
  const scrollLeft    = useRef(0);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [setWidth, setSetWidth] = useState(0);

  // ── Hitung Ukuran & Inisialisasi Infinite Loop ─────────────────────────
  useEffect(() => {
    const measureSet = () => {
      if (setRef.current) {
        // Lebar 1 set penuh (termasuk gap antar set yang diatur 24px)
        setSetWidth(setRef.current.offsetWidth + 24);
      }
    };

    measureSet();
    window.addEventListener('resize', measureSet);
    return () => window.removeEventListener('resize', measureSet);
  }, [music]);

  useEffect(() => {
    // Posisikan scroll di set ke-2 (tengah) saat pertama kali render
    // agar bisa digeser ke kiri (infinite backwards)
    if (setWidth > 0 && scrollAreaRef.current && scrollAreaRef.current.scrollLeft === 0) {
      scrollAreaRef.current.scrollLeft = setWidth;
    }
  }, [setWidth]);

  // ── Scroll Logic (Progress & Infinite Loop Jumps) ──────────────────────
  const handleScroll = () => {
    if (!scrollAreaRef.current || setWidth === 0) return;
    const el = scrollAreaRef.current;

    // Logic Infinite Loop:
    // Jika user scroll terlalu jauh ke kanan (memasuki set ke-3), kembalikan ke set ke-2
    if (el.scrollLeft >= setWidth * 2) {
      el.scrollLeft -= setWidth;
    } 
    // Jika user scroll terlalu jauh ke kiri (memasuki set ke-1), majukan ke set ke-2
    else if (el.scrollLeft <= 0) {
      el.scrollLeft += setWidth;
    }

    // Hitung progress bar (0 sampai 1) berdasarkan posisi relatif di dalam 1 set
    const progress = (el.scrollLeft % setWidth) / setWidth;
    setScrollProgress(progress);
  };

  // ── Drag-to-scroll (mouse) ──────────────────────────────────────────────
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current     = e.pageX - scrollAreaRef.current.offsetLeft;
    scrollLeft.current = scrollAreaRef.current.scrollLeft;
    scrollAreaRef.current.style.cursor = 'grabbing';
    scrollAreaRef.current.style.scrollSnapType = 'none'; // Matikan snap saat drag
  };
  const onMouseLeaveOrUp = () => {
    isDragging.current = false;
    if (scrollAreaRef.current) {
      scrollAreaRef.current.style.cursor = 'grab';
      scrollAreaRef.current.style.scrollSnapType = 'x mandatory'; // Nyalakan lagi
    }
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x    = e.pageX - scrollAreaRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    scrollAreaRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // ── Button Navigation ───────────────────────────────────────────────────
  const scrollByAmount = (amount) => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label dan Header fade
      gsap.fromTo(
        '.rc-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );

      // Animasikan HANYA set pertama yang terlihat agar tidak terlalu berat
      const cards = sectionRef.current.querySelectorAll('.music-set-1 .music-card-anim');
      gsap.fromTo(
        cards,
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
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
        padding: 'clamp(80px, 12vh, 140px) 0',
      }}
    >
      {/* Header section dengan tombol navigasi */}
      <div
        className="rc-header"
        style={{
          padding: '0 clamp(24px, 6vw, 80px)',
          marginBottom: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              margin: 0
            }}
          >
            Sedang Didengarkan.
          </h2>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-warm)',
            }}
          >
            — Single yang menemani hari-hari ini
          </span>
        </div>

        {/* Tombol Navigasi Minimalis */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => scrollByAmount(-400)}
            style={{
              width: '48px',
              height: '48px',
              border: '1px solid var(--color-ink)',
              backgroundColor: 'transparent',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-mono)',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
              boxShadow: '2px 2px 0px var(--color-ink)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-ink)';
              e.currentTarget.style.backgroundColor = 'var(--color-paper-white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '2px 2px 0px var(--color-ink)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scrollByAmount(400)}
            style={{
              width: '48px',
              height: '48px',
              border: '1px solid var(--color-ink)',
              backgroundColor: 'transparent',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-mono)',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
              boxShadow: '2px 2px 0px var(--color-ink)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-ink)';
              e.currentTarget.style.backgroundColor = 'var(--color-paper-white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '2px 2px 0px var(--color-ink)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Gradient fade kanan */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '120px',
            height: '100%',
            background: 'linear-gradient(to right, transparent 0%, var(--color-background-ash) 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        {/* Gradient fade kiri */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '60px',
            height: '100%',
            background: 'linear-gradient(to left, transparent 0%, var(--color-background-ash) 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Horizontal scroll container */}
        <div
          ref={scrollAreaRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeaveOrUp}
          onMouseUp={onMouseLeaveOrUp}
          onMouseMove={onMouseMove}
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            // Padding kiri kita ubah jadi 0 agar logic infinite width set akurat.
            // Sebagai kompensasi agar ada jarak awal, kita beri margin pada container progress/label, 
            // atau cukup biarkan full-bleed (menyentuh layar).
            padding: '24px 0 32px 0',
            cursor: 'grab',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <style>{`.rc-scroll::-webkit-scrollbar { display: none; }`}</style>

          {/* Render 3 set (sebelum, sekarang, sesudah) untuk ilusi infinite */}
          {[0, 1, 2].map((setIndex) => (
            <div
              key={setIndex}
              ref={setIndex === 1 ? setRef : null} // Kita ukur set tengah sebagai acuan
              className={`music-set-${setIndex}`}
              style={{ display: 'flex', gap: '24px', flexShrink: 0 }}
            >
              {music.map((item) => (
                <div key={`${setIndex}-${item.id}`} className="music-card-anim">
                  <MusicCard item={item} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Minimalist Progress Bar */}
      <div
        style={{
          margin: '32px clamp(24px, 6vw, 80px) 0',
          height: '2px',
          backgroundColor: 'rgba(18,18,20,0.1)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -1,
            left: 0,
            height: '4px',
            width: '20%',
            backgroundColor: 'var(--color-ink)',
            // Progress akan bergerak dari 0 ke 1 untuk setiap pergantian set (0-400% dari width bar sendiri)
            transform: `translateX(${scrollProgress * 400}%)`,
            transition: 'transform 0.1s linear',
          }}
        />
      </div>
    </section>
  );
}
