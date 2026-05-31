// src/animations/introSequence.js
import gsap from 'gsap';

export function runIntroSequence() {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  // 1. nav-border-top grows from left to right
  tl.fromTo('.nav-border-top',
    { scaleX: 0, transformOrigin: 'left' },
    { scaleX: 1, duration: 0.8 }
  )

  // 2. Site title chars appear
  .fromTo('.site-title-char',
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, stagger: 0.04, duration: 0.6 },
    '-=0.4'
  )

  // 3. Nav items fade in
  .fromTo('.nav-item',
    { opacity: 0, y: -8 },
    { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 },
    '-=0.3'
  )

  // 4. Hero image scale
  .fromTo('.hero-image',
    { scale: 1.08 },
    { scale: 1.0, duration: 1.4, ease: 'power3.out' },
    '-=0.4'
  )

  // 5. Hero overlay text
  .fromTo('.hero-overlay-line',
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.12, duration: 0.9 },
    '-=0.8'
  );

  return tl;
}
