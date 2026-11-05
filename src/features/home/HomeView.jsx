'use client';

import HeroBanner from '../../components/HeroBanner';
import MarqueeTicker from '../../components/MarqueeTicker';
import IntroDescription from '../../components/IntroDescription';
import LatestTopics from '../../components/LatestTopics';
import FeaturedEssays from '../../components/FeaturedEssays';
import AccentQuote from '../../components/AccentQuote';
import HobbiesScroll from '../../components/HobbiesScroll';
import Timeline from '../../components/Timeline';
import ManifestoAbout from '../../components/ManifestoAbout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HomeView({ posts, content, footerContent }) {
  return (
    <>
      <div className="grain-overlay-body" aria-hidden="true" />

      <Header />

      <main>
        <HeroBanner content={content.hero} />
        <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--color-background-ash)' }}>
          <MarqueeTicker text={content.ticker} />
          <IntroDescription content={content.intro} />

          <LatestTopics posts={posts} />
          <FeaturedEssays posts={posts} />

          <AccentQuote content={content.quote} />

          {/* Konten Personal / Sekunder */}
          <HobbiesScroll items={content.hobbies} />

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
