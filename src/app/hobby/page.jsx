import HobbyView from '../../features/hobby/HobbyView';

export const metadata = {
  title: 'Kurasi',
  description:
    'Musik, film, buku, dan catatan lepas yang membentuk sudut pandang HyBloggyon.',
  alternates: { canonical: '/hobby' },
};

export default function HobbyPage() {
  return <HobbyView />;
}
