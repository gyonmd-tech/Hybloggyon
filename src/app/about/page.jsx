import AboutView from '../../features/about/AboutView';
import { getResolvedSiteContent } from '../../lib/content/site-content';

export const metadata = {
  title: 'About',
  description:
    'Bukan halaman bio. Ini adalah manifesto — pernyataan identitas dan cara pandang dari penulis HyBloggyon.',
  alternates: { canonical: '/about' },
};

export default async function AboutPage() {
  return <AboutView content={await getResolvedSiteContent('about')} />;
}
