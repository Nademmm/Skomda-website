<template>
  <div class="w-full bg-[#161617] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden relative">
    <!-- Header with Apple Segmented Control -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-8">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#86868b] font-medium mb-3">
          <span class="w-1.5 h-1.5 rounded-full bg-[#E1251B]"></span>
          Vue 3 Interactive Island &bull; Apple Spec Explorer
        </div>
        <h3 class="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight">
          Komparasi Program Keahlian
        </h3>
        <p class="text-sm text-[#86868b] mt-1.5 max-w-xl">
          Pilih jurusan untuk meninjau spesifikasi kurikulum, durasi pembelajaran vokasi, dan fokus karir industri.
        </p>
      </div>

      <!-- Apple Segmented Control Pill -->
      <div class="inline-flex p-1 bg-[#000000] border border-white/10 rounded-full shrink-0">
        <button
          v-for="item in jurusans"
          :key="item.code"
          @click="activeCode = item.code"
          :class="[
            'px-5 py-2 rounded-full text-xs font-medium transition-all duration-300',
            activeCode === item.code
              ? 'bg-[#E1251B] text-white shadow-sm'
              : 'text-[#86868b] hover:text-[#f5f5f7]'
          ]"
        >
          {{ item.code }} ({{ item.years }} Tahun)
        </button>
      </div>
    </div>

    <!-- Active Details Display (Apple Product Specs Layout) -->
    <div v-if="current" class="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Column: Big Headline & Narrative -->
      <div class="lg:col-span-7 space-y-6">
        <div>
          <div class="text-xs uppercase tracking-widest text-[#E1251B] font-semibold">
            {{ current.tagline }}
          </div>
          <h4 class="text-2xl sm:text-4xl font-semibold text-[#f5f5f7] mt-2 tracking-tight leading-tight">
            {{ current.name }}
          </h4>
          <p class="text-sm sm:text-base text-[#86868b] mt-4 leading-relaxed">
            {{ current.description }}
          </p>
        </div>

        <!-- Highlights Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div
            v-for="(skill, idx) in current.skills"
            :key="idx"
            class="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1 hover:border-white/15 transition-colors"
          >
            <span class="text-[11px] font-mono text-[#86868b]">0{{ idx + 1 }}.</span>
            <p class="text-xs sm:text-sm font-medium text-[#f5f5f7] leading-snug">
              {{ skill }}
            </p>
          </div>
        </div>

        <!-- Career Horizons -->
        <div class="pt-2">
          <span class="text-xs uppercase tracking-wider text-[#86868b] font-medium block mb-3">
            Peluang Profesi Lulusan
          </span>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="career in current.careers"
              :key="career"
              class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-normal text-[#f5f5f7] hover:border-white/20 transition"
            >
              {{ career }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right Column: Apple-Style Spec Sidebar -->
      <div class="lg:col-span-5 bg-black/60 rounded-2xl border border-white/10 p-6 space-y-5">
        <h5 class="text-xs uppercase tracking-widest text-[#86868b] font-medium">
          Spesifikasi Program
        </h5>

        <div class="divide-y divide-white/5 text-xs">
          <div class="flex justify-between py-3">
            <span class="text-[#86868b]">Durasi Pendidikan</span>
            <span class="font-semibold text-[#f5f5f7]">{{ current.years }} Tahun Penuh</span>
          </div>
          <div class="flex justify-between py-3">
            <span class="text-[#86868b]">Akreditasi</span>
            <span class="font-semibold text-[#f5f5f7]">A (Unggul BAN-SM)</span>
          </div>
          <div class="flex justify-between py-3">
            <span class="text-[#86868b]">Standar Mutu</span>
            <span class="font-semibold text-[#f5f5f7]">ISO 9001:2015</span>
          </div>
          <div class="flex justify-between py-3">
            <span class="text-[#86868b]">Mitra Industri Utama</span>
            <span class="font-semibold text-[#f5f5f7]">Telkom Group & Industri IT</span>
          </div>
          <div class="flex justify-between py-3">
            <span class="text-[#86868b]">Sertifikasi Kompetensi</span>
            <span class="font-semibold text-[#f5f5f7]">BNSP & Lembaga Terakreditasi</span>
          </div>
        </div>

        <div class="pt-2">
          <a
            href="/jurusan"
            class="block w-full text-center py-2.5 rounded-full bg-white text-black hover:bg-[#f5f5f7] text-xs font-semibold tracking-tight transition"
          >
            Pelajari Silabus Lengkap
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface JurusanData {
  name: string;
  code: string;
  years: number;
  tagline: string;
  description: string;
  skills: string[];
  careers: string[];
}

const jurusans: JurusanData[] = [
  {
    code: 'SIJA',
    name: 'Sistem Informasi Jaringan dan Aplikasi',
    years: 4,
    tagline: 'Rekayasa Perangkat Lunak & Cloud Architecture',
    description: 'Program vokasi 4 tahun berorientasi penuh pada siklus rekayasa perangkat lunak modern, arsitektur basis data relasional dan cloud native, serta keamanan siber enterprise.',
    skills: [
      'Rekayasa Perangkat Lunak Web & Mobile Modern',
      'Arsitektur Database Relasional & Cloud Native',
      'Infrastruktur Jaringan Komputer & Linux Enterprise',
      'Cybersecurity & Network Hardening Dasar'
    ],
    careers: [
      'Software Engineer',
      'Fullstack Web Developer',
      'Cloud & DevOps Administrator',
      'Database Administrator',
      'IT Security Analyst'
    ]
  },
  {
    code: 'TJAT',
    name: 'Teknik Jaringan Akses Telekomunikasi',
    years: 3,
    tagline: 'Infrastruktur Fiber Optik & Transmisi Seluler',
    description: 'Program vokasi 3 tahun berfokus pada instalasi, pemeliharaan, dan troubleshooting transmisi data berkecepatan tinggi melalui kabel serat optik dan sistem komunikasi nirkabel generasi baru.',
    skills: [
      'Teknologi Fiber Optic & Optical Network Unit (ONU)',
      'Sistem Komunikasi Nirkabel & Wireless Seluler',
      'Transmisi Data Telekomunikasi dan Routing',
      'Pengukuran Sinyal Presisi OTDR & Power Meter'
    ],
    careers: [
      'Fiber Optic Specialist',
      'Network Support Engineer',
      'Telecom Field Technician',
      'ISP Administrator',
      'Wireless Network Operator'
    ]
  }
];

const activeCode = ref<string>('SIJA');
const current = computed(() => jurusans.find((j) => j.code === activeCode.value) || jurusans[0]);
</script>
