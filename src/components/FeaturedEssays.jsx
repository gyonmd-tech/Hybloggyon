// src/components/FeaturedEssays.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ESSAYS = [
  {
    id: 1,
    tag: 'ESSAY // ARCHITECTURE',
    title: 'The Brutalist Web',
    subtitle: 'Kejujuran Arsitektur Digital',
    align: 'left',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=75',
  },
  {
    id: 2,
    tag: 'ESSAY // PHILOSOPHY',
    title: 'Kolektor Kenangan',
    subtitle: 'Hal-Hal yang Tak Berguna',
    align: 'right',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=75',
  },
  {
    id: 3,
    tag: 'MUSIK // ANALISIS',
    title: 'OK Computer',
    subtitle: 'Kecemasan Teknologi yang Menahun',
    align: 'center',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=75',
  },
];

export default function FeaturedEssays() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.essay-panel-container');
      
      panels.forEach((panel) => {
        const img = panel.querySelector('.essay-parallax-img');
        const content = panel.querySelector('.essay-content-overlay');
        
        // Smooth and easy parallax + subtle zoom out
        // We use scrub: 1 to add a 1-second delay smoothing to prevent choppiness
        // force3D: true ensures it runs on the GPU
        gsap.fromTo(img, 
          { yPercent: -15, scale: 1.1 },
          {
            yPercent: 15,
            scale: 1,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: 1, 
            }
          }
        );

        // Content slight parallax upward
        gsap.to(content, {
          y: -40,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });

        // Cinematic Text Reveal on Scroll
        gsap.fromTo(content.children,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            stagger: 0.15, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 65%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: '#0a0a0a',
        paddingBottom: '0',
        position: 'relative',
      }}
    >
      {/* Aesthetic Minimalist Section Header */}
      <div
        style={{
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-background-ash)', // Light background, no more huge black gap
          borderBottom: '1px solid var(--color-ink)',
          borderTop: '1px solid var(--color-ink)', // Sharp separation
          position: 'relative',
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 400,
            fontSize: 'clamp(24px, 3vw, 32px)',
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            margin: 0,
          }}
        >
          Esai Pilihan
        </h2>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-espresso)',
          }}
        >
          [ Sorotan Pilihan ]
        </span>
      </div>

      {/* Essay panels */}
      {ESSAYS.map((essay, i) => (
        <a
          key={essay.id}
          href="#"
          className="essay-panel-container"
          style={{
            position: 'relative',
            display: 'block',
            height: '100svh', // Truly 100% full screen regardless of browser UI
            overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            textDecoration: 'none',
            backgroundColor: '#0a0a0a',
          }}
        >
          {/* Parallax image wrapper */}
          <div
            className="essay-parallax-img"
            style={{
              position: 'absolute',
              inset: '0', 
              width: '100%',
              height: '100%',
              backgroundImage: `url('${essay.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%)',
              transition: 'filter 0.5s ease',
              willChange: 'transform, filter', // Guarantee hardware acceleration for scrub & hover
            }}
          />

          {/* Overlay gradient */}
          <div
            className="essay-gradient"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.1) 100%)',
              zIndex: 1,
              transition: 'background 0.5s ease',
            }}
          />

          {/* Badge */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '48px',
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '6px 14px',
                backdropFilter: 'blur(4px)',
              }}
            >
              [ {essay.tag} ]
            </span>
          </div>

          {/* Content overlay */}
          <div
            className="essay-content-overlay"
            style={{
              position: 'absolute',
              bottom: '60px',
              zIndex: 2,
              ...(essay.align === 'right'
                ? { right: '48px', left: 'auto', textAlign: 'right' }
                : essay.align === 'center'
                ? { left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '90%' }
                : { left: '48px', right: 'auto', textAlign: 'left' }
              ),
            }}
          >
            <h2
              className="essay-title"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                fontSize: 'clamp(48px, 7vw, 110px)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                marginBottom: '16px',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {essay.title}
            </h2>
            
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              {essay.subtitle}
            </p>

            {/* Hover CTA */}
            <div
              className="essay-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                opacity: 0.6,
                transform: 'translateY(10px)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  paddingBottom: '4px',
                }}
              >
                Baca Esai
              </span>
              <span style={{ color: '#ffffff', fontSize: '18px' }}>→</span>
            </div>
          </div>
        </a>
      ))}

      {/* Internal CSS for interactions */}
      <style>{`
        .essay-panel-container:hover .essay-parallax-img {
          filter: grayscale(40%) !important;
        }
        .essay-panel-container:hover .essay-gradient {
          background: linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.2) 100%) !important;
        }
        .essay-panel-container:hover .essay-title {
          transform: translateY(-8px);
        }
        .essay-panel-container:hover .essay-cta {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .essay-panel-container:hover .essay-cta span:first-child {
          border-bottom-color: #ffffff !important;
        }
      `}</style>
    </section>
  );
}
