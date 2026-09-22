export interface NewsItem {
  id?: number | string;
  title: string;
  slug: string;
  category: string;
  day?: string;
  month?: string;
  dateFormatted?: string;
  time?: string;
  image?: string;
  summary?: string;
  content?: string;
  author?: string;
  created_at?: string;
  updated_at?: string;
}

export const NEWS_CATEGORIES = [
  "Semua",
  "Kegiatan Sekolah",
  "Pengumuman",
  "Prestasi",
  "Kemitraan & Kerja Sama",
  "Karya & Inovasi Siswa",
  "Artikel & Edukasi",
  "Alumni",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export function normalizeNewsImage(img?: string): string {
  if (!img) return "/images/berita/news-thumb-1.png";
  if (img.startsWith("/figma/")) {
    const filename = img.replace("/figma/", "");
    if (filename === "news-thumb-1.png") return "/images/berita/news-thumb-1.png";
    if (filename === "charen.png") return "/images/program/profil-jurusan/charen.png";
    if (filename.startsWith("image")) return `/images/home/hero/${filename}`;
    return `/images/berita/${filename}`;
  }
  return img;
}

export function normalizeNewsItem(item: NewsItem): NewsItem {
  return {
    ...item,
    image: normalizeNewsImage(item.image),
  };
}

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 101,
    title: "Penuh Dedikasi! Siswa dan Guru SMK Telkom Sidoarjo Peringati Hari Kemerdekaan RI ke-81",
    slug: "penuh-dedikasi-siswa-dan-guru-smk-telkom-sidoarjo-peringati-hari-kemerdekaan-ri-ke-81",
    category: "Kegiatan Sekolah",
    day: "17",
    month: "AGT",
    dateFormatted: "17 Agustus 2026",
    time: "08.00",
    image: "/images/berita/berita-hut-ri-81.png",
    summary:
      "Upacara peringatan Hari Kemerdekaan Republik Indonesia ke-81 di SMK Telkom Sidoarjo berlangsung dengan khidmat dan penuh semangat nasionalisme.",
    content:
      "Upacara peringatan Hari Kemerdekaan Republik Indonesia ke-81 di SMK Telkom Sidoarjo berlangsung dengan khidmat dan penuh semangat nasionalisme.\n\nBertindak sebagai Inspektur Upacara, Kepala SMK Telkom Sidoarjo, Bapak Abror, S.Hum., M.Pd.\n\nTerima kasih kepada seluruh petugas upacara yang telah menjalankan tugas dengan penuh tanggung jawab dan dedikasi. Mari terus kobarkan semangat kemerdekaan dan semangat berkarya untuk Indonesia!",
    author: "Humas SKOMDA",
  },
  {
    id: 102,
    title: "Bikin Suasana 17-an Makin Pecah, Intip Keseruan Rangkaian Lomba di Kegiatan SPECTRA!",
    slug: "bikin-suasana-17-an-makin-pecah-intip-keseruan-rangkaian-lomba-di-kegiatan-spectra",
    category: "Kegiatan Sekolah",
    day: "18",
    month: "AGT",
    dateFormatted: "18 Agustus 2026",
    time: "13.30",
    image: "/images/berita/berita-lomba-spectra.png",
    summary:
      "17-an di SKOMDA auto seru! Bukan cuma siswa, guru, karyawan, sampai seluruh warga sekolah ikut turun langsung meramaikan lomba 17 Agustus SPECTRA.",
    content:
      "17-an di SKOMDA auto seru!\n\nBukan cuma siswa, kali ini guru, karyawan, sampai seluruh warga sekolah ikut turun langsung meramaikan lomba 17 Agustus dalam rangkaian SPECTRA!\n\nMulai dari ketawa bareng, adu strategi, sampai momen-momen seru yang bikin susah move on. Karena di SKOMDA, kemerdekaan paling seru kalau dirayakan bersama-sama!",
    author: "OSIS SKOMDA",
  },
  {
    id: 103,
    title: "Sabet Medali Emas LKS Nasional 2026, Siswa SMK Telkom Sidoarjo Raih Bantuan Pendidikan dari Gubernur Khofifah",
    slug: "sabet-medali-emas-lks-nasional-2026-siswa-smk-telkom-sidoarjo-raih-bantuan-pendidikan-dari-gubernur-khofifah",
    category: "Prestasi",
    day: "12",
    month: "AGT",
    dateFormatted: "12 Agustus 2026",
    time: "10.00",
    image: "/images/berita/berita-lks-emas-revano.png",
    summary:
      "Setelah meraih Medali Emas Artificial Intelligence di LKS Dikmen Nasional 2026, Revano Satya Pandega menerima bantuan pendidikan dari Gubernur Jawa Timur.",
    content:
      "Setelah meraih Medali Emas Artificial Intelligence di LKS Dikmen Nasional 2026, Revano Satya Pandega kembali menerima bantuan pendidikan dari Gubernur Jawa Timur, Ibu Khofifah Indar Parawansa sebagai bentuk apresiasi atas prestasinya.\n\nMelalui Kepala Dinas Pendidikan Provinsi Jawa Timur, Dr. Aries Agung Paewai, S.STP., M.M., penghargaan ini diharapkan menjadi penyemangat agar Revano terus belajar, berkembang, dan meraih mimpi yang lebih tinggi.\n\nHari ini Revano. Besok, bisa jadi giliran kamu!",
    author: "Tim Redaksi SKOMDA",
  },
  {
    id: 104,
    title: "Bentuk Talenta Siap Kerja, SMK Telkom Sidoarjo Bekali Siswa Pemahaman Industri Lewat Seminar Kebekerjaan",
    slug: "bentuk-talenta-siap-kerja-smk-telkom-sidoarjo-bekali-siswa-pemahaman-industri-lewat-seminar-kebekerjaan",
    category: "Karya & Inovasi Siswa",
    day: "08",
    month: "AGT",
    dateFormatted: "8 Agustus 2026",
    time: "09.15",
    image: "/images/berita/berita-seminar-kebekerjaan.png",
    summary:
      "From Student to Professional: Menjadi profesional bukan dimulai saat lulus, tetapi sejak masih di bangku sekolah melalui Seminar Kebekerjaan SKOMDA.",
    content:
      "From Student to Professional: Menjadi profesional bukan dimulai saat lulus, tetapi sejak masih di bangku sekolah.\n\nMelalui Seminar Kebekerjaan, siswa belajar memahami dunia industri secara langsung, membangun keterampilan yang dibutuhkan, serta mempersiapkan diri menghadapi karier masa depan.\n\nDi SKOMDA, kami percaya bahwa pendidikan bukan sekadar menghasilkan lulusan, tetapi membentuk talenta terbaik yang siap berkarier di dunia industri.",
    author: "BKK SKOMDA",
  },
  {
    id: 105,
    title: "Sesuaikan Kebutuhan Industri Masa Kini, SKOMDA Sediakan 9 Pilihan Keahlian Digital Talent Program",
    slug: "sesuaikan-kebutuhan-industri-masa-kini-skomda-sediakan-9-pilihan-keahlian-digital-talent-program",
    category: "Artikel & Edukasi",
    day: "04",
    month: "AGT",
    dateFormatted: "4 Agustus 2026",
    time: "11.00",
    image: "/images/berita/berita-dtp-9-keahlian.png",
    summary:
      "SKOMDA sediakan 9 pilihan keahlian DTP mulai dari Software Developer, Network, IoT, Cloud, AI Specialist hingga Cyber Security.",
    content:
      "Kalau masa depanmu ada di dunia digital, kamu mau jadi apa?\n\nDi SKOMDA, kamu bisa mulai langkahmu lewat Digital Talent Program (DTP) yang dirancang sesuai kebutuhan industri masa kini. Sembilan pilihan peminatan DTP meliputi Software Developer, Network System Administrator, Network Infrastructure Engineer, Visual Communication Designer, IoT Engineer, Cloud Engineer, AI Specialist, Digital Marketing Specialist, dan Cyber Security Specialist.\n\nDi sini siswa belajar langsung lewat project riil industri dan mengasah portofolio nyata.",
    author: "Tim Kurikulum SKOMDA",
  },
  {
    id: 106,
    title: "Sambut Siswa Baru, SMK Telkom Sidoarjo Tuntaskan Rangkaian Pra MPLS dan Leadership 2026",
    slug: "sambut-siswa-baru-smk-telkom-sidoarjo-tuntaskan-rangkaian-pra-mpls-dan-leadership-2026",
    category: "Kegiatan Sekolah",
    day: "28",
    month: "JUL",
    dateFormatted: "28 Juli 2026",
    time: "14.00",
    image: "/images/berita/berita-pra-mpls-leadership.png",
    summary:
      "Rangkaian Pra MPLS dan Leadership 2026 selesai dengan lancar, mempersiapkan siswa baru untuk memasuki lingkungan belajar berkarakter.",
    content:
      "Pra MPLS dan Leadership 2026 telah tuntas dilaksanakan dengan lancar. Seluruh rangkaian pembekalan kedisiplinan, pengenalan budaya sekolah, dan kepemimpinan dasar diikuti dengan antusiasme tinggi oleh ratusan calon peserta didik baru.\n\nDengan semangat ini, siswa baru SKOMDA siap menapaki petualangan akademik dan vokasi dengan mentalitas pembelajar mandiri dan berintegritas.",
    author: "Kesiswaan SKOMDA",
  },
  {
    id: 107,
    title: "SPMB INDEN 2027/2028 Resmi Dibuka: Bebas Biaya Pendaftaran Khusus Batch Inden",
    slug: "spmb-inden-2027-2028-resmi-dibuka-bebas-biaya-pendaftaran-khusus-batch-inden",
    category: "Pengumuman",
    day: "20",
    month: "JUL",
    dateFormatted: "20 Juli 2026",
    time: "08.30",
    image: "/images/berita/berita-spmb-inden-2027.png",
    summary:
      "Penerimaan peserta didik baru Batch Inden dibuka resmi dengan benefit bebas biaya pendaftaran bagi calon siswa berprestasi.",
    content:
      "SPMB INDEN 2027/2028 resmi dibuka! Saatnya mengambil langkah pertama menuju masa depan cerah bersama SMK Telkom Sidoarjo.\n\nNikmati benefit spesial Free Biaya Pendaftaran khusus peserta Batch Inden sebelum batas waktu pendaftaran berakhir. Informasi lengkap dan pendaftaran online dapat diakses melalui portal resmi https://s.id/SPMBSKOMDA atau hotline 08113021919.",
    author: "Panitia SPMB SKOMDA",
  },
  {
    id: 108,
    title: "61 Tahun Mengabdi, Telkom Indonesia Terus Dorong Kemajuan Ekosistem Digital Nasional",
    slug: "61-tahun-mengabdi-telkom-indonesia-terus-dorong-kemajuan-ekosistem-digital-nasional",
    category: "Kemitraan & Kerja Sama",
    day: "06",
    month: "JUL",
    dateFormatted: "6 Juli 2026",
    time: "09.00",
    image: "/images/berita/berita-hut-telkom-61.png",
    summary:
      "Mengusung semangat Sinergi Transformasi, PT Telkom Indonesia terus memperkuat fondasi talenta digital melalui Telkom Schools.",
    content:
      "Selamat Ulang Tahun ke-61 Telkom Indonesia! Selama lebih dari enam dekade, Telkom Indonesia senantiasa menjadi penggerak utama transformasi digital di seluruh pelosok Nusantara.\n\nMelalui Yayasan Pendidikan Telkom dan SMK Telkom Sidoarjo, sinergi inovasi terus diakselerasi untuk mencetak generasi muda yang kompeten dan siap mengarungi era ekonomi digital global.",
    author: "Yayasan Pendidikan Telkom",
  },
  {
    id: 109,
    title: "Upaya Tingkatkan Kualitas Pengajar, Guru SKOMDA Dalami Implementasi AI Bersama Telkom University",
    slug: "upaya-tingkatkan-kualitas-pengajar-guru-skomda-dalami-implementasi-ai-bersama-telkom-university",
    category: "Kegiatan Sekolah",
    day: "24",
    month: "JUN",
    dateFormatted: "24 Juni 2026",
    time: "11.30",
    image: "/images/berita/berita-guru-ai-education.png",
    summary:
      "Bapak dan Ibu guru SMK Telkom Sidoarjo mengikuti pelatihan AI for Education bersama dosen Fakultas Ilmu Terapan Telkom University.",
    content:
      "Dalam semangat terus berinovasi, guru-guru SMK Telkom Sidoarjo mengikuti program intensif 'AI for Education' yang dipandu langsung oleh akademisi Telkom University.\n\nPelatihan ini memfokuskan integrasi teknologi kecerdasan artifisial dalam metode pengajaran di kelas, pemanfaatan AI dalam otomatisasi penilaian, serta etika penggunaan teknologi bagi siswa.",
    author: "Tim Kurikulum SKOMDA",
  },
  {
    id: 110,
    title: "Julukan 'Spider-Man Darjo': Billal Habibulloh Siswa SKOMDA Sabet Juara 3 Kejurprov Jatim U17",
    slug: "julukan-spider-man-darjo-billal-habibulloh-siswa-skomda-sabet-juara-3-kejurprov-jatim-u17",
    category: "Prestasi",
    day: "18",
    month: "JUN",
    dateFormatted: "18 Juni 2026",
    time: "15.45",
    image: "/images/berita/berita-billal-spiderman-darjo.png",
    summary:
      "Prestasi membanggakan dari cabang olahraga panjat dinding diraih oleh Billal Habibulloh Arrasyid pada Kejurprov Jatim U17 Speed KONI.",
    content:
      "Prestasi gemilang kembali ditorehkan oleh siswa SMK Telkom Sidoarjo. Billal Habibulloh Arrasyid, siswa kelas XI TJAT 3, sukses membawa pulang medali Juara 3 pada Kejurprov Jawa Timur kategori U17 Speed yang diadakan oleh KONI Jawa Timur.\n\nJulukan 'Spider-Man Darjo' disematkan atas kelincahan dan kecepatannya memanjat dinding vertikal dalam hitungan detik.",
    author: "Ekstrakurikuler Panjat SKOMDA",
  },
  {
    id: 111,
    title: "Gak Mau Kalah Canggih! Guru SKOMDA Sambangi PT Hummatech Hingga Nortis AI",
    slug: "gak-mau-kalah-canggih-guru-skomda-sambangi-pt-hummatech-hingga-nortis-ai",
    category: "Kemitraan & Kerja Sama",
    day: "10",
    month: "JUN",
    dateFormatted: "10 Juni 2026",
    time: "14.20",
    image: "/images/berita/berita-kunjungan-industri-guru.png",
    summary:
      "Para guru SMK Telkom Sidoarjo melaksanakan Kunjungan Industri ke PT Hummatech, Nortis AI, dan PT Radnet Digital Indonesia.",
    content:
      "Di balik siswa yang kompeten, ada guru yang selalu memperbarui wawasannya. Melalui kunjungan industri ke PT Hummatech, Nortis AI, dan PT Radnet Digital Indonesia, tenaga pendidik SKOMDA berdiskusi langsung mengenai kebutuhan riil industri teknologi masa kini.\n\nLangkah ini memastikan setiap materi ajar di kelas selalu seirama dengan perkembangan teknologi terbaru.",
    author: "Hubungan Industri SKOMDA",
  },
  {
    id: 112,
    title: "Siap Go International: Siswa SKOMDA Dikenalkan Peluang Kerja ke Korea Selatan Lewat BP3MI Jatim",
    slug: "siap-go-international-siswa-skomda-dikenalkan-peluang-kerja-ke-korea-selatan-lewat-bp3mi-jatim",
    category: "Kemitraan & Kerja Sama",
    day: "02",
    month: "JUN",
    dateFormatted: "2 Juni 2026",
    time: "10.30",
    image: "/images/berita/berita-bp3mi-korea-selatan.png",
    summary:
      "BP3MI Jawa Timur kenalkan skema kerja Government to Government (GtoG) ke Korea Selatan untuk membuka karier global lulusan vokasi.",
    content:
      "SMK Telkom Sidoarjo bekerja sama dengan BP3MI Jawa Timur menyelenggarakan sosialisasi peluang karier ke Korea Selatan melalui skema resmi Government to Government (GtoG).\n\nSiswa diberikan wawasan mendalam seputar persiapan bahasa, sertifikasi kejuruan, dan etos kerja internasional agar siap berkompetisi di tingkat global.",
    author: "BKK SKOMDA",
  },
  {
    id: 1,
    title: "Tidak Sekadar Ziarah: Siswa SMK Telkom Sidoarjo Hidupkan Semangat Kepahlawanan di TMP",
    slug: "tidak-sekadar-ziarah-siswa-smk-telkom-sidoarjo-hidupkan-semangat-kepahlawanan-di-tmp",
    category: "Kegiatan Sekolah",
    day: "27",
    month: "MEI",
    dateFormatted: "27 Mei 2025",
    time: "12.30",
    image: "/images/berita/news-thumb-1.png",
    summary:
      "Dalam rangka memperingati hari bersejarah, siswa SMK Telkom Sidoarjo melaksanakan ziarah dan kegiatan edukatif di Taman Makam Pahlawan Kusuma Bangsa.",
    content:
      "Sidoarjo: Ratusan siswa-siswi SMK Telkom Sidoarjo (SKOMDA) bersama jajaran dewan guru menyelenggarakan kegiatan ziarah dan renungan kebangsaan di Taman Makam Pahlawan Kusuma Bangsa Sidoarjo.\n\nKegiatan ini bukan hanya seremoni tabur bunga semata, melainkan bagian dari pendidikan karakter dan penguatan Profil Pelajar Pancasila yang rutin diadakan sekolah. Para siswa diajak memahami pengorbanan para pahlawan dalam memperjuangkan kemerdekaan serta mengimplementasikan nilai integritas, kerja keras, dan kepemimpinan dalam era teknologi saat ini.\n\nKepala Sekolah SMK Telkom Sidoarjo menyampaikan bahwa generasi muda di bidang teknologi harus memiliki fondasi nasionalisme yang kokoh agar karya inovasi mereka selalu berorientasi pada kemaslahatan bangsa.",
    author: "Tim Humas SKOMDA",
  },
  {
    id: 2,
    title: "Siswi SKOMDA Sukses Raih Juara 1 INSYS FEST 5.0 dengan Aplikasi Kustomisasi Batik",
    slug: "siswi-skomda-sukses-raih-juara-1-insys-fest-5-aplikasi-kustomisasi-batik",
    category: "Prestasi",
    day: "24",
    month: "MEI",
    dateFormatted: "24 Mei 2025",
    time: "10.15",
    image: "/images/home/hero/image1.png",
    summary:
      "Karya inovatif digitalisasi budaya lokal mengantarkan siswi SIJA meraih penghargaan tingkat nasional pada ajang INSYS FEST 5.0.",
    content:
      "Prestasi membanggakan kembali diukir oleh siswi program keahlian Sistem Informasi Jaringan dan Aplikasi (SIJA) SMK Telkom Sidoarjo. Tim inovator SKOMDA berhasil merebut Juara 1 dalam ajang bergengsi INSYS FEST 5.0 kategori App Development tingkat nasional.\n\nAplikasi yang dikembangkan memanfaatkan kecerdasan buatan (AI) untuk membantu perajin lokal menghasilkan pola motif batik khas Nusantara secara digital yang dapat langsung diaplikasikan ke mesin cetak tekstil modern.\n\nDewan juri mengapresiasi inovasi ini karena tidak hanya memiliki keunggulan teknis algoritma yang rapi, namun juga memberikan dampak nyata bagi pelestarian budaya dan pemberdayaan ekonomi UMKM kreatif.",
    author: "Redaksi Prestasi SKOMDA",
  },
  {
    id: 3,
    title: "Lomba Matematika SMP/MTs Terbesar Se-Sidoarjo Sukses Digelar di SKOMDA",
    slug: "lomba-matematika-smp-mts-terbesar-se-sidoarjo-sukses-digelar-di-skomda",
    category: "Kegiatan Sekolah",
    day: "20",
    month: "MEI",
    dateFormatted: "20 Mei 2025",
    time: "09.00",
    image: "/images/home/hero/image4.png",
    summary:
      "Ratusan peserta dari puluhan sekolah antusias mengikuti kompetisi logika matematika dan sains yang diselenggarakan oleh OSIS SKOMDA.",
    content:
      "SMK Telkom Sidoarjo sukses menghelat Kompetisi Logika Matematika dan Sains Terbuka untuk jenjang SMP/MTs se-Jawa Timur. Lebih dari 300 peserta dari 45 sekolah hadir menunjukkan ketajaman penalaran komputasional mereka di Aula Graha Telkom SKOMDA.\n\nSelain kompetisi, para guru pendamping dan siswa juga berkesempatan mengikuti open house laboratorium teknologi, mencoba simulator jaringan fiber optic, serta menyaksikan showcase karya software buatan siswa SMK Telkom Sidoarjo.",
    author: "Panitia Lomba SKOMDA",
  },
  {
    id: 4,
    title: "Siswa XII SIJA 1 Raih Juara 3 FITCOM 3.0 di Universitas Dinamika Surabaya",
    slug: "siswa-xii-sija-1-raih-juara-3-fitcom-3-di-universitas-dinamika",
    category: "Prestasi",
    day: "17",
    month: "MEI",
    dateFormatted: "17 Mei 2025",
    time: "14.20",
    image: "/images/home/hero/image5.png",
    summary:
      "Prestasi membanggakan kembali diraih siswa kejuruan dalam kompetisi networking & cloud computing tingkat perguruan tinggi.",
    content:
      "Siswa kelas XII SIJA 1 SMK Telkom Sidoarjo menorehkan prestasi gemilang dengan meraih Juara 3 pada ajang FITCOM 3.0 yang diselenggarakan Fakultas Ilmu Terapan Universitas Dinamika Surabaya.\n\nDalam perlombaan ini, peserta diuji dalam perancangan arsitektur cloud server, konfigurasi routing switching skala enterprise, serta keamanan siber defensif. Keberhasilan ini membuktikan kurikulum berbasis industri di SKOMDA mampu bersaing di level perguruan tinggi.",
    author: "Tim Humas SKOMDA",
  },
  {
    id: 5,
    title: "SKOMDA KUBIK 2025 Resmi Dibuka: SMK Telkom Sidoarjo Dorong Siswa Jadi Inovator Muda",
    slug: "skomda-kubik-2025-resmi-dibuka-smk-telkom-sidoarjo-dorong-siswa-jadi-inovator-muda",
    category: "Kegiatan Sekolah",
    day: "13",
    month: "MEI",
    dateFormatted: "13 Mei 2025",
    time: "08.45",
    image: "/images/home/hero/image6.png",
    summary:
      "Ajang tahunan inkubasi ide bisnis dan karya teknologi digital siswa dibuka secara meriah bersama praktisi industri teknologi.",
    content:
      "Program inkubasi inovasi tahunan SKOMDA KUBIK 2025 resmi dibuka hari ini. Melalui program ini, siswa diberikan mentoring intensif bersama praktisi startup teknologi terkemuka untuk mengubah ide proyek menjadi produk siap uji pasar.",
    author: "Tim Inkubator SKOMDA",
  },
  {
    id: 6,
    title: "Kerjasama Strategis SMK Telkom Sidoarjo Bersama Jagoan Hosting & Markaz Design",
    slug: "kerjasama-strategis-smk-telkom-sidoarjo-bersama-jagoan-hosting-markaz-design",
    category: "Kemitraan & Kerja Sama",
    day: "10",
    month: "MEI",
    dateFormatted: "10 Mei 2025",
    time: "11.00",
    image: "/images/berita/news-thumb-1.png",
    summary:
      "Penandatanganan nota kesepahaman (MoU) kurikulum industri dan program magang bersertifikat untuk siswa SIJA dan TJAT.",
    content:
      "SMK Telkom Sidoarjo resmi menandatangani Nota Kesepahaman (MoU) kemitraan strategis dengan Jagoan Hosting dan Markaz Design untuk sinkronisasi kurikulum, guru tamu industri, serta penyaluran lulusan langsung kerja.",
    author: "Hubungan Industri SKOMDA",
  },
  {
    id: 7,
    title: "Pengumuman Jadwal Asesmen Sumatif Akhir Semester Ganjil Tahun Ajaran 2025/2026",
    slug: "pengumuman-jadwal-asesmen-sumatif-akhir-semester-ganjil-2025-2026",
    category: "Pengumuman",
    day: "05",
    month: "MEI",
    dateFormatted: "05 Mei 2025",
    time: "08.00",
    image: "/images/home/hero/image1.png",
    summary:
      "Informasi teknis dan tata tertib pelaksanaan asesmen digital berbasis Computer-Based Test (CBT) bagi seluruh siswa kelas X, XI, dan XII.",
    content:
      "Diberitahukan kepada seluruh siswa-siswi SMK Telkom Sidoarjo bahwa Asesmen Sumatif Akhir Semester Ganjil akan diselenggarakan menggunakan platform ujian digital CBT sekolah.",
    author: "Kurikulum SKOMDA",
  },
  {
    id: 8,
    title: "Karya Siswa: Inovasi Smart Greenhouse Berbasis IoT dan Cloud Computing SIJA",
    slug: "karya-siswa-inovasi-smart-greenhouse-berbasis-iot-cloud-computing-sija",
    category: "Karya & Inovasi Siswa",
    day: "02",
    month: "MEI",
    dateFormatted: "02 Mei 2025",
    time: "13.30",
    image: "/images/home/hero/image4.png",
    summary:
      "Sistem pemantauan iklim mikro tanaman otomatis karya siswa kelas XI yang terintegrasi dengan dashboard monitoring realtime.",
    content:
      "Siswa kelas XI SIJA menciptakan prototype Smart Greenhouse yang memadukan sensor kelembaban tanah, suhu, dan intensitas cahaya dengan kontrol otomatis pompa nutrisi hidroponik berbasis IoT.",
    author: "Lab IoT SKOMDA",
  },
  {
    id: 9,
    title: "Tips Menghadapi Sertifikasi CCNA dan Cloud Architect untuk Siswa Kejuruan",
    slug: "tips-menghadapi-sertifikasi-ccna-dan-cloud-architect-untuk-siswa-smk",
    category: "Artikel & Edukasi",
    day: "28",
    month: "APR",
    dateFormatted: "28 Apr 2025",
    time: "15.00",
    image: "/images/home/hero/image5.png",
    summary:
      "Panduan praktis dan strategi belajar efektif untuk menembus ujian sertifikasi internasional di bidang telekomunikasi dan jaringan.",
    content:
      "Mendapatkan sertifikasi internasional seperti Cisco CCNA dan AWS Certified Cloud Practitioner membuka peluang karir global yang luas bagi lulusan SMK. Berikut panduan persiapan dan tips belajarnya.",
    author: "Guru Kejuruan TJAT",
  },
  {
    id: 10,
    title: "Kisah Sukses Alumni SKOMDA: Bekerja Sebagai Software Engineer di Tech Startup Jakarta",
    slug: "kisah-sukses-alumni-skomda-bekerja-sebagai-software-engineer-tech-startup-jakarta",
    category: "Alumni",
    day: "25",
    month: "APR",
    dateFormatted: "25 Apr 2025",
    time: "16.30",
    image: "/images/program/profil-jurusan/charen.png",
    summary:
      "Cerita inspiratif alumni angkatan 2022 tentang perjalanan karir dari bangku SMK hingga dipercaya memimpin tim pengembang aplikasi.",
    content:
      "Charen, alumni SMK Telkom Sidoarjo angkatan 2022, membagikan kisahnya meniti karir dari siswa kejuruan hingga menjadi Software Engineer di perusahaan teknologi terkemuka di Jakarta.",
    author: "Ikatan Alumni SKOMDA",
  },
  {
    id: 11,
    title: "Workshop Cyber Security Bersama Telkom University untuk Siswa Jurusan TJAT",
    slug: "workshop-cyber-security-bersama-telkom-university-siswa-tjat",
    category: "Kegiatan Sekolah",
    day: "21",
    month: "APR",
    dateFormatted: "21 Apr 2025",
    time: "10.00",
    image: "/images/berita/news-thumb-1.png",
    summary:
      "Pelatihan praktis pertahanan siber dan pengujian penetrasi sistem jaringan komputer dipandu langsung oleh dosen Tel-U.",
    content:
      "Siswa jurusan Teknik Jaringan Akses Telekomunikasi mengikuti workshop intensif tentang dasar-dasar ethical hacking, enkripsi data jaringan, dan firewall security bersama dosen Telkom University.",
    author: "Tim Humas SKOMDA",
  },
  {
    id: 12,
    title: "Pelepasan Siswa Prakerin Industri Angkatan 2025 ke 30+ Perusahaan Mitra Nasional",
    slug: "pelepasan-siswa-prakerin-industri-angkatan-2025-ke-30-perusahaan-mitra",
    category: "Kemitraan & Kerja Sama",
    day: "18",
    month: "APR",
    dateFormatted: "18 Apr 2025",
    time: "09.30",
    image: "/images/home/hero/image6.png",
    summary:
      "Kepala Sekolah melepas 180 siswa untuk mengikuti program Praktik Kerja Industri selama 6 bulan di berbagai kota metropolitan.",
    content:
      "Sebanyak 180 siswa SMK Telkom Sidoarjo resmi dilepas untuk melaksanakan Praktik Kerja Industri (Prakerin) di lebih dari 30 perusahaan mitra BUMN dan swasta nasional.",
    author: "Hubungan Industri SKOMDA",
  },
];

// Helper: Filter mock news
function filterMockNews(category?: string, search?: string): NewsItem[] {
  let result = [...MOCK_NEWS];
  if (category && category !== "Semua") {
    result = result.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }
  if (search && search.trim() !== "") {
    const term = search.toLowerCase();
    result = result.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        (item.summary && item.summary.toLowerCase().includes(term)) ||
        (item.content && item.content.toLowerCase().includes(term))
    );
  }
  return result;
}

/**
 * Mengambil daftar berita dari Go backend API (dengan filter opsional category & search).
 * Otomatis retry 1x jika gagal, lalu fallback ke mock data jika backend offline.
 */
export async function getNewsList(params?: {
  category?: string;
  search?: string;
}): Promise<NewsItem[]> {
  const queryParams = new URLSearchParams();
  if (params?.category && params.category !== "Semua") {
    queryParams.set("category", params.category);
  }
  if (params?.search && params.search.trim() !== "") {
    queryParams.set("search", params.search.trim());
  }

  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/news${queryString ? `?${queryString}` : ""}`;

  // Retry helper: coba fetch, jika gagal tunggu lalu retry 1x
  const attemptFetch = async (retries = 1): Promise<Response | null> => {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return res;
    } catch {
      // fetch failed (network error / backend belum siap)
    }
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1500));
      return attemptFetch(retries - 1);
    }
    return null;
  };

  try {
    const res = await attemptFetch(1);

    if (res) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        return json.data.map(normalizeNewsItem);
      }
    }

    // Backend tidak merespons atau data kosong → fallback
    if (typeof window !== "undefined") {
      console.log("[News] Menggunakan data lokal (backend belum tersedia)");
    }
    return filterMockNews(params?.category, params?.search).map(normalizeNewsItem);
  } catch {
    return filterMockNews(params?.category, params?.search).map(normalizeNewsItem);
  }
}

/**
 * Mengambil detail satu berita berdasarkan slug.
 */
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const cleanSlug = slug.toLowerCase().trim();
  const url = `${API_BASE_URL}/news/${encodeURIComponent(cleanSlug)}`;

  const attemptFetch = async (retries = 1): Promise<Response | null> => {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return res;
    } catch {
      // network error
    }
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1500));
      return attemptFetch(retries - 1);
    }
    return null;
  };

  try {
    const res = await attemptFetch(1);
    if (res) {
      const json = await res.json();
      if (json.data) return normalizeNewsItem(json.data);
    }
  } catch {
    // silent fallback
  }

  // Fallback ke mock data
  const fallbackItem = MOCK_NEWS.find(
    (item) => item.slug.toLowerCase() === cleanSlug
  );
  return fallbackItem ? normalizeNewsItem(fallbackItem) : null;
}

/**
 * Menambahkan berita baru ke database backend (POST /api/news).
 */
export async function createNews(
  data: Partial<NewsItem>
): Promise<{ success: boolean; data?: NewsItem; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || "Gagal membuat berita" };
    }
    return { success: true, data: json.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal terhubung ke backend",
    };
  }
}

/**
 * Memperbarui data berita (PUT /api/news/:id).
 */
export async function updateNews(
  id: number | string,
  data: Partial<NewsItem>
): Promise<{ success: boolean; data?: NewsItem; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || "Gagal memperbarui berita" };
    }
    return { success: true, data: json.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal terhubung ke backend",
    };
  }
}

/**
 * Menghapus berita (DELETE /api/news/:id).
 */
export async function deleteNews(
  id: number | string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || "Gagal menghapus berita" };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal terhubung ke backend",
    };
  }
}
