import { notFound } from 'next/navigation';
import AdminPageHeader from '../../../../../features/admin/components/AdminPageHeader';
import SiteContentEditor from '../../../../../features/admin/components/SiteContentEditor';
import { requireAdmin } from '../../../../../lib/auth/session';
import { getSiteSetting } from '../../../../../lib/db/repositories/settings';
import { siteContentDefaults } from '../../../../../content/site-content';
import { parseSiteContent } from '../../../../../lib/content/site-content-contracts';

const labels = {
  home: ['Beranda', 'Atur narasi utama, showcase, dan blok editorial pada homepage.'],
  notes: ['Notes', 'Atur konten pendamping yang berada di luar artikel Notes.'],
  hobby: ['Kurasi / Hobi', 'Atur musik, film, serial, buku, dan observasi personal.'],
  about: ['Tentang', 'Atur identitas penulis, manifesto, prinsip, dan kanal kontak.'],
};

export default async function SiteContentSectionPage({ params }) {
  const { section } = await params;
  if (!labels[section]) notFound();
  await requireAdmin(`/admin/content/${section}`);
  const setting = await getSiteSetting(`site_content_${section}`);
  let initialContent = siteContentDefaults[section];
  if (setting?.value) {
    try { initialContent = parseSiteContent(section, setting.value); } catch { /* fallback ke default tervalidasi */ }
  }
  return <>
    <AdminPageHeader eyebrow="Konten situs" title={labels[section][0]} description={labels[section][1]} />
    <SiteContentEditor section={section} initialContent={initialContent} />
  </>;
}
