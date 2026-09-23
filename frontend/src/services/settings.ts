export interface SiteSettingItem {
  id?: number;
  key: string;
  value: string;
  category?: string;
  description?: string;
  updated_at?: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function getSiteSettings(): Promise<{
  data: SiteSettingItem[];
  map: Record<string, string>;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, { cache: "no-store" });
    if (res.ok) {
      return await res.json();
    }
    return { data: [], map: {} };
  } catch {
    return { data: [], map: {} };
  }
}

export async function updateSiteSetting(
  key: string,
  value: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings/${encodeURIComponent(key)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ value }),
    });
    const json = await res.json();
    if (!res.ok) return { success: false, error: json.error || "Gagal memperbarui pengaturan" };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Gagal terhubung ke backend" };
  }
}
