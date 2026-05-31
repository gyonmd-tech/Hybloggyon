import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
        padding: '120px 60px 40px 60px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Top Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '80px', marginBottom: '120px' }}>
          
          {/* Col 1: Brand */}
          <div className="footer-reveal" style={{ gridColumn: 'span 2' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 24px 0', lineHeight: 1 }}>
              HyBloggyon.
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'rgba(255,255,255,0.5)', maxWidth: '300px', lineHeight: 1.6 }}>
              Arsip digital dan eksperimen pikiran. Dibangun dengan fokus pada keterbacaan dan keheningan antarmuka.
            </p>
          </div>

          {/* Col 2: Navigation & Socials combined for neatness */}
          <div className="footer-reveal" style={{ display: 'flex', gap: '60px' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--color-accent-green)', marginBottom: '32px' }}>NAVIGASI</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Beranda', 'Semua Esai', 'Catatan', 'Manifesto', 'Arsip'].map(link => (
                  <a key={link} href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s', opacity: 0.8 }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>{link}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--color-accent-green)', marginBottom: '32px' }}>KONEKSI</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Instagram ↗', 'Twitter ↗', 'LinkedIn ↗', 'GitHub ↗', 'Email ↗'].map(link => (
                  <a key={link} href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s', opacity: 0.8 }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>{link}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3: Newsletter */}
          <div className="footer-reveal" style={{ gridColumn: 'span 2' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--color-accent-green)', marginBottom: '32px' }}>DISPATCH / NEWSLETTER</h4>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', lineHeight: 1.6, maxWidth: '400px' }}>
              Dapatkan pembaruan asinkron langsung ke kotak masuk Anda. Tidak ada spam, hanya intisari tulisan murni.
            </p>
            <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.2)', maxWidth: '400px' }}>
              <input type="email" placeholder="Alamat email Anda" style={{ flex: 1, background: 'transparent', border: 'none', padding: '16px 24px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#fff', outline: 'none' }} />
              <button style={{ padding: '16px 32px', background: '#fff', color: 'var(--color-ink)', borderLeft: '1px solid rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-wasabi)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                KIRIM
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="footer-reveal" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
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
