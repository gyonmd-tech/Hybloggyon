import AdminPageHeader from '../../../../features/admin/components/AdminPageHeader';
import TaxonomyManager from '../../../../features/admin/components/TaxonomyManager';
import { deleteTagAction, saveTagAction } from '../../../../features/admin/actions';
import { listTagsWithCounts } from '../../../../lib/db/repositories/admin';
import { requireAdmin } from '../../../../lib/auth/session';

export default async function TagsPage() {
  await requireAdmin('/admin/tags');
  const items = await listTagsWithCounts();
  return <><AdminPageHeader eyebrow="Organisasi" title="Tag" description="Tag menghubungkan gagasan lintas kategori. Tag juga dapat dibuat otomatis dari editor artikel." /><TaxonomyManager singular="tag" items={items} saveAction={saveTagAction} deleteAction={deleteTagAction} /></>;
}
