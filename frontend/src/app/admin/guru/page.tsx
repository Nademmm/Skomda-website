"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  Mail,
  Filter,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploadField from "@/components/admin/ImageUploadField";
import AdminSelect from "@/components/admin/AdminSelect";
import {
  TeacherItem,
  TEACHER_CATEGORIES,
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "@/services/teachers";

export default function AdminGuruPage() {
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeacherItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const [formData, setFormData] = useState<TeacherItem>({
    name: "",
    role: "",
    category: "Guru SIJA",
    image: "/images/tentang-kami/profil-guru/faun.png",
    bio: "",
    pendidikanTerakhir: "",
    bidangKeahlian: "",
    motto: "",
    kontak: "",
    orderIndex: 0,
  });

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch {
      showToast("Gagal memuat data guru", "error");
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
      name: "",
      role: "",
      category: "Guru SIJA",
      image: "/images/tentang-kami/profil-guru/faun.png",
      bio: "",
      pendidikanTerakhir: "",
      bidangKeahlian: "",
      motto: "",
      kontak: "",
      orderIndex: teachers.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TeacherItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) {
      showToast("Nama dan jabatan guru wajib diisi", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem && editingItem.id) {
        const res = await updateTeacher(editingItem.id, formData);
        if (res.success) {
          showToast("Data guru berhasil diperbarui");
          setIsModalOpen(false);
          await loadData();
        } else {
          showToast(res.error || "Gagal memperbarui", "error");
        }
      } else {
        const res = await createTeacher(formData);
        if (res.success) {
          showToast("Guru baru berhasil ditambahkan");
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

  const handleDelete = async (item: TeacherItem) => {
    if (!item.id) return;
    const ok = window.confirm(`Hapus data ${item.name} dari sistem?`);
    if (!ok) return;

    try {
      const res = await deleteTeacher(item.id);
      if (res.success) {
        showToast("Data guru berhasil dihapus");
        await loadData();
      } else {
        showToast(res.error || "Gagal menghapus", "error");
      }
    } catch {
      showToast("Terjadi kesalahan sistem", "error");
    }
  };

  const filtered = teachers.filter((t) => {
    if (selectedCategory !== "Semua" && t.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.role.toLowerCase().includes(q) ||
        (t.bidangKeahlian && t.bidangKeahlian.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <AdminLayout
      title="Guru & Tenaga Kependidikan"
      subtitle="Manajemen data kepala sekolah, wakil kepala sekolah, guru produktif dan normatif"
      actions={
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-[#bc0c11] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#990a0e] transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Tambah Guru</span>
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
              placeholder="Cari nama guru, jabatan, atau keahlian..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#bc0c11] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="w-full sm:w-60">
              <AdminSelect
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={TEACHER_CATEGORIES}
                icon={Filter}
              />
            </div>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#bc0c11] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#990a0e] hover:shadow-md active:scale-[0.98] transition-all cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Plus className="size-4" />
              <span>Tambah Guru Baru</span>
            </button>
          </div>
        </div>

        {/* Teachers Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-44 rounded-2xl bg-white border border-slate-200 p-4 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <GraduationCap className="mx-auto size-12 text-slate-300" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">
              Belum ada data guru ditemukan
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Silakan sesuaikan saringan pencarian atau tambahkan guru baru.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
                    <Image
                      src={item.image || "/images/tentang-kami/profil-guru/faun.png"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#bc0c11] font-semibold mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

                {item.motto && (
                  <p className="mt-3 text-xs text-slate-500 italic line-clamp-2 border-l-2 border-slate-200 pl-2">
                    &ldquo;{item.motto}&rdquo;
                  </p>
                )}

                <div className="mt-4 flex items-center justify-end border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      title="Sunting Data"
                      className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      title="Hapus Data"
                      className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6">
          <div className="relative flex flex-col w-full max-w-xl max-h-[90vh] rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Pinned Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 sm:px-8 py-5 shrink-0 bg-white">
              <h2 className="text-lg font-bold text-slate-900 font-poppins">
                {editingItem ? "Sunting Profil Guru" : "Tambah Guru Baru"}
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nama Lengkap beserta Gelar *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Abror, S.Hum., M.Pd."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#bc0c11]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Jabatan / Peran *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Waka Bid. Kesiswaan"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#bc0c11]"
                    />
                  </div>

                  <div>
                    <AdminSelect
                      label="Kategori Penugasan"
                      value={formData.category}
                      onChange={(cat) => setFormData({ ...formData, category: cat })}
                      options={TEACHER_CATEGORIES.filter((c) => c !== "Semua")}
                    />
                  </div>
                </div>

                <div>
                  <ImageUploadField
                    label="Foto Profil Guru / Tenaga Pendidik"
                    value={formData.image || ""}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    folder="skomda/teachers"
                    recommendedSize="Format JPG, PNG, atau WebP (Maks 5MB). Rasio foto 1:1 atau 3:4."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Urutan Tampil (Angka)
                  </label>
                  <input
                    type="number"
                    value={formData.orderIndex}
                    onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#bc0c11]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Motto Edukasi
                  </label>
                  <input
                    type="text"
                    placeholder="Motto inspiratif untuk siswa..."
                    value={formData.motto || ""}
                    onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#bc0c11]"
                  />
                </div>
              </div>

              {/* Pinned Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50/70 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#bc0c11] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#990a0e] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Data Guru"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
