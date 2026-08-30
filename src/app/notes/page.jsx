import NotesView from '../../features/notes/NotesView';
import { getAllPosts } from '../../lib/content/posts';

export const metadata = {
  title: 'Notes',
  description:
    'Kumpulan catatan, pemikiran yang belum selesai, dan fragmen observasi dari HyBloggyon.',
  alternates: { canonical: '/notes' },
};

export default async function NotesPage() {
  return <NotesView posts={await getAllPosts()} />;
}
