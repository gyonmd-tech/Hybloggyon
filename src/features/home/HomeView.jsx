import dynamic from 'next/dynamic';
import HeroBanner from '../../components/HeroBanner';
import MarqueeTicker from '../../components/MarqueeTicker';
import IntroDescription from '../../components/IntroDescription';
import LatestTopics from '../../components/LatestTopics';
import FeaturedEssays from '../../components/FeaturedEssays';
import AccentQuote from '../../components/AccentQuote';
import LoggedObservations from '../../components/LoggedObservations';
import ClassificationGrid from '../../components/ClassificationGrid';
import Header from '../../components/Header';

const HobbiesScroll = dynamic(() => import('../../components/HobbiesScroll'));
const CuratedConsumption = dynamic(() => import('../../components/CuratedConsumption'));
const Timeline = dynamic(() => import('../../components/Timeline'));
const ManifestoAbout = dynamic(() => import('../../components/ManifestoAbout'));
const Footer = dynamic(() => import('../../components/Footer'));

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
