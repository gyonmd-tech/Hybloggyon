'use client';

import { useActionState } from 'react';
import { changePasswordAction, saveSettingsAction } from '../actions';
import ActionMessage from './ActionMessage';
import SubmitButton from './SubmitButton';

const initialState = { ok: false, message: '', errors: {} };

export function SiteProfileForm({ profile }) {
  const [state, action] = useActionState(saveSettingsAction, initialState);
  return (
    <form action={action} className="admin-form-stack">
      <ActionMessage state={state} />
      <div className="admin-form-grid">
        <label className="admin-field-group"><span className="admin-label">Nama situs</span><input className="admin-field" name="siteName" defaultValue={profile.siteName} maxLength={80} required /></label>
        <label className="admin-field-group"><span className="admin-label">Nama penulis</span><input className="admin-field" name="authorName" defaultValue={profile.authorName} maxLength={120} required /></label>
      </div>
      <label className="admin-field-group"><span className="admin-label">Judul situs</span><input className="admin-field" name="siteTitle" defaultValue={profile.siteTitle} maxLength={160} required /></label>
      <label className="admin-field-group"><span className="admin-label">Deskripsi SEO utama</span><textarea className="admin-textarea" name="description" defaultValue={profile.description} maxLength={320} required /></label>
      <label className="admin-field-group"><span className="admin-label">Bio penulis</span><textarea className="admin-textarea" name="authorBio" defaultValue={profile.authorBio} maxLength={600} /></label>
      <div className="admin-form-grid">
        <label className="admin-field-group"><span className="admin-label">OG image bawaan</span><input className="admin-field" name="defaultOgImage" defaultValue={profile.defaultOgImage} placeholder="/images/og/default.webp" /></label>
        <label className="admin-field-group"><span className="admin-label">Artikel per halaman</span><input className="admin-field" type="number" name="postsPerPage" min="5" max="100" defaultValue={profile.postsPerPage} required /></label>
      </div>
      <SubmitButton className="admin-button--primary" icon="save">Simpan identitas situs</SubmitButton>
    </form>
  );
}

export function PasswordForm() {
  const [state, action] = useActionState(changePasswordAction, initialState);
  return (
    <form action={action} className="admin-form-stack">
      <ActionMessage state={state} />
      <label className="admin-field-group"><span className="admin-label">Password saat ini</span><input className="admin-field" type="password" name="currentPassword" autoComplete="current-password" required /></label>
      <label className="admin-field-group"><span className="admin-label">Password baru</span><input className="admin-field" type="password" name="newPassword" minLength={12} autoComplete="new-password" required /><span className="admin-help">Minimal 12 karakter. Gunakan frasa unik yang tidak dipakai di tempat lain.</span></label>
      <label className="admin-field-group"><span className="admin-label">Ulangi password baru</span><input className="admin-field" type="password" name="passwordConfirmation" minLength={12} autoComplete="new-password" required /></label>
      <SubmitButton className="admin-button--danger" pendingLabel="Mengganti password…" icon="password">Ganti password</SubmitButton>
    </form>
  );
}
