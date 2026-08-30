'use client';

import { useActionState } from 'react';
import { loginAction } from '../actions';
import ActionMessage from './ActionMessage';
import SubmitButton from './SubmitButton';

const initialState = { ok: false, message: '', errors: {} };

export default function LoginForm({ returnTo, disabled }) {
  const [state, action] = useActionState(loginAction, initialState);
  return (
    <form action={action} className="admin-form-stack">
      <input type="hidden" name="returnTo" value={returnTo} />
      <ActionMessage state={state} />
      <label className="admin-field-group">
        <span className="admin-label">Email</span>
        <input className="admin-field" name="email" type="email" autoComplete="username" required disabled={disabled} />
      </label>
      <label className="admin-field-group">
        <span className="admin-label">Password</span>
        <input className="admin-field" name="password" type="password" autoComplete="current-password" required disabled={disabled} />
      </label>
      <SubmitButton className="admin-button--primary" pendingLabel="Memeriksa…" icon="login">
        Masuk ke ruang kerja
      </SubmitButton>
    </form>
  );
}
