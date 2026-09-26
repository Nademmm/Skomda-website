"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Trophy,
  CheckCircle2,
  AlertCircle,
  X,
  Medal,
  Filter,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploadField from "@/components/admin/ImageUploadField";
import AdminSelect from "@/components/admin/AdminSelect";
import {
  PrestasiItem,
  PRESTASI_CATEGORIES,
  getPrestasiList,
  createPrestasi,
  updatePrestasi,
  deletePrestasi,
} from "@/services/prestasi";

export default function AdminPrestasiPage() {
  const [prestasiList, setPrestasiList] = useState<PrestasiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PrestasiItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const [formData, setFormData] = useState<PrestasiItem>({
    title: "",
    category: "IT & AI",
    award: "Juara 1",
    badgeLevel: "Juara 1",
    competition: "",
    organizer: "",
    year: "2026",
    studentName: "",
    studentClass: "",
    image: "/images/tentang-kami/prestasi/prestasi-iitc-web-design-zaina.png",
    description: "",
  });

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getPrestasiList();
      setPrestasiList(data);
    } catch {
      showToast("Gagal memuat data prestasi", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "IT & AI",
      award: "Juara 1",
      badgeLevel: "Juara 1",
      competition: "",
      organizer: "",
      year: "2026",
      studentName: "",
      studentClass: "",
      image: "/images/tentang-kami/prestasi/prestasi-iitc-web-design-zaina.png",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PrestasiItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.studentName.trim()) {
      showToast("Judul prestasi dan nama siswa wajib diisi", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem && editingItem.id) {
        const res = await updatePrestasi(editingItem.id, formData);
        if (res.success) {
          showToast("Prestasi berhasil diperbarui");
          setIsModalOpen(false);
          await loadData();
        } else {
          showToast(res.error || "Gagal memperbarui", "error");
        }
      } else {
        const res = await createPrestasi(formData);
        if (res.success) {
          showToast("Prestasi baru berhasil ditambahkan");
          setIsModalOpen(false);
          await loadData();
        } else {
          showToast(res.error || "Gagal menambahkan", "error");
        }
      }
    } catch {
      showToast("Terjadi gangguan server", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (item: PrestasiItem) => {
    if (!item.id) return;
    const ok = window.confirm(`Hapus prestasi "${item.title}"?`);
    if (!ok) return;

    try {
      const res = await deletePrestasi(item.id);
      if (res.success) {
        showToast("Prestasi berhasil dihapus");
        await loadData();
      } else {
        showToast(res.error || "Gagal menghapus", "error");
      }
    } catch {
      showToast("Terjadi kesalahan sistem", "error");
    }
  };

  const filtered = prestasiList.filter((p) => {
    if (selectedCategory !== "Semua" && p.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.studentName.toLowerCase().includes(q) ||
        p.competition.toLowerCase().includes(q) ||
        p.award.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout
      title="Prestasi Siswa"
      subtitle="Dokumentasi piala, medali, dan penghargaan kompetisi siswa SKOMDA"
      actions={
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-[#bc0c11] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#990a0e] transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Tambah Prestasi</span>
        </button>
      }
    >
      <div className="space-y-6">
        {toastMessage && (
          <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-xl transition-all ${
              toastMessage.type === "success" ? "bg-slate-900 text-white" : "bg-red-600 text-white"
            }`}
          >
            {toastMessage.type === "success" ? (
              <CheckCircle2 className="size-5 text-emerald-400" />
            ) : (
              <AlertCircle className="size-5 text-white" />
            )}
            <span className="text-xs font-bold">{toastMessage.text}</span>
          </div>
        )}

        {/* Filter & Actions Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul juara, siswa, atau kompetisi..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 font-medium focus:border-[#bc0c11] focus:bg-white focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="w-full sm:w-56">
              <AdminSelect
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={PRESTASI_CATEGORIES}
                icon={Filter}
              />
            </div>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#bc0c11] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#990a0e] hover:shadow-md active:scale-[0.98] transition-all cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Plus className="size-4" />
              <span>Input Prestasi Siswa</span>
            </button>
          </div>
        </div>

        {/* Prestasi Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
          {isLoading ? (
            <div className="space-y-4 p-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Trophy className="mx-auto size-12 text-slate-300" />
              <h3 className="mt-3 text-sm font-bold text-slate-800">
                Belum ada prestasi tercatat
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Silakan tambahkan data kejuaraan siswa SKOMDA.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 pl-6 pr-3">Prestasi & Siswa</th>
                    <th className="px-3 py-3.5">Capaian</th>
                    <th className="px-3 py-3.5">Ajang Kompetisi</th>
                    <th className="px-3 py-3.5">Tahun</th>
                    <th className="py-3.5 pl-3 pr-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filtered.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 pl-6 pr-3 min-w-[280px] max-w-[420px]">
                        <div className="flex items-center gap-3">
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200/80">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="flex size-full items-center justify-center text-slate-300">
                                <Trophy className="size-5" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-slate-900 line-clamp-1 leading-snug">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                              {item.studentName} ({item.studentClass || "Siswa"})
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200">
                          <Medal className="size-3 text-amber-600" />
                          {item.award}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-semibold text-slate-700 line-clamp-1">
                          {item.competition}
                        </p>
                        <p className="text-[11px] text-slate-400">{item.organizer}</p>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap font-bold text-slate-600">
                        {item.year}
                      </td>
                      <td className="py-4 pl-3 pr-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            title="Sunting"
                            className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            title="Hapus"
                            className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="size-4" />
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
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6">
          <div className="relative flex flex-col w-full max-w-xl max-h-[90vh] rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Pinned Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 sm:px-8 py-5 shrink-0 bg-white">
              <h2 className="text-lg font-bold text-slate-900 font-poppins">
                {editingItem ? "Sunting Data Prestasi" : "Input Prestasi Siswa"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex size-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Scrollable Form Body with Custom Scrollbar */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto admin-modal-scrollbar px-6 sm:px-8 py-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Judul Berita Prestasi <span className="text-[#bc0c11]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: SKOMDA Raih Juara 2 Web Design IITC 2026"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nama Siswa <span className="text-[#bc0c11]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap peraih prestasi"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Kelas Siswa
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: XII TJAT 5"
                      value={formData.studentClass}
                      onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Capaian Juara
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Juara 2"
                      value={formData.award}
                      onChange={(e) => setFormData({ ...formData, award: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <AdminSelect
                      label="Kategori"
                      value={formData.category}
                      onChange={(c) => setFormData({ ...formData, category: c })}
                      options={PRESTASI_CATEGORIES.filter((c) => c !== "Semua")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tahun
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nama Kompetisi
                    </label>
                    <input
                      type="text"
                      placeholder="Nama perlombaan"
                      value={formData.competition}
                      onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Penyelenggara
                    </label>
                    <input
                      type="text"
                      placeholder="Instansi penyelenggara"
                      value={formData.organizer}
                      onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <ImageUploadField
                    label="Foto Dokumentasi Prestasi Siswa"
                    value={formData.image || ""}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    folder="skomda/prestasi"
                    recommendedSize="Format JPG, PNG, atau WebP (Maks 5MB)."
                  />
                </div>
              </div>

              {/* Pinned Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50/70 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#bc0c11] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#990a0e] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Prestasi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
