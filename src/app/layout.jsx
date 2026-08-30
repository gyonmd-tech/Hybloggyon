import '../styles/global.css';
import { absoluteUrl, siteConfig } from '../config/site';
import { getResolvedSiteProfile } from '../lib/content/site-settings';
import {
  buildSiteStructuredData,
  serializeStructuredData,
} from '../lib/seo/structured-data';

// Konten produksi dikelola dari database. SSR menjaga build tidak bergantung
// pada koneksi database eksternal sekaligus mempertahankan HTML lengkap untuk SEO.
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const profile = await getResolvedSiteProfile();
  const verification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: profile.siteName,
    title: { default: profile.siteTitle, template: `%s — ${profile.siteName}` },
    description: profile.description,
    authors: [{ name: profile.authorName, url: '/about' }],
    creator: profile.authorName,
    publisher: profile.authorName,
    alternates: {
      canonical: '/',
      types: { 'application/rss+xml': absoluteUrl('/feed.xml') },
    },
    manifest: '/manifest.webmanifest',
    icons: { icon: '/favicon.svg' },
    verification: verification ? { google: verification } : undefined,
    formatDetection: { telephone: false },
    openGraph: {
      type: 'website', locale: siteConfig.locale, siteName: profile.siteName,
      url: '/', title: profile.siteTitle, description: profile.description,
      images: profile.defaultOgImage ? [profile.defaultOgImage] : [],
    },
    twitter: {
      card: 'summary_large_image', title: profile.siteTitle, description: profile.description,
      images: profile.defaultOgImage ? [profile.defaultOgImage] : [],
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4f4f5',
};

export default async function RootLayout({ children }) {
  const profile = await getResolvedSiteProfile();
  const structuredData = serializeStructuredData(buildSiteStructuredData(profile));

  return (
    <html lang={siteConfig.language} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
