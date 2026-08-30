import { aboutData } from './about-data.js';
import { hobbyData } from './hobby-data.js';

export const homeContentDefaults = {
  hero: {
    title: 'Field Study.',
    edition: 'Edisi Terkini // 2026',
    coordinates: '-6.2088° S, 106.8456° E',
    eyebrow: '[ Ongoing Monograph ]',
    description: 'Workshop digital untuk preservasi pemikiran — esai panjang, catatan belajar, dan analisis pop-culture.',
    ctaLabel: 'Mulai Membaca',
    ctaUrl: '/archive',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=100',
  },
  ticker: '// CURRENTLY INVESTIGATING: THE FRAGILITY OF DIGITAL ARCHIVES // REVISION 4.0.2 // GRID ENFORCED // SINCE 2021 // ESAI · NOTES · MUSIK · FILM & ANIME // WORKSHOP DIGITAL UNTUK PRESERVASI PEMIKIRAN //',
  intro: {
    lead: 'HyBloggyon adalah workshop digital yang didedikasikan untuk preservasi pemikiran — esai panjang, catatan belajar, dan analisis pop-culture dari sudut pandang filosofis dan puitis.',
    meta: 'Sebuah ruang kontemplatif yang tidak dikejar metrik engagement — hanya tulisan jujur yang dibiarkan bernapas panjang.',
  },
  quote: {
    text: 'Menulis bukan tentang menyimpan kata — ini tentang belajar berpikir dengan keras kepala.',
    citation: 'HyBloggyon Manifesto, 2021',
  },
  hobbies: [
    { label: 'MUSIK', title: 'MENDENGARKAN\nALBUM PENUH', description: 'Dari Radiohead sampai Fisip Musik — satu album, satu suasana tanpa skip.', tag: '[ LISTENING ]', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=75' },
    { label: 'FILM', title: 'MENONTON\nSINEMA PELAN', description: 'Film yang tidak terburu-buru — Tarkovsky, Fassbinder, Ozu, menangkap waktu.', tag: '[ WATCHING ]', imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=75' },
    { label: 'MEMBACA', title: 'BUKU FISIK\nYANG BERAT', description: 'Filosofi, sastra terjemahan, dan buku yang membutuhkan dua kali baca.', tag: '[ READING ]', imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=75' },
    { label: 'MENULIS', title: 'CATATAN\nTANGAN PANJANG', description: 'Jurnal analog sebagai jeda dari layar — pena dan kertas bergaris.', tag: '[ WRITING ]', imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=75' },
    { label: 'ARSITEKTUR', title: 'JALAN KAKI\nMELIHAT BANGUNAN', description: 'Brutalism, Bauhaus, dan bangunan tua yang tidak minta maaf.', tag: '[ OBSERVING ]', imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=75' },
    { label: 'FOTOGRAFI', title: 'MEREKAM\nJEDA KOTA', description: 'Kamera analog, roll hitam putih, dan keindahan di sudut jalan yang terlupakan.', tag: '[ CAPTURING ]', imageUrl: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=900&q=75' },
    { label: 'BERKENDARA', title: 'PERJALANAN\nTANPA TUJUAN', description: 'Menyusuri jalan kosong di tengah malam dengan playlist ambient.', tag: '[ DRIVING ]', imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=75' },
  ],
  showcase: [
    { title: 'OK COMPUTER', tag: 'RADIOHEAD · MUSIK', imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1000&q=75&auto=format&fit=crop' },
    { title: 'STALKER', tag: 'ANDREI TARKOVSKY · FILM', imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1000&q=75&auto=format&fit=crop' },
    { title: '1984', tag: 'GEORGE ORWELL · BUKU', imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1000&q=75&auto=format&fit=crop' },
    { title: 'NEW JEANS', tag: 'NEWJEANS · K-POP', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f36611?w=1000&q=75&auto=format&fit=crop' },
    { title: 'AKIRA', tag: 'KATSUHIRO OTOMO · ANIME', imageUrl: 'https://images.unsplash.com/photo-1554188248-986ada9caac0?w=1000&q=75&auto=format&fit=crop' },
  ],
  logs: [
    { date: '27 MEI 2026', time: '23:14', text: 'Apakah sebuah foto yang difoto ulang masih memiliki aura aslinya? Walter Benjamin tidak pernah sempat menjawab pertanyaan tentang JPEG.', status: 'OPEN' },
    { date: '23 MEI 2026', time: '11:32', text: 'Ada jenis kesunyian yang hanya bisa dicapai dengan headphone penuh dan album yang tepat.', status: 'CLOSED' },
    { date: '18 MEI 2026', time: '08:07', text: 'Font sans-serif membuat orang membaca lebih cepat, tapi serif membuat orang mengingat lebih lama.', status: 'OPEN' },
  ],
  timeline: [
    { year: '2021', title: 'Awal Mula', description: 'Versi pertama blog diluncurkan dengan fokus pada tulisan personal dan gaya penceritaan organik.' },
    { year: '2023', title: 'Transisi Visual', description: 'Perubahan ke desain editorial yang lebih kaku, terstruktur, dan monokromatik.' },
    { year: '2026', title: 'HyBloggyon v4', description: 'Iterasi terbaru dengan performa membaca maksimal, tipografi brutalist, dan interaksi bebas batas.' },
  ],
  manifesto: {
    eyebrow: 'Sekilas Prinsip',
    title: 'Saya menulis untuk berpikir, bukan untuk dilihat.',
    description: 'Sebuah ruang arsip digital untuk menuangkan observasi, kritik, dan anomali pikiran. Ruang ini sepenuhnya merdeka dari algoritma dan metrik popularitas.',
    ctaLabel: 'Baca Manifesto Lengkap',
    ctaUrl: '/about',
    author: 'Anonim / Editor',
    location: 'Jakarta, ID',
    status: '● Menulis Aktif',
  },
};

export const aboutContentDefaults = {
  ...aboutData,
  portraitImage: '/images/about/profile.jpg',
};

export const hobbyContentDefaults = {
  hero: {
    titleFirst: 'Bukan apa yang kamu',
    titleSecond: 'tulis — yang membentukmu.',
    subtitle: 'Musik. Film. Kata-kata. Dan hal-hal di antaranya. Sebuah kurasi personal sebagai biografi yang lebih jujur.',
  },
  ...hobbyData,
  lastUpdated: 'Mei 2026',
};

export const notesContentDefaults = {
  quote: {
    text: 'Menulis adalah cara satu-satunya saya bisa berpikir dengan jelas — bukan sebelum menulis, melainkan selama dan sesudahnya.',
    citation: 'Catatan, Maret 2026',
  },
  currentThinking: [
    { label: 'Membaca sekarang', value: 'The Anatomy of Melancholy — Robert Burton' },
    { label: 'Mendengarkan', value: 'Portishead — Dummy (loop ke-4 minggu ini)' },
    { label: 'Memikirkan', value: 'Bagaimana arsip digital berubah menjadi identitas' },
    { label: 'Sedang ditulis', value: 'Esai panjang tentang Attention Economy' },
    { label: 'Mempertanyakan', value: 'Apakah kuantitas konten adalah lawan dari kualitas pikiran?' },
  ],
  randomThoughts: [
    'Kenapa kita lebih mudah membayangkan kiamat daripada hari tanpa internet?',
    'Sebuah catatan yang tidak pernah dibaca ulang bukan catatan — itu terapi.',
    'Perhatian adalah mata uang yang paling berharga dan paling mudah dicuri.',
    'Buku yang selesai dibaca bukan akhir — itu awal dari buku yang ada di kepala kita.',
    'Keheningan adalah hal pertama yang dijual oleh modernitas.',
  ],
  connections: [
    { from: 'Kebosanan yang Produktif', to: 'Mencatat sebagai Ritual', via: 'Refleksi diri membutuhkan kekosongan sebagai medium.' },
    { from: 'Internet Sedang Menyusut', to: 'Ketika AI Menulis dan Manusia Mengkurasi', via: 'Kurasi konten adalah resistance terhadap algoritma.' },
    { from: 'Kecepatan Naratif Wong Kar-wai', to: 'Tentang Waktu yang Tidak Linier', via: 'Waktu dalam seni bisa dilipat, direntangkan, diulang.' },
  ],
};

export const siteContentDefaults = {
  home: homeContentDefaults,
  notes: notesContentDefaults,
  hobby: hobbyContentDefaults,
  about: aboutContentDefaults,
};
