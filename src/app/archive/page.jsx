import ArchiveView from '../../features/archive/ArchiveView';
import { getAllPosts } from '../../lib/content/posts';
import { getArchiveFolders } from '../../lib/content/archive';
import { getResolvedSiteContent } from '../../lib/content/site-content';

export const metadata = {
  title: 'Archive',
  description: 'Lemari arsip HyBloggyon: tulisan dikelompokkan per seri seperti folder, bisa dicari dan dibaca berurutan.',
  alternates: { canonical: '/archive' },
};

export default async function ArchivePage() {
  const [posts, folders, footerContent] = await Promise.all([
    getAllPosts(),
    getArchiveFolders(),
    getResolvedSiteContent('about'),
  ]);
  return <ArchiveView posts={posts} folders={folders} footerContent={footerContent} />;
}
