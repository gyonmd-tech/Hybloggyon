import AdminPageHeader from '../../../../features/admin/components/AdminPageHeader';
import TaxonomyManager from '../../../../features/admin/components/TaxonomyManager';
import { deleteCategoryAction, saveCategoryAction } from '../../../../features/admin/actions';
import { listCategoriesWithCounts } from '../../../../lib/db/repositories/admin';
import { requireAdmin } from '../../../../lib/auth/session';

export default async function CategoriesPage() {
  await requireAdmin('/admin/categories');
  const items = await listCategoriesWithCounts();
  return <><AdminPageHeader eyebrow="Organisasi" title="Kategori" description="Kategori menentukan jalur URL dan ruang utama setiap tulisan. Perubahan slug otomatis membuat redirect permanen." /><TaxonomyManager singular="kategori" items={items} saveAction={saveCategoryAction} deleteAction={deleteCategoryAction} showDescription preventDeleteWhenUsed /></>;
}
