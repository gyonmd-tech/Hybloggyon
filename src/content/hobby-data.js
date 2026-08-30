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
      mediaType: "movie",
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
        mediaType: "movie",
        type: "film",
        impression:
          "Eksplorasi kehidupan malam yang liar, penuh energi, sekaligus getir. Menyeimbangkan komedi situasi yang kacau dengan realitas pahit kelas pekerja.",
        oneWord: "Liar",
      },
      {
        title: "The Substance",
        year: "2024",
        genre: "Body Horror",
        tmdbId: 933260,
        mediaType: "movie",
        type: "film",
        impression:
          "Sebuah satire industri kecantikan yang brutal dan ekstrem. Visualnya mencengangkan sekaligus tidak nyaman untuk dilihat, menghadirkan teror psikologis dan fisik yang intens.",
        oneWord: "Gila",
      },
      {
        title: "Frieren: Beyond Journey's End",
        year: "2023",
        genre: "Fantasy / Anime",
        tmdbId: 209867,
        mediaType: "tv",
        type: "anime",
        impression:
          "Sebuah mahakarya fantasi yang tidak fokus pada pertempuran melawan raja iblis, melainkan apa yang terjadi setelah petualangan itu usai. Renungan mendalam tentang waktu, penyesalan, dan koneksi manusia.",
        oneWord: "Melankolis",
      },
      {
        title: "Young Sheldon",
        year: "2017 - 2024",
        genre: "Comedy / Coming-of-Age",
        tmdbId: 71728,
        mediaType: "tv",
        type: "series",
        impression:
          "Spin-off yang luar biasa hangat. Lebih dari sekadar menceritakan masa kecil ilmuwan jenius yang eksentrik, serial ini adalah surat cinta untuk dinamika keluarga Cooper di Texas yang penuh tawa sekaligus air mata.",
        oneWord: "Hangat",
      },
      {
        title: "Mischievous Kiss: Love in Tokyo",
        year: "2013",
        genre: "Romance / Comedy / J-Drama",
        tmdbId: 64793,
        mediaType: "tv",
        type: "series",
        impression:
          "Adaptasi manga klasik Jepang yang sangat adiktif. Dinamika cinta benci antara Kotoko yang ceria namun ceroboh dengan Naoki yang super jenius dan dingin selalu berhasil memicu nostalgia romansa sekolah yang manis.",
        oneWord: "Nostalgia",
      },
      {
        title: "Drawing Closer",
        year: "2024",
        genre: "Romance / Melodrama / Film Jepang",
        tmdbId: 1291559,
        mediaType: "movie",
        type: "film",
        impression:
          "Kisah cinta yang mengharukan tentang dua orang muda yang sama-sama menghadapi vonis sisa usia yang singkat. Alih-alih larut dalam kesedihan, mereka memilih untuk melukis warna-warna indah di sisa waktu bersama.",
        oneWord: "Menyentuh",
      },
      {
        title: "The Gift of Your Heart",
        year: "2024",
        genre: "Fantasy / Romance / J-Drama",
        tmdbId: 240772,
        mediaType: "tv",
        type: "series",
        impression:
          "Sebuah melodrama fantasi yang sangat menguras emosi. Pengorbanan panca indera demi menyelamatkan orang yang dicintai menghadirkan kisah cinta yang penuh kegetiran, namun diselimuti visual kota Nagasaki yang indah.",
        oneWord: "Tangis",
      },
      {
        title: "The Pacific",
        year: "2010",
        genre: "War / History / Mini-Series",
        tmdbId: 16997,
        mediaType: "tv",
        type: "series",
        impression:
          "Pendamping yang sempurna untuk Band of Brothers, namun dengan pendekatan yang jauh lebih mentah, brutal, dan menyoroti kerusakan psikologis para prajurit di medan perang Pasifik yang kejam.",
        oneWord: "Brutal",
      },
      {
        title: "Dune (Part One & Two)",
        year: "2021 - 2024",
        genre: "Sci-Fi / Adventure / Epic",
        tmdbId: 693134,
        mediaType: "movie",
        type: "film",
        impression:
          "Sinema dalam skala paling megah. Denis Villeneuve berhasil menerjemahkan fiksi ilmiah kompleks milik Frank Herbert menjadi sebuah visual safari gurun yang magis, megah, dan penuh dengan intrik politik mesianik.",
        oneWord: "Megah",
      },
    ],
  },

  books: [
    // ── Sedang dibaca ────────────────────────────────────────────────────────
    {
      title: "The Wager",
      author: "David Grann",
      isbn: "9780385534260",
      status: "reading",
      impression:
        "Kisah kapal karam abad 18 yang berubah jadi pertanyaan tentang siapa yang berhak mendefinisikan kebenaran.",
    },
    {
      title: "Orb: On the Movements of the Earth",
      author: "Uoto",
      isbn: "9781975379193",
      status: "reading",
      impression:
        "Perjuangan menegakkan kebenaran ilmiah dan teori heliosentris di era dogma agama yang ketat. Kisah tentang pencarian kebenaran yang berbahaya namun memikat.",
    },
    // ── Selesai dibaca ───────────────────────────────────────────────────────
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
      title: "Sang Alkemis",
      author: "Paulo Coelho",
      isbn: "9780062315007",
      status: "done",
      impression:
        "Kisah alegoris tentang Santiago, seorang gembala muda yang mengikuti impian dan petualangannya untuk menemukan takdir serta harta karun di gurun Mesir.",
    },
    {
      title: "Dunia Sophie",
      author: "Jostein Gaarder",
      isbn: "9780374530716",
      status: "done",
      impression:
        "Sebuah novel filsafat yang mengemas sejarah pemikiran barat dari masa Yunani kuno hingga abad modern lewat petualangan misterius seorang gadis remaja bernama Sophie.",
    },
    {
      title: "Seorang Puasawan",
      author: "Franz Kafka",
      isbn: "9780805210170",
      status: "done",
      impression:
        "Eksplorasi mendalam tentang keterasingan eksistensial, seni, dan kepuasan batin yang mustahil dipahami oleh masyarakat umum melalui sudut pandang seorang seniman kelaparan.",
    },
    {
      title: "Gagal Menjadi Manusia",
      author: "Osamu Dazai",
      isbn: "9780811204811",
      status: "done",
      impression:
        "Sebuah potret psikologis yang jujur dan kelam mengenai keterasingan diri, keputusasaan, ketidakmampuan untuk memahami sesama manusia, dan pencarian identitas yang hancur.",
    },
    // ── Antrean ──────────────────────────────────────────────────────────────
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
    {
      title: "The Brothers Karamazov",
      author: "Fyodor Dostoevsky",
      isbn: "9780374528379",
      status: "queue",
      impression:
        "Sebuah mahakarya sastra klasik Rusia yang menyelami dinamika keluarga, moralitas, kehendak bebas, iman, dan konflik internal manusia dalam pencarian spiritualitas.",
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
