import NotesView from '../../features/notes/NotesView';
import { getAllPosts } from '../../lib/content/posts';
import { getResolvedSiteContent } from '../../lib/content/site-content';

export const metadata = {
  title: 'Notes',
  description:
    'Kumpulan catatan, pemikiran yang belum selesai, dan fragmen observasi dari HyBloggyon.',
  alternates: { canonical: '/notes' },
};

export default async function NotesPage() {
  const [posts, content, footerContent] = await Promise.all([
    getAllPosts(),
    getResolvedSiteContent('notes'),
    getResolvedSiteContent('about'),
  ]);
  return <NotesView posts={posts} content={content} footerContent={footerContent} />;
}
