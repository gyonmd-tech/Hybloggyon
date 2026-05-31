// src/pages/NoteSinglePage.jsx
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NoteReadingLayout from '../components/note-single/NoteReadingLayout';

// ─── Demo data ────────────────────────────────────────────────────────────────
const NOTE = {
  tag: 'Filosofi',
  date: '24 Okt 2026',
  readTime: '7 min',
  title: 'Tentang Kebosanan yang Produktif',
  content: `
    <p class="note-drop-cap">Kebosanan adalah salah satu pengalaman paling tidak populer di abad ke-21. Di saat ponsel ada di setiap saku dan konten baru diproduksi setiap detik, kita telah kehilangan kemampuan — dan keberanian — untuk duduk diam bersama pikiran kita sendiri.</p>

    <p>Namun saya ingin berargumen bahwa kebosanan, dalam bentuk aslinya yang tidak terdistraksikan, adalah prasyarat tersembunyi bagi kreativitas dan pemikiran yang mendalam.</p>

    <h2>Kebosanan Bukan Kekosongan</h2>

    <p>Ada perbedaan mendasar antara <strong>kebosanan aktif</strong> dan <strong>kebosanan pasif</strong>. Kebosanan pasif adalah ketika Anda tidak memiliki stimulasi dan Anda menderita karenanya. Kebosanan aktif adalah ketika Anda secara sadar menolak stimulasi, dan pikiran Anda mulai bergerak sendiri — menjelajah, menghubungkan, menciptakan.</p>

    <blockquote>"Kreativitas adalah residu dari waktu yang terbuang." — Albert Einstein<br/><br/>Jika web adalah ruang baru kita, apa yang dikatakan arsitektur kontainer sementara kita tentang kita?</blockquote>

    <p>Inilah yang terjadi ketika kita berjalan tanpa earphone. Ketika kita duduk di kereta tanpa menyentuh layar. Ketika kita menunggu antrean tanpa membuka aplikasi apapun. Pikiran kita — yang terbiasa disuapi konten — tiba-tiba harus berproduksi sendiri.</p>

    <h2>Apa yang Terjadi di Otak saat Bosan</h2>

    <p>Ilmu saraf menyebutnya <strong>Default Mode Network (DMN)</strong>: jaringan otak yang aktif justru ketika kita <em>tidak</em> sedang fokus pada tugas eksternal. DMN bertanggung jawab atas imajinasi tentang masa depan, empati, konsolidasi memori, dan yang paling relevan: <strong>pemikiran kreatif dan pemecahan masalah divergen.</strong></p>

    <h2>Kenapa Kita Takut Bosan</h2>

    <p>Sebuah studi dari Universitas Virginia menemukan bahwa banyak orang lebih memilih memberikan kejutan listrik ringan pada diri mereka daripada duduk diam 15 menit bersama pikiran mereka sendiri.</p>

    <span class="note-annotation">Referensi: Wilson et al. (2014) — "Just think: The challenges of the disengaged mind"</span>

    <p>Ketidaknyamanan ini dieksploitasi secara sistematis oleh industri perhatian. Setiap notifikasi, setiap scroll tak berujung, adalah mekanisme untuk mengisi kekosongan sebelum kita sempat merasakannya sebagai kebosanan produktif.</p>

    <hr />

    <h2>Praktik Kebosanan yang Disengaja</h2>

    <p>Beberapa hal yang saya coba selama beberapa bulan terakhir: berjalan tanpa tujuan 30 menit sehari tanpa ponsel. Minum kopi pagi tanpa layar apapun. Menunggu antrean dengan hanya mengamati sekitar. Mandi lebih lama dari yang diperlukan.</p>

    <p>Hasilnya: ide-ide terbaik saya sering muncul di sini. Koneksi antar konsep yang tidak terduga. Solusi untuk masalah yang sudah saya renungkan berhari-hari. Pertanyaan baru yang lebih baik dari pertanyaan awal saya.</p>
  `,
  metadata: [
    { label: 'Technical Note', value: 'v2.1 / Final', mono: true },
    { label: 'Network State', value: 'Listening: 100%\nNodes: Active', mono: true },
    { label: 'Decision', value: '24-9 / 98A\nComponents: 74', mono: true },
  ],
  reflection: '"Kebosanan bukan musuh produktivitas. Ia adalah satu-satunya kondisi di mana pikiran kita berhenti mengonsumsi dan mulai menciptakan."',
  closingNote: 'Catatan ini dimulai sebagai coretan di buku analog saya, setelah 45 menit menunggu di antrian tanpa membuka ponsel. Ironi yang tidak luput dari perhatian saya.',
};

const CONNECTED_NOTES = [
  { title: 'The Architecture of Silence', href: '/notes/12', tag: 'Observasi' },
  { title: 'Post-Feed Content Strategy', href: '/notes/5', tag: 'Teknologi' },
  { title: 'Decentralized Typographies', href: '/notes/7', tag: 'Desain' },
];

const PREV_NOTE = {
  title: 'Arsitektur dan Kesunyian Kota',
  tag: 'Observasi',
  readTime: '6 min',
  href: '/notes/12',
};

const NEXT_NOTE = {
  title: 'Mencatat sebagai Ritual',
  tag: 'Personal',
  readTime: '5 min',
  href: '/notes/3',
};

// ─────────────────────────────────────────────────────────────────────────────

export default function NoteSinglePage() {
  return (
    <>
      <Helmet>
        <title>{NOTE.title} — HyBloggyon Notes</title>
        <meta name="description" content="Sebuah eksplorasi tentang mengapa kebosanan adalah kondisi paling subur bagi kreativitas." />
      </Helmet>

      <div className="grain-overlay-body" aria-hidden="true" />
      <Header />

      <main>
        <NoteReadingLayout
          tag={NOTE.tag}
          date={NOTE.date}
          readTime={NOTE.readTime}
          title={NOTE.title}
          content={NOTE.content}
          connectedNotes={CONNECTED_NOTES}
          metadata={NOTE.metadata}
          sidebarImage="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80"
          sidebarImageCaption="Fig. 01: Digital Lithography Concept"
          reflection={NOTE.reflection}
          closingNote={NOTE.closingNote}
          prevNote={PREV_NOTE}
          nextNote={NEXT_NOTE}
        />
      </main>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>
    </>
  );
}
