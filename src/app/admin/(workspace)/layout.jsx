import AdminShell from '../../../features/admin/components/AdminShell';
import { requireAdmin } from '../../../lib/auth/session';

export const dynamic = 'force-dynamic';

export default async function AdminWorkspaceLayout({ children }) {
  const admin = await requireAdmin('/admin');
  return <AdminShell admin={admin}>{children}</AdminShell>;
}
