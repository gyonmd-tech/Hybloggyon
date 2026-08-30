import Link from 'next/link';
import AdminPageHeader from '../../../../../features/admin/components/AdminPageHeader';
import PostEditor from '../../../../../features/admin/components/PostEditor';
import EmptyState from '../../../../../features/admin/components/EmptyState';
import { getPostEditorOptions } from '../../../../../lib/db/repositories/admin';
import { requireAdmin } from '../../../../../lib/auth/session';

export default async function NewPostPage() {
  await requireAdmin('/admin/posts/new');
  const options = await getPostEditorOptions();
  return (
    <>
      <AdminPageHeader eyebrow="Artikel / Baru" title="Susun gagasan baru." description="Tulis dengan Markdown, lihat hasilnya langsung, lalu simpan sebagai draft atau terbitkan ketika siap." action={<Link className="admin-button" href="/admin/posts">Batal</Link>} />
      {options.categories.length ? <PostEditor post={null} options={options} /> : (
        <div className="admin-panel"><EmptyState icon="category" title="Buat kategori dahulu">Setiap artikel membutuhkan kategori. <Link href="/admin/categories" className="admin-button" style={{ margin: '18px auto 0' }}>Buat kategori</Link></EmptyState></div>
      )}
    </>
  );
}
