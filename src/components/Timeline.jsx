import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EVENTS = [
  { year: '2021', title: 'Awal Mula', desc: 'Versi pertama blog diluncurkan dengan fokus pada tulisan personal dan bereksperimen dengan berbagai gaya penceritaan organik.' },
  { year: '2023', title: 'Transisi Visual', desc: 'Perubahan ke desain editorial yang lebih kaku, terstruktur, monokromatik, dan mengurangi elemen visual yang tidak perlu.' },
  { year: '2026', title: 'HyBloggyon v4', desc: 'Iterasi terbaru dengan performa membaca maksimal, tipografi brutalist, dan interaksi bebas batas.' },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Draw the continuous horizon line
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );

      // 2. Animate nodes (Year & Desc) popping in
      gsap.fromTo('.tl-node',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: 'var(--color-ink)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '120px 0',
        position: 'relative',
      }}
    >
      <div style={{ padding: '0 40px', maxWidth: '1400px', margin: '0 auto', marginBottom: '80px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Jejak & Evolusi
        </span>
      </div>

      <style>{`
        .tl-organic-scroll {
          width: 100%;
          overflow-x: auto;
          position: relative;
          padding: 40px 0;
          scrollbar-width: none; /* Hide scrollbar Firefox */
        }
        .tl-organic-scroll::-webkit-scrollbar {
          display: none; /* Hide scrollbar Chrome/Safari */
        }

        .tl-organic-dot {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.4s ease;
        }

        .tl-node:hover .tl-organic-dot {
          transform: translate(-50%, -50%) scale(1.5);
          background-color: #ffffff !important;
        }

        .tl-node:hover .tl-title {
          color: var(--color-accent-green);
        }
      `}</style>

      {/* The Scrollable Infographic Area */}
      <div className="tl-organic-scroll">
        
        {/* The Continuous Horizon Line */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: 'max(100%, 1200px)',
            height: '1px',
            backgroundColor: '#ffffff',
            transform: 'translateY(-50%)',
            zIndex: 1,
            opacity: 0.15,
            willChange: 'transform',
          }}
        />

        {/* The Nodes Container */}
        <div
          style={{
            minWidth: '1200px',
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-around',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {EVENTS.map((event, i) => {
            const isTop = i % 2 === 0;

            const YearBlock = (
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 300,
                  fontSize: 'clamp(64px, 8vw, 100px)',
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}
              >
                {event.year}
              </h2>
            );

            const DescBlock = (
              <div style={{ maxWidth: '320px', margin: '0 auto' }}>
                <h4
                  className="tl-title"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '24px',
                    color: '#ffffff',
                    marginBottom: '16px',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {event.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.6)',
                    margin: 0,
                  }}
                >
                  {event.desc}
                </p>
              </div>
            );

            return (
              <div
                key={event.year}
                className="tl-node"
                style={{
                  position: 'relative',
                  width: '320px',
                  height: '400px',
                  cursor: 'pointer',
                }}
              >
                {/* The Geometric Dot */}
                <div
                  className="tl-organic-dot"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '16px',
                    height: '16px',
                    backgroundColor: 'var(--color-ink)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    zIndex: 3,
                  }}
                />

                {/* Top Hemisphere */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    paddingBottom: '40px',
                    textAlign: 'center',
                  }}
                >
                  {isTop ? YearBlock : DescBlock}
                </div>

                {/* Bottom Hemisphere */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    paddingTop: '40px',
                    textAlign: 'center',
                  }}
                >
                  {isTop ? DescBlock : YearBlock}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
