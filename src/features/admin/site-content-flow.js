export const siteContentSections = {
  home: {
    title: 'Beranda',
    description: 'Narasi utama dan seluruh blok editorial pada homepage.',
    publicPath: '/',
    groups: [
      { slug: 'hero', icon: 'web_asset', title: 'Hero & pengantar', description: 'Judul utama, gambar LCP, ticker, CTA, dan paragraf pembuka.' },
      { slug: 'manifesto', icon: 'format_quote', title: 'Kutipan & manifesto', description: 'Pernyataan pendek yang menutup narasi beranda.' },
      { slug: 'hobbies', icon: 'interests', title: 'Minat & obsesi', description: 'Kartu hobi yang muncul dalam alur horizontal.' },
      { slug: 'showcase', icon: 'view_carousel', title: 'Showcase', description: 'Koleksi dan arsip visual pilihan.' },
      { slug: 'observations', icon: 'data_object', title: 'Log observasi', description: 'Catatan aktivitas dan observasi singkat di homepage.' },
      { slug: 'timeline', icon: 'timeline', title: 'Jejak & evolusi', description: 'Riwayat perjalanan dan versi HyBloggyon.' },
    ],
  },
  notes: {
    title: 'Notes',
    description: 'Konten pendamping untuk halaman catatan.',
    publicPath: '/notes',
    groups: [
      { slug: 'current', icon: 'psychology', title: 'Current thinking', description: 'Kutipan dan status pemikiran saat ini.' },
      { slug: 'random', icon: 'shuffle', title: 'Random thoughts', description: 'Fragmen pikiran acak yang dapat diputar pembaca.' },
      { slug: 'connections', icon: 'hub', title: 'Benang merah', description: 'Hubungan antaride dan node catatan.' },
    ],
  },
  hobby: {
    title: 'Kurasi / Hobi',
    description: 'Musik, tontonan, buku, dan observasi personal.',
    publicPath: '/hobby',
    groups: [
      { slug: 'identity', icon: 'title', title: 'Identitas halaman', description: 'Hero, subjudul, dan informasi pembaruan.' },
      { slug: 'music', icon: 'album', title: 'Musik', description: 'Album, artis, genre, mood, dan status putar.' },
      { slug: 'featured', icon: 'theaters', title: 'Sorotan tontonan', description: 'Satu film atau serial utama yang sedang disorot.' },
      { slug: 'watchlist', icon: 'movie', title: 'Daftar tontonan', description: 'Film dan serial lain dalam daftar kurasi.' },
      { slug: 'books', icon: 'menu_book', title: 'Rak buku', description: 'Buku yang dibaca, selesai, atau masuk antrean.' },
      { slug: 'observations', icon: 'visibility', title: 'Observasi samping', description: 'Catatan singkat di luar daftar utama.' },
    ],
  },
  about: {
    title: 'Tentang',
    description: 'Identitas penulis, manifesto, prinsip, dan kanal kontak.',
    publicPath: '/about',
    groups: [
      { slug: 'identity', icon: 'person', title: 'Identitas & pembuka', description: 'Nama, foto, bio, pembuka, dan email kontak.' },
      { slug: 'meta', icon: 'badge', title: 'Metadata profil', description: 'Fakta ringkas yang melengkapi profil.' },
      { slug: 'manifesto', icon: 'article', title: 'Manifesto', description: 'Paragraf manifesto personal.' },
      { slug: 'beliefs', icon: 'lightbulb', title: 'Prinsip', description: 'Nilai dan keyakinan yang dipegang.' },
      { slug: 'socials', icon: 'share', title: 'Tautan sosial', description: 'Kanal sosial dan tautan eksternal.' },
    ],
  },
};

export function getSiteContentGroup(section, group) {
  return siteContentSections[section]?.groups.find((item) => item.slug === group) || null;
}
