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
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();
  const closeTimerRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      // Hide header when scrolling down, show when scrolling up
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
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMenuOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setMenuOpen(false);
      setHoveredPath(null);
    }, 300); // slightly longer delay for better UX
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'transparent',
          zIndex: 102,
        }}
      />

      <motion.div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ 
          y: isHidden && !menuOpen ? -150 : 0, 
          x: '-50%',
          opacity: 1 
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 20px 40px 20px',
          marginTop: '-10px',
        }}
      >
        {/* Logo Container - Wider & Slimmer */}
        <motion.a
          href="/"
          whileHover="hover"
          initial="initial"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: scrolled && !menuOpen
              ? 'rgba(18, 18, 20, 0.85)'
              : 'rgba(18, 18, 20, 0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '999px',
            padding: '10px 48px', // Slimmer vertically, wider horizontally
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: menuOpen 
              ? '0 16px 40px rgba(0,0,0,0.4)' 
              : '0 8px 24px rgba(0,0,0,0.2)',
            position: 'relative',
            overflow: 'hidden',
            willChange: 'transform, backdrop-filter, background-color',
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)',
              pointerEvents: 'none',
              borderRadius: '999px',
            }}
          />
          
          {/* Animated Symbol */}
          <motion.span
            variants={{
              initial: { rotate: 0, scale: 1 },
              hover: { rotate: 180, scale: 1.2 }
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{
              color: '#ffffff',
              marginRight: '12px',
              fontSize: '18px',
              display: 'inline-block',
              zIndex: 1,
            }}
          >
            ✦
          </motion.span>

          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 400, // Sleeker weight
              fontSize: '22px', // Slightly smaller vertically
              letterSpacing: '-0.04em', // Tighter tracking for elegance
              color: '#ffffff',
              lineHeight: 1,
              position: 'relative',
              zIndex: 1,
            }}
          >
            HyBloggyon
          </span>
        </motion.a>

        {/* Floating Menu Pill - Dark Theme */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(18, 18, 20, 0.85)', // Dark background
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '999px',
                padding: '6px 12px', // Slimmer vertically, wider horizontally
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
                willChange: 'transform, opacity, backdrop-filter',
              }}
            >
              <nav
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  position: 'relative',
                }}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {NAV_ITEMS.map((item, i) => {
                  const isActive = 
                    location.pathname === item.href || 
                    (item.href !== '/' && location.pathname.startsWith(item.href));
                  const isHovered = hoveredPath === item.href;

                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        delay: i * 0.04, 
                        type: 'spring', 
                        stiffness: 400, 
                        damping: 25 
                      }}
                      onMouseEnter={() => setHoveredPath(item.href)}
                      style={{
                        position: 'relative',
                        padding: '8px 28px', // Slimmer vertically, wider horizontally
                        textDecoration: 'none',
                        zIndex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {/* Hover Pill Background (Light glass effect on dark bg) */}
                      {isHovered && !isActive && (
                        <motion.div
                          layoutId="nav-hover"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '999px',
                            zIndex: -1,
                          }}
                        />
                      )}
                      
                      {/* Active Pill Background (White pill) */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: '#ffffff',
                            borderRadius: '999px',
                            zIndex: -1,
                            boxShadow: '0 4px 12px rgba(255,255,255,0.2)'
                          }}
                        />
                      )}

                      {/* Text */}
                      <span
                        style={{
                          position: 'relative',
                          fontFamily: 'Switzer, var(--font-sans)', // Elegant Sans instead of rigid mono
                          fontSize: '12px',
                          fontWeight: isActive ? 600 : 500,
                          letterSpacing: '0.15em', // Wider tracking for premium look
                          textTransform: 'uppercase',
                          color: isActive ? 'var(--color-ink)' : (isHovered ? '#ffffff' : 'rgba(255,255,255,0.5)'),
                          transition: 'color 0.2s',
                          whiteSpace: 'nowrap',
                          zIndex: 2,
                        }}
                      >
                        {item.label}
                      </span>
                    </motion.a>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
