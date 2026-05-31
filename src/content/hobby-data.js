// src/content/hobby-data.js
// Konten statis HobbyPage v2 — dengan tmdbId untuk film dan isbn untuk buku

export const hobbyData = {
  music: [
    {
      id: 1,
      artist: "Ethel Cain",
      title: "American Teenager",
      year: "2022",
      genre: "INDIE",
      mood: "melankolis",
      isCurrentlyPlaying: true,
    },
    {
      id: 2,
      artist: "Mk.gee",
      title: "Are You Looking Up",
      year: "2024",
      genre: "ALT-R&B",
      mood: "melankolis",
      isCurrentlyPlaying: false,
    },
    {
      id: 3,
      artist: "Four Tet",
      title: "Parallel",
      year: "2024",
      genre: "AMBIENT",
      mood: "tenang",
      isCurrentlyPlaying: false,
    },
    {
      id: 4,
      artist: "Kendrick Lamar",
      title: "Not Like Us",
      year: "2024",
      genre: "HIP-HOP",
      mood: "energik",
      isCurrentlyPlaying: false,
    },
    {
      id: 5,
      artist: "Charli xcx",
      title: "Von Dutch",
      year: "2024",
      genre: "POP",
      mood: "upbeat",
      isCurrentlyPlaying: false,
    },
    {
      id: 6,
      artist: "Bicep",
      title: "Glue",
      year: "2017",
      genre: "ELECTRONIC",
      mood: "fokus",
      isCurrentlyPlaying: false,
    },
    {
      id: 7,
      artist: "Adrianne Lenker",
      title: "Free Treasure",
      year: "2024",
      genre: "FOLK",
      mood: "melankolis",
      isCurrentlyPlaying: false,
    },
  ],

  watchlist: {
    featured: {
      title: "All We Imagine as Light",
      year: "2024",
      genre: "Drama",
      tmdbId: 1004549,
      impression:
        "Payal Kapadia membangun film tentang kesendirian di kota besar dengan cara yang anehnya intim. Tidak ada plot besar, hanya keseharian tiga perempuan Mumbai yang bergerak di bawah cahaya neon dan hujan. Saya tidak bisa berhenti memikirkan shot terakhirnya selama tiga hari setelah menontonnya.",
      oneWord: "Mengendap",
    },
    others: [
      {
        title: "Anora",
        year: "2024",
        genre: "Drama / Comedy",
        tmdbId: 1241982,
        type: "film",
      },
      {
        title: "The Substance",
        year: "2024",
        genre: "Body Horror",
        tmdbId: 933260,
        type: "film",
      },
      {
        title: "Frieren: Beyond Journey's End",
        year: "2023",
        genre: "Fantasy / Anime",
        tmdbId: 209867,
        type: "anime",
      },
      {
        title: "Perfect Days",
        year: "2023",
        genre: "Drama / Slow Cinema",
        tmdbId: 897087,
        type: "film",
      },
      {
        title: "I Saw the TV Glow",
        year: "2024",
        genre: "Horror / Coming-of-age",
        tmdbId: 1009291,
        type: "film",
      },
    ],
  },

  books: [
    {
      title: "The Wager",
      author: "David Grann",
      isbn: "9780385534260",
      status: "reading",
      impression:
        "Kisah kapal karam abad 18 yang berubah jadi pertanyaan tentang siapa yang berhak mendefinisikan kebenaran.",
    },
    {
      title: "Invisible Cities",
      author: "Italo Calvino",
      isbn: "9780156453806",
      status: "done",
      impression:
        "Bukan buku yang dibaca — melainkan dirasakan. Setiap kota adalah metafora berbeda untuk hal yang sama.",
    },
    {
      title: "Ways of Seeing",
      author: "John Berger",
      isbn: "9780140135152",
      status: "done",
      impression:
        "Mengubah cara saya melihat gambar iklan, lukisan, dan tubuh manusia. Selamanya.",
    },
    {
      title: "The Ministry for the Future",
      author: "Kim Stanley Robinson",
      isbn: "9780316300131",
      status: "queue",
      impression:
        "Fiksi ilmiah tentang perubahan iklim yang konon lebih mengkhawatirkan dari berita aslinya.",
    },
    {
      title: "Parable of the Sower",
      author: "Octavia E. Butler",
      isbn: "9781538732182",
      status: "queue",
      impression:
        "Ditulis 1993, set di California 2024. Saya takut memulainya karena mungkin terlalu akurat.",
    },
  ],

  observations: [
    {
      text: "Tab baru adalah bentuk baru dari penundaan.",
      date: "Mei 2026",
    },
    {
      text: "Musik instrumental bekerja lebih baik untuk menulis karena otak tidak bisa memproses dua alur kata sekaligus.",
      date: "Mei 2026",
    },
    {
      text: "Ada yang aneh tentang menonton film sendirian di bioskop. Tawa yang tidak ada teman untuk dibagikan justru terasa lebih jujur.",
      date: "April 2026",
    },
    {
      text: "Buku fisik bukan tentang nostalgia. Ini tentang tidak adanya notifikasi.",
      date: "April 2026",
    },
    {
      text: "Selera adalah biografi yang paling jujur — lebih jujur dari apapun yang kamu tulis tentang dirimu sendiri.",
      date: "Maret 2026",
    },
    {
      text: "Film pendek yang bagus sering lebih menguras emosi dari film panjang. Tidak ada waktu untuk menghangatkan diri — langsung ke inti.",
      date: "Maret 2026",
    },
    {
      text: "Seseorang pernah bilang bahwa yang paling mengungkap karakter seseorang adalah apa yang mereka tertawakan. Saya kira itu benar.",
      date: "Februari 2026",
    },
  ],
};
