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
  sija: {
    id: 1,
    kode: "SIJA",
    nama: "Sistem Informasi Jaringan dan Aplikasi",
    slug: "sija",
    deskripsi:
      "Program 4 tahun yang mempelajari pemrograman, pengelolaan basis data, dan sistem informasi berbasis teknologi modern.",
    skills: [
      "Software Development (Web, Mobile, Desktop)",
      "Database & Cloud Computing",
      "Networking & Cybersecurity",
    ],
    prospek_karier: [
      "Software Engineer",
      "Web Developer",
      "Mobile App Developer",
      "Database Administrator",
      "IT Security Specialist",
      "System Analyst",
    ],
    gambar: "/images/jurusan/sija.jpg",
  },
  tjat: {
    id: 2,
    kode: "TJAT",
    nama: "Teknik Jaringan Akses Telekomunikasi",
    slug: "tjat",
    deskripsi:
      "Program 3 tahun yang fokus pada teknologi jaringan telekomunikasi, infrastruktur fiber optic, dan sistem komunikasi modern.",
    skills: [
      "Telecommunication Networks",
      "Fiber Optic Technology (Instalasi, Maintenance, Troubleshooting)",
      "Wireless Communication (Komunikasi Nirkabel & Seluler)",
    ],
    prospek_karier: [
      "Network Engineer",
      "Telecommunication Technician",
      "Fiber Optic Specialist",
      "Wireless Network Administrator",
      "ISP Technician",
    ],
    gambar: "/images/jurusan/tjat.jpg",
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
