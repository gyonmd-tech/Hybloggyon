import Link from 'next/link';
import AdminPageHeader from '../../../../features/admin/components/AdminPageHeader';
import { requireAdmin } from '../../../../lib/auth/session';

const sections = [
  { slug: 'home', icon: 'home', title: 'Beranda', description: 'Hero, ticker, pengantar, minat, showcase, log, timeline, dan manifesto ringkas.' },
  { slug: 'notes', icon: 'sticky_note_2', title: 'Notes', description: 'Current thinking, generator pemikiran acak, dan relasi antarcatatan.' },
  { slug: 'hobby', icon: 'collections_bookmark', title: 'Kurasi / Hobi', description: 'Musik, tontonan, buku, observasi, serta identitas halaman kurasi.' },
  { slug: 'about', icon: 'person', title: 'Tentang', description: 'Profil, foto, manifesto, prinsip, kontak, dan tautan sosial.' },
];

export default async function SiteContentPage() {
  await requireAdmin('/admin/content');
  return <>
    <AdminPageHeader eyebrow="Konten non-artikel" title="Konten situs" description="Kelola semua blok editorial yang tidak termasuk artikel. Setiap perubahan diterbitkan langsung dari database." />
    <div className="admin-content-cards">
      {sections.map((section) => <Link className="admin-content-card" href={`/admin/content/${section.slug}`} key={section.slug}>
        <span className="material-symbols-outlined" aria-hidden="true">{section.icon}</span>
        <div><h2>{section.title}</h2><p>{section.description}</p></div>
        <span aria-hidden="true">→</span>
      </Link>)}
    </div>
  </>;
}
