import '../styles/global.css';
import { siteConfig } from '../config/site';
import { getResolvedSiteProfile } from '../lib/content/site-settings';

export async function generateMetadata() {
  const profile = await getResolvedSiteProfile();
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: profile.siteTitle, template: `%s — ${profile.siteName}` },
    description: profile.description,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website', locale: siteConfig.locale, siteName: profile.siteName,
      title: profile.siteTitle, description: profile.description,
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

export default function RootLayout({ children }) {
  return (
    <html lang={siteConfig.language} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;700;800&family=Space+Mono:wght@400;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
