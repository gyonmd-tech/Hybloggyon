import Link from 'next/link';
import AdminPageHeader from '../../../features/admin/components/AdminPageHeader';
import EmptyState from '../../../features/admin/components/EmptyState';
import { getAdminDashboard } from '../../../lib/db/repositories/admin';
import { requireAdmin } from '../../../lib/auth/session';

function formatDate(value) {
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(value);
}

export default async function AdminDashboardPage() {
  await requireAdmin('/admin');
  const dashboard = await getAdminDashboard();
  const { counts } = dashboard;
  const maxPublication = Math.max(1, ...dashboard.publications.map((item) => item.value));
  return (
    <>
      <AdminPageHeader
        eyebrow="Ikhtisar editorial"
        title="Selamat datang kembali."
        description="Pantau ritme publikasi, lanjutkan draft terakhir, atau mulai menyusun gagasan baru."
        action={(
          <Link href="/admin/posts/new" className="admin-button admin-button--primary">
            <span className="material-symbols-outlined" aria-hidden="true">add</span>
            Artikel baru
          </Link>
        )}
      />

      <section className="admin-stat-grid" aria-label="Statistik konten">
        <article className="admin-stat">
          <span className="admin-kicker">Seluruh tulisan</span>
          <div><strong className="admin-stat-value">{counts.all}</strong><p className="admin-stat-detail">artikel di database</p></div>
        </article>
        <article className="admin-stat">
          <span className="admin-kicker">Sudah terbit</span>
          <div><strong className="admin-stat-value">{counts.published}</strong><p className="admin-stat-detail">tersedia untuk pembaca</p></div>
        </article>
        <article className="admin-stat">
          <span className="admin-kicker">Masih dirawat</span>
          <div><strong className="admin-stat-value">{counts.draft}</strong><p className="admin-stat-detail">draft belum selesai</p></div>
        </article>
        <article className="admin-stat">
          <span className="admin-kicker">Akan datang</span>
          <div><strong className="admin-stat-value">{counts.scheduled}</strong><p className="admin-stat-detail">artikel terjadwal</p></div>
        </article>
      </section>

      <section className="admin-insight-grid">
        <article className="admin-panel admin-publication-chart">
          <div className="admin-panel-header"><div><h2 className="admin-panel-title">Ritme publikasi</h2><p className="admin-help">Enam bulan terakhir</p></div><span className="material-symbols-outlined" aria-hidden="true">bar_chart</span></div>
          <div className="admin-chart-body">
            {dashboard.publications.length ? dashboard.publications.map((item) => <div className="admin-chart-column" key={item.month.toISOString()}><strong>{item.value}</strong><i style={{ '--bar-size': `${Math.max(14, item.value / maxPublication * 100)}%` }} /><span>{new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(item.month)}</span></div>) : <p className="admin-help">Belum ada data publikasi pada periode ini.</p>}
          </div>
        </article>
        <article className="admin-panel admin-library-metrics">
          <div className="admin-panel-header"><h2 className="admin-panel-title">Kedalaman arsip</h2><Link href="/admin/system" className="admin-button admin-button--small admin-button--ghost">Buka statistik</Link></div>
          <div className="admin-metric-list">
            <div><span>Revisi tersimpan</span><strong>{dashboard.revisionCount}</strong></div>
            <div><span>Aset media</span><strong>{dashboard.mediaCount}</strong></div>
            <div><span>Seri editorial</span><strong>{dashboard.seriesCount}</strong></div>
            <div><span>Taksonomi</span><strong>{dashboard.categoryCount + dashboard.tagCount}</strong></div>
          </div>
        </article>
      </section>

      <section className="admin-grid admin-grid--dashboard">
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">Terakhir disentuh</h2>
            <Link href="/admin/posts" className="admin-button admin-button--small admin-button--ghost">Semua artikel</Link>
          </div>
          {dashboard.recentPosts.length ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Judul</th><th>Status</th><th>Diperbarui</th><th /></tr></thead>
                <tbody>
                  {dashboard.recentPosts.map((post) => (
                    <tr key={post.id}>
                      <td><p className="admin-table-title">{post.title}</p><p className="admin-table-subtitle">/{post.category}/{post.slug}</p></td>
                      <td><span className={`admin-status admin-status--${post.status}`}>{post.status}</span></td>
                      <td className="admin-meta">{formatDate(post.updatedAt)}</td>
                      <td><Link href={`/admin/posts/${post.id}/edit`} className="admin-button admin-button--small">Edit</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState icon="edit_note" title="Belum ada artikel">Mulai dari artikel pertama untuk mengaktifkan alur editorial.</EmptyState>
          )}
        </div>

        <aside className="admin-panel">
          <div className="admin-panel-header"><h2 className="admin-panel-title">Aktivitas terkini</h2><Link href="/admin/system" className="admin-button admin-button--small admin-button--ghost">Semua log</Link></div>
          <div className="admin-activity-mini">
            {dashboard.recentActivity.length ? dashboard.recentActivity.map((item) => <article key={item.id}><span className={`admin-activity-dot admin-activity-dot--${item.level}`} /><div><strong>{item.message}</strong><p>{item.actorName || 'System'} · {formatDate(item.createdAt)}</p></div></article>) : <p className="admin-help">Aktivitas berikutnya akan tercatat di sini.</p>}
          </div>
        </aside>
      </section>
    </>
  );
}
