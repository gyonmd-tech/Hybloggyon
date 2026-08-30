import { redirect } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '../../../features/admin/components/LoginForm';
import { getCurrentAdmin } from '../../../lib/auth/session';
import { isDatabaseConfigured } from '../../../lib/db/client';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const currentAdmin = await getCurrentAdmin();
  if (currentAdmin) redirect('/admin');

  const databaseReady = isDatabaseConfigured();
  const rawReturnTo = String(params?.returnTo || '/admin');
  const returnTo = rawReturnTo.startsWith('/admin') && !rawReturnTo.startsWith('//')
    ? rawReturnTo
    : '/admin';

  return (
    <main className="admin-root admin-login">
      <section className="admin-login-story" aria-label="HyBloggyon Editorial Desk">
        <div className="admin-brand-copy">
          <strong>HyBloggyon</strong>
          <span>Private editorial system / 2026</span>
        </div>
        <h2 className="admin-login-title">
          Gagasan masuk.<br />Tulisan <em>keluar.</em>
        </h2>
        <p className="admin-login-footer">
          Ruang privat untuk menyusun, meninjau, dan menerbitkan arsip pemikiran tanpa menyentuh file sumber secara manual.
        </p>
      </section>

      <section className="admin-login-form-wrap">
        <div className="admin-login-form">
          <p className="admin-kicker">Akses terbatas</p>
          <h1>Masuk ke meja editorial.</h1>
          <p className="admin-login-form-copy">
            Gunakan akun pemilik yang dibuat melalui proses bootstrap. Sesi tetap privat di browser ini.
          </p>
          {params?.passwordChanged ? (
            <div className="admin-notice" role="status">Password diperbarui. Silakan masuk kembali.</div>
          ) : null}
          {!databaseReady ? (
            <div className="admin-notice admin-notice--error" role="alert">
              Database belum terhubung. Isi konfigurasi database, jalankan migrasi, lalu buat akun admin.
            </div>
          ) : null}
          <LoginForm returnTo={returnTo} disabled={!databaseReady} />
          <Link href="/" className="admin-button admin-button--ghost" style={{ marginTop: 20 }}>
            <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
            Kembali ke situs
          </Link>
        </div>
      </section>
    </main>
  );
}
