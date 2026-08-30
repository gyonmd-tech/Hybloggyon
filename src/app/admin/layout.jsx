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

export default function AdminRootLayout({ children }) {
  return <><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />{children}</>;
}
