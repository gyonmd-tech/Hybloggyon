'use client';

import { useActionState, useState } from 'react';
import ActionMessage from './ActionMessage';
import ConfirmForm from './ConfirmForm';
import SubmitButton from './SubmitButton';

const initialState = { ok: false, message: '', errors: {} };

function makeSlug(value) {
  return String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/&/g, '-dan-').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function getDeleteMessage(singular, item, preventDeleteWhenUsed) {
  const postCount = Number(item.postCount || 0);
  if (preventDeleteWhenUsed && postCount > 0) {
    return `${singular.charAt(0).toUpperCase() + singular.slice(1)} “${item.name}” masih dipakai dan tidak dapat dihapus.`;
  }
  if (singular === 'seri' && postCount > 0) {
    return `Hapus seri “${item.name}”? Artikel tetap ada, tetapi dilepas dari seri.`;
  }
  return `Hapus ${singular} “${item.name}”?`;
}

function TaxonomyForm({ item, action, showDescription, submitLabel }) {
  const [state, formAction] = useActionState(action, initialState);
  const [name, setName] = useState(item?.name || '');
  const [slug, setSlug] = useState(item?.slug || '');
  const [slugTouched, setSlugTouched] = useState(Boolean(item?.slug));
  return (
    <form action={formAction} className="admin-form-stack">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <ActionMessage state={state} />
      <label className="admin-field-group"><span className="admin-label">Nama</span><input className="admin-field" name="name" value={name} onChange={(event) => { const value = event.target.value; setName(value); if (!slugTouched) setSlug(makeSlug(value)); }} required /></label>
      <label className="admin-field-group"><span className="admin-label">Slug</span><input className="admin-field" name="slug" value={slug} onChange={(event) => { setSlugTouched(true); setSlug(makeSlug(event.target.value)); }} required /></label>
      {showDescription ? <label className="admin-field-group"><span className="admin-label">Deskripsi</span><textarea className="admin-textarea" name="description" defaultValue={item?.description || ''} maxLength={600} /></label> : null}
      <SubmitButton className="admin-button--primary" icon="save">{submitLabel}</SubmitButton>
    </form>
  );
}

export default function TaxonomyManager({ singular, items, saveAction, deleteAction, showDescription = false, preventDeleteWhenUsed = false }) {
  return (
    <div className="admin-taxonomy-layout">
      <section className="admin-panel">
        <div className="admin-panel-header"><h2 className="admin-panel-title">Tambah {singular}</h2></div>
        <div className="admin-panel-body"><TaxonomyForm action={saveAction} showDescription={showDescription} submitLabel={`Buat ${singular}`} /></div>
      </section>
      <section className="admin-panel">
        <div className="admin-panel-header"><h2 className="admin-panel-title">Daftar {singular}</h2><span className="admin-meta">{items.length} item</span></div>
        {items.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Nama</th><th>Slug</th><th>Artikel</th><th /></tr></thead><tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td><p className="admin-table-title">{item.name}</p>{item.description ? <p className="admin-table-subtitle">{item.description}</p> : null}</td>
              <td className="admin-meta">{item.slug}</td>
              <td>{Number(item.postCount || 0)}</td>
              <td><div className="admin-actions">
                <details><summary className="admin-button admin-button--small">Edit</summary><div style={{ position: 'absolute', right: 48, zIndex: 10, width: 'min(420px, calc(100vw - 40px))', padding: 16, border: '1px solid var(--color-ink)', background: 'var(--color-paper-white)', boxShadow: '4px 4px 0 var(--color-ink)' }}><TaxonomyForm item={item} action={saveAction} showDescription={showDescription} submitLabel={`Simpan ${singular}`} /></div></details>
                <ConfirmForm action={deleteAction} fields={{ id: item.id }} message={getDeleteMessage(singular, item, preventDeleteWhenUsed)}><button className="admin-button admin-button--small admin-button--danger" type="submit" disabled={preventDeleteWhenUsed && Number(item.postCount) > 0} title={preventDeleteWhenUsed && Number(item.postCount) > 0 ? 'Pindahkan artikel ke kategori lain terlebih dahulu.' : undefined}>Hapus</button></ConfirmForm>
              </div></td>
            </tr>
          ))}
        </tbody></table></div> : <div className="admin-empty"><span className="material-symbols-outlined admin-empty-icon">inventory_2</span><h2 className="admin-empty-title">Belum ada {singular}.</h2></div>}
      </section>
    </div>
  );
}
