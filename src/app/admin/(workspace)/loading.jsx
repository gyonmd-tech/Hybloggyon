export default function AdminLoading() {
  return (
    <div className="admin-panel" aria-busy="true" aria-label="Memuat data admin">
      <div className="admin-empty">
        <span className="material-symbols-outlined admin-empty-icon" aria-hidden="true">progress_activity</span>
        <h2 className="admin-empty-title">Membuka arsip…</h2>
      </div>
    </div>
  );
}
