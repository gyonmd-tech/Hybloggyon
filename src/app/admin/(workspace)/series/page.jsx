import AdminPageHeader from '../../../../features/admin/components/AdminPageHeader';
import TaxonomyManager from '../../../../features/admin/components/TaxonomyManager';
import { deleteSeriesAction, saveSeriesAction } from '../../../../features/admin/actions';
import { listSeriesWithCounts } from '../../../../lib/db/repositories/admin';
import { requireAdmin } from '../../../../lib/auth/session';

export default async function SeriesPage() {
  await requireAdmin('/admin/series');
  const items = await listSeriesWithCounts();
  return <><AdminPageHeader eyebrow="Organisasi" title="Seri tulisan" description="Kelompokkan esai yang saling melanjutkan dan tentukan urutannya dari editor artikel." /><TaxonomyManager singular="seri" items={items} saveAction={saveSeriesAction} deleteAction={deleteSeriesAction} showDescription deleteWarning={(item) => Number(item.postCount) ? `Hapus seri “${item.name}”? Artikel tetap ada, tetapi dilepas dari seri.` : `Hapus seri “${item.name}”?`} /></>;
}
