"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NewsItem,
  NEWS_CATEGORIES,
  getNewsList,
  createNews,
  updateNews,
  deleteNews,
} from "@/services/news";

export default function AdminBeritaPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "Kegiatan Sekolah",
    summary: "",
    content: "",
    image: "/images/berita/news-thumb-1.png",
    author: "Humas SKOMDA",
  });

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const data = await getNewsList();
      setNewsList(data);
    } catch (err) {
      showToast("Gagal memuat daftar berita dari backend", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Kegiatan Sekolah",
      summary: "",
      content: "",
      image: "/images/berita/news-thumb-1.png",
      author: "Humas SKOMDA",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      summary: item.summary || "",
      content: item.content || "",
      image: item.image || "/images/berita/news-thumb-1.png",
      author: item.author || "Humas SKOMDA",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast("Judul berita wajib diisi", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem && editingItem.id) {
        // UPDATE (PUT)
        const res = await updateNews(editingItem.id, formData);
        if (res.success) {
          showToast("Berita berhasil diperbarui di database Supabase!");
          setIsModalOpen(false);
          await loadNews();
        } else {
          showToast(res.error || "Gagal memperbarui berita", "error");
        }
      } else {
        // CREATE (POST)
        const res = await createNews(formData);
        if (res.success) {
          showToast("Berita baru berhasil ditambahkan ke database Supabase!");
          setIsModalOpen(false);
          await loadNews();
        } else {
          showToast(res.error || "Gagal membuat berita", "error");
        }
      }
    } catch (err) {
      showToast("Terjadi kesalahan saat menyimpan berita", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (item: NewsItem) => {
    if (!item.id) {
      showToast("ID berita tidak ditemukan", "error");
      return;
    }

    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus berita:\n"${item.title}"?\n\nData akan dihapus permanen dari database Supabase.`
    );
    if (!confirmed) return;

    try {
      const res = await deleteNews(item.id);
      if (res.success) {
        showToast("Berita berhasil dihapus dari database!");
        await loadNews();
      } else {
        showToast(res.error || "Gagal menghapus berita", "error");
      }
    } catch (err) {
      showToast("Terjadi kesalahan saat menghapus berita", "error");
    }
  };

  const filteredList = newsList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.author && item.author.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#101828] font-jakarta">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-xl shadow-xl text-white font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
            toastMessage.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          <span>
            {toastMessage.type === "success" ? "✓" : "⚠"} {toastMessage.text}
          </span>
        </div>
      )}

      {/* Top Navbar Admin */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-[#bc0c11] text-white font-bold text-base px-2.5 py-1 rounded-lg">
                SKOMDA
              </span>
              <span className="font-bold text-base text-[#101828]">
                Panel Admin Berita
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
              Live DB (Supabase)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/berita"
              target="_blank"
              className="text-xs sm:text-sm font-medium text-[#6a7282] hover:text-[#bc0c11] transition-colors"
            >
              Lihat Website ↗
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#101828]">
              Kelola Berita &amp; Artikel
            </h1>
            <p className="text-sm text-[#6a7282] mt-1">
              Buat, edit, dan hapus artikel berita secara langsung ke database online.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#bc0c11] text-white font-semibold text-sm rounded-xl shadow-sm hover:bg-[#990a0e] active:scale-95 transition-all cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-white"
            >
              <path
                d="M12 5V19M5 12H19"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Tambah Berita Baru</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Cari judul, kategori, penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#bc0c11]"
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3.5 top-3 stroke-gray-400"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="M21 21L16.65 16.65" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <div className="text-xs text-[#6a7282] font-medium self-end sm:self-center">
            Menampilkan <strong className="text-[#101828]">{filteredList.length}</strong> berita
          </div>
        </div>

        {/* News Table */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="p-16 text-center text-gray-500 text-sm">
              <div className="inline-block size-8 border-3 border-gray-200 border-t-[#bc0c11] rounded-full animate-spin mb-3"></div>
              <p>Memuat data berita dari Supabase...</p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="p-16 text-center text-gray-500">
              <p className="text-base font-semibold text-gray-700 mb-1">
                Tidak ada berita ditemukan
              </p>
              <p className="text-sm">Silakan buat berita baru atau ubah kata kunci pencarian.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/80 text-gray-600 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-3.5 px-4 w-16 text-center">ID</th>
                    <th className="py-3.5 px-4 w-20">Foto</th>
                    <th className="py-3.5 px-4">Judul &amp; Ringkasan</th>
                    <th className="py-3.5 px-4 w-36">Kategori</th>
                    <th className="py-3.5 px-4 w-36">Tanggal Rilis</th>
                    <th className="py-3.5 px-4 w-32 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredList.map((item) => (
                    <tr key={item.id || item.slug} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-4 text-center font-mono text-xs text-gray-500">
                        {item.id || "-"}
                      </td>
                      <td className="py-4 px-4">
                        <div className="relative size-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          <Image
                            src={item.image || "/images/berita/news-thumb-1.png"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Link
                          href={`/berita/${item.slug}`}
                          target="_blank"
                          className="font-bold text-[#101828] hover:text-[#bc0c11] transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-[#6a7282] line-clamp-1 mt-0.5">
                          {item.summary || item.slug}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-red-50 text-[#bc0c11] rounded-md border border-red-100">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-[#6a7282]">
                        <p className="font-medium text-gray-700">{item.dateFormatted || "-"}</p>
                        <p>{item.time ? `${item.time} WIB` : ""}</p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Edit Berita"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Hapus Berita"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal Form Tambah / Edit Berita */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-[#101828]">
                {editingItem ? "Edit Berita" : "Tambah Berita Baru"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 size-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                  Judul Berita *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan judul berita lengkap..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#bc0c11]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#bc0c11] bg-white"
                  >
                    {NEWS_CATEGORIES.filter((c) => c !== "Semua").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Penulis / Redaksi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Humas SKOMDA"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#bc0c11]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                  URL / Path Foto Thumbnail
                </label>
                <input
                  type="text"
                  placeholder="/images/berita/news-thumb-1.png atau URL eksternal"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#bc0c11]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                  Ringkasan Singkat (Lead Paragraph)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ringkasan 1-2 kalimat untuk preview card..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#bc0c11]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                  Isi Konten Artikel Lengkap
                </label>
                <textarea
                  rows={6}
                  placeholder="Tuliskan isi berita lengkap di sini (pisahkan paragraf dengan enter ganda)..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#bc0c11]"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-sm font-semibold bg-[#bc0c11] text-white rounded-xl hover:bg-[#990a0e] transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Menyimpan ke Database..."
                    : editingItem
                    ? "Simpan Perubahan"
                    : "Terbitkan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
