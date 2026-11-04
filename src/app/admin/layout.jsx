import '../../styles/admin.css';

export const metadata = {
  title: 'Editorial Desk',
  description: 'Panel pengelolaan konten HyBloggyon.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

// Font ikon hanya dipakai panel admin, jadi tidak ikut dimuat di halaman publik.
const ICON_FONT_URL =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';

export default function AdminRootLayout({ children }) {
  return (
    <>
      <link rel="stylesheet" href={ICON_FONT_URL} precedence="default" />
      {children}
    </>
  );
}
