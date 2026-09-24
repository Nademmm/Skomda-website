import fallbackAlumni from "@/data/alumni-angkatan-6.json";

export interface AlumniItem {
  id?: number;
  nisn: string;
  name: string;
  angkatan: string;
  tahunLulus: string;
  tahunAjaran: string;
  statusKelulusan: string;
  kategori: string;
  statusAktivitas: string;
  keterangan: string;
  institusi?: string;
  jurusan?: string;
  created_at?: string;
}

export const ALUMNI_CATEGORIES = [
  "Semua",
  "Melanjutkan Studi",
  "Bekerja",
  "Wirausaha",
  "Mencari Kerja",
  "Alumni",
] as const;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function getAlumniList(params?: {
  category?: string;
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: AlumniItem[]; total: number }> {
  try {
    const url = new URL(`${API_BASE_URL}/alumni`);
    if (params?.category && params.category !== "Semua") {
      url.searchParams.set("category", params.category);
    }
    if (params?.q) {
      url.searchParams.set("q", params.q);
    }
    if (params?.limit) {
      url.searchParams.set("limit", String(params.limit));
    }
    if (params?.offset) {
      url.searchParams.set("offset", String(params.offset));
    }

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        return { data: json.data, total: json.total || json.data.length };
      }
    }
  } catch {
    // Graceful fallback to static JSON
  }

  // Fallback to local alumni dataset
  let list = fallbackAlumni as AlumniItem[];
  if (params?.category && params.category !== "Semua") {
    list = list.filter((a) => a.kategori === params.category);
  }
  if (params?.q) {
    const qLower = params.q.toLowerCase();
    list = list.filter(
      (a) =>
        a.name.toLowerCase().includes(qLower) ||
        a.nisn.toLowerCase().includes(qLower) ||
        (a.institusi && a.institusi.toLowerCase().includes(qLower)) ||
        a.keterangan.toLowerCase().includes(qLower)
    );
  }

  const total = list.length;
  if (params?.limit && params.limit > 0) {
    const offset = params.offset || 0;
    list = list.slice(offset, offset + params.limit);
  }

  return { data: list, total };
}

export async function createAlumni(
  data: Partial<AlumniItem>
): Promise<{ success: boolean; data?: AlumniItem; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/alumni`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || "Gagal menambahkan data kelulusan siswa" };
    }
    return { success: true, data: json.data };
  } catch {
    return { success: false, error: "Gagal terhubung ke server backend" };
  }
}

export async function updateAlumni(
  id: number | string,
  data: Partial<AlumniItem>
): Promise<{ success: boolean; data?: AlumniItem; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/alumni/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || "Gagal memperbarui data siswa" };
    }
    return { success: true, data: json.data };
  } catch {
    return { success: false, error: "Gagal terhubung ke server backend" };
  }
}

export async function deleteAlumni(
  id: number | string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/alumni/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const json = await res.json();
      return { success: false, error: json.error || "Gagal menghapus data siswa" };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Gagal terhubung ke server backend" };
  }
}
