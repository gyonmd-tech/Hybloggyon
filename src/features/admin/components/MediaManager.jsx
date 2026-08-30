'use client';

import { useActionState } from 'react';
import { deleteMediaAction, importMediaUrlAction, updateMediaAction, uploadMediaAction } from '../actions';
import ActionMessage from './ActionMessage';
import ConfirmForm from './ConfirmForm';
import SubmitButton from './SubmitButton';

const initialState = { ok: false, message: '', errors: {} };

function UploadForm() {
  const [state, action] = useActionState(uploadMediaAction, initialState);
  return <form action={action} className="admin-form-stack"><ActionMessage state={state} /><label className="admin-field-group"><span className="admin-label">File gambar</span><input className="admin-field" type="file" name="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" required /><span className="admin-help">JPG, PNG, WebP, GIF, atau AVIF. Maksimal mengikuti MEDIA_MAX_SIZE_MB.</span></label><label className="admin-field-group"><span className="admin-label">Alt text</span><input className="admin-field" name="altText" maxLength={500} placeholder="Deskripsikan isi gambar untuk aksesibilitas" /></label><label className="admin-field-group"><span className="admin-label">Caption</span><textarea className="admin-textarea" name="caption" maxLength={1000} /></label><SubmitButton className="admin-button--primary" pendingLabel="Mengunggah…" icon="upload">Unggah gambar</SubmitButton></form>;
}

function ImportForm() {
  const [state, action] = useActionState(importMediaUrlAction, initialState);
  return <form action={action} className="admin-form-stack"><ActionMessage state={state} /><label className="admin-field-group"><span className="admin-label">URL gambar</span><input className="admin-field" type="url" name="publicUrl" placeholder="https://…" required /></label><label className="admin-field-group"><span className="admin-label">Nama file</span><input className="admin-field" name="fileName" required /></label><label className="admin-field-group"><span className="admin-label">Alt text</span><input className="admin-field" name="altText" maxLength={500} /></label><label className="admin-field-group"><span className="admin-label">Caption</span><textarea className="admin-textarea" name="caption" maxLength={1000} /></label><SubmitButton icon="add_link">Tambahkan URL</SubmitButton></form>;
}

function MediaMetaForm({ asset }) {
  const [state, action] = useActionState(updateMediaAction, initialState);
  return <form action={action} className="admin-form-stack" style={{ marginTop: 12 }}><input type="hidden" name="id" value={asset.id} /><ActionMessage state={state} /><label className="admin-field-group"><span className="admin-label">Alt text</span><input className="admin-field" name="altText" defaultValue={asset.altText} maxLength={500} /></label><label className="admin-field-group"><span className="admin-label">Caption</span><textarea className="admin-textarea" name="caption" defaultValue={asset.caption} maxLength={1000} /></label><SubmitButton className="admin-button--small" icon="save">Simpan metadata</SubmitButton></form>;
}

export default function MediaManager({ assets }) {
  return <>
    <div className="admin-taxonomy-layout" style={{ marginBottom: 24 }}>
      <section className="admin-panel"><div className="admin-panel-header"><h2 className="admin-panel-title">Unggah dari perangkat</h2></div><div className="admin-panel-body"><UploadForm /></div></section>
      <section className="admin-panel"><div className="admin-panel-header"><h2 className="admin-panel-title">Tambahkan URL eksternal</h2></div><div className="admin-panel-body"><ImportForm /></div></section>
    </div>
    {assets.length ? <section className="admin-media-grid">{assets.map((asset) => <article className="admin-media-card" key={asset.id}>
      <div className="admin-media-image"><img src={asset.publicUrl} alt={asset.altText || ''} loading="lazy" /></div>
      <div className="admin-media-content"><p className="admin-media-name" title={asset.fileName}>{asset.fileName}</p><p className="admin-media-url" title={asset.publicUrl}>{asset.publicUrl}</p><p className="admin-help" style={{ marginTop: 6 }}>{asset.sizeBytes ? `${(asset.sizeBytes / 1024).toFixed(0)} KB` : 'Eksternal'} · dipakai {Number(asset.usageCount)} artikel</p>
        <details style={{ marginTop: 12 }}><summary className="admin-button admin-button--small">Edit metadata</summary><MediaMetaForm asset={asset} /></details>
        <div className="admin-actions" style={{ justifyContent: 'flex-start', marginTop: 10 }}><button className="admin-button admin-button--small" type="button" onClick={() => navigator.clipboard.writeText(asset.publicUrl)}>Salin URL</button><ConfirmForm action={deleteMediaAction} fields={{ id: asset.id }} message={`Hapus aset “${asset.fileName}”? Sampul artikel yang memakai aset ini akan dilepas.`}><button className="admin-button admin-button--small admin-button--danger" type="submit">Hapus</button></ConfirmForm></div>
      </div>
    </article>)}</section> : <div className="admin-panel"><div className="admin-empty"><span className="material-symbols-outlined admin-empty-icon">perm_media</span><h2 className="admin-empty-title">Pustaka masih kosong.</h2><p className="admin-empty-copy">Unggah gambar pertama atau daftarkan URL gambar yang sudah tersedia.</p></div></div>}
  </>;
}
