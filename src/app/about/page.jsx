import AboutView from '../../features/about/AboutView';

export const metadata = {
  title: 'About',
  description:
    'Bukan halaman bio. Ini adalah manifesto — pernyataan identitas dan cara pandang dari penulis HyBloggyon.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutView />;
}
