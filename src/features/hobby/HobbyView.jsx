'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HobbyHero from '../../components/hobby/HobbyHero';
import RecordCrate from '../../components/hobby/RecordCrate';
import ScreeningRoom from '../../components/hobby/ScreeningRoom';
import ReadingShelf from '../../components/hobby/ReadingShelf';
import SideGlances from '../../components/hobby/SideGlances';
import HobbyFooter from '../../components/hobby/HobbyFooter';
export default function HobbyView({ content, footerContent }) {
  return (
    <>
      <div className="grain-overlay-body" aria-hidden="true" />

      <Header />

      <main>
        {/* Section 1: Hero 100vh — Typographic Fog */}
        <HobbyHero content={content.hero} />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: 'var(--color-background-ash)',
          }}
        >
          {/* Section 2: RecordCrate — horizontal scroll kartu musik */}
          <RecordCrate music={content.music} />

          {/* Section 3: ScreeningRoom — featured + grid film */}
          <ScreeningRoom watchlist={content.watchlist} />

          {/* Section 4: ReadingShelf — daftar vertikal buku */}
          <ReadingShelf books={content.books} />

          {/* Section 5: SideGlances — grid observasi */}
          <SideGlances observations={content.observations} />

          {/* Section 6: HobbyFooter — penutup */}
          <HobbyFooter lastUpdated={content.lastUpdated} />
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer contact={footerContent} />
      </div>
    </>
  );
}
