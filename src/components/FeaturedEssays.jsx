// src/components/FeaturedEssays.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Gambar hero per kategori ─────────────────────────────────────────────────
const CATEGORY_IMAGES = {
  'esai':       'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=75',
  'notes':      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=75',
  'film-anime': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=75',
  'musik':      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=75',
};

// ── Load semua MDX posts ──────────────────────────────────────────────────────
const mdxModules = import.meta.glob('/src/content/posts/*.mdx', { eager: true });

const ALL_POSTS = Object.values(mdxModules)
  .map(mod => mod.frontmatter)
  .filter(p => p?.slug && p?.title)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// Prioritaskan featured: true, kalau kurang dari 3 tambah dari terbaru
const featuredPosts = ALL_POSTS.filter(p => p.featured === true);
const fillerPosts   = ALL_POSTS.filter(p => p.featured !== true);
const sourcePosts   = [...featuredPosts, ...fillerPosts].slice(0, 3);

const ESSAYS = sourcePosts.map((p, i) => ({
  id:       i + 1,
  tag:      `${(p.category ?? 'esai').toUpperCase().replace('-', ' & ')} // ${(p.tags?.[0] ?? 'refleksi').toUpperCase()}`,
  title:    p.title,
  subtitle: p.subtitle ?? p.excerpt ?? '',
  href:     `/${p.category}/${p.slug}`,
  image:    CATEGORY_IMAGES[p.category] ?? CATEGORY_IMAGES['esai'],
}));

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
      {/* Editorial Brutalist Section Header Transition */}
      <div
        style={{
          padding: 'clamp(80px, 12vw, 160px) clamp(20px, 3vw, 40px) 0 clamp(20px, 3vw, 40px)',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', borderBottom: '2px solid #ffffff', paddingBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-green)',
              }}
            >
              [ Sorotan Utama ]
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>
              VOL. 01
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 400, // Minimalist, not too bold
              fontSize: 'clamp(40px, 8vw, 80px)',
              letterSpacing: '-0.02em',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            Esai Pilihan
          </h2>
        </div>
      </div>

      {/* Essay panels */}
      {ESSAYS.map((essay, i) => (
        <a
          key={essay.id}
          href={essay.href}
          className="essay-panel-container"
          style={{
            position: 'relative',
            display: 'block',
            height: 'clamp(70vh, 100svh, 100svh)',
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
              bottom: 'clamp(24px, 5vw, 60px)',
              left: 'clamp(24px, 4vw, 48px)',
              right: 'auto',
              textAlign: 'left',
              zIndex: 2,
              maxWidth: '90%',
            }}
          >
            <h2
              className="essay-title"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                fontSize: 'clamp(36px, 7vw, 110px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                marginBottom: '12px',
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
        @media (max-width: 768px) {
          .essay-sorotan-badge { display: none; }
          /* Force all overlays left on mobile */
          .essay-content-overlay {
            left: 24px !important;
            right: auto !important;
            text-align: left !important;
            transform: none !important;
            max-width: calc(100% - 48px) !important;
          }
          /* Always show CTA on mobile - no hover */
          .essay-cta {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </section>
  );
}
