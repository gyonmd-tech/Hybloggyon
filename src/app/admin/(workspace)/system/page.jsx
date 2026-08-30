import Link from 'next/link';
import AdminPageHeader from '../../../../features/admin/components/AdminPageHeader';
import EmptyState from '../../../../features/admin/components/EmptyState';
import { requireAdmin } from '../../../../lib/auth/session';
import { listSystemLogs } from '../../../../lib/db/repositories/admin';

function formatDate(value) {
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'medium' }).format(value);
}

function formatBytes(value) {
  if (!value) return '0 MB';
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

export default async function SystemLogPage({ searchParams }) {
  await requireAdmin('/admin/system');
  const query = await searchParams;
  const search = String(query?.search || '');
  const level = String(query?.level || 'all');
  const result = await listSystemLogs({ search, level, page: query?.page });

  return <>
    <AdminPageHeader eyebrow="Observability" title="Statistik & system log" description="Pantau kesehatan editorial, sesi aktif, serta jejak perubahan penting yang dilakukan dari panel admin." />
    <section className="admin-health-grid" aria-label="Kesehatan sistem">
      <article className="admin-health-card is-online"><span className="material-symbols-outlined">database</span><div><small>Database</small><strong>Connected</strong></div><i /></article>
      <article className="admin-health-card"><span className="material-symbols-outlined">devices</span><div><small>Sesi aktif</small><strong>{result.health.activeSessions}</strong></div></article>
      <article className="admin-health-card"><span className="material-symbols-outlined">admin_panel_settings</span><div><small>Admin aktif</small><strong>{result.health.activeAdmins}</strong></div></article>
      <article className="admin-health-card"><span className="material-symbols-outlined">cloud</span><div><small>Storage / media</small><strong>{result.health.storage} · {formatBytes(result.health.mediaBytes)}</strong></div></article>
    </section>

    <section className="admin-panel admin-log-panel">
      <div className="admin-panel-header"><div><h2 className="admin-panel-title">Activity stream</h2><p className="admin-help">{result.total} event tercatat</p></div><span className="admin-live-label"><i /> Live database</span></div>
      <form className="admin-log-filters">
        <label className="admin-field-group"><span className="admin-label">Cari event</span><input className="admin-field" name="search" defaultValue={search} placeholder="Aksi, entitas, atau pesan…" /></label>
        <label className="admin-field-group"><span className="admin-label">Level</span><select className="admin-select" name="level" defaultValue={level}><option value="all">Semua level</option><option value="info">Info</option><option value="warning">Warning</option><option value="security">Security</option><option value="error">Error</option></select></label>
        <button className="admin-button admin-button--primary" type="submit">Terapkan filter</button>
      </form>
      {result.logs.length ? <div className="admin-log-list">
        {result.logs.map((log) => <article className="admin-log-row" key={log.id}>
          <span className={`admin-log-level admin-log-level--${log.level}`}>{log.level}</span>
          <div className="admin-log-main"><div><strong>{log.message}</strong><code>{log.action}</code></div><p>{log.entityType}{log.entityId ? ` · ${log.entityId.slice(0, 16)}` : ''}</p></div>
          <div className="admin-log-actor"><strong>{log.actorName || 'System'}</strong><span>{formatDate(log.createdAt)}</span></div>
        </article>)}
      </div> : <EmptyState icon="history" title="Belum ada log">Event baru akan muncul setelah aktivitas admin berikutnya.</EmptyState>}
    </section>
    {result.pageCount > 1 ? <nav className="admin-pagination" aria-label="Pagination log">
      {result.page > 1 ? <Link className="admin-button" href={{ query: { search, level, page: result.page - 1 } }}>← Sebelumnya</Link> : <span />}
      <span className="admin-meta">Halaman {result.page} / {result.pageCount}</span>
      {result.page < result.pageCount ? <Link className="admin-button" href={{ query: { search, level, page: result.page + 1 } }}>Berikutnya →</Link> : <span />}
    </nav> : null}
  </>;
}
