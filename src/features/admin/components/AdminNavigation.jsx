'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  {
    label: 'Ruang kerja',
    items: [
      { href: '/admin', label: 'Ikhtisar', icon: 'space_dashboard', exact: true },
      { href: '/admin/posts', label: 'Artikel', icon: 'article' },
      { href: '/admin/media', label: 'Media', icon: 'perm_media' },
      { href: '/admin/content', label: 'Konten situs', icon: 'dashboard_customize' },
    ],
  },
  {
    label: 'Organisasi',
    items: [
      { href: '/admin/categories', label: 'Kategori', icon: 'category' },
      { href: '/admin/tags', label: 'Tag', icon: 'sell' },
      { href: '/admin/series', label: 'Seri', icon: 'library_books' },
    ],
  },
  {
    label: 'Sistem',
    items: [
      { href: '/admin/settings', label: 'Pengaturan', icon: 'tune' },
      { href: '/', label: 'Lihat situs', icon: 'open_in_new', external: true },
    ],
  },
];

function isActive(pathname, item) {
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}

export default function AdminNavigation() {
  const pathname = usePathname();
  return (
    <>
      <nav className="admin-nav" aria-label="Navigasi admin">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="admin-nav-section admin-kicker">{section.label}</p>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link ${isActive(pathname, item) ? 'is-active' : ''}`}
                target={item.external ? '_blank' : undefined}
              >
                <span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <nav className="admin-mobile-bar" aria-label="Navigasi admin seluler">
        {sections.flatMap((section) => section.items).slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-mobile-link ${isActive(pathname, item) ? 'is-active' : ''}`}
          >
            <span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
