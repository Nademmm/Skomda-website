"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Building2,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Users,
  Search,
  Filter,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploadField from "@/components/admin/ImageUploadField";
import AdminSelect from "@/components/admin/AdminSelect";
import {
  FasilitasItem,
  getFasilitasList,
  createFasilitas,
  updateFasilitas,
  deleteFasilitas,
} from "@/services/fasilitas";

const FASILITAS_CATEGORIES = [
  "Semua",
  "Laboratorium Komputer",
  "Bengkel & Studio Praktik",
  "Perpustakaan & Literasi",
  "Fasilitas Olahraga",
  "Sarana Ibadah & Aula",
  "Fasilitas Umum & Sanitasi",
];

export default function AdminFasilitasPage() {
  const [list, setList] = useState<FasilitasItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FasilitasItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const [form, setForm] = useState<FasilitasItem>({
    name: "",
    category: "Laboratorium Komputer",
    image: "",
    description: "",
    capacity: "36 Siswa",
    features: "AC, Proyektor, Gigabit Switch, Workstation PC",
    orderIndex: 0,
  });

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getFasilitasList();
      setList(data);
    } catch {
      showToast("Gagal memuat data fasilitas", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      name: "",
      category: "Laboratorium Komputer",
      image: "",
      description: "",
      capacity: "36 Siswa",
      features: "AC, Proyektor, Gigabit Switch, Workstation PC",
      orderIndex: list.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: FasilitasItem) => {
    setEditingItem(item);
    setForm({ ...item });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      showToast("Nama fasilitas wajib diisi", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem && editingItem.id) {
        const res = await updateFasilitas(editingItem.id, form);
        if (res.success) {
          showToast("Fasilitas berhasil diperbarui");
          setIsModalOpen(false);
          await loadData();
        } else {
          showToast(res.error || "Gagal memperbarui", "error");
        }
      } else {
        const res = await createFasilitas(form);
        if (res.success) {
          showToast("Fasilitas baru berhasil ditambahkan");
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

  const handleDelete = async (item: FasilitasItem) => {
    if (!item.id) return;
    if (!window.confirm(`Hapus fasilitas "${item.name}"?`)) return;

    try {
      const res = await deleteFasilitas(item.id);
      if (res.success) {
        showToast("Fasilitas berhasil dihapus");
        await loadData();
      }
    } catch {
      showToast("Gagal menghapus", "error");
    }
  };

  const filteredList = list.filter((item) => {
    if (selectedCategory !== "Semua" && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.features && item.features.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <AdminLayout
      title="Fasilitas & Sarana Kampus"
      subtitle="Manajemen laboratorium teknologi, ruang praktik TEFA, dan sarana penunjang belajar"
      actions={
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-[#bc0c11] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#990a0e] transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Tambah Fasilitas</span>
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
              placeholder="Cari nama fasilitas, sarana, atau spesifikasi..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 font-medium focus:border-[#bc0c11] focus:bg-white focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="w-full sm:w-64">
              <AdminSelect
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={FASILITAS_CATEGORIES}
                icon={Filter}
              />
            </div>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#bc0c11] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#990a0e] hover:shadow-md active:scale-[0.98] transition-all cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Plus className="size-4" />
              <span>Tambah Fasilitas Baru</span>
            </button>
          </div>
        </div>

        {/* Fasilitas Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-44 rounded-2xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredList.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <Building2 className="mx-auto size-12 text-slate-300" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">
              Belum ada data fasilitas ditemukan
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Coba ubah kata kunci pencarian atau tambahkan fasilitas baru.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all"
              >
                {/* Image Banner / Thumbnail Preview */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-100 text-slate-400 gap-1.5">
                      <Building2 className="size-8 text-slate-300" />
                      <span className="text-[11px] font-medium text-slate-400">Belum ada foto sarana</span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#bc0c11] transition-colors">{item.name}</h3>
                    {item.description && (
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {item.capacity && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                        <Users className="size-3.5 text-slate-400 shrink-0" />
                        <span>Kapasitas: {item.capacity}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-end border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        title="Sunting"
                        className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        title="Hapus"
                        className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form with Custom Scrollbar and Pinned Header/Footer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6">
          <div className="relative flex flex-col w-full max-w-lg max-h-[90vh] rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Pinned Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 sm:px-8 py-5 shrink-0 bg-white">
              <h2 className="text-lg font-bold text-slate-900 font-poppins">
                {editingItem ? "Sunting Fasilitas" : "Tambah Fasilitas Baru"}
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
                    Nama Fasilitas / Ruang <span className="text-[#bc0c11]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Laboratorium Cloud SIJA"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <AdminSelect
                      label="Kategori"
                      value={form.category}
                      onChange={(cat) => setForm({ ...form, category: cat })}
                      options={FASILITAS_CATEGORIES.filter((c) => c !== "Semua")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Kapasitas Ruang
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 36 Siswa"
                      value={form.capacity || ""}
                      onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Fasilitas & Peralatan Unggulan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: AC, Switch Cisco, Server Rak, OTDR"
                    value={form.features || ""}
                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Deskripsi Sarana
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Deskripsikan sarana prasarana, fungsi praktikum, dan teknologi yang tersedia..."
                    value={form.description || ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full custom-scrollbar resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>

                <div>
                  <ImageUploadField
                    label="Foto Sarana & Fasilitas"
                    value={form.image || ""}
                    onChange={(url) => setForm({ ...form, image: url })}
                    folder="skomda/fasilitas"
                    recommendedSize="Format JPG, PNG, atau WebP (Maks 5MB)."
                  />
                </div>
              </div>

              {/* Pinned Modal Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 sm:px-8 py-4 bg-slate-50/70 shrink-0">
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
                  {isSubmitting ? "Menyimpan..." : "Simpan Fasilitas"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
