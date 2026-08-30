import AdminPageHeader from '../../../../features/admin/components/AdminPageHeader';
import MediaManager from '../../../../features/admin/components/MediaManager';
import { listMediaAssets } from '../../../../lib/db/repositories/admin';
import { requireAdmin } from '../../../../lib/auth/session';

export default async function MediaPage() {
  await requireAdmin('/admin/media');
  const assets = await listMediaAssets();
  return <><AdminPageHeader eyebrow="Aset" title="Pustaka media" description="Simpan sampul, lengkapi alt text, salin URL, dan lihat aset yang sedang digunakan oleh artikel." /><MediaManager assets={assets} /></>;
}
