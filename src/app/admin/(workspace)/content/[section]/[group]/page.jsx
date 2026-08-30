import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminPageHeader from '../../../../../../features/admin/components/AdminPageHeader';
import SiteContentEditor from '../../../../../../features/admin/components/SiteContentEditor';
import { getSiteContentGroup, siteContentSections } from '../../../../../../features/admin/site-content-flow';
import { requireAdmin } from '../../../../../../lib/auth/session';
import { getSiteSetting } from '../../../../../../lib/db/repositories/settings';
import { siteContentDefaults } from '../../../../../../content/site-content';
import { parseSiteContent } from '../../../../../../lib/content/site-content-contracts';

export default async function SiteContentGroupPage({ params }) {
  const { section, group } = await params;
  const config = siteContentSections[section];
  const groupConfig = getSiteContentGroup(section, group);
  if (!config || !groupConfig) notFound();
  await requireAdmin(`/admin/content/${section}/${group}`);
  const setting = await getSiteSetting(`site_content_${section}`);
  let initialContent = siteContentDefaults[section];
  if (setting?.value) {
    try { initialContent = parseSiteContent(section, setting.value); } catch { /* gunakan default tervalidasi */ }
  }
  const currentIndex = config.groups.findIndex((item) => item.slug === group);
  const previous = config.groups[currentIndex - 1];
  const next = config.groups[currentIndex + 1];

  return <>
    <AdminPageHeader
      eyebrow={`${config.title} / ${String(currentIndex + 1).padStart(2, '0')}`}
      title={groupConfig.title}
      description={groupConfig.description}
      action={<Link href={`/admin/content/${section}`} className="admin-button"><span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>Semua bagian</Link>}
    />
    <nav className="admin-flow-rail" aria-label={`Alur konten ${config.title}`}>
      {config.groups.map((item, index) => <Link key={item.slug} href={`/admin/content/${section}/${item.slug}`} className={item.slug === group ? 'is-active' : ''}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</Link>)}
    </nav>
    <SiteContentEditor section={section} group={group} initialContent={initialContent} />
    <div className="admin-flow-pagination">
      {previous ? <Link href={`/admin/content/${section}/${previous.slug}`} className="admin-button">← {previous.title}</Link> : <span />}
      {next ? <Link href={`/admin/content/${section}/${next.slug}`} className="admin-button">{next.title} →</Link> : <Link href={`/admin/content/${section}`} className="admin-button">Selesai</Link>}
    </div>
  </>;
}
