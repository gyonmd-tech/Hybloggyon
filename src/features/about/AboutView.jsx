'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AboutOpener from '../../components/about/AboutOpener';
import AboutPortrait from '../../components/about/AboutPortrait';
import AboutManifesto from '../../components/about/AboutManifesto';
import AboutBeliefs from '../../components/about/AboutBeliefs';
import AboutConnect from '../../components/about/AboutConnect';
export default function AboutView({ content }) {
  return (
    <>
      <div className="grain-overlay-body" aria-hidden="true" />

      <Header />

      <main>
        {/* Section 1: Kalimat pembuka 100vh */}
        <AboutOpener text={content.openerText} />

        {/* Section 2: Foto editorial + metadata */}
        <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--color-background-ash)' }}>
          <AboutPortrait
            name={content.name}
            shortBio={content.shortBio}
            meta={content.meta}
            portraitImage={content.portraitImage}
          />

          {/* Section 3: Teks manifesto long-form */}
          <AboutManifesto paragraphs={content.manifestoParagraphs} />
        </div>

        {/* Section 4: Daftar prinsip — dark background */}
        <AboutBeliefs beliefs={content.beliefs} />

        {/* Section 5: Kontak penutup */}
        <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--color-background-ash)' }}>
          <AboutConnect
            email={content.contactEmail}
            socialLinks={content.socialLinks}
          />
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer contact={content} />
      </div>
    </>
  );
}
