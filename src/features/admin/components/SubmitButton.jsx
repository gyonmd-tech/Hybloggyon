'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({ children, pendingLabel = 'Menyimpan…', className = '', icon }) {
  const { pending } = useFormStatus();
  return (
    <button className={`admin-button ${className}`} type="submit" disabled={pending}>
      {icon ? <span className="material-symbols-outlined" aria-hidden="true">{pending ? 'progress_activity' : icon}</span> : null}
      {pending ? pendingLabel : children}
    </button>
  );
}
