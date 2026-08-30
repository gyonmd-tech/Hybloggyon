'use client';

export default function AdminError({ error, reset }) {
  return (
    <div className="admin-panel">
      <div className="admin-empty">
        <span className="material-symbols-outlined admin-empty-icon" aria-hidden="true">database_off</span>
        <h2 className="admin-empty-title">Data belum bisa dibuka.</h2>
        <p className="admin-empty-copy">{error?.message || 'Periksa koneksi database lalu coba kembali.'}</p>
        <button className="admin-button admin-button--primary" type="button" onClick={reset} style={{ margin: '18px auto 0' }}>
          Coba lagi
        </button>
      </div>
    </div>
  );
}
