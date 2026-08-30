import ArchiveView from '../../features/archive/ArchiveView';
import { getAllPosts } from '../../lib/content/posts';

export const metadata = {
  title: 'Archive',
  description: 'Arsip seluruh esai, notes, tulisan musik, film, dan anime di HyBloggyon.',
  alternates: { canonical: '/archive' },
};

export default async function ArchivePage() {
  return <ArchiveView posts={await getAllPosts()} />;
}
