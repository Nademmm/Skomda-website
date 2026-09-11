# Design System — SMK Telkom Sidoarjo Website Redesign

> **Sumber kebenaran:** Dokumen ini diekstrak langsung dari kode landing page yang sudah dibangun (`frontend/src/`), **bukan dirancang dari nol**. Semua token, pola, dan aturan di bawah mencerminkan apa yang **sudah ada** di kode per 30 Agustus 2026.

---

## Filosofi Desain

Desain mengusung arah **editorial-modern yang cerah** — background terang (`#f3f4f6`) menjadi kanvas utama, sementara merah khas Telkom Schools (`#bc0c11`) dipakai sebagai warna aksen dominan yang konsisten dari navbar hingga footer. Elemen visual merujuk identitas telekomunikasi lewat ikon sinyal/wireless di tab jurusan, capsule merah terotasi di hero, dan bentuk geometris melengkung (`borderRadius: 190px 0 190px 0`) di seksi program yang mengesankan signal wave. Tipografi berbasis **Plus Jakarta Sans** (heading) dan **Poppins** (body/caption) menghasilkan hierarki editorial yang bersih, tegas, dan mudah di-scan.

---

## Palet Warna

Semua token didefinisikan di [`tailwind.config.ts`](file:///c:/Users/nadem/Skomda-website/frontend/tailwind.config.ts).

### Token dari `tailwind.config.ts`

| Token | Hex / Nilai | Penggunaan Aktual di Kode |
|---|---|---|
| `brand-red` | `#bc0c11` | Warna utama CTA button, capsule hero, frame jurusan, accent line, stats bar gradient endpoint, selection highlight, `focus-visible` outline |
| `brand-red-dark` | `#990a0e` | `hover:bg` pada CTA button (`HeroSection`, `WhyChooseUsSection`, `ProgramsSection`), gradient overlay inner frame jurusan |
| `brand-red-light` | `#e7000b` | Teks aksen merah pada heading ("SMK Telkom Sidoarjo", "& Berwawasan Digital"), eyebrow "Welcome", stats bar gradient start, category label berita, visi-misi icon circle bg |
| `brand-dark` | `#101828` | Warna teks heading utama (h1, h2, h3), body text primer `<body>`, footer heading |
| `brand-charcoal` | `#364153` | Teks nav link, body text sekunder (sambutan, footer link, alamat), breadcrumb |
| `brand-gray` | `#4a5565` | Teks deskripsi di card WhyChooseUs (non-highlight), competency description Programs, footer secondary text, eyebrow "Selamat Datang di" |
| `brand-muted` | `#787878` | Subtext hero ("Membentuk generasi unggul…"), nama jabatan kepsek, dashed border partner (combined with opacity) |
| `brand-subtle` | `#515151` | Badge sambutan label, deskripsi subheading NewsSection |
| `brand-bg` | `#f3f4f6` | Background utama `<body>`, background section (Hero, WhyChooseUs, Programs, News, VisiMisi, StrukturOrganisasi), bg badge sambutan |
| `graphite` | `#121316` | Didefinisikan, belum terpakai di komponen landing page (reserved dark mode) |
| `raised` | `#1A1B1F` | Didefinisikan, belum terpakai di komponen landing page (reserved dark mode) |
| `ink` | `#ECEDEF` | Didefinisikan, belum terpakai di komponen landing page (reserved dark mode) |
| `ink-muted` | `#9A9CA3` | Didefinisikan, belum terpakai di komponen landing page (reserved dark mode) |
| `signal` | `#FFC53D` | Didefinisikan, belum terpakai di komponen landing page (reserved accent) |
| `signal-deep` | `#E0A82E` | Didefinisikan, belum terpakai di komponen landing page (reserved accent) |
| `line` | `rgba(236,237,239,0.12)` | Didefinisikan, belum terpakai di komponen landing page (reserved divider) |

### Warna Tambahan Ditemukan di Komponen (Bukan Token)

| Hex / Nilai | Di Mana Dipakai | Catatan |
|---|---|---|
| `#bd0c12` | Navbar link hover, dropdown hover, lang selector active, mobile CTA, WhyChooseUs highlight card, ProgramsSection heading & CTA, NewsSection active filter, pagination, accent bar ProfilHero & StrukturOrganisasi, Footer social hover | **Sangat dekat** dengan `brand-red` (`#bc0c11`) tapi beda 1 digit. Ini inkonsistensi minor yang harus diseragamkan. |
| `#ee5053` | Accent line pendek di hero (2.5px × 36px merah muda) | Varian pink-red, hanya dipakai 1× |
| `#c10007` | Label "Prospek Kerja:" heading di ProgramsSection | Varian merah lain, hanya 1× |
| `#ffebed` | Background icon circle WhyChooseUs (card non-highlight), hover bg dropdown navbar | Pink-red sangat muda |
| `#e5e7eb` | Border footer, border language selector, partner section dashed border, border Akreditasi section | Tailwind `gray-200` equivalent |
| `#f9fafb` | Background language selector capsule | Tailwind `gray-50` equivalent |
| `#71717a` | Dropdown menu description text | Tailwind `zinc-500` equivalent |
| `#6a7282` | News date/time text, category count mobile, struktur organisasi bottom bar, pagination dot inactive | Gray untuk metadata |
| `#99a1af` | Pagination dot inactive state | Gray medium |
| `#4b5563` | Language selector inactive text | Tailwind `gray-600` equivalent |
| `#1a73e8` | Google Maps overlay link text | Google brand blue |

---

## Tipografi

Didefinisikan di [`layout.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/app/layout.tsx) dan [`tailwind.config.ts`](file:///c:/Users/nadem/Skomda-website/frontend/tailwind.config.ts#L25-L31).

### Font Families

| Token Tailwind | Font Aktual | CSS Variable | Role | Weight Dimuat |
|---|---|---|---|---|
| `font-jakarta` | **Plus Jakarta Sans** | `--font-jakarta` | **Display / Heading / Primary UI** | 400, 500, 600, 700, 800 |
| `font-poppins` | **Poppins** | `--font-poppins` | **Body / Caption / Supporting text** | 400, 500, 600, 700 |
| `font-display` | — | `--font-display` | Alias (tersedia tapi belum di-assign font aktual di `layout.tsx`) | — |
| `font-body` | — | `--font-body` | Alias (tersedia tapi belum di-assign font aktual di `layout.tsx`) | — |
| `font-mono` | — | `--font-mono` | Monospace (tersedia tapi belum terpakai di komponen landing) | — |

### Penggunaan Per Komponen

| Komponen | Jakarta Sans | Poppins |
|---|---|---|
| **Navbar** | Nav link (15px/600), dropdown label (14px/600), CTA "Unduh Informasi" (12px/700), lang selector (12px/700) | — |
| **HeroSection** | Welcome label (18px/400+600), H1 heading (36px/700), stats value (36px/700) | Subtext (16px/400), stats label (14px/400), CTA label (15px/500) |
| **PrincipalSection** | H2 heading (24-40px/700), badge label via Poppins | Badge "Sambutan" (14-16px/500), body paragraph (14-15px/400), signature name (18px/500), jabatan (14px/400) |
| **WhyChooseUsSection** | H2 heading (36px/700), card title (18-20px/700), card desc (13px/400), CTA label (16px/500) | — |
| **PartnersSection** | — (teks minimal, logo-based) | — |
| **ProgramsSection** | H2/H3 (30-36px/700), tab label (14px/500+600), competency title (14-16px/600), desc (12-14px/400), prospek kerja heading & text, CTA label (14-16px/500) | — |
| **NewsSection** | H2 (32px/700), H3 sub-heading (46px/700), filter desc (14px/500), category sidebar (15px/500+600), card title (14px/700), category label (12px/600) | Date badge (16px/500), timestamp (12px/400) |
| **Footer** | Semua teks: tagline (14px/400), heading (17px/700), links (14px/400), copyright (12px/400), address (14px/400), visitor stats (12px/400+600) | — |
| **ProfilHeroSection** | Breadcrumb (14px/400+500), H1 (56px/700), body (16-18px/400), CTA (16px/700) | — |
| **VisiMisiSection** | H2 (36-40px/700), H3 (24px/700), body (16-17px/400), numbered misi (16px/700 for numbers, 400 body), quote (15px/italic/400) | — |
| **AkreditasiSection** | Body decree (18-20px/400+600) | — |
| **StrukturOrganisasiSection** | H2 (36-40px/700), body (16-18px/400), caption (12-14px/400+600), modal heading (16-18px/700) | — |

### Ukuran Font Berulang

- **H1 Desktop**: 36–56px, font-bold, leading-tight
- **H2 Section Title**: 30–46px, font-bold, leading-[40px]
- **H3 Card/Sub**: 18–24px, font-bold
- **Body Text**: 14–17px, font-normal/medium, leading-relaxed
- **Caption / Meta**: 11–13px, font-normal/medium
- **CTA Button Label**: 13–16px, font-medium/bold

---

## Layout & Spacing

### Container System

Pola container yang konsisten di **semua section**:

```
<div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
```

- **Max-width**: `1280px` (didefinisikan juga sebagai `max-w-8xl` di tailwind config)
- **Padding horizontal**: `16px` (mobile) → `24px` (sm) → `32px` (lg)
- **Centering**: `mx-auto`

### Section Padding Vertikal

| Pattern | Contoh Komponen |
|---|---|
| `py-16 lg:py-24` | PrincipalSection |
| `py-20 lg:py-24` | WhyChooseUsSection |
| `pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-14` | ProgramsSection |
| `pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-28` | NewsSection |
| `pt-16 pb-12` (footer) | Footer |
| `py-20 lg:py-28` | AkreditasiSection, StrukturOrganisasiSection |

### Section Background Alternation

Sections bergantian antara dua background:
1. **`bg-[#f3f4f6]`** (brand-bg): Hero, WhyChooseUs, Partners, Programs, News, VisiMisi, StrukturOrganisasi
2. **`bg-white`**: PrincipalSection, Akreditasi, Footer

### Section Dividers

- **Border-based**: Footer menggunakan `border-t border-[#e5e7eb]`, Akreditasi menggunakan `border-y border-[#e5e7eb]/60`
- **Shadow-based**: PrincipalSection memiliki `shadow-sm`
- **Tidak ada divider eksplisit** antar section pada background `brand-bg` — mereka menyatu secara visual

### Grid Patterns

| Pattern | Dipakai Di |
|---|---|
| `grid grid-cols-3` | Stats bar (Hero), mobile stats |
| `grid gap-6 sm:grid-cols-2 lg:grid-cols-3` | WhyChooseUs cards (6 cards) |
| `grid lg:grid-cols-12 gap-10 lg:gap-14` | ProgramsSection (5+7 split) |
| `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-5 gap-y-6 lg:gap-y-7` | NewsSection news cards |
| `grid gap-10 md:grid-cols-2 lg:grid-cols-12` | Footer (4+3+2+3 col-span) |
| `grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8` | ProfilHero (5+7), VisiMisi (7+5), StrukturOrganisasi (5+7) |

### Responsive Breakpoints

Mengikuti default Tailwind + custom pattern:
- **Mobile first** (default)
- **sm**: `640px` — spacing dan ukuran font adjustment
- **lg**: `1024px` — layout multi-kolom
- **xl**: `1280px` — hanya dipakai oleh HeroSection (desktop layout terpisah) dan Navbar (desktop nav visibility)

---

## Komponen & Pola Berulang

### 1. Floating Pill Navbar (Sticky + Blur)

**File**: [`Navbar.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/layout/Navbar.tsx)

```
fixed top-0 z-50 → pt-4 sm:pt-6 → max-w-[1280px]
h-[66px] bg-white/95 backdrop-blur-md rounded-full
border border-white/50 shadow-header
```

- Melayang di atas konten dengan `pointer-events-none` wrapper + `pointer-events-auto` pada header
- Glassmorphism: `bg-white/95 backdrop-blur-md`
- Shape: `rounded-full` (pill)
- Dropdown: `rounded-2xl bg-white/95 backdrop-blur-md` dengan transisi `opacity + translate-y`

### 2. Red Pill CTA Button (Primary Action)

**File**: [`HeroSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/HeroSection.tsx#L75-L89), [`WhyChooseUsSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/WhyChooseUsSection.tsx#L77-L101), [`ProgramsSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/ProgramsSection.tsx#L204-L229)

Dua varian:

**Varian A — Pill dengan panah di circle putih** (Hero):
```
rounded-full bg-[#bc0c11] pl-6 pr-1.5 py-1.5
shadow-[0px_4px_10px_rgba(188,12,17,0.3)]
hover:bg-[#990a0e] active:scale-[0.98]
  └── inner circle: rounded-full bg-white text-[#bc0c11]
      └── group-hover:translate-x-1 (arrow slides right)
```

**Varian B — Pill solid dengan inline arrow** (WhyChooseUs, Programs):
```
rounded-full bg-[#bd0c12] px-7/8 py-3/3.5
boxShadow: card-cta (inset bottom shadow for depth)
hover:bg-[#990a0e] active:scale-[0.98]
  └── inline SVG arrow: group-hover:translate-x-1
```

### 3. Ghost / Outline CTA Button

**File**: [`Navbar.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/layout/Navbar.tsx#L181-L189)

```
rounded-full border border-[#bd0c12] px-5 h-[38px]
text-[#bd0c12] hover:bg-[#bd0c12] hover:text-white
```

### 4. Red Accent Underline Bar

**File**: [`HeroSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/HeroSection.tsx#L63), [`PrincipalSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/PrincipalSection.tsx#L100), [`ProfilHeroSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/profil/ProfilHeroSection.tsx#L92), [`StrukturOrganisasiSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/profil/StrukturOrganisasiSection.tsx#L43)

Pola berulang setelah heading utama:
```
<div className="h-[2.5px] w-9 rounded-full bg-[#ee5053]" />   // Hero (pink-red)
<div className="mt-3 mb-5 h-1 w-14 rounded-full bg-[#bc0c11]" /> // Principal
<div className="mt-3.5 h-[3px] w-14 bg-[#bd0c12] rounded-full" /> // ProfilHero, StrukturOrganisasi
```

> ⚠️ Variasi ketebalan (2.5px vs 3px vs 4px) dan warna (#ee5053 vs #bc0c11 vs #bd0c12) belum diseragamkan.

### 5. Segmented Pill Tab (Filter/Toggle)

**File**: [`ProgramsSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/ProgramsSection.tsx#L25-L56), [`Navbar.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/layout/Navbar.tsx#L153-L178) (lang selector)

```
inline-flex h-[52px] w-[340px] rounded-full bg-white p-1 shadow-sm border border-gray-200/60
  └── active tab: bg-[#bd0c12] text-white rounded-full shadow-sm
  └── inactive tab: text-[#364153] hover:text-[#bd0c12]
```

Pola serupa pada language selector (ID/EN) tapi lebih kecil (h-[38px]).

### 6. Feature Card (WhyChooseUs)

**File**: [`WhyChooseUsSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/WhyChooseUsSection.tsx#L106-L188)

**Normal variant**:
```
rounded-[25px] bg-white px-6 sm:px-7 py-6
shadow-[0px_4px_4.5px_rgba(0,0,0,0.08)]
flex items-center gap-4 sm:gap-5
hover:-translate-y-1 hover:shadow-md
  └── icon circle: size-[64px] sm:size-[70px] rounded-full bg-[#ffebed]
```

**Highlight (red) variant**:
```
rounded-[25px] bg-[#bd0c12] text-white
shadow-[0px_4px_9px_0px_rgba(0,0,0,0.1)]
hover:-translate-y-1.5 hover:shadow-xl
  └── icon circle: rounded-full bg-white
  └── hover: underline animation on title (w-0 → w-full)
```

### 7. News Card

**File**: [`NewsSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/NewsSection.tsx#L248-L342)

```
bg-white rounded-[16px] p-[11px] shadow-sm border border-gray-100/80
hover:shadow-md hover:-translate-y-1
  └── thumbnail: h-[192px] rounded-[12px] overflow-hidden
      └── date badge: absolute top-0 right-0 bg-red w-[53px] h-[60px] rounded-bl-[15px]
  └── title: font-jakarta 14px/700 line-clamp-3
  └── category: font-jakarta 12px/600 text-[#e7000b]
  └── timestamp: font-poppins 12px/400 text-[#6a7282]
```

### 8. Floating Stats Bar (Hero Overlay)

**File**: [`HeroSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/HeroSection.tsx#L137-L190)

```
rounded-[25px] overflow-hidden
background: linear-gradient(135deg, #e7000b 0%, #bc0c11 100%)
boxShadow: 0px 10px 30px rgba(188, 12, 17, 0.25)
padding: 24px 40px
  └── grid grid-cols-3 text-white text-center
  └── vertical dividers: border-x border-white/20
```

### 9. Partner Logo Card (Marquee)

**File**: [`PartnersSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/PartnersSection.tsx#L48-L66)

```
h-[112px] w-[192px] rounded-lg
border-2 border-dashed border-[#d1d5dc] bg-white p-3
shadow-sm hover:border-[#bd0c12] hover:shadow-md
  └── logo: opacity-80 hover:opacity-100
```

### 10. Curved Frame (Program Jurusan)

**File**: [`ProgramsSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/ProgramsSection.tsx#L63-L127)

```
// Outer dashed frame
border-2 border-dashed border-[#787878]/60
borderRadius: 55px 0 55px 0

// Inner solid red frame
bg-[#bc0c11] shadow-xl
borderRadius: 190px 0 190px 0
  └── gradient overlay: from-[#990a0e] to-[#bc0c11]
```

### 11. Floating Badge (Glassmorphism Mini)

**File**: [`ProgramsSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/ProgramsSection.tsx#L98-L125)

```
size-[52px] rounded-[12px] bg-white/95
shadow-[0px_3px_10px_rgba(0,0,0,0.12)] backdrop-blur-sm
hover:scale-110
```

### 12. Sambutan Badge (Pill with Icon)

**File**: [`PrincipalSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/PrincipalSection.tsx#L78-L90)

```
inline-flex items-center gap-2 rounded-full
bg-[#f3f4f6] px-4 py-1.5 border border-gray-200
  └── icon: size-5 (SVG icon-profile)
  └── text: font-poppins 14-16px/500 text-[#515151]
```

### 13. Competency Row (Icon + Text)

**File**: [`ProgramsSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/ProgramsSection.tsx#L176-L189)

```
flex items-start gap-3.5
  └── icon circle: size-9 rounded-full bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.08)]
  └── title: font-jakarta 14-16px/600
  └── desc: font-jakarta 12-14px/400 text-[#4a5565]
```

### 14. Social Icon Circle (Footer)

**File**: [`Footer.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/layout/Footer.tsx#L166-L177)

```
size-9 rounded-full border border-gray-200
text-[#4a5565]
hover:border-[#bd0c12] hover:bg-[#bd0c12] hover:text-white
```

### 15. Lightbox Modal (StrukturOrganisasi)

**File**: [`StrukturOrganisasiSection.tsx`](file:///c:/Users/nadem/Skomda-website/frontend/src/components/sections/profil/StrukturOrganisasiSection.tsx#L134-L188)

```
// Backdrop
fixed inset-0 z-50 bg-black/85 backdrop-blur-md

// Modal container
max-w-6xl rounded-2xl bg-white p-4 sm:p-6 shadow-2xl
  └── spring animation: damping 25, stiffness 300
  └── close: ESC key + click outside + button
  └── body scroll lock saat open
```

---

## Motion & Interaksi

### Library yang Dipakai

- **CSS Transitions** (mayoritas): Dipakai di semua komponen landing page utama
- **Framer Motion**: Hanya dipakai di komponen profil (`ProfilHeroSection`, `VisiMisiSection`, `AkreditasiSection`, `StrukturOrganisasiSection`)
- **CSS @keyframes**: Marquee scroll animation di PartnersSection

### Prinsip Durasi & Easing

| Pattern | Durasi | Easing | Dipakai Di |
|---|---|---|---|
| Hover color/opacity change | `150ms` | default (ease) | Navbar link, news filter, footer link |
| Hover translate + shadow | `200–300ms` | default (ease) | Feature cards, news cards, CTA buttons |
| Dropdown open/close | `200ms` | `ease-out` | Navbar dropdown (opacity + translateY) |
| Framer Motion entrance | `700ms` | `easeOut` | ProfilHero (x: ±30→0), VisiMisi (y: 30→0, scale: 0.95→1), StrukturOrganisasi (x: ±30→0) |
| Framer Modal | spring | `damping: 25, stiffness: 300` | StrukturOrganisasi lightbox |
| Marquee scroll | `40s` | `linear infinite` | PartnersSection |
| Image zoom on hover | `500ms` | default | News thumbnail (`group-hover:scale-105`) |
| Button press feedback | instant | — | `active:scale-[0.97]` / `active:scale-[0.98]` |

### `prefers-reduced-motion`

**✅ Sudah diterapkan** di [`globals.css`](file:///c:/Users/nadem/Skomda-website/frontend/src/app/globals.css#L5-L12):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

> ⚠️ **Catatan**: Rule CSS ini menangani CSS transitions & animations, tapi **tidak menangani Framer Motion** secara otomatis. Komponen profil yang pakai `motion.div` (ProfilHero, VisiMisi, Akreditasi, StrukturOrganisasi) belum mengecek `useReducedMotion()` dari framer-motion.

### Interaction Patterns

| Pola | Komponen |
|---|---|
| `hover:-translate-y-1` / `hover:-translate-y-1.5` (card lift) | WhyChooseUs cards, News cards |
| `group-hover:translate-x-1` (arrow slide) | Semua CTA button arrows |
| `group-hover:scale-105` (icon pulse) | WhyChooseUs icon circles, kepsek photo |
| `hover:scale-110` | Floating badges (ProgramsSection) |
| `active:scale-[0.97]` / `active:scale-[0.98]` (press) | CTA buttons |
| `hover:underline animation` (w-0 → w-full) | WhyChooseUs highlight card title |
| `hover: animation-play-state: paused` | Marquee (PartnersSection) |
| `hover: opacity 0→1 overlay` (zoom hint) | StrukturOrganisasi image card |

---

## Aksesibilitas

### Aturan yang Sudah Diterapkan

| Aturan | Implementasi | Status |
|---|---|---|
| **`focus-visible` outline** | `a:focus-visible, button:focus-visible { outline: 2px solid #bc0c11; outline-offset: 3px; }` di globals.css | ✅ Global |
| **`alt` text pada gambar** | Semua `<Image>` utama memiliki `alt` deskriptif (siswa, kepsek, akreditasi). Dekoratif menggunakan `alt=""` | ✅ Konsisten |
| **`aria-label` pada tombol ikon** | Language selector (`Bahasa Indonesia`, `English`), hamburger (`Toggle menu`), pagination (`Previous page`, `Next page`, `Go to page N`), social icons, modal close | ✅ Diterapkan |
| **`lang="id"` pada `<html>`** | Ditetapkan di layout.tsx | ✅ |
| **`prefers-reduced-motion`** | Global CSS reset di globals.css | ✅ CSS-level |
| **Semantic heading hierarchy** | H1 di hero, H2 per section, H3 untuk sub-section/cards — terstruktur sequential | ✅ Per-halaman |
| **Keyboard-accessible modal** | StrukturOrganisasi modal: ESC untuk close | ✅ |
| **`display: swap`** pada font | Kedua font (Jakarta Sans, Poppins) dimuat dengan `display: "swap"` | ✅ |
| **Image optimization** | `<Image>` Next.js dengan `priority` pada above-the-fold, `sizes` attribute pada News thumbnails | ✅ |

### Requirement Wajib untuk Komponen Baru

1. **WAJIB** sertakan `alt` text deskriptif pada semua `<Image>` — gunakan `alt=""` hanya untuk dekoratif murni.
2. **WAJIB** tambahkan `aria-label` pada semua `<button>` yang hanya berisi ikon (tanpa teks visible).
3. **WAJIB** pertahankan heading hierarchy sequential (h1→h2→h3) — jangan skip level.
4. **WAJIB** pastikan semua elemen interaktif punya state `focus-visible` yang terlihat (sudah di-handle global, jangan override).
5. **WAJIB** test dengan `prefers-reduced-motion: reduce` — jika pakai Framer Motion, tambahkan `useReducedMotion()` hook.
6. **WAJIB** pastikan konten bisa diakses tanpa JavaScript (SSR/SSG content, bukan render kosong).

---

## Validasi Konten vs Referensi Resmi

### Status Program Keahlian: Resmi Terkonfirmasi

| Data | Di Kode (Database & Komponen) | Status |
|---|---|---|
| **Nama sekolah** | "SMK Telkom Sidoarjo" | ✅ Cocok |
| **Program Keahlian 1** | **SIJA** (Sistem Informasi Jaringan dan Aplikasi - Program 4 Tahun) | ✅ **Resmi & Terkonfirmasi** |
| **Program Keahlian 2** | **TJAT** (Teknik Jaringan Akses Telekomunikasi - Program 3 Tahun) | ✅ **Resmi & Terkonfirmasi** |
| **Akreditasi** | "A (UNGGUL), Nilai 93, SK 1336/BAN-SM/SK/2021, berlaku s.d. 31 Des 2026" | ✅ Terkonfirmasi |
| **Kepala Sekolah** | "Abror S.Hum., M.Pd." | ✅ Terkonfirmasi |
| **Alamat** | "Jl. Raya Pecantingan Sekardangan, Kabupaten Sidoarjo, Jawa Timur" | ✅ Terkonfirmasi |
| **Telepon** | "0811-3021-919" | ✅ Terkonfirmasi |
| **Email** | "informasi@smktelkom-sda.sch.id" | ✅ Terkonfirmasi |
| **Visi** | "Mewujudkan Lulusan Tangguh, Berakhlak, dan Berwawasan Digital." | ✅ Terkonfirmasi |

> **Catatan Status Jurusan**: SMK Telkom Sidoarjo telah merestrukturisasi program keahlian menjadi 2 fokus vokasi unggulan: **SIJA (4 Tahun)** dan **TJAT (3 Tahun)**. Seluruh skema database GORM, seeder, dan komponen UI telah diselaraskan penuh dengan struktur 2 jurusan resmi ini.

---

## Pola Komponen Interaktif Tambahan (Design System Extension)

### 1. Modal Pencarian Cepat Global (`NavbarSearch.tsx`)
- **Pemicu**: Tombol pencarian navbar atau pintasan keyboard `Cmd+K` / `Ctrl+K`.
- **Wadah**: Overlay modal dengan `fixed inset-0 z-50 bg-black/40 backdrop-blur-sm`.
- **Kotak Pencarian**: Input teks besar berorientasi fokus dengan ikon pembersih cepat dan penutup tombol `Esc`.
- **Hasil Terkategori**: Hasil dikelompokkan secara visual dengan badge berwarna (`Halaman`, `Program Keahlian`, `Berita & Pengumuman`).
- **Aksesibilitas**: Navigasi panah keyboard (Up/Down) dan seleksi tombol Enter.

### 2. Widget Obrolan Asisten Virtual (`SkomdaChatWidget.tsx`)
- **Floating Launcher**: Tombol melayang `fixed bottom-6 right-6 z-50` berbentuk lingkaran dengan bayangan lembut dan indikator online.
- **Jendela Percakapan**: Panel berukuran responsif (`rounded-3xl shadow-2xl`) dengan header merah Telkom Schools (`#bc0c11`) dan tombol ciutkan.
- **Bubble Percakapan**:
  - Pesan Pengguna: Background merah brand (`#bc0c11`), teks putih, rounded dengan sudut kanan bawah tumpul.
  - Pesan Asisten: Background abu-abu lembut (`#f3f4f6`), teks gelap (`#101828`), mendukung format Markdown terstruktur (daftar, bold, link).
- **Rekomendasi Pertanyaan Cepat (Suggestion Pills)**: Kapsul interaktif dengan border abu-abu yang mengirimkan pertanyaan umum dengan sekali klik.
- **Fallback State**: Tampilan kartu pemberitahuan ramah jika layanan gateway AI offline, lengkap dengan tombol langsung ke WhatsApp Humas.

### 3. Pengalih Bahasa Dwibahasa (`LanguageContext.tsx`)
- **Visual**: Kapsul melayang pada navbar (`rounded-full bg-gray-50 border border-gray-200`) yang menampilkan label `ID` dan `EN`.
- **Perilaku**: Transisi instan tanpa reload halaman, menyimpan preferensi bahasa di state klien.

### 4. Pusat Pengelolaan Berita Admin (`/admin/berita`)
- **Tata Letak**: Tabel data bersih dengan badge kategori berwarna, pencarian instan, dan filter kategori.
- **Modal Formulir**: Dialog penambahan dan penyuntingan artikel dengan validasi form, pengunggah gambar cover (lokal / Cloudinary), dan live card preview yang langsung mencerminkan tampilan pembaca.

---

## Aturan Wajib (Do's & Don'ts)

### ✅ WAJIB (Do's)

1. **WAJIB** pakai token warna dari `tailwind.config.ts` (`brand-red`, `brand-dark`, `brand-charcoal`, `brand-gray`, `brand-muted`, `brand-subtle`, `brand-bg`). Dilarang menambah hex mentah baru di komponen tanpa mendaftarkannya dulu sebagai token.
2. **WAJIB** pakai container wrapper `mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8` di setiap section baru.
3. **WAJIB** pakai `font-jakarta` sebagai font utama heading & UI, dan `font-poppins` untuk body/caption.
4. **WAJIB** pakai `rounded-full` untuk semua CTA button dan tab control. Border-radius komponen lain: `rounded-[25px]` untuk cards besar, `rounded-2xl` (16px) untuk cards medium, `rounded-xl` (12px) untuk thumbnail.
5. **WAJIB** sertakan hover state pada setiap elemen interaktif: `hover:text-[#bd0c12]` untuk link teks, `hover:-translate-y-1` untuk cards, `group-hover:translate-x-1` untuk CTA arrows.
6. **WAJIB** sertakan `active:scale-[0.98]` atau `active:scale-[0.97]` pada semua CTA button untuk feedback press.
7. **WAJIB** terapkan responsive pattern: mobile-first styling, breakpoint sm→lg→xl.
8. **WAJIB** pakai Next.js `<Image>` dengan `alt` text untuk semua gambar, `priority` untuk elemen above-the-fold.
9. **WAJIB** gunakan helper `src/lib/cloudinary.ts` untuk memuat gambar foto konten agar memanfaatkan CDN dan kompresi dinamis.

### 🚫 DILARANG (Don'ts)

1. **DILARANG** menggunakan nama jurusan non-aktif (TKJ, RPL, atau TAV) di dalam materi atau komponen antarmuka resmi.
2. **DILARANG** pakai `border-radius` arbitrer: ikuti skala yang sudah ada (`rounded-full`, `rounded-[25px]`, `rounded-2xl`, `rounded-xl`).
3. **DILARANG** menambah font eksternal baru selain Plus Jakarta Sans dan Poppins.
4. **DILARANG** membuat link atau tombol mati tanpa tujuan rute yang valid.
5. **DILARANG** skip heading level (misalnya h1 langsung lompat ke h3).
6. **DILARANG** membuat elemen interaktif tanpa `focus-visible` state yang jelas.

---

## Catatan Terbuka & Status Resolusi

1. **Status Program Keahlian (Selesai)**: Resmi dikunci pada **SIJA (4 Tahun)** dan **TJAT (3 Tahun)**. Seluruh skema DB dan UI telah tersinkronisasi.
2. **Data Berita & Artikel (Selesai)**: Mock data telah digantikan dengan skema database berita GORM dan Admin CMS (`/admin/berita`) untuk pengelolaan artikel berkelanjutan.
3. **Pencarian Global & AI Chatbot (Selesai)**: NavbarSearch dan SkomdaChatWidget telah aktif sebagai komponen bawaan sistem.
4. **Token Merah Brand**: Menggunakan `#bc0c11` sebagai warna aksen primer resmi Telkom Schools. Variasi hover disepakati menggunakan `#bd0c12` atau `#990a0e`.
