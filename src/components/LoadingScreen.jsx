// src/components/LoadingScreen.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    
    // Interval yang sangat cepat (60ms) agar loading selesai dalam < 1 detik
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 20) + 10; // Lompatan persentase besar
      
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // Jeda yang sangat singkat sebelum layar terbelah (snappy)
        setTimeout(() => {
          onComplete();
        }, 150); 
      }
      
      setProgress(current);
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      // Wrapper utama tidak memiliki bentuk fisik, ia hanya menjadi wadah yang menunda kehancurannya sendiri
      // agar pintu atas dan bawah punya waktu 0.8s untuk bergeser sebelum wrapper benar-benar hilang dari DOM.
      exit={{ opacity: 0, transition: { delay: 0.8, duration: 0.1 } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all',
      }}
    >
      {/* 1. THE SPLIT DOORS (Layar yang Terbelah) */}
      
      {/* Pintu Atas */}
      <motion.div
        exit={{ y: '-100vh' }} // Meluncur ke atas sejauh tinggi layar
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Kurva easing elegan
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50vh',
          backgroundColor: 'var(--color-ink)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      />

      {/* Pintu Bawah */}
      <motion.div
        exit={{ y: '100vh' }} // Meluncur ke bawah sejauh tinggi layar
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50vh',
          backgroundColor: 'var(--color-ink)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      />


      {/* 2. THE WEIRD SHAPE (Konten Utama di Tengah) */}
      <motion.div
        exit={{ scale: 0, opacity: 0 }} // Bentuk tengah menyusut dan menghilang lebih cepat
        transition={{ duration: 0.4, ease: 'backIn' }}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Bintang Y2K / Sparkle Berputar (Depan) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          style={{
            fontSize: 'clamp(150px, 30vw, 350px)', // Ukuran raksasa proporsional layar
            color: 'var(--color-accent-green)',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="1em" height="1em" viewBox="0 0 100 100" fill="currentColor">
            {/* Bentuk bintang tajam khas brutalist */}
            <path d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z" />
          </svg>
        </motion.div>

        {/* Bintang Y2K Bayangan (Belakang, berputar terbalik) */}
        <motion.div
          animate={{ rotate: -180 }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          style={{
            position: 'absolute',
            fontSize: 'clamp(180px, 35vw, 400px)',
            color: 'rgba(255,255,255,0.03)',
            zIndex: -1,
          }}
        >
          <svg width="1em" height="1em" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z" />
          </svg>
        </motion.div>

        {/* HUD: Angka Persentase di Tengah Bintang */}
        <div
          style={{
            position: 'absolute',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(16px, 3vw, 24px)',
            fontWeight: 'bold',
            color: 'var(--color-ink)', 
            backgroundColor: 'var(--color-accent-green)', // Pil berbentuk oval
            padding: '4px 16px',
            borderRadius: '100px',
            border: '2px solid var(--color-ink)', // Memisahkan dari bentuk bintang
            boxShadow: '0 0 0 2px var(--color-accent-green)', // Ilusi outline tambahan
          }}
        >
          {progress}%
        </div>
      </motion.div>
      

      {/* 3. MINIMAL HUD OVERLAY (Dekorasi Sudut) */}
      <motion.div
        exit={{ opacity: 0 }}
        style={{
          position: 'absolute',
          inset: '24px', // Jarak dari tepi layar
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.4)',
          zIndex: 10,
        }}
      >
        {/* Sudut Atas Kiri & Kanan */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>SYS.BOOT_</span>
          <span>v4.0.0</span>
        </div>
        
        {/* Sudut Bawah Kiri & Kanan */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: progress === 100 ? 'var(--color-accent-green)' : 'inherit' }}>
            {progress === 100 ? 'DOM INITIALIZED' : 'FETCHING VIBES...'}
          </span>
          <span>{progress === 100 ? '[ OK ]' : '[ WAIT ]'}</span>
        </div>
      </motion.div>

    </motion.div>
  );
}
