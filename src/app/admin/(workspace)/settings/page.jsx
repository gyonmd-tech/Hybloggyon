import AdminPageHeader from '../../../../features/admin/components/AdminPageHeader';
import { PasswordForm, SiteProfileForm } from '../../../../features/admin/components/SettingsForms';
import { siteConfig } from '../../../../config/site';
import { getAdminSiteProfile } from '../../../../lib/db/repositories/admin';
import { requireAdmin } from '../../../../lib/auth/session';

export default async function SettingsPage() {
  await requireAdmin('/admin/settings');
  const savedProfile = await getAdminSiteProfile();
  const profile = {
    siteName: savedProfile?.siteName || siteConfig.name,
    siteTitle: savedProfile?.siteTitle || siteConfig.title,
    description: savedProfile?.description || siteConfig.description,
    authorName: savedProfile?.authorName || siteConfig.name,
    authorBio: savedProfile?.authorBio || '',
    defaultOgImage: savedProfile?.defaultOgImage || '/images/og/default.webp',
    postsPerPage: savedProfile?.postsPerPage || 20,
  };

  return (
    <>
      <AdminPageHeader eyebrow="Sistem" title="Pengaturan" description="Kelola identitas publik, metadata SEO utama, keamanan akun, dan lihat status sumber data." />
      <div className="admin-grid admin-grid--dashboard">
        <section className="admin-panel">
          <div className="admin-panel-header"><h2 className="admin-panel-title">Identitas situs & SEO</h2><span className="admin-meta">Publik</span></div>
          <div className="admin-panel-body"><SiteProfileForm profile={profile} /></div>
        </section>
        <aside className="admin-form-stack">
          <section className="admin-panel">
            <div className="admin-panel-header"><h2 className="admin-panel-title">Status sistem</h2></div>
            <div className="admin-panel-body admin-form-stack">
              <div><p className="admin-kicker">Sumber konten publik</p><p style={{ marginTop: 4 }}>{process.env.CONTENT_SOURCE || 'markdown'}</p></div>
              <div><p className="admin-kicker">Database</p><p style={{ marginTop: 4 }}>Terhubung</p></div>
              <div><p className="admin-kicker">Penyimpanan media</p><p style={{ marginTop: 4 }}>{process.env.MEDIA_STORAGE || 'local'}</p></div>
              {(process.env.CONTENT_SOURCE || 'markdown') === 'markdown' ? <div className="admin-notice">Artikel dari panel tersimpan di database, tetapi situs publik masih membaca Markdown. Ubah sumber setelah proses migrasi konten selesai.</div> : null}
            </div>
          </section>
          <section className="admin-panel">
            <div className="admin-panel-header"><h2 className="admin-panel-title">Keamanan akun</h2></div>
            <div className="admin-panel-body"><PasswordForm /></div>
          </section>
        </aside>
      </div>
    </>
  );
}
