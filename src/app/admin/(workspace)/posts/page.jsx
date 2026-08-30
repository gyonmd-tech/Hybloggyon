import Link from 'next/link';
import AdminPageHeader from '../../../../features/admin/components/AdminPageHeader';
import EmptyState from '../../../../features/admin/components/EmptyState';
import ConfirmForm from '../../../../features/admin/components/ConfirmForm';
import { archivePostAction, deletePostAction } from '../../../../features/admin/actions';
import { listAdminPosts } from '../../../../lib/db/repositories/admin';
import { requireAdmin } from '../../../../lib/auth/session';

function formatDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(value);
}

function queryString(params, patch) {
  const next = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...params, ...patch })) {
    if (value && value !== 'all') next.set(key, value);
  }
  return `?${next.toString()}`;
}

export default async function AdminPostsPage({ searchParams }) {
  await requireAdmin('/admin/posts');
  const params = await searchParams;
  const filters = {
    search: String(params?.search || ''),
    status: String(params?.status || 'all'),
    category: String(params?.category || 'all'),
    page: Number(params?.page || 1),
  };
  const result = await listAdminPosts(filters);

  return (
    <>
      <AdminPageHeader eyebrow="Konten" title="Artikel" description={`${result.total} tulisan di ruang editorial. Cari, saring, perbarui, atau lanjutkan draft.`} action={<Link href="/admin/posts/new" className="admin-button admin-button--primary"><span className="material-symbols-outlined" aria-hidden="true">add</span>Artikel baru</Link>} />
      {params?.archived ? <div className="admin-notice">Artikel dipindahkan ke arsip.</div> : null}
      {params?.deleted ? <div className="admin-notice">Artikel dan seluruh revisinya telah dihapus.</div> : null}

      <form className="admin-filterbar" method="get">
        <input className="admin-field" type="search" name="search" defaultValue={filters.search} placeholder="Cari judul atau slug…" />
        <select className="admin-select" name="status" defaultValue={filters.status}><option value="all">Semua status</option><option value="draft">Draft</option><option value="scheduled">Terjadwal</option><option value="published">Terbit</option><option value="archived">Arsip</option></select>
        <select className="admin-select" name="category" defaultValue={filters.category}><option value="all">Semua kategori</option>{result.categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}</select>
        <button className="admin-button" type="submit"><span className="material-symbols-outlined" aria-hidden="true">filter_alt</span>Terapkan</button>
      </form>

      <section className="admin-panel">
        {result.posts.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Artikel</th><th>Kategori</th><th>Status</th><th>Terbit</th><th>Diperbarui</th><th /></tr></thead>
              <tbody>{result.posts.map((post) => (
                <tr key={post.id}>
                  <td><p className="admin-table-title">{post.title}</p><p className="admin-table-subtitle">/{post.category}/{post.slug} · {post.readingTime} menit{post.featured ? ' · unggulan' : ''}</p></td>
                  <td>{post.categoryName}</td>
                  <td><span className={`admin-status admin-status--${post.status}`}>{post.status}</span></td>
                  <td className="admin-meta">{formatDate(post.publishedAt)}</td>
                  <td className="admin-meta">{formatDate(post.updatedAt)}</td>
                  <td><div className="admin-actions">
                    <Link href={`/admin/posts/${post.id}/edit`} className="admin-button admin-button--small">Edit</Link>
                    {post.status !== 'archived' ? <ConfirmForm action={archivePostAction} fields={{ id: post.id }} message={`Arsipkan “${post.title}”?`}><button className="admin-button admin-button--small" type="submit">Arsipkan</button></ConfirmForm> : null}
                    <ConfirmForm action={deletePostAction} fields={{ id: post.id }} message={`Hapus permanen “${post.title}” beserta revisinya?`}><button className="admin-button admin-button--small admin-button--danger" type="submit">Hapus</button></ConfirmForm>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        ) : <EmptyState icon="search_off" title="Tidak ada artikel">Ubah filter pencarian atau mulai artikel baru.</EmptyState>}
      </section>

      {result.pageCount > 1 ? (
        <nav className="admin-pagination" aria-label="Paginasi artikel">
          {result.page > 1 ? <Link className="admin-button" href={queryString(filters, { page: result.page - 1 })}>← Sebelumnya</Link> : <span />}
          <span className="admin-meta">Halaman {result.page} / {result.pageCount}</span>
          {result.page < result.pageCount ? <Link className="admin-button" href={queryString(filters, { page: result.page + 1 })}>Berikutnya →</Link> : <span />}
        </nav>
      ) : null}
    </>
  );
}
