export interface TeacherItem {
  id?: number | string;
  name: string;
  gelar?: string;
  role: string;
  image: string;
}

export const kepalaSekolah = {
  name: "Abror, S.Hum., M.Pd.",
  title: "Kepala Sekolah",
  institution: "SMK Telkom Sidoarjo",
  role: "Kepala Sekolah",
  image: "/images/tentang-kami/profil-guru/abror.png",
  bio: "Berkomitmen memimpin SMK Telkom Sidoarjo dalam mencetak generasi unggul yang berkarakter, berdaya saing global, dan siap menjadi pionir industri teknologi digital masa depan.",
  pendidikanTerakhir: "S2 Magister Pendidikan",
  bidangKeahlian: "Manajemen Pendidikan & Kepemimpinan Sekolah",
  motto: "Belajar bukan sekadar mencari nilai, tapi membangun masa depan.",
  kontak: "abror@smktelkom-sda.sch.id",
};

// Wakil Kepala Sekolah, Kepala Program Studi, dan Kepala Urusan (Manajemen Sekolah)
export const wakilKepalaList: TeacherItem[] = [
  {
    name: "Siti Sifaun Nadhiroh, S.Pd.",
    role: "Waka Bid. Kurikulum",
    image: "/images/tentang-kami/profil-guru/faun.png",
  },
  {
    name: "Achmad Rifai, S.Pd., M.H.",
    role: "Waka Bid. Sarana dan Prasarana",
    image: "/images/tentang-kami/profil-guru/rifai.png",
  },
  {
    name: "Rachel Apriliani, S.Pd.",
    role: "Waka Bid. Kesiswaan",
    image: "/images/tentang-kami/profil-guru/rachel.png",
  },
  {
    name: "Maulana Alghofiqi, M.Pd.",
    role: "Kepala Administrasi",
    image: "/images/tentang-kami/profil-guru/maulana.png",
  },
  {
    name: "Ike Yuliastuti, S.ST.",
    role: "Kepala Program Studi",
    image: "/images/tentang-kami/profil-guru/ike.png",
  },
  {
    name: "Muhammad Adi Riswanto, S.ST.",
    role: "Kepala Program Studi",
    image: "/images/tentang-kami/profil-guru/adi.png",
  },
  {
    name: "Mokhammad Misbakhul Abid, S.Pd.",
    role: "Kepala Urusan",
    image: "/images/tentang-kami/profil-guru/abid.png",
  },
  {
    name: "Yunia Vita, S.Pd.",
    role: "Kepala Urusan",
    image: "/images/tentang-kami/profil-guru/yunia.png",
  },
  {
    name: "Novra Edi Pratama, S.ST.",
    role: "Kepala Urusan",
    image: "/images/tentang-kami/profil-guru/novra.png",
  },
  {
    name: "Galuh Rahmawati, S.Pd.",
    role: "Kepala Urusan",
    image: "/images/tentang-kami/profil-guru/galuh.png",
  },
  {
    name: "Eka Prasetia Purnawati Iswardiani, M.T.",
    role: "Kepala Urusan",
    image: "/images/tentang-kami/profil-guru/eka.png",
  },
  {
    name: "Muhammad Adam Nuh Ibrahim, M.Pd.",
    role: "Kepala Urusan",
    image: "/images/tentang-kami/profil-guru/adam.png",
  },
  {
    name: "Guruh Mayonk Firmansyah, S.Sos.",
    role: "Kepala Urusan",
    image: "/images/tentang-kami/profil-guru/mayonk.png",
  },
];

// Guru Mata Pelajaran (Produktif & Non Produktif)
export const guruList: TeacherItem[] = [
  {
    name: "Lia Indriawati, S.Pd.I.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/lia.png",
  },
  {
    name: "Rina Novia Wahyuningtyas, M.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/rina.png",
  },
  {
    name: "Muhammad Syaiful Ulum, S.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/ulum.png",
  },
  {
    name: "Fajar Trihadmoko, S.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/fajar.png",
  },
  {
    name: "Amir Hamka, S.Pd.I., M.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/hamka.png",
  },
  {
    name: "Chintia Trinanda Wijaya, S.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/chintia.png",
  },
  {
    name: "Eliza Tyas Damayanti, S.Kom.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/eliza.png",
  },
  {
    name: "Arganata Dian Amarullah, S.T.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/arga.png",
  },
  {
    name: "Ferina Kumala Dewi, S.Hum., M.Li.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/ferina.png",
  },
  {
    name: "Shandi Pratama, M.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/shandi.png",
  },
  {
    name: "Rizka Rahayu Sasmita, M.Tr.Kom.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/rizka.png",
  },
  {
    name: "David Wahyu Pratomo, S.T.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/david.png",
  },
  {
    name: "Indra Hadi Pranata, S.Pd., M.M.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/indra-hadi.png",
  },
  {
    name: "Hadi Triyono, M.Th.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/hadi.png",
  },
  {
    name: "Nafita Rahma, S.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/nafita.png",
  },
  {
    name: "Sarah Aslamiyah, M.Li.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/sarah.png",
  },
  {
    name: "Deyan Suprayogi, S.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/dean.png",
  },
  {
    name: "Muhammad Habibi, S.Pd.I.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/habibi.png",
  },
  {
    name: "Sinta Aura Rokhmatillah, S.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/sinta.png",
  },
  {
    name: "Ilham Okta Alpriansyah, S.Tr.T.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/ilham.png",
  },
  {
    name: "Lailatun Nikmah, S.Pd.I.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/laila.png",
  },
  {
    name: "Ika Zuliana, S.Tr.T.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/kazu.png",
  },
  {
    name: "M. Suhud Abdillah Akbar, S.ST.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/suhud.png",
  },
  {
    name: "Putri Ayu Zartika, M.T.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/putri.png",
  },
  {
    name: "Ellsa Christy Maharani, S.Tr.T.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/ellsa.png",
  },
  {
    name: "Sheril Ghalih Servianto, S.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/galih.png",
  },
  {
    name: "Grisa Fima Nurandika, S.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/grisa.png",
  },
  {
    name: "Muhammad Maulana Baihaqi, S.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/haqi.png",
  },
  {
    name: "Okky Arita Wahyu Nur Maharani, S.Pd.",
    role: "Guru Mata Pelajaran",
    image: "/images/tentang-kami/profil-guru/okky.png",
  },
];

// Staff Administrasi, Keuangan, Kebersihan, dan Keamanan
export const staffList: TeacherItem[] = [
  {
    name: "Pratama Rangsia Alamanda, S.E.",
    role: "Staff HC, Logistik, dan Kesekretariatan",
    image: "/images/tentang-kami/profil-guru/manda.png",
  },
  {
    name: "Vina Rachmaya, S.Sos.",
    role: "Staff Administrasi",
    image: "/images/tentang-kami/profil-guru/vina.png",
  },
  {
    name: "Hana Rachma Citra, S.T.",
    role: "Staff Administrasi Bidang Hubin",
    image: "/images/tentang-kami/profil-guru/hana.png",
  },
  {
    name: "Risma Ayu Lukiswara, S.H.",
    role: "Staff Keuangan",
    image: "/images/tentang-kami/profil-guru/risma.png",
  },
  {
    name: "Fany Aditya Febriansyah",
    role: "Tenaga Kebersihan",
    image: "/images/tentang-kami/profil-guru/fanny.png",
  },
  {
    name: "Firman Armansyah Maulana",
    role: "Tenaga Kebersihan",
    image: "/images/tentang-kami/profil-guru/firman.png",
  },
  {
    name: "Mukhammad Efendi",
    role: "Tenaga Kebersihan",
    image: "/images/tentang-kami/profil-guru/efendi.png",
  },
  {
    name: "Misbakhul Arifin",
    role: "Tenaga Keamanan",
    image: "/images/tentang-kami/profil-guru/arifin.png",
  },
  {
    name: "Rio Dany Wijaya",
    role: "Tenaga Keamanan",
    image: "/images/tentang-kami/profil-guru/rio.png",
  },
  {
    name: "Indra Kurniawan",
    role: "Tenaga Keamanan",
    image: "/images/tentang-kami/profil-guru/indra-kurniawan.png",
  },
];
