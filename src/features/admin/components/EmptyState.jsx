export default function EmptyState({ icon = 'inbox', title, children }) {
  return (
    <div className="admin-empty">
      <span className="material-symbols-outlined admin-empty-icon" aria-hidden="true">{icon}</span>
      <h2 className="admin-empty-title">{title}</h2>
      <div className="admin-empty-copy">{children}</div>
    </div>
  );
}
