// src/components/HobbiesScroll.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HOBBIES = [
  {
    id: 1,
    label: 'MUSIK',
    title: 'MENDENGARKAN\nALBUM PENUH',
    description: 'Dari Radiohead sampai Fisip Musik — satu album, satu suasana tanpa skip.',
    tag: '[ LISTENING ]',
    bg: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=75',
    accent: 'var(--color-accent-green)',
  },
  {
    id: 2,
    label: 'FILM',
    title: 'MENONTON\nSINEMA PELAN',
    description: 'Film yang tidak terburu-buru — Tarkovsky, Fassbinder, Ozu, menangkap waktu.',
    tag: '[ WATCHING ]',
    bg: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=75',
    accent: 'var(--color-accent-warm)',
  },
  {
    id: 3,
    label: 'MEMBACA',
    title: 'BUKU FISIK\nYANG BERAT',
    description: 'Filosofi, sastra terjemahan, dan buku yang membutuhkan dua kali baca.',
    tag: '[ READING ]',
    bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=75',
    accent: 'var(--color-wasabi)',
  },
  {
    id: 4,
    label: 'MENULIS',
    title: 'CATATAN\nTANGAN PANJANG',
    description: 'Jurnal analog sebagai jeda dari layar — pena dan kertas bergaris.',
    tag: '[ WRITING ]',
    bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=75',
    accent: 'var(--color-accent-green)',
  },
  {
    id: 5,
    label: 'ARSITEKTUR',
    title: 'JALAN KAKI\nMELIHAT BANGUNAN',
    description: 'Brutalism, Bauhaus, dan bangunan tua yang tidak minta maaf.',
    tag: '[ OBSERVING ]',
    bg: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=75',
    accent: 'var(--color-accent-warm)',
  },
  {
    id: 6,
    label: 'FOTOGRAFI',
    title: 'MEREKAM\nJEDA KOTA',
    description: 'Kamera analog, roll hitam putih, dan keindahan di sudut jalan yang terlupakan.',
    tag: '[ CAPTURING ]',
    bg: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=900&q=75',
    accent: 'var(--color-wasabi)',
  },
  {
    id: 7,
    label: 'BERKENDARA',
    title: 'PERJALANAN\nTANPA TUJUAN',
    description: 'Menyusuri jalan kosong di tengah malam dengan playlist ambient.',
    tag: '[ DRIVING ]',
    bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=75',
    accent: 'var(--color-accent-warm)',
  },
];

export default function HobbiesScroll() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollEl = scrollContainerRef.current;
      
      const getScrollAmount = () => {
        let scrollWidth = scrollEl.scrollWidth;
        // Use exact parentElement.offsetWidth to account for minWidth flex constraints
        let viewportWidth = scrollEl.parentElement.offsetWidth;
        return -(scrollWidth - viewportWidth); 
      };

      const tween = gsap.to(scrollEl, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          // Match pinning duration to exactly the scroll distance
          end: () => `+=${scrollEl.scrollWidth - scrollEl.parentElement.offsetWidth}`, 
          pin: true,
          scrub: true, // Sync langsung dengan Lenis agar konsisten
          invalidateOnRefresh: true,
        }
      });

      // Horizontal Parallax for images inside the scrolling container
      gsap.utils.toArray('.hobby-parallax-img').forEach((img) => {
        gsap.fromTo(img, 
          { backgroundPosition: '0% 50%' },
          {
            backgroundPosition: '100% 50%',
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.hobby-white-card'),
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
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
        height: '100svh',
        display: 'flex',
        backgroundColor: '#f8f8f8', // Changed from dark to match cards
        overflow: 'hidden', // CRITICAL: Prevent native horizontal scroll
        borderBottom: '1px solid rgba(0,0,0,0.1)', // Dark border
      }}
    >
      {/* Left Panel: Static Title Area */}
      <div
        style={{
          width: '35vw',
          minWidth: '320px',
          height: '100%',
          backgroundColor: 'var(--color-accent-green)', // Pop of color to break the black!
          padding: '80px 60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          zIndex: 10,
          borderRight: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '10px 0 30px rgba(0,0,0,0.05)', // Softer shadow for light theme
          overflow: 'hidden', // Keep background decorations inside
        }}
      >
        {/* Giant Background Decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            left: '-10%',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '60vh',
            lineHeight: 1,
            color: 'rgba(0,0,0,0.03)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          *
        </div>

        {/* Content wrapper to stay above background */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'rgba(0,0,0,0.6)', // Dark text
              textTransform: 'uppercase',
              marginBottom: '30px',
            }}
          >
            Observasi Periferal
          </p>

          <div style={{ width: '40px', height: '2px', backgroundColor: 'rgba(0,0,0,0.8)', marginBottom: '30px' }} />

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(48px, 5vw, 72px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)', // Pure black text
              textTransform: 'uppercase',
              marginBottom: '30px',
            }}
          >
            MINAT &<br />
            OBSESI
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'rgba(0,0,0,0.7)',
              maxWidth: '280px',
              marginBottom: '60px',
            }}
          >
            Kumpulan obsesi kecil dan observasi periferal. Hal-hal yang mengisi jeda waktu saat dunia tidak sedang melihat.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'rgba(0,0,0,0.5)', // Dark text
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ display: 'inline-block', width: '30px', height: '1px', backgroundColor: 'rgba(0,0,0,0.3)' }} />
            SCROLL HORIZONTALLY
          </p>
        </div>
      </div>

      {/* Right Panel: Horizontally Scrolling White Cards */}
      <div
        style={{
          display: 'flex',
          height: '100%',
          flexGrow: 1, // Let flex box calculate exactly what's left
          overflow: 'hidden', // CRITICAL: Hides cards off-screen so GSAP can scroll them in
        }}
      >
        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            height: '100%',
            willChange: 'transform',
          }}
        >
          {HOBBIES.map((hobby, i) => (
            <div
              key={hobby.id}
              className="hobby-white-card"
              style={{
                width: '600px', // Wider card
                height: '100%',
                flexShrink: 0,
                backgroundColor: '#f8f8f8', // Solid off-white per reference
                borderRight: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Image banner at the top - now spans full width (no padding) */}
              <div
                className="hobby-parallax-img"
                style={{
                  width: '100%',
                  height: '45%', // Increased image height
                  backgroundImage: `url('${hobby.bg}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: '0% 50%',
                  filter: 'grayscale(100%)',
                }}
              />

              {/* Inner padding for the text content */}
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative' }}>
                


                {/* Content (Bottom aligned) */}
                <div style={{ marginTop: 'auto', position: 'relative', zIndex: 2 }}>
                  {/* Tag */}
                  <div
                    style={{
                      backgroundColor: 'rgba(212, 233, 196, 0.6)', 
                      display: 'inline-block',
                      padding: '4px 12px',
                      marginBottom: '20px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        color: '#1a1a1a',
                      }}
                    >
                      {hobby.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '28px',
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      color: '#111111',
                      marginBottom: '16px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {hobby.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#666666',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {hobby.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
