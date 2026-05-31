// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import HeroBanner from '../components/HeroBanner';
import MarqueeTicker from '../components/MarqueeTicker';
import IntroDescription from '../components/IntroDescription';
import LatestTopics from '../components/LatestTopics';
import FeaturedEssays from '../components/FeaturedEssays';
import AccentQuote from '../components/AccentQuote';
import HobbiesScroll from '../components/HobbiesScroll';
import CuratedConsumption from '../components/CuratedConsumption';
import LoggedObservations from '../components/LoggedObservations';
import ClassificationGrid from '../components/ClassificationGrid';
import Timeline from '../components/Timeline';
import ManifestoAbout from '../components/ManifestoAbout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import { runIntroSequence } from '../animations/introSequence';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        runIntroSequence();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      <Helmet>
        <title>HyBloggyon — Field Study</title>
        <meta name="description" content="HyBloggyon adalah workshop digital untuk preservasi pemikiran — esai panjang, catatan belajar, dan analisis pop-culture dari sudut pandang filosofis." />
      </Helmet>

      <AnimatePresence>
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div className="grain-overlay-body" aria-hidden="true" />

      <Header />

      <main>
        <HeroBanner />
        <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--color-background-ash)' }}>
          <MarqueeTicker />
          <IntroDescription />
          
          {/* Navigasi Kategori (Dipindah ke atas agar pengunjung bisa langsung melompat ke topik spesifik) */}
          <ClassificationGrid />
          
          <LatestTopics />
          <FeaturedEssays />
          
          <AccentQuote />
          
          {/* Konten Personal / Sekunder */}
          <HobbiesScroll />
          <CuratedConsumption />
          <LoggedObservations />
          
          <Timeline />
          <ManifestoAbout />
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>
    </>
  );
}
