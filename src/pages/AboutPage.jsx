// src/pages/AboutPage.jsx
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutOpener    from '../components/about/AboutOpener';
import AboutPortrait  from '../components/about/AboutPortrait';
import AboutManifesto from '../components/about/AboutManifesto';
import AboutBeliefs   from '../components/about/AboutBeliefs';
import AboutConnect   from '../components/about/AboutConnect';
import { aboutData }  from '../content/about-data';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — HyBloggyon</title>
        <meta
          name="description"
          content="Bukan halaman bio. Ini adalah manifesto — pernyataan identitas dan cara pandang dari penulis HyBloggyon."
        />
      </Helmet>

      <div className="grain-overlay-body" aria-hidden="true" />

      <Header />

      <main>
        {/* Section 1: Kalimat pembuka 100vh */}
        <AboutOpener text={aboutData.openerText} />

        {/* Section 2: Foto editorial + metadata */}
        <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--color-background-ash)' }}>
          <AboutPortrait
            name={aboutData.name}
            shortBio={aboutData.shortBio}
            meta={aboutData.meta}
          />

          {/* Section 3: Teks manifesto long-form */}
          <AboutManifesto paragraphs={aboutData.manifestoParagraphs} />
        </div>

        {/* Section 4: Daftar prinsip — dark background */}
        <AboutBeliefs beliefs={aboutData.beliefs} />

        {/* Section 5: Kontak penutup */}
        <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--color-background-ash)' }}>
          <AboutConnect
            email={aboutData.contactEmail}
            socialLinks={aboutData.socialLinks}
          />
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>
    </>
  );
}
