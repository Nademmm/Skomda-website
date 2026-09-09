/**
 * API Client untuk mengonsumsi Go Backend (Gin / Fiber).
 */

const API_BASE = import.meta.env.PUBLIC_API_URL || "http://localhost:8080/api";

export interface Jurusan {
  id: number;
  name: string;
  code: string;
  slug: string;
  years: number;
  description: string;
  tagline: string;
  focus: string;
  careerProspects: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  day: string;
  month: string;
  dateFormatted: string;
  time: string;
  image: string;
  summary: string;
  content: string;
  author: string;
}

export async function fetchJurusanList(): Promise<Jurusan[]> {
  try {
    const res = await fetch(`${API_BASE}/jurusan`);
    if (!res.ok) throw new Error("Gagal mengambil data jurusan");
    const json = await res.json();
    return json.data || [];
  } catch {
    // Fallback data statis jika backend offline
    return [
      {
        id: 1,
        name: "Sistem Informasi Jaringan dan Aplikasi",
        code: "SIJA",
        slug: "sija",
        years: 4,
        description: "Program keahlian 4 tahun fokus software engineering, cloud computing, cybersecurity, dan jaringan modern.",
        tagline: "Mencetak Software Engineer dan Cloud Architect masa depan.",
        focus: "Software Development, Cloud & Database, Network Security",
        careerProspects: "Software Engineer, Web/Mobile Developer, Cloud Engineer, IT Security Specialist",
      },
      {
        id: 2,
        name: "Teknik Jaringan Akses Telekomunikasi",
        code: "TJAT",
        slug: "tjat",
        years: 3,
        description: "Program keahlian 3 tahun berfokus pada infrastruktur fiber optik, komunikasi seluler, dan jaringan nirkabel modern.",
        tagline: "Pondasi konektivitas digital berstandar industri telekomunikasi.",
        focus: "Fiber Optic Infrastructure, Wireless Telecom, Modern Routing",
        careerProspects: "Network Engineer, Fiber Optic Specialist, Telecom Technician, ISP Administrator",
      },
    ];
  }
}

export async function fetchNewsList(category = "", search = ""): Promise<NewsItem[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);

    const res = await fetch(`${API_BASE}/news?${params.toString()}`);
    if (!res.ok) throw new Error("Gagal mengambil berita");
    const json = await res.json();
    return json.data || [];
  } catch {
    return [
      {
        id: 1,
        title: "SMK Telkom Sidoarjo Raih Prestasi Nasional Bidang Cloud Computing",
        slug: "prestasi-nasional-cloud-computing",
        category: "PRESTASI",
        day: "08",
        month: "SEP",
        dateFormatted: "8 September 2026",
        time: "14.30",
        image: "/images/berita/news-thumb-1.png",
        summary: "Siswa jurusan SIJA kembali mengharumkan nama sekolah di ajang kompetisi kejuruan tingkat nasional.",
        content: "Prestasi gemilang diraih oleh delegasi siswa SMK Telkom Sidoarjo dalam ajang bergengsi.",
        author: "Humas SKOMDA",
      },
      {
        id: 2,
        title: "Kunjungan Industri Jurusan TJAT ke Pusat Infrastruktur Telekomunikasi",
        slug: "kunjungan-industri-tjat",
        category: "KEGIATAN",
        day: "05",
        month: "SEP",
        dateFormatted: "5 September 2026",
        time: "10.00",
        image: "/images/home/hero/image1.png",
        summary: "Melihat langsung penerapan teknologi Fiber Optic dan Base Transceiver Station standar industri.",
        content: "Siswa jurusan TJAT mendapatkan wawasan praktis dunia kerja telekomunikasi modern.",
        author: "Tim Humas",
      },
    ];
  }
}
