// src/components/about/AboutConnect.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutConnect({ email, socialLinks }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.connect-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
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
    <>
      <style>{`
        .contact-email-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-heading);
          font-weight: 500;
          font-size: clamp(1.5rem, 3.5vw, 2.8rem);
          letter-spacing: -0.02em;
          color: var(--color-ink);
          text-decoration: none;
          line-height: 1;
          padding-bottom: 8px;
          transition: color 0.4s ease;
        }
        .contact-email-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-color: var(--color-ink);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .contact-email-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .contact-email-link .arrow {
          display: inline-block;
          font-size: 0.85em;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .contact-email-link:hover .arrow {
          transform: translate(8px, -8px);
        }
        
        .contact-social-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-ink);
          text-decoration: none;
          padding-bottom: 4px;
          overflow: hidden;
        }
        .contact-social-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--color-ink);
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .contact-social-link:hover::after {
          transform: translateX(0);
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          minHeight: '60vh',
          backgroundColor: 'var(--color-background-ash)',
          borderTop: '1px solid var(--color-ink)',
          borderBottom: '1px solid var(--color-ink)',
          padding: 'clamp(80px, 15vh, 160px) clamp(24px, 6vw, 80px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Label Minimalis */}
          <span
            className="connect-reveal"
            style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-espresso)',
              marginBottom: '24px',
            }}
          >
            [ KONTAK & KOLABORASI ]
          </span>

          {/* Pengantar yang Jelas & Tidak Membingungkan - Ukuran Diperbesar */}
          <p
            className="connect-reveal"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 5vw, 4.5rem)', // Diperbesar kembali seperti semula
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              maxWidth: '900px',
              marginBottom: '64px',
            }}
          >
            Mari terhubung. Surat elektronik masih menjadi cara terbaik untuk memulai obrolan.
          </p>

          {/* Email - Ukuran Diperkecil & Efek Hover Jelas */}
          <div className="connect-reveal" style={{ marginBottom: '80px' }}>
            <a href={`mailto:${email}`} className="contact-email-link">
              {email} <span className="arrow">↗</span>
            </a>
          </div>

          {/* Grid Layout untuk Sosial & Info */}
          <div
            className="connect-reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '40px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(18, 18, 20, 0.15)',
            }}
          >
            {/* Social Links */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'rgba(18,18,20,0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '16px',
                }}
              >
                Media Sosial
              </span>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {socialLinks.map(({ label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Domisili / Waktu */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'rgba(18,18,20,0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '16px',
                }}
              >
                Waktu Lokal
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--color-ink)',
                  letterSpacing: '0.05em',
                }}
              >
                Jakarta, ID (GMT+7)
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
