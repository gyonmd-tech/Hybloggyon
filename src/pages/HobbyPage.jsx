// src/pages/HobbyPage.jsx
import { Helmet }         from 'react-helmet-async';
import Header             from '../components/Header';
import Footer             from '../components/Footer';
import HobbyHero          from '../components/hobby/HobbyHero';
import RecordCrate        from '../components/hobby/RecordCrate';
import ScreeningRoom      from '../components/hobby/ScreeningRoom';
import ReadingShelf       from '../components/hobby/ReadingShelf';
import SideGlances        from '../components/hobby/SideGlances';
import HobbyFooter        from '../components/hobby/HobbyFooter';
import { hobbyData }      from '../content/hobby-data';

export default function HobbyPage() {
  return (
    <>
      <Helmet>
        <title>Kurasi — HyBloggyon</title>
        <meta
          name="description"
          content="Bukan apa yang kamu tulis — yang membentukmu. Musik, film, buku, dan catatan lepas dari HyBloggyon."
        />
      </Helmet>

      <div className="grain-overlay-body" aria-hidden="true" />

      <Header />

      <main>
        {/* Section 1: Hero 100vh — Typographic Fog */}
        <HobbyHero />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: 'var(--color-background-ash)',
          }}
        >
          {/* Section 2: RecordCrate — horizontal scroll kartu musik */}
          <RecordCrate music={hobbyData.music} />

          {/* Section 3: ScreeningRoom — featured + grid film */}
          <ScreeningRoom watchlist={hobbyData.watchlist} />

          {/* Section 4: ReadingShelf — daftar vertikal buku */}
          <ReadingShelf books={hobbyData.books} />

          {/* Section 5: SideGlances — grid observasi */}
          <SideGlances observations={hobbyData.observations} />

          {/* Section 6: HobbyFooter — penutup */}
          <HobbyFooter />
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>
    </>
  );
}
