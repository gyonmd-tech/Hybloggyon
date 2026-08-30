import Link from 'next/link';

export const metadata = {
  title: 'Halaman Tidak Ditemukan',
  alternates: { canonical: null },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        textAlign: 'center',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', opacity: 0.5 }}>404</span>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
        Halaman tidak ditemukan.
      </h1>
      <Link
        href="/archive"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.08em',
          color: 'var(--color-accent-warm)',
        }}
      >
        ← Kembali ke Arsip
      </Link>
    </main>
  );
}
