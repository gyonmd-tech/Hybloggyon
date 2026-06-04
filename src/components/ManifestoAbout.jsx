import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoAbout() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        // Setup split type
        const splitText = new SplitType(titleRef.current, { types: 'lines,words' });
        
        // Hide lines overflow for cinematic reveal
        gsap.set(splitText.lines, { overflow: 'hidden' });
        
        // Animate words up
        gsap.fromTo(splitText.words,
          { y: '120%', opacity: 0, rotateZ: 5 },
          { 
            y: '0%', 
            opacity: 1, 
            rotateZ: 0,
            duration: 1.2, 
            stagger: 0.04, 
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            }
          }
        );
      }

      // Animate other elements fading in
      gsap.fromTo('.manifesto-fade-up',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
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
        borderBottom: '1px solid var(--color-ink)',
        padding: 'clamp(60px, 12vw, 160px) clamp(20px, 3vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <span
          className="manifesto-fade-up"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-espresso)',
            marginBottom: '40px',
            display: 'block',
          }}
        >
          Sekilas Prinsip
        </span>
        
        <p
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            marginBottom: '40px',
          }}
        >
          Saya menulis untuk berpikir, <br/>
          <span style={{ fontStyle: 'italic', color: 'var(--color-accent-green)' }}>bukan untuk dilihat.</span>
        </p>

        <p
          className="manifesto-fade-up"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '16px',
            lineHeight: 1.8,
            color: 'rgba(0,0,0,0.7)',
            maxWidth: '600px',
            margin: '0 auto 60px auto',
          }}
        >
          Sebuah ruang arsip digital untuk menuangkan observasi, kritik, dan anomali pikiran. Ruang ini sepenuhnya merdeka dari algoritma dan metrik popularitas. Hanya teks murni, ditulis sebagai draf abadi yang terus berevolusi.
        </p>

        <div className="manifesto-fade-up" style={{ marginBottom: '80px' }}>
          <a
            href="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#ffffff',
              backgroundColor: 'var(--color-ink)',
              padding: '20px 40px',
              textDecoration: 'none',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-green)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ink)'}
          >
            <span>Baca Manifesto Lengkap</span>
            <span style={{ fontSize: '16px' }}>&rarr;</span>
          </a>
        </div>

        {/* Informative Minimalist Status Line */}
        <div
          className="manifesto-fade-up"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '40px',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            paddingTop: '32px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
          }}
        >
           <div>
             <span style={{ color: 'rgba(0,0,0,0.5)', marginRight: '8px' }}>PENULIS:</span>
             <span style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Anonim / Editor</span>
           </div>
           <div>
             <span style={{ color: 'rgba(0,0,0,0.5)', marginRight: '8px' }}>LOKASI:</span>
             <span style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Jakarta, ID</span>
           </div>
           <div>
             <span style={{ color: 'rgba(0,0,0,0.5)', marginRight: '8px' }}>STATUS:</span>
             <span style={{ fontWeight: 600, color: 'var(--color-accent-green)' }}>● Menulis Aktif</span>
           </div>
        </div>

      </div>
      <style>{`
        @media (max-width: 768px) {
          /* Align manifesto content left on mobile */
          .manifesto-section-inner {
            align-items: flex-start !important;
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
