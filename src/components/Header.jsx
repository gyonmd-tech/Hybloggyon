// src/components/Header.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'NOTES', href: '/notes' },
  { label: 'HOBBY', href: '/hobby' },
  { label: 'ARCHIVE', href: '/archive' },
  { label: 'ABOUT', href: '/about' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  
  // Always render both and hide via CSS to avoid hydration mismatch
  const location = useLocation();
  const closeTimerRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnter = useCallback(() => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setMenuOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => { setMenuOpen(false); setHoveredPath(null); }, 300);
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '1px', backgroundColor: 'transparent', zIndex: 102 }} />

      {/* ── MOBILE FULL-SCREEN OVERLAY ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              backgroundColor: 'rgba(18, 18, 20, 0.97)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'flex-start', padding: '80px 32px', gap: '4px',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'none', border: 'none', color: '#ffffff',
                fontSize: '24px', cursor: 'pointer', lineHeight: 1, padding: '8px',
              }}
              aria-label="Tutup menu"
            >✕</button>

            {NAV_ITEMS.map((item, i) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 25 }}
                  style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 700,
                    fontSize: 'clamp(36px, 12vw, 56px)', letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-accent-green)' : '#ffffff',
                    textDecoration: 'none', lineHeight: 1.2, padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.1)', width: '100%', display: 'block',
                  }}
                >{item.label}</motion.a>
              );
            })}
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginTop: '32px', textTransform: 'uppercase' }}>
              HyBloggyon // Field Study 2026
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN FLOATING HEADER ── */}
      <motion.div
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: isHidden && !menuOpen && !mobileMenuOpen ? -150 : 0, x: '-50%', opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        style={{
          position: 'fixed', top: '24px', left: '50%', zIndex: 100,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '12px', padding: '10px 20px 40px 20px', marginTop: '-10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Logo container */}
          <div
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <motion.a
              href="/"
              whileHover="hover"
              initial="initial"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: scrolled && !menuOpen ? 'rgba(18, 18, 20, 0.95)' : 'var(--color-ink)',
                padding: '10px 20px',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: menuOpen ? '6px 6px 0 rgba(0,0,0,0.8)' : '4px 4px 0 rgba(0,0,0,0.6)',
                transition: 'box-shadow 0.2s',
                gap: '10px',
              }}
            >
              {/* Custom editorial mark: Typewriter style ligature/monogram */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '32px', height: '32px',
                border: '1px solid rgba(255,255,255,0.4)',
                backgroundColor: '#ffffff',
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '-0.05em',
                lineHeight: 1,
              }}>
                Hy
              </div>

              {/* Wordmark */}
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: '16px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#ffffff',
                lineHeight: 1,
                position: 'relative', zIndex: 1,
              }}>
                <span style={{ opacity: 1 }}>Blog</span><span style={{ opacity: 0.5, fontWeight: 300 }}>gyon</span>
              </span>
            </motion.a>
          </div>

          {/* Hamburger button (Mobile only - hidden on md) */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', gap: '6px',
                backgroundColor: 'var(--color-ink)', 
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.6)',
                width: '48px', height: '48px',
                cursor: 'pointer', padding: 0, flexShrink: 0,
              }}
              aria-label="Buka menu navigasi"
            >
              <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#ffffff' }} />
              <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#ffffff' }} />
            </motion.button>
          </div>
        </div>

        {/* Desktop nav menu (Hidden on mobile) */}
        <div className="hidden md:block">
          <AnimatePresence>
            {menuOpen && (
              <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'var(--color-ink)',
                    padding: '8px 16px', border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.6)',
                  }}
                >
                  <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }} onMouseLeave={() => setHoveredPath(null)}>
                    {NAV_ITEMS.map((item, i) => {
                      const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
                      const isHovered = hoveredPath === item.href;
                      return (
                        <motion.a
                          key={item.label} href={item.href}
                          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 25 }}
                          onMouseEnter={() => setHoveredPath(item.href)}
                          style={{ position: 'relative', padding: '8px 24px', textDecoration: 'none', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                          {isHovered && !isActive && (
                            <motion.div layoutId="nav-hover" transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.1)', zIndex: -1 }} />
                          )}
                          {isActive && (
                            <motion.div layoutId="nav-active" transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              style={{ position: 'absolute', inset: 0, backgroundColor: '#ffffff', zIndex: -1 }} />
                          )}
                          <span style={{
                            position: 'relative', fontFamily: 'var(--font-mono)', fontSize: '12px',
                            fontWeight: isActive ? 600 : 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: isActive ? 'var(--color-ink)' : (isHovered ? '#ffffff' : 'rgba(255,255,255,0.5)'),
                            transition: 'color 0.2s', whiteSpace: 'nowrap', zIndex: 2,
                          }}>{item.label}</span>
                        </motion.a>
                      );
                    })}
                  </nav>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
