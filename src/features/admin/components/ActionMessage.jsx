export default function ActionMessage({ state }) {
  if (!state?.message) return null;
  return (
    <div className={`admin-notice ${state.ok ? '' : 'admin-notice--error'}`} role={state.ok ? 'status' : 'alert'}>
      {state.message}
    </div>
  );
}
