import { notFound } from 'next/navigation';
import FolderView from '../../../features/archive/FolderView';
import { getArchiveFolder, getArchiveFolders } from '../../../lib/content/archive';
import { getContentSource } from '../../../lib/content/posts';
import { getResolvedSiteContent } from '../../../lib/content/site-content';

export const revalidate = 300;

export async function generateStaticParams() {
  if (getContentSource() === 'database') return [];
  return (await getArchiveFolders()).map(({ slug }) => ({ folder: slug }));
}

export async function generateMetadata({ params }) {
  const { folder: slug } = await params;
  const folder = await getArchiveFolder(slug);
  if (!folder) return {};

  return {
    title: `${folder.name} — Arsip`,
    description: folder.description || `${folder.count} tulisan dalam folder ${folder.name}.`,
    alternates: { canonical: `/archive/${folder.slug}` },
  };
}

export default async function ArchiveFolderPage({ params }) {
  const { folder: slug } = await params;
  const [folder, footerContent] = await Promise.all([
    getArchiveFolder(slug),
    getResolvedSiteContent('about'),
  ]);
  if (!folder) notFound();

  return <FolderView folder={folder} footerContent={footerContent} />;
}
