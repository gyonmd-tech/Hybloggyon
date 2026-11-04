import ArchiveView from '../../features/archive/ArchiveView';
import { getAllPosts } from '../../lib/content/posts';
import { getCategories } from '../../lib/content/categories';

export const metadata = {
  title: 'Archive',
  description: 'Arsip seluruh esai, notes, tulisan musik, film, dan anime di HyBloggyon.',
  alternates: { canonical: '/archive' },
};

export default async function ArchivePage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);
  return <ArchiveView posts={posts} categories={categories} />;
}
