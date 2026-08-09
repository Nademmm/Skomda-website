import { jurusanList as fallbackJurusanList } from "@/lib/data";

export type JurusanItem = {
  id?: number;
  kode: string;
  nama: string;
  slug: string;
  deskripsi: string;
  skills: string[];
  prospek_karier: string[];
  gambar?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// Fallback data terformat jika backend offline atau error
const fallbackDataMap: Record<string, JurusanItem> = {
  rpl: {
    id: 1,
    kode: "RPL",
    nama: "Rekayasa Perangkat Lunak",
    slug: "rpl",
    deskripsi:
      "Membangun aplikasi web & mobile dari nol — dari desain sistem, pengembangan backend & frontend, hingga deployment industri.",
    skills: ["Pemrograman Web", "Basis Data", "Mobile Development", "DevOps Dasar"],
    prospek_karier: [
      "Software Engineer",
      "Fullstack Developer",
      "Mobile App Developer",
      "Database Administrator",
    ],
    gambar: "/images/jurusan/rpl.jpg",
  },
  tkj: {
    id: 2,
    kode: "TKJ",
    nama: "Teknik Komputer & Jaringan",
    slug: "tkj",
    deskripsi:
      "Merancang, memasang, merawat infrastruktur jaringan enterprise, mengelola server cloud, dan mengamankan sistem komputer.",
    skills: ["Jaringan Komputer", "Administrasi Server", "Keamanan Siber Dasar", "Cloud Computing"],
    prospek_karier: [
      "Network Engineer",
      "System Administrator",
      "Cloud Specialist",
      "Cyber Security Analyst",
    ],
    gambar: "/images/jurusan/tkj.jpg",
  },
  mm: {
    id: 3,
    kode: "MM",
    nama: "Multimedia",
    slug: "mm",
    deskripsi:
      "Produksi konten visual kreatif, motion graphic, animasi 2D/3D, UI/UX design, dan video editing untuk industri digital & broadcast.",
    skills: ["Desain Grafis", "Videografi & Editing", "Motion Design", "UI/UX Design"],
    prospek_karier: [
      "UI/UX Designer",
      "Motion Graphic Artist",
      "Video Editor",
      "Creative Content Creator",
    ],
    gambar: "/images/jurusan/mm.jpg",
  },
  tt: {
    id: 4,
    kode: "TT",
    nama: "Teknik Telekomunikasi",
    slug: "tt",
    deskripsi:
      "Mempelajari sistem transmisi sinyal digital, teknologi komunikasi nirkabel (5G), jaringan fiber optik, dan infrastruktur telekomunikasi modern.",
    skills: ["Fiber Optik", "Sistem Transmisi", "Jaringan Seluler", "RF & Nirkabel"],
    prospek_karier: [
      "Telecommunication Engineer",
      "Fiber Optic Specialist",
      "Drive Test Engineer",
      "Network Operation Center (NOC) Specialist",
    ],
    gambar: "/images/jurusan/tt.jpg",
  },
};

/**
 * Mengambil daftar semua jurusan dari Backend Go.
 * Jika backend tidak dapat dijangkau, fallback ke data lokal secara wajar tanpa crash.
 */
export async function getJurusanList(): Promise<JurusanItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/jurusan`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    if (json.data && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("[CRITICAL] Backend API /jurusan tidak terjangkau di production. Menggunakan fallback data:", error);
    } else {
      console.warn("[DEV FALLBACK] Backend API /jurusan offline atau gagal. Menggunakan fallback data lokal:", error);
    }
  }

  // Fallback map dari lib/data.ts menjaga ketahanan build SSG dan ketersediaan data
  return fallbackJurusanList.map((j) => {
    const lowerSlug = j.code.toLowerCase();
    return fallbackDataMap[lowerSlug] || {
      kode: j.code,
      nama: j.name,
      slug: lowerSlug,
      deskripsi: j.summary,
      skills: j.skills,
      prospek_karier: [],
    };
  });
}

/**
 * Mengambil detail jurusan berdasarkan slug.
 */
export async function getJurusanBySlug(slug: string): Promise<JurusanItem | null> {
  const lowerSlug = slug.toLowerCase();
  try {
    const res = await fetch(`${API_BASE_URL}/jurusan/${lowerSlug}`, {
      next: { revalidate: 60 },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    if (json.data) {
      return json.data;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error(`[CRITICAL] Backend API /jurusan/${slug} tidak terjangkau di production. Menggunakan fallback data:`, error);
    } else {
      console.warn(`[DEV FALLBACK] Backend API /jurusan/${slug} offline atau gagal. Menggunakan fallback data lokal:`, error);
    }
  }

  return fallbackDataMap[lowerSlug] || null;
}
