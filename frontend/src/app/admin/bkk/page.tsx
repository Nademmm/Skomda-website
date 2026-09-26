"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Briefcase,
  Building,
  Pencil,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploadField from "@/components/admin/ImageUploadField";
import AdminSelect from "@/components/admin/AdminSelect";
import {
  BKKJobItem,
  BKKPartnerItem,
  getBKKJobs,
  createBKKJob,
  updateBKKJob,
  deleteBKKJob,
  getBKKPartners,
  createBKKPartner,
  updateBKKPartner,
  deleteBKKPartner,
} from "@/services/bkk";

const JOB_TYPES = [
  "Full-time",
  "Magang / PKL",
  "Kontrak",
  "Part-time",
  "Freelance",
];

const JOB_STATUS_OPTIONS = [
  { value: "active", label: "Aktif (Menerima Lamaran)" },
  { value: "closed", label: "Ditutup (Penuh / Selesai)" },
];

const PARTNER_CATEGORIES = [
  "Software House & IT",
  "Telekomunikasi & Jaringan",
  "BUMN & Kedinasan",
  "Startup Teknologi",
  "Multimedia & Desain Kreatif",
  "Elektronika & Manufaktur",
  "Perguruan Tinggi & Vokasi",
];

export default function AdminBKKPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "partners">("jobs");
  const [jobs, setJobs] = useState<BKKJobItem[]>([]);
  const [partners, setPartners] = useState<BKKPartnerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal Job
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<BKKJobItem | null>(null);
  const [jobForm, setJobForm] = useState<BKKJobItem>({
    title: "",
    company: "",
    location: "Sidoarjo",
    jobType: "Full-time",
    deadline: "",
    salary: "",
    requirements: "",
    description: "",
    companyLogo: "/images/home/hero/image-3.png",
    applyUrl: "mailto:karir@perusahaan.com",
    status: "active",
  });

  // Modal Partner
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<BKKPartnerItem | null>(null);
  const [partnerForm, setPartnerForm] = useState<BKKPartnerItem>({
    name: "",
    category: "Pendidikan Vokasi & Rekayasa Teknologi",
    logo: "/images/partners/pens.webp",
    description: "",
    website: "https://",
    orderIndex: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadAll = async () => {
    setIsLoading(true);
    try {
      const [jobsData, partnersData] = await Promise.all([
        getBKKJobs(),
        getBKKPartners(),
      ]);
      setJobs(jobsData);
      setPartners(partnersData);
    } catch {
      showToast("Gagal memuat data BKK", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleOpenJobAdd = () => {
    setEditingJob(null);
    setJobForm({
      title: "",
      company: "",
      location: "Sidoarjo",
      jobType: "Full-time",
      deadline: "31 Desember 2026",
      salary: "Standar Industri",
      requirements: "",
      description: "",
      companyLogo: "/images/home/hero/image-3.png",
      applyUrl: "mailto:karir@perusahaan.com",
      status: "active",
    });
    setIsJobModalOpen(true);
  };

  const handleOpenJobEdit = (item: BKKJobItem) => {
    setEditingJob(item);
    setJobForm({ ...item });
    setIsJobModalOpen(true);
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title.trim() || !jobForm.company.trim()) {
      showToast("Posisi dan nama perusahaan wajib diisi", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingJob && editingJob.id) {
        const res = await updateBKKJob(editingJob.id, jobForm);
        if (res.success) {
          showToast("Lowongan kerja berhasil diperbarui");
          setIsJobModalOpen(false);
          await loadAll();
        } else {
          showToast(res.error || "Gagal memperbarui", "error");
        }
      } else {
        const res = await createBKKJob(jobForm);
        if (res.success) {
          showToast("Lowongan baru berhasil dibuat");
          setIsJobModalOpen(false);
          await loadAll();
        } else {
          showToast(res.error || "Gagal membuat lowongan", "error");
        }
      }
    } catch {
      showToast("Terjadi kesalahan sistem", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJobDelete = async (item: BKKJobItem) => {
    if (!item.id) return;
    if (!window.confirm(`Hapus lowongan "${item.title}"?`)) return;

    try {
      const res = await deleteBKKJob(item.id);
      if (res.success) {
        showToast("Lowongan berhasil dihapus");
        await loadAll();
      }
    } catch {
      showToast("Gagal menghapus lowongan", "error");
    }
  };

  const handleOpenPartnerAdd = () => {
    setEditingPartner(null);
    setPartnerForm({
      name: "",
      category: "Pendidikan Vokasi & Rekayasa Teknologi",
      logo: "/images/partners/pens.webp",
      description: "",
      website: "https://",
      orderIndex: partners.length + 1,
    });
    setIsPartnerModalOpen(true);
  };

  const handleOpenPartnerEdit = (partner: BKKPartnerItem) => {
    setEditingPartner(partner);
    setPartnerForm({
      name: partner.name,
      category: partner.category,
      logo: partner.logo || "/images/partners/pens.webp",
      description: partner.description || "",
      website: partner.website || "https://",
      orderIndex: partner.orderIndex || 0,
    });
    setIsPartnerModalOpen(true);
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name.trim()) {
      showToast("Nama mitra industri wajib diisi", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      let res;
      if (editingPartner && editingPartner.id) {
        res = await updateBKKPartner(editingPartner.id, partnerForm);
      } else {
        res = await createBKKPartner(partnerForm);
      }
      if (res.success) {
        showToast(
          editingPartner
            ? "Mitra industri berhasil diperbarui"
            : "Mitra industri berhasil ditambahkan"
        );
        setIsPartnerModalOpen(false);
        await loadAll();
      } else {
        showToast(res.error || "Gagal menyimpan data mitra", "error");
      }
    } catch {
      showToast("Terjadi gangguan server", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePartnerDelete = async (item: BKKPartnerItem) => {
    if (!item.id) return;
    if (!window.confirm(`Hapus mitra "${item.name}"?`)) return;

    try {
      const res = await deleteBKKPartner(item.id);
      if (res.success) {
        showToast("Mitra industri berhasil dihapus");
        await loadAll();
      }
    } catch {
      showToast("Gagal menghapus mitra", "error");
    }
  };

  const filteredJobs = jobs.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.company.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      (item.requirements && item.requirements.toLowerCase().includes(q))
    );
  });

  const filteredPartners = partners.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q))
    );
  });

  return (
    <AdminLayout
      title="Bursa Kerja & Kemitraan (BKK)"
      subtitle="Kelola lowongan kerja bagi alumni dan daftar mitra industri resmi SKOMDA"
      actions={
        activeTab === "jobs" ? (
          <button
            type="button"
            onClick={handleOpenJobAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-[#bc0c11] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#990a0e] hover:shadow-md active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="size-4" />
            <span>Tambah Lowongan</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleOpenPartnerAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-[#bc0c11] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#990a0e] hover:shadow-md active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="size-4" />
            <span>Tambah Mitra</span>
          </button>
        )
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

        {/* Toolbar & Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          {/* Tab Switcher */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("jobs")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "jobs"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase className="size-3.5" />
              <span>Lowongan Kerja ({jobs.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("partners")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "partners"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building className="size-3.5" />
              <span>Mitra Industri ({partners.length})</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 min-w-0 lg:justify-end">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === "jobs"
                    ? "Cari posisi, perusahaan, atau lokasi..."
                    : "Cari nama mitra atau industri..."
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 font-medium focus:border-[#bc0c11] focus:bg-white focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
              />
            </div>

            {/* Prominent Add Button */}
            {activeTab === "jobs" ? (
              <button
                type="button"
                onClick={handleOpenJobAdd}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#bc0c11] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#990a0e] hover:shadow-md active:scale-[0.98] transition-all cursor-pointer shrink-0 whitespace-nowrap"
              >
                <Plus className="size-4" />
                <span>Tambah Lowongan Baru</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOpenPartnerAdd}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#bc0c11] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#990a0e] hover:shadow-md active:scale-[0.98] transition-all cursor-pointer shrink-0 whitespace-nowrap"
              >
                <Plus className="size-4" />
                <span>Tambah Mitra Baru</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Jobs Content */}
        {activeTab === "jobs" && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
            {isLoading ? (
              <div className="space-y-4 p-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 rounded-xl bg-slate-100 animate-pulse" />
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="py-16 text-center text-xs text-slate-500">
                Belum ada lowongan kerja tersimpan atau sesuai pencarian.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-3.5 pl-6 pr-3">Posisi & Perusahaan</th>
                      <th className="px-3 py-3.5">Tipe & Lokasi</th>
                      <th className="px-3 py-3.5">Batas Lamaran</th>
                      <th className="px-3 py-3.5">Status</th>
                      <th className="py-3.5 pl-3 pr-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredJobs.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 pl-6 pr-3 min-w-[220px]">
                          <p className="font-bold text-slate-900">{item.title}</p>
                          <p className="text-[11px] text-[#bc0c11] font-semibold mt-0.5">
                            {item.company}
                          </p>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                            {item.jobType}
                          </span>
                          <span className="text-[11px] text-slate-500 ml-2">
                            {item.location}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-slate-500 font-medium">
                          {item.deadline || "Terbuka"}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              item.status === "active"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.status === "active" ? "Aktif" : "Tutup"}
                          </span>
                        </td>
                        <td className="py-4 pl-3 pr-6 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenJobEdit(item)}
                              title="Sunting"
                              className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                            >
                              <Pencil className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleJobDelete(item)}
                              title="Hapus"
                              className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
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
        )}

        {/* Tab 2: Partners Content */}
        {activeTab === "partners" && (
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-28 rounded-2xl bg-white border border-slate-200 animate-pulse" />
                ))}
              </div>
            ) : filteredPartners.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-xs text-slate-500">
                Belum ada mitra industri tersimpan atau sesuai pencarian.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="group relative flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all gap-3.5"
                  >
                    {/* Logo Mitra Kecil & Rapi */}
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5">
                      {partner.logo ? (
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <Building className="size-5 text-slate-400" />
                      )}
                    </div>

                    {/* Informasi Mitra */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 leading-snug">
                        {partner.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {partner.category || "Mitra Industri"}
                      </p>
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#bc0c11] hover:underline mt-1"
                        >
                          <span>Kunjungi Website</span>
                          <ExternalLink className="size-3" />
                        </a>
                      )}
                    </div>

                    {/* Tombol Aksi: Edit & Delete */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenPartnerEdit(partner)}
                        title="Sunting Mitra"
                        className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePartnerDelete(partner)}
                        title="Hapus Mitra"
                        className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Job with Custom Scrollbar and Pinned Header/Footer */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6">
          <div className="relative flex flex-col w-full max-w-lg max-h-[90vh] rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Pinned Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 sm:px-8 py-5 shrink-0 bg-white">
              <h2 className="text-lg font-bold text-slate-900 font-poppins">
                {editingJob ? "Sunting Lowongan Kerja" : "Buat Lowongan Baru"}
              </h2>
              <button
                type="button"
                onClick={() => setIsJobModalOpen(false)}
                className="flex size-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Scrollable Form Body with Custom Scrollbar */}
            <form onSubmit={handleJobSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto admin-modal-scrollbar px-6 sm:px-8 py-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Posisi Pekerjaan <span className="text-[#bc0c11]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Junior Network Engineer"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nama Perusahaan <span className="text-[#bc0c11]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: PT Telkom Akses"
                      value={jobForm.company}
                      onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Lokasi Penempatan
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Sidoarjo / Surabaya"
                      value={jobForm.location}
                      onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <AdminSelect
                      label="Tipe Pekerjaan"
                      value={jobForm.jobType}
                      onChange={(val) => setJobForm({ ...jobForm, jobType: val })}
                      options={JOB_TYPES}
                    />
                  </div>

                  <div>
                    <AdminSelect
                      label="Status Lowongan"
                      value={jobForm.status || "active"}
                      onChange={(val) => setJobForm({ ...jobForm, status: val as "active" | "closed" })}
                      options={JOB_STATUS_OPTIONS}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Batas Pendaftaran
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 31 Desember 2026"
                      value={jobForm.deadline || ""}
                      onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Estimasi Gaji / Benefit
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Standar Industri / UMR"
                      value={jobForm.salary || ""}
                      onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email / Tautan Melamar
                  </label>
                  <input
                    type="text"
                    placeholder="mailto:karir@perusahaan.com atau https://..."
                    value={jobForm.applyUrl || ""}
                    onChange={(e) => setJobForm({ ...jobForm, applyUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kualifikasi & Persyaratan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan persyaratan keahlian, jurusan yang dicari, sertifikasi, dan kualifikasi lainnya..."
                    value={jobForm.requirements || ""}
                    onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                    className="w-full custom-scrollbar resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Deskripsi Pekerjaan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Uraian tugas dan tanggung jawab harian pada posisi ini..."
                    value={jobForm.description || ""}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    className="w-full custom-scrollbar resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>

                <div>
                  <ImageUploadField
                    label="Logo Perusahaan"
                    value={jobForm.companyLogo || ""}
                    onChange={(url) => setJobForm({ ...jobForm, companyLogo: url })}
                    folder="skomda/bkk-jobs"
                    recommendedSize="Format PNG, JPG, WebP. Rasio 1:1."
                  />
                </div>
              </div>

              {/* Pinned Modal Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 sm:px-8 py-4 bg-slate-50/70 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#bc0c11] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#990a0e] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Lowongan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Partner with Custom Scrollbar and Pinned Header/Footer */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6">
          <div className="relative flex flex-col w-full max-w-md max-h-[90vh] rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Pinned Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 sm:px-8 py-5 shrink-0 bg-white">
              <h2 className="text-base font-bold text-slate-900 font-poppins">
                {editingPartner ? "Sunting Mitra Industri" : "Tambah Mitra Industri Baru"}
              </h2>
              <button
                type="button"
                onClick={() => setIsPartnerModalOpen(false)}
                className="flex size-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Scrollable Form Body with Custom Scrollbar */}
            <form onSubmit={handlePartnerSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto admin-modal-scrollbar px-6 sm:px-8 py-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nama Perusahaan Mitra <span className="text-[#bc0c11]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Telkom Indonesia"
                    value={partnerForm.name}
                    onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>

                <div>
                  <AdminSelect
                    label="Kategori Industri"
                    value={partnerForm.category}
                    onChange={(cat) => setPartnerForm({ ...partnerForm, category: cat })}
                    options={PARTNER_CATEGORIES}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tautan Website Resmi
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={partnerForm.website || ""}
                    onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Keterangan Kerjasama
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Bentuk kemitraan, penyaluran magang PKL, kelas industri..."
                    value={partnerForm.description || ""}
                    onChange={(e) => setPartnerForm({ ...partnerForm, description: e.target.value })}
                    className="w-full custom-scrollbar resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs transition-all duration-150 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>

                <div>
                  <ImageUploadField
                    label="Logo Perusahaan Mitra"
                    value={partnerForm.logo || ""}
                    onChange={(url) => setPartnerForm({ ...partnerForm, logo: url })}
                    folder="skomda/bkk-partners"
                    recommendedSize="Format PNG (transparan disarankan) atau JPG, WebP."
                  />
                </div>
              </div>

              {/* Pinned Modal Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 sm:px-8 py-4 bg-slate-50/70 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#bc0c11] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#990a0e] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting
                    ? "Menyimpan..."
                    : editingPartner
                    ? "Simpan Perubahan"
                    : "Tambah Mitra"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
