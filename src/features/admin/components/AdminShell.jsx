import Link from 'next/link';
import AdminNavigation from './AdminNavigation';
import { logoutAction } from '../actions';

export default function AdminShell({ admin, children }) {
  return (
    <div className="admin-root">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <Link href="/admin" className="admin-brand" aria-label="Beranda admin HyBloggyon">
            <span className="admin-brand-mark">H</span>
            <span className="admin-brand-copy">
              <strong>HyBloggyon</strong>
              <span>Editorial desk</span>
            </span>
          </Link>
          <AdminNavigation />
          <div className="admin-account">
            <p className="admin-account-name">{admin.displayName}</p>
            <p className="admin-account-email">{admin.email}</p>
            <form action={logoutAction} style={{ marginTop: 12 }}>
              <button className="admin-button admin-button--small admin-button--ghost" type="submit">
                <span className="material-symbols-outlined" aria-hidden="true">logout</span>
                Keluar
              </button>
            </form>
          </div>
        </aside>

        <div className="admin-main">
          <header className="admin-topbar">
            <div>
              <p className="admin-kicker">HyBloggyon / Admin</p>
              <p className="admin-topbar-context admin-meta">Kendali editorial pribadi</p>
            </div>
            <div className="admin-topbar-actions">
              <Link href="/admin/posts/new" className="admin-button admin-button--accent">
                <span className="material-symbols-outlined" aria-hidden="true">edit_square</span>
                Tulis baru
              </Link>
            </div>
          </header>
          <main className="admin-content">{children}</main>
        </div>
      </div>
    </div>
  );
}
