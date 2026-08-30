import '../../styles/admin.css';

export const metadata = {
  title: 'Editorial Desk',
  description: 'Panel pengelolaan konten HyBloggyon.',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }) {
  return children;
}
