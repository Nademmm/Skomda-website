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
