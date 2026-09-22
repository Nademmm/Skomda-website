export interface PrestasiItem {
  id: string;
  title: string;
  category: "IT & AI" | "Olahraga" | "Seni & Kreatif" | "Kepemimpinan";
  award: string;
  badgeLevel: "Juara 1" | "Juara 2" | "Juara 3" | "Gold Medal";
  competition: string;
  organizer: string;
  year: string;
  studentName: string;
  studentClass: string;
  image: string;
  description: string;
}

export const PRESTASI_CATEGORIES = [
  "Semua",
  "IT & AI",
  "Olahraga",
  "Seni & Kreatif",
  "Kepemimpinan",
] as const;

export const PRESTASI_LIST: PrestasiItem[] = [
  {
    id: "iitc-web-design-2026",
    title: "Kreativitas Digital Berbuah Prestasi, SKOMDA Raih Juara 2 Web Design",
    category: "IT & AI",
    award: "Juara 2",
    badgeLevel: "Juara 2",
    competition: "Intermedia Information Technology Competition (IITC) 2026",
    organizer: "Universitas Amikom Purwokerto",
    year: "2026",
    studentName: "Zaina Fildza Ghaisani",
    studentClass: "XII TJAT 5",
    image: "/images/tentang-kami/prestasi/prestasi-iitc-web-design-zaina.png",
    description:
      "Zaina Fildza Ghaisani berhasil meraih Juara 2 Web Design dalam Intermedia Information Technology Competition (IITC) 2026 yang diselenggarakan Universitas Amikom Purwokerto. Pencapaian ini menunjukkan kemampuan dalam mengembangkan ide kreatif menjadi sebuah karya digital yang menarik dan inovatif.",
  },
  {
    id: "iitc-generative-ai-2026",
    title: "Berkarya dengan Generative AI, Siswa SKOMDA Raih Juara 3 IITC 2026",
    category: "IT & AI",
    award: "Juara 3",
    badgeLevel: "Juara 3",
    competition: "Intermedia Information Technology Competition (IITC) 2026",
    organizer: "Universitas Amikom Purwokerto",
    year: "2026",
    studentName: "Agung Dwi Saputra & Masnuril Rayya Tsabita",
    studentClass: "XII TJAT 5 & XII TJAT 1",
    image: "/images/tentang-kami/prestasi/prestasi-iitc-gen-ai-agung-rayya.png",
    description:
      "Agung Dwi Saputra dan Masnuril Rayya Tsabita berhasil meraih Juara 3 Generative AI pada Intermedia Information Technology Competition (IITC) 2026. Melalui perpaduan kreativitas dan teknologi, keduanya berhasil menghadirkan karya yang mampu bersaing dalam kompetisi.",
  },
  {
    id: "beefest-sdlc-binus-2026",
    title: "Skill Coding Berbuah Gold Medal, Siswa SKOMDA Juara 1 SDLC BINUS",
    category: "IT & AI",
    award: "Gold Medal (Juara 1)",
    badgeLevel: "Gold Medal",
    competition: "Beefest: Software Development Logical Competition (SDLC)",
    organizer: "School of Computer Science BINUS University",
    year: "2026",
    studentName: "Revano Satya Pandega",
    studentClass: "XIII SIJA",
    image: "/images/tentang-kami/prestasi/prestasi-beefest-sdlc-revano.png",
    description:
      "Revano Satya Pandega berhasil meraih Gold Medal (Juara 1) dalam Beefest: Software Development Logical Competition (SDLC) yang diselenggarakan oleh School of Computer Science BINUS University. Prestasi ini menjadi bukti kemampuan dalam mengembangkan solusi dengan memanfaatkan logika dan teknologi.",
  },
  {
    id: "lks-dikmen-nasional-ai-2026",
    title: "Tampil di Tingkat Nasional, Tim SKOMDA Raih Juara 1 LKS DIKMEN 2026",
    category: "IT & AI",
    award: "Juara 1",
    badgeLevel: "Juara 1",
    competition: "LKS DIKMEN Tingkat Nasional 2026 bidang Artificial Intelligence (Kecerdasan Artifisial)",
    organizer: "LKS DIKMEN Tingkat Nasional",
    year: "2026",
    studentName: "Ilham Yudistira S. A., Nabil Fauzan A., & Revano Satya Pandega",
    studentClass: "SMK Telkom Sidoarjo",
    image: "/images/tentang-kami/prestasi/prestasi-lks-nasional-ai-revano.png",
    description:
      "Persaingan semakin luas ketika langkah membawa kita ke tingkat nasional. Ilham Yudistira S. A., Nabil Fauzan A., dan Revano Satya Pandega berhasil meraih Juara 1 LKS DIKMEN Tingkat Nasional 2026 bidang Artificial Intelligence. Sebuah pencapaian yang menjadi bagian dari perjalanan mereka dalam mengembangkan kemampuan dan membawa nama sekolah di tingkat nasional.",
  },
  {
    id: "kejurprov-u17-speed-2026",
    title: "Kecepatan yang Dibangun dari Ketekunan",
    category: "Olahraga",
    award: "Juara 3",
    badgeLevel: "Juara 3",
    competition: "Kejurprov Jawa Timur kategori U17 Speed",
    organizer: "KONI Jawa Timur",
    year: "2026",
    studentName: "Billal Habibulloh Arrasyid",
    studentClass: "XI TJAT 3",
    image: "/images/tentang-kami/prestasi/prestasi-kejurprov-speed-billal.png",
    description:
      "Tidak ada hasil yang datang dalam satu malam. Billal Habibulloh Arrasyid berhasil meraih Juara 3 Kejurprov Jawa Timur kategori U17 Speed yang diselenggarakan oleh KONI Jawa Timur. Di balik pencapaian tersebut ada latihan, konsistensi, dan keberanian untuk terus berkembang di setiap perlombaan.",
  },
  {
    id: "pelajar-pelopor-llaj-2026",
    title: "Ketika Pelajar Turut Membawa Perubahan",
    category: "Kepemimpinan",
    award: "Juara 2",
    badgeLevel: "Juara 2",
    competition: "Pemilihan Pelajar Pelopor Keselamatan Lalu Lintas dan Angkutan Jalan (LLAJ) Kabupaten Sidoarjo 2026",
    organizer: "Kabupaten Sidoarjo",
    year: "2026",
    studentName: "Charen Jullieta Kertiyasa",
    studentClass: "XII TJAT 3",
    image: "/images/tentang-kami/prestasi/prestasi-pelajar-pelopor-llaj-charen.png",
    description:
      "Menjadi pelajar bukan hanya tentang belajar di dalam kelas. Charen Jullieta Kertiyasa berhasil meraih Juara 2 Pemilihan Pelajar Pelopor Keselamatan Lalu Lintas dan Angkutan Jalan (LLAJ) Kabupaten Sidoarjo 2026. Prestasi ini menunjukkan bahwa kepedulian dan keberanian untuk berkontribusi juga dapat menjadi bagian dari perjalanan berprestasi.",
  },
  {
    id: "porkab-renang-kupu-kupu-2026",
    title: "50 Meter yang Membawa Pulang Prestasi",
    category: "Olahraga",
    award: "Juara 3",
    badgeLevel: "Juara 3",
    competition: "Gaya Kupu-Kupu 50 M KU Open - PORKAB Sidoarjo 2026",
    organizer: "PORKAB Sidoarjo",
    year: "2026",
    studentName: "Muhammad Nabil Putra R",
    studentClass: "XIII SIJA",
    image: "/images/tentang-kami/prestasi/prestasi-porkab-renang-nabil.png",
    description:
      "Dalam perlombaan, setiap detik memiliki arti. Muhammad Nabil Putra R berhasil meraih Juara 3 Gaya Kupu-Kupu 50 M KU Open pada PORKAB Sidoarjo 2026. Pencapaian ini menjadi hasil dari proses latihan dan ketekunan untuk terus memberikan performa terbaik di lintasan.",
  },
  {
    id: "content-creator-competition-2026",
    title: "Dari Sebuah Ide, Menjadi Sebuah Cerita",
    category: "Seni & Kreatif",
    award: "Juara 3",
    badgeLevel: "Juara 3",
    competition: "Content Creator Competition Sidoarjo School Fest 2026",
    organizer: "Sidoarjo School Fest 2026",
    year: "2026",
    studentName: "Ahmad Rico Raharjo, Rahardian Surya Darmawan, Aura Luthfia Annisa, & Daffa Zayyan Aryabima",
    studentClass: "SMK Telkom Sidoarjo",
    image: "/images/tentang-kami/prestasi/prestasi-content-creator-sidoarjo.png",
    description:
      "Sebuah karya selalu dimulai dari sebuah ide. Ahmad Rico Raharjo, Rahardian Surya Darmawan, Aura Luthfia Annisa, dan Daffa Zayyan Aryabima berhasil meraih Juara 3 Content Creator Competition Sidoarjo School Fest 2026. Lewat kreativitas dan kolaborasi, mereka mengolah ide menjadi karya yang berhasil mendapatkan apresiasi dalam kompetisi.",
  },
  {
    id: "lafest-telkom-university-2026",
    title: "Membawa Karya Lebih Jauh",
    category: "Seni & Kreatif",
    award: "Juara 2",
    badgeLevel: "Juara 2",
    competition: "LAFEST 2026 Tingkat Nasional",
    organizer: "Telkom University Bandung",
    year: "2026",
    studentName: "Muhammad Afgan Gahzy",
    studentClass: "SMK Telkom Sidoarjo",
    image: "/images/tentang-kami/prestasi/prestasi-lafest-afgan.png",
    description:
      "Sebuah karya tidak berhenti ketika selesai dibuat. Muhammad Afgan Gahzy berhasil meraih Juara 2 LAFEST 2026 Tingkat Nasional yang diselenggarakan oleh Telkom University Bandung. Pencapaian ini menjadi kesempatan untuk membawa karya lebih jauh sekaligus menunjukkan potensi dalam kompetisi tingkat nasional.",
  },
  {
    id: "fls2n-film-pendek-2026",
    title: "Ketika Sebuah Cerita Menjadi Prestasi",
    category: "Seni & Kreatif",
    award: "Juara 1",
    badgeLevel: "Juara 1",
    competition: "Film Pendek FLS3N 2026 Kab Sidoarjo",
    organizer: "FLS3N Kab Sidoarjo",
    year: "2026",
    studentName: "Ghulam Nawwaf, Rahardian Surya Darmawan, & Ahmad Rico Raharjo",
    studentClass: "SMK Telkom Sidoarjo",
    image: "/images/tentang-kami/prestasi/prestasi-fls2n-film-pendek.png",
    description:
      "Setiap film berawal dari sebuah cerita, tetapi tidak semua cerita berakhir di podium. Ghulam Nawwaf, Rahardian Surya Darmawan, dan Ahmad Rico Raharjo berhasil meraih Juara 1 Film Pendek FLS3N 2026 Kabupaten Sidoarjo. Melalui kreativitas dan kerja sama, mereka mengubah sebuah gagasan menjadi karya yang berhasil meraih prestasi.",
  },
  {
    id: "ficpact-cup-ai-storytelling-2026",
    title: "Ketika Teknologi Punya Cerita",
    category: "IT & AI",
    award: "Juara 1",
    badgeLevel: "Juara 1",
    competition: "AI Video Story Telling pada FICPACT CUP 2026",
    organizer: "BEM FIKOM Universitas Katolik Soegijapranata (SCU)",
    year: "2026",
    studentName: "Agung Dwi Saputra & Gregorius Olvans A.W",
    studentClass: "SMK Telkom Sidoarjo",
    image: "/images/tentang-kami/prestasi/prestasi-ficpact-ai-storytelling.png",
    description:
      "Bagaimana jika kecanggihan teknologi bertemu dengan kekuatan sebuah cerita? Agung Dwi Saputra dan Gregorius Olvans A.W menjawabnya melalui karya yang berhasil meraih Juara 1 AI Video Storytelling pada FICPACT CUP 2026 yang diselenggarakan oleh BEM FIKOM Universitas Katolik Soegijapranata (SCU). Sebuah karya yang memadukan storytelling dan teknologi AI dalam satu gagasan kreatif.",
  },
];
