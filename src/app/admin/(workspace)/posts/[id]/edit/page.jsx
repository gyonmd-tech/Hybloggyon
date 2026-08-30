import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminPageHeader from '../../../../../../features/admin/components/AdminPageHeader';
import PostEditor from '../../../../../../features/admin/components/PostEditor';
import ConfirmForm from '../../../../../../features/admin/components/ConfirmForm';
import { restoreRevisionAction } from '../../../../../../features/admin/actions';
import { getAdminPost, getPostEditorOptions, listPostRevisions } from '../../../../../../lib/db/repositories/admin';
import { requireAdmin } from '../../../../../../lib/auth/session';

function formatDate(value) {
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(value);
}

export default async function EditPostPage({ params, searchParams }) {
  const { id } = await params;
  await requireAdmin(`/admin/posts/${id}/edit`);
  const query = await searchParams;
  const [post, options, revisions] = await Promise.all([
    getAdminPost(id),
    getPostEditorOptions(),
    listPostRevisions(id),
  ]);
  if (!post) notFound();

  return (
    <>
      <AdminPageHeader eyebrow="Artikel / Edit" title="Rawat tulisan." description={`Revisi terakhir ${formatDate(post.updatedAt)} · ${post.readingTime} menit baca.`} action={<Link className="admin-button" href="/admin/posts">Kembali</Link>} />
      {query?.saved ? <div className="admin-notice">Artikel dan revisi baru berhasil disimpan.</div> : null}
      {query?.restored ? <div className="admin-notice">Revisi lama dipulihkan sebagai revisi terbaru.</div> : null}
      <PostEditor post={post} options={options} />

      <section className="admin-panel" style={{ marginTop: 24 }}>
        <div className="admin-panel-header"><h2 className="admin-panel-title">Riwayat revisi</h2><span className="admin-meta">{revisions.length} snapshot</span></div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Versi</th><th>Judul</th><th>Editor</th><th>Waktu</th><th /></tr></thead><tbody>
          {revisions.map((revision, index) => <tr key={revision.id}><td className="admin-meta">#{revision.revisionNumber}{index === 0 ? ' · terbaru' : ''}</td><td className="admin-table-title">{revision.title}</td><td>{revision.editorName || 'Sistem'}</td><td className="admin-meta">{formatDate(revision.createdAt)}</td><td>{index === 0 ? null : <ConfirmForm action={restoreRevisionAction} fields={{ postId: post.id, revisionId: revision.id }} message={`Pulihkan revisi #${revision.revisionNumber}? Kondisi saat ini tetap tersimpan sebagai revisi.`}><button className="admin-button admin-button--small" type="submit">Pulihkan</button></ConfirmForm>}</td></tr>)}
        </tbody></table></div>
      </section>
    </>
  );
}
