import HobbyView from '../../features/hobby/HobbyView';
import { getResolvedSiteContent } from '../../lib/content/site-content';
import { withTmdbBackdrops } from '../../lib/media/tmdb';

export const metadata = {
  title: 'Kurasi',
  description:
    'Musik, film, buku, dan catatan lepas yang membentuk sudut pandang HyBloggyon.',
  alternates: { canonical: '/hobby' },
};

export default async function HobbyPage() {
  const [content, footerContent] = await Promise.all([
    getResolvedSiteContent('hobby'),
    getResolvedSiteContent('about'),
  ]);
  const watchlist = await withTmdbBackdrops(content.watchlist);
  return <HobbyView content={{ ...content, watchlist }} footerContent={footerContent} />;
}
