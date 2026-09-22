export interface FasilitasItem {
  id: string;
  name: string;
  category: "Ruang Belajar & RPS" | "Laboratorium Kejuruan" | "Sarana Umum & Olahraga";
  description: string;
  specs: string[];
  image: string;
  badge: string;
}

export const FASILITAS_CATEGORIES = [
  "Semua",
  "Ruang Belajar & RPS",
  "Laboratorium Kejuruan",
  "Sarana Umum & Olahraga",
] as const;

export const FASILITAS_LIST: FasilitasItem[] = [
  {
    id: "ruang-kelas-modern",
    name: "Ruang Kelas Modern",
    category: "Ruang Belajar & RPS",
    description:
      "Ruang kelas berstandar internasional yang dirancang ergonomis untuk mendukung interaksi pembelajaran aktif dan kolaboratif antar siswa dan guru.",
    specs: ["Air Conditioner (AC) Full", "Smart TV 55 Inch Interaktif", "Meja & Kursi Single Seat Ergonomis", "Dedicated High-Speed Wi-Fi"],
    image: "/images/tentang-kami/fasilitas/fasilitas-gedung-utama.jpg",
    badge: "Smart Class",
  },
  {
    id: "gedung-rps-2-lantai",
    name: "Gedung RPS (Ruang Praktik Siswa)",
    category: "Ruang Belajar & RPS",
    description:
      "Gedung Ruang Praktik Siswa (RPS) 2 lantai yang menjadi pusat inkubasi skill teknis dan simulasi langsung lingkungan kerja industri digital.",
    specs: ["Bangunan 2 Lantai Modern", "Zona Proyek Industri & TeFa", "Ruang Diskusi Tim & Presentasi", "Standar Industri K3"],
    image: "/images/tentang-kami/fasilitas/fasilitas-rps.jpg",
    badge: "2 Lantai",
  },
  {
    id: "aula-videotron",
    name: "Aula / Graha Hall Videotron",
    category: "Sarana Umum & Olahraga",
    description:
      "Aula serbaguna megah dengan kapasitas besar, sound system auditorium, dan layar videotron besar untuk seminar kebekerjaan, wisuda, dan acara nasional.",
    specs: ["Layar Videotron Panggung LED Luas", "Kapasitas Ratusan Audiens", "Audio Visual & Tata Suara Studio", "Panggung Teatrikal & Presentasi"],
    image: "/images/tentang-kami/fasilitas/fasilitas-gedung-utama.jpg",
    badge: "Layar Videotron",
  },
  {
    id: "lab-fiber-optic",
    name: "Laboratorium Telekomunikasi & Fiber Optic (FO)",
    category: "Laboratorium Kejuruan",
    description:
      "Laboratorium spesialisasi TJAT dengan perangkat industri fiber optic mutakhir untuk pelatihan penyambungan fiber, pengukuran optical power, dan desain FTTH.",
    specs: ["Optical Fusion Splicer", "Optical Time Domain Reflectometer (OTDR)", "Optical Power Meter (OPM)", "Miniature Tiang & ODP Distribusi"],
    image: "/images/tentang-kami/fasilitas/fasilitas-rps.jpg",
    badge: "FTTH & Fusion Splicer",
  },
  {
    id: "lab-ai",
    name: "Laboratorium Artificial Intelligence (AI)",
    category: "Laboratorium Kejuruan",
    description:
      "Fasilitas riset komputasi AI bagi siswa dan guru untuk eksplorasi machine learning, computer vision, generative AI, dan video storytelling.",
    specs: ["High Performance GPU Workstations", "AI Model Training Frameworks", "Interactive Display Monitor", "Server Akses AI Terpusat"],
    image: "/images/tentang-kami/fasilitas/fasilitas-outdoor-class.jpg",
    badge: "High-End AI Workstation",
  },
  {
    id: "lab-iot",
    name: "Laboratorium Internet of Things (IoT)",
    category: "Laboratorium Kejuruan",
    description:
      "Dua ruang laboratorium IoT terintegrasi untuk prototipe mikrokontroler, sensor cerdas, otomatisasi smart home/smart school, dan sistem telemetri.",
    specs: ["2 Ruang Praktik IoT Khusus", "Sensor & Actuator Industrial Kits", "Development Boards (ESP32, Arduino, STM32)", "Platform IoT Cloud & Dashboard"],
    image: "/images/tentang-kami/fasilitas/fasilitas-rps.jpg",
    badge: "2 Ruang Khusus IoT",
  },
  {
    id: "lab-jaringan",
    name: "Laboratorium Jaringan Komputer & Cyber Security",
    category: "Laboratorium Kejuruan",
    description:
      "Laboratorium simulasi enterprise network dengan rackmount server, routerboard MikroTik, switch Cisco, serta infrastruktur network defense.",
    specs: ["Server Rackmount & Patch Panel", "Perangkat Cisco & Router MikroTik", "Simulasi Topologi Enterprise", "Tools Analisis Keamanan Jaringan"],
    image: "/images/tentang-kami/fasilitas/fasilitas-rps.jpg",
    badge: "Enterprise Network Rack",
  },
  {
    id: "lab-komputer",
    name: "Laboratorium Komputer & Rekayasa Perangkat Lunak",
    category: "Laboratorium Kejuruan",
    description:
      "Laboratorium komputasi berkapasitas besar untuk pengembangan software web, aplikasi mobile, database management system, dan cloud computing.",
    specs: ["PC Spesifikasi Tinggi Core i5/i7", "Koneksi LAN Gigabit Berkecepatan Tinggi", "IDE & Compiler Software Development Lengkap", "Ruang Sejuk Ber-AC"],
    image: "/images/tentang-kami/fasilitas/fasilitas-gedung-utama.jpg",
    badge: "Dedicated Coding Studio",
  },
  {
    id: "outdoor-class",
    name: "Outdoor Class & Eco Learning Zone",
    category: "Ruang Belajar & RPS",
    description:
      "Area pembelajaran luar ruang bernuansa asri dan hijau untuk diskusi santai, brainstorming kelompok, dan pengenalan konsep belajar terbuka.",
    specs: ["Suasana Terbuka & Hijau", "Meja Diskusi Kolaboratif", "Akses Wi-Fi Outdoor", "Zona Diskusi Santai"],
    image: "/images/tentang-kami/fasilitas/fasilitas-outdoor-class.jpg",
    badge: "Area Belajar Hijau",
  },
  {
    id: "kantin-cashless",
    name: "Kantin Cashless SKOMDA",
    category: "Sarana Umum & Olahraga",
    description:
      "Area pujasera sekolah yang higienis dengan sistem pembayaran 100% non-tunai (QRIS & tap card) untuk kenyamanan dan literasi keuangan digital.",
    specs: ["Transaksi Digital Cashless / QRIS", "Menu Sehat, Higienis, & Terkurasi", "Area Makan Luas dan Bersih", "Tempat Duduk Komunal"],
    image: "/images/tentang-kami/fasilitas/fasilitas-gedung-utama.jpg",
    badge: "100% Non-Tunai",
  },
  {
    id: "lapangan-olahraga-utama",
    name: "Lapangan Olahraga Utama",
    category: "Sarana Umum & Olahraga",
    description:
      "Lapangan multifungsi berstandar untuk upacara bendera, apel kedisiplinan, parade kegiatan siswa, serta olahraga futsal dan voli.",
    specs: ["Lapangan Luas Beraspal Halus & Marka Jelas", "Tiang Bendera Upacara Resmi", "Gawang Futsal & Net Voli", "Penerangan Lapangan"],
    image: "/images/tentang-kami/fasilitas/fasilitas-gedung-utama.jpg",
    badge: "Multifungsi",
  },
  {
    id: "lapangan-basket",
    name: "Lapangan Basket Standar",
    category: "Sarana Umum & Olahraga",
    description:
      "Fasilitas olahraga basket dengan lantai lapangan yang terawat baik dan ring kokoh untuk latihan rutin ekstrakurikuler serta turnamen internal.",
    specs: ["Ring Basket Standar Nasional", "Area Pembatas Lapangan Nyaman", "Pencahayaan Olahraga Sore/Malam", "Tribun Penonton Ringan"],
    image: "/images/tentang-kami/fasilitas/fasilitas-gedung-utama.jpg",
    badge: "Standar Pertandingan",
  },
  {
    id: "perpustakaan-digital",
    name: "Perpustakaan & Digital Resource Center",
    category: "Sarana Umum & Olahraga",
    description:
      "Pusat literasi dengan ribuan koleksi buku teks teknologi, fiksi, jurnal ilmiah, serta workstation akses e-library bagi seluruh civitas akademika.",
    specs: ["Koleksi Buku TI & Telekomunikasi Lengkap", "Katalog & Peminjaman E-Library", "Area Membaca Tenang & Ber-AC", "Terminal Akses Internet Siswa"],
    image: "/images/tentang-kami/fasilitas/fasilitas-gedung-utama.jpg",
    badge: "E-Library & Literasi",
  },
  {
    id: "ruang-uks",
    name: "Ruang Usaha Kesehatan Sekolah (UKS)",
    category: "Sarana Umum & Olahraga",
    description:
      "Fasilitas pertolongan pertama pada kesehatan siswa dan warga sekolah yang dilengkapi tempat tidur medis dan obat-obatan standar P3K.",
    specs: ["Tempat Tidur Pasien Nyaman", "Peralatan & Kotak Obat P3K Standar Medis", "Petugas PMR & Pembina UKS", "Lingkungan Bersih dan Steril"],
    image: "/images/tentang-kami/fasilitas/fasilitas-gedung-utama.jpg",
    badge: "Pertolongan Pertama",
  },
  {
    id: "smc-center",
    name: "SMC (Student Media Center)",
    category: "Ruang Belajar & RPS",
    description:
      "Pusat koordinasi media, podcast sekolah, dokumentasi visual, dan kreasi konten publikasi kegiatan SMK Telkom Sidoarjo.",
    specs: ["Perangkat Studio Audio & Podcast", "Kamera & Perlengkapan Sinematografi", "Lighting & Backdrop Green Screen", "Editing Station"],
    image: "/images/tentang-kami/fasilitas/fasilitas-outdoor-class.jpg",
    badge: "Media Studio",
  },
  {
    id: "gedung-kampus-skomda",
    name: "Gedung Kampus SMK Telkom Sidoarjo",
    category: "Sarana Umum & Olahraga",
    description:
      "Kompleks bangunan representatif berarsitektur modern di bawah naungan Yayasan Pendidikan Telkom yang asri, aman, dan berlokasi strategis di Sidoarjo.",
    specs: ["Keamanan 24 Jam & CCTV Terpadu", "Area Parkir Luas & Tertata", "Akses Jalan Utama Strategis", "Standar K3 & Jalur Evakuasi Kebakaran"],
    image: "/images/tentang-kami/fasilitas/fasilitas-gedung-utama.jpg",
    badge: "Kampus Modern",
  },
];
