// src/components/notes/ConnectedThoughts.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONNECTIONS = [
  {
    from: 'Kebosanan yang Produktif',
    to: 'Mencatat sebagai Ritual',
    via: 'Refleksi diri membutuhkan kekosongan sebagai medium.',
  },
  {
    from: 'Internet Sedang Menyusut',
    to: 'Ketika AI Menulis dan Manusia Mengkurasi',
    via: 'Kurasi konten adalah resistance terhadap algoritma.',
  },
  {
    from: 'Kecepatan Naratif Wong Kar-wai',
    to: 'Tentang Waktu yang Tidak Linier',
    via: 'Waktu dalam seni bisa dilipat, direntangkan, diulang.',
  },
  {
    from: 'Noise sebagai Bahasa',
    to: 'Kenapa Album Konsep Masih Relevan',
    via: 'Ketidaknyamanan yang terstruktur menciptakan makna.',
  },
];

export default function ConnectedThoughts() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.connection-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--color-ink)', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: 'clamp(48px, 8vh, 80px) clamp(20px, 5vw, 60px)' }}>
      <style>{`
        .ct-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 56px; }
        .connection-grid { display: grid; grid-template-columns: 1fr 40px 1fr; align-items: center; gap: 32px; background-color: var(--color-ink); padding: 36px 40px; transition: background-color 0.2s; cursor: pointer; }
        @media (max-width: 768px) {
          .ct-header { flex-direction: column; gap: 16px; margin-bottom: 32px; }
          .ct-header p { text-align: left; }
          .connection-grid { grid-template-columns: 1fr; gap: 20px; padding: 24px 20px; }
          .connection-arrow { display: none; }
        }
      `}</style>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        <div className="ct-header">
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent-green)', display: 'block', marginBottom: '12px' }}>
              Connected Thoughts
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1, color: '#fff' }}>
              Benang Merah<br/>
              <em style={{ fontWeight: 300 }}>Antar Catatan</em>
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.35)', maxWidth: '260px', lineHeight: 1.6, textAlign: 'right' }}>
            Ide tidak ada dalam vakum. Setiap catatan adalah titik yang terhubung ke yang lain.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}>
          {CONNECTIONS.map((c, i) => (
            <div
              key={i}
              className="connection-item connection-grid"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1c'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ink)'}
            >
              {/* Node A */}
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent-green)', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>NODE A</span>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: '#fff', lineHeight: 1.3 }}>{c.from}</p>
              </div>

              {/* Arrow */}
              <div className="connection-arrow" style={{ textAlign: 'center' }}>
                <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 auto 4px' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: 'var(--color-accent-green)' }}>↓</span>
              </div>

              {/* Via */}
              <div style={{ gridColumn: 'unset' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>VIA</span>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '12px' }}>{c.via}</p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>NODE B</span>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: 'var(--color-accent-green)', lineHeight: 1.3 }}>{c.to}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
