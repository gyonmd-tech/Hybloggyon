import Image from 'next/image';

export default function HeroBanner({ content }) {
  return (
    <section className="hero-section hero-section--fast">
      <Image className="hero-image" src={content.imageUrl} alt="" fill priority fetchPriority="high" sizes="100vw" quality={72} style={{ objectFit: 'cover', objectPosition: 'center' }} />
      <div className="hero-fast-overlay" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <div className="hero-center hide-mobile"><h1>{content.title}</h1></div>
      <div className="hero-frame">
        <div className="hero-row-top"><span>{content.edition}</span><span>{content.coordinates}</span></div>
        <div className="hero-row-bottom">
          <div className="hero-desc-block"><h1 className="hide-desktop">{content.title}</h1><span className="hero-eyebrow">{content.eyebrow}</span><p>{content.description}</p></div>
          <div className="hero-align-right"><span className="hero-investigating">Investigating // active</span><a href={content.ctaUrl} className="hero-cta-btn"><span>{content.ctaLabel}</span><span aria-hidden="true">→</span></a></div>
        </div>
      </div>
    </section>
  );
}
