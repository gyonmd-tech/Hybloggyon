import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminPageHeader from '../../../../../features/admin/components/AdminPageHeader';
import { siteContentSections } from '../../../../../features/admin/site-content-flow';
import { requireAdmin } from '../../../../../lib/auth/session';

export default async function SiteContentSectionPage({ params }) {
  const { section } = await params;
  const config = siteContentSections[section];
  if (!config) notFound();
  await requireAdmin(`/admin/content/${section}`);

  return <>
    <AdminPageHeader
      eyebrow="Page flow"
      title={config.title}
      description={`${config.description} Pilih satu bagian agar formulir tetap fokus dan mudah dirawat.`}
      action={<Link href={config.publicPath} target="_blank" className="admin-button"><span className="material-symbols-outlined" aria-hidden="true">open_in_new</span>Preview halaman</Link>}
    />
    <div className="admin-flow-heading">
      <span className="admin-kicker">{String(config.groups.length).padStart(2, '0')} bagian konten</span>
      <p>Setiap bagian disimpan secara terarah. Konten lain pada halaman yang sama tetap dipertahankan.</p>
    </div>
    <div className="admin-content-cards admin-content-cards--flow">
      {config.groups.map((group, index) => (
        <Link className="admin-content-card admin-content-card--flow" href={`/admin/content/${section}/${group.slug}`} key={group.slug}>
          <span className="admin-flow-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="material-symbols-outlined" aria-hidden="true">{group.icon}</span>
          <div><h2>{group.title}</h2><p>{group.description}</p></div>
          <span className="material-symbols-outlined admin-flow-arrow" aria-hidden="true">arrow_outward</span>
        </Link>
      ))}
    </div>
  </>;
}
