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
          <div className="admin-panel-header"><h2 className="admin-panel-title">Struktur arsip</h2></div>
          <div className="admin-panel-body admin-form-stack">
            <div><p className="admin-kicker">Kategori</p><p className="admin-stat-value" style={{ fontSize: 42 }}>{dashboard.categoryCount}</p></div>
            <div><p className="admin-kicker">Tag aktif</p><p className="admin-stat-value" style={{ fontSize: 42 }}>{dashboard.tagCount}</p></div>
            <div><p className="admin-kicker">Diarsipkan</p><p className="admin-stat-value" style={{ fontSize: 42 }}>{counts.archived}</p></div>
            <Link href="/admin/categories" className="admin-button">Rapikan taksonomi</Link>
          </div>
        </aside>
      </section>
    </>
  );
}
