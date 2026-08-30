import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutData } from '../content/about-data';

gsap.registerPlugin(ScrollTrigger);

const FOOTER_NAVIGATION = [
  { label: 'Beranda', href: '/' },
  { label: 'Semua Tulisan', href: '/archive' },
  { label: 'Catatan', href: '/notes' },
  { label: 'Kurasi', href: '/hobby' },
  { label: 'Manifesto', href: '/about' },
];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        backgroundColor: 'var(--color-ink)',
        color: '#ffffff',
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 4vw, 60px) clamp(32px, 4vw, 40px) clamp(20px, 4vw, 60px)',
      }}
    >
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: clamp(40px, 6vw, 80px);
          margin-bottom: clamp(60px, 10vw, 120px);
        }
        .footer-brand-col { grid-column: span 2; }
        .footer-news-col { grid-column: span 2; }
        @media (max-width: 768px) {
          .footer-brand-col { grid-column: span 1; }
          .footer-news-col { grid-column: span 1; }
          .footer-nav-cols { flex-direction: column !important; gap: 32px !important; }
          .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Top Grid */}
        <div className="footer-grid">

          {/* Col 1: Brand */}
          <div className="footer-reveal footer-brand-col">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 24px 0', lineHeight: 1 }}>
              HyBloggyon.
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'rgba(255,255,255,0.5)', maxWidth: '300px', lineHeight: 1.6 }}>
              Arsip digital dan eksperimen pikiran. Dibangun dengan fokus pada keterbacaan dan keheningan antarmuka.
            </p>
          </div>

          {/* Col 2: Navigation & Socials */}
          <div className="footer-reveal" style={{ display: 'flex', gap: '60px' }}>
            <div className="footer-nav-cols" style={{ display: 'flex', gap: '60px' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--color-accent-green)', marginBottom: '32px' }}>NAVIGASI</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {FOOTER_NAVIGATION.map((link) => (
                    <a key={link.href} href={link.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s', opacity: 0.8 }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>{link.label}</a>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--color-accent-green)', marginBottom: '32px' }}>KONEKSI</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[...aboutData.socialLinks, { label: 'Email', url: `mailto:${aboutData.contactEmail}` }].map((link) => (
                    <a key={link.label} href={link.url} style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s', opacity: 0.8 }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>{link.label} ↗</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Feed */}
          <div className="footer-reveal footer-news-col">
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--color-accent-green)', marginBottom: '32px' }}>DISPATCH / RSS</h4>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', lineHeight: 1.6, maxWidth: '400px' }}>
              Ikuti tulisan terbaru melalui pembaca feed pilihan Anda. Tanpa akun, pelacak, atau kotak masuk tambahan.
            </p>
            <a
              href="/feed.xml"
              type="application/rss+xml"
              style={{ display: 'inline-flex', padding: '16px 24px', background: '#fff', color: 'var(--color-ink)', border: '1px solid rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textDecoration: 'none', transition: 'background-color 0.2s' }}
              onMouseEnter={(event) => event.currentTarget.style.backgroundColor = 'var(--color-wasabi)'}
              onMouseLeave={(event) => event.currentTarget.style.backgroundColor = '#fff'}
            >
              IKUTI RSS ↗
            </a>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="footer-reveal footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
            &copy; 2026 HYBLOGGYON. ALL RIGHTS RESERVED.
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
            DESIGNED WITH BRUTALIST INTENT
          </div>
        </div>

      </div>
    </footer>
  );
}
