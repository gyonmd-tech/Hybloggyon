'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroBanner from '../../components/HeroBanner';
import MarqueeTicker from '../../components/MarqueeTicker';
import IntroDescription from '../../components/IntroDescription';
import LatestTopics from '../../components/LatestTopics';
import FeaturedEssays from '../../components/FeaturedEssays';
import AccentQuote from '../../components/AccentQuote';
import HobbiesScroll from '../../components/HobbiesScroll';
import CuratedConsumption from '../../components/CuratedConsumption';
import LoggedObservations from '../../components/LoggedObservations';
import ClassificationGrid from '../../components/ClassificationGrid';
import Timeline from '../../components/Timeline';
import ManifestoAbout from '../../components/ManifestoAbout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoadingScreen from '../../components/LoadingScreen';

export default function HomeView({ posts, content, footerContent }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div className="grain-overlay-body" aria-hidden="true" />

      <Header />

      <main>
        <HeroBanner content={content.hero} />
        <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--color-background-ash)' }}>
          <MarqueeTicker text={content.ticker} />
          <IntroDescription content={content.intro} />

          {/* Navigasi Kategori (Dipindah ke atas agar pengunjung bisa langsung melompat ke topik spesifik) */}
          <ClassificationGrid posts={posts} />

          <LatestTopics posts={posts} />
          <FeaturedEssays posts={posts} />

          <AccentQuote content={content.quote} />

          {/* Konten Personal / Sekunder */}
          <HobbiesScroll items={content.hobbies} />
          <CuratedConsumption items={content.showcase} />
          <LoggedObservations logs={content.logs} />

          <Timeline events={content.timeline} />
          <ManifestoAbout content={content.manifesto} />
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer contact={footerContent} />
      </div>
    </>
  );
}
