'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminNavigation from './AdminNavigation';
import { logoutAction } from '../actions';

const routeNames = {
  admin: 'Ikhtisar', posts: 'Artikel', media: 'Media', content: 'Konten Situs',
  categories: 'Kategori', tags: 'Tag', series: 'Seri', settings: 'Pengaturan', system: 'System Log',
  home: 'Beranda', notes: 'Notes', hobby: 'Kurasi', about: 'Tentang', new: 'Baru', edit: 'Edit',
};

function Breadcrumbs({ pathname }) {
  const parts = pathname.split('/').filter(Boolean);
  return <div className="admin-breadcrumbs" aria-label="Breadcrumb">
    {parts.map((part, index) => {
      const href = `/${parts.slice(0, index + 1).join('/')}`;
      const last = index === parts.length - 1;
      const label = routeNames[part] || (part.length > 14 ? 'Detail' : part.replaceAll('-', ' '));
      return <span key={href}>{index ? <i>/</i> : null}{last ? <strong>{label}</strong> : <Link href={href}>{label}</Link>}</span>;
    })}
  </div>;
}

export default function AdminShell({ admin, children }) {
  const pathname = usePathname();
  const currentRoute = pathname.split('/').filter(Boolean).at(-1) || 'admin';
  const currentLabel = routeNames[currentRoute] || (currentRoute.length > 14 ? 'Detail konten' : currentRoute.replaceAll('-', ' '));
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSidebarCollapsed(window.localStorage.getItem('hybloggyon:sidebar-collapsed') === 'true');
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function toggleSidebar() {
    setSidebarCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem('hybloggyon:sidebar-collapsed', String(next));
      return next;
    });
  }

  return (
    <div className={'admin-root' + (sidebarCollapsed ? ' is-sidebar-collapsed' : '')}>
      <div className="admin-shell">
        <button className={`admin-sidebar-scrim ${menuOpen ? 'is-open' : ''}`} aria-label="Tutup navigasi" onClick={() => setMenuOpen(false)} />
        <aside className={`admin-sidebar ${menuOpen ? 'is-open' : ''}`}>
          <button className="admin-sidebar-toggle" type="button" onClick={toggleSidebar} aria-label={sidebarCollapsed ? 'Buka sidebar' : 'Ciutkan sidebar'} title={sidebarCollapsed ? 'Buka sidebar' : 'Ciutkan sidebar'}>
            <span className="material-symbols-outlined" aria-hidden="true">{sidebarCollapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'}</span>
          </button>
          <div className="admin-sidebar-head">
            <Link href="/admin" className="admin-brand" aria-label="Beranda admin HyBloggyon" onClick={() => setMenuOpen(false)}>
              <span className="admin-brand-mark"><img src="/fav.png" alt="" /></span>
              <span className="admin-brand-copy"><strong>HyBloggyon</strong></span>
            </Link>
          </div>
          <div className="admin-system-pill"><span /> <strong>System online</strong><small>Database editorial aktif</small></div>
          <AdminNavigation onNavigate={() => setMenuOpen(false)} />
          <div className="admin-account">
            <div className="admin-account-avatar">{admin.displayName?.slice(0, 1)?.toUpperCase() || 'A'}</div>
            <div className="admin-account-copy"><p className="admin-account-name">{admin.displayName}</p><p className="admin-account-email">{admin.email}</p></div>
            <form action={logoutAction}><button className="admin-icon-button" type="submit" title="Keluar"><span className="material-symbols-outlined" aria-hidden="true">logout</span></button></form>
          </div>
        </aside>

        <div className="admin-main">
          <header className="admin-topbar">
            <button className="admin-menu-button" type="button" aria-label="Buka navigasi" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><span className="material-symbols-outlined" aria-hidden="true">menu</span></button>
            <div className="admin-topbar-context">
              <div className="admin-header-identity"><span className="material-symbols-outlined" aria-hidden="true">auto_awesome</span><div><small>Editorial studio</small><strong>{currentLabel}</strong></div></div>
              <div className="admin-header-trail"><Breadcrumbs pathname={pathname} /><p>{new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}</p></div>
            </div>
            <div className="admin-topbar-actions">
              <Link href="/" target="_blank" className="admin-icon-button admin-preview-button" title="Preview situs"><span className="material-symbols-outlined" aria-hidden="true">north_east</span></Link>
              <Link href="/admin/posts/new" className="admin-button admin-button--accent"><span className="material-symbols-outlined" aria-hidden="true">edit_square</span><span className="admin-action-label">Tulis baru</span></Link>
            </div>
          </header>
          <main className="admin-content">{children}</main>
          {pathname !== '/admin/posts/new' ? (
            <Link href="/admin/posts/new" className="admin-fab" aria-label="Buat konten baru">
              <span className="material-symbols-outlined" aria-hidden="true">edit_square</span>
              <span>Buat konten</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
