export default function AdminPageHeader({ eyebrow, title, description, action }) {
  return (
    <header className="admin-page-header">
      <div>
        <p className="admin-kicker">{eyebrow}</p>
        <h1 className="admin-page-title">{title}</h1>
        {description ? <p className="admin-page-copy">{description}</p> : null}
      </div>
      {action || null}
    </header>
  );
}
