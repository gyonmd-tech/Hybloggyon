import HobbyView from '../../features/hobby/HobbyView';
import { getResolvedSiteContent } from '../../lib/content/site-content';

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
  return <HobbyView content={content} footerContent={footerContent} />;
}
