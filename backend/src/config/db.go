package config

import (
	"log"
	"strings"

	"gorm.io/driver/postgres"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"

	"github.com/nademmm/smktelkom-web/backend/src/models"
)

var DB *gorm.DB

// InitDB menginisialisasi koneksi database GORM, melakukan migrasi otomatis, dan seeder data awal.
func InitDB(cfg Config) *gorm.DB {
	var err error
	if cfg.DatabaseURL != "" {
		log.Println("menghubungkan ke Postgres DB via DATABASE_URL...")
		DB, err = gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{})
		if err != nil {
			log.Printf("peringatan: gagal terhubung ke Postgres DB: %v. Menggunakan SQLite in-memory fallback untuk local dev.", err)
			DB, err = gorm.Open(sqlite.Open("file:smktelkom_dev.db?cache=shared"), &gorm.Config{})
		}
	} else {
		log.Println("info: DATABASE_URL tidak di-set. Menggunakan SQLite (smktelkom_dev.db) fallback untuk local dev.")
		log.Println("catatan: Untuk production, silakan setup Supabase/Neon dan tambahkan DATABASE_URL ke .env")
		DB, err = gorm.Open(sqlite.Open("file:smktelkom_dev.db?cache=shared"), &gorm.Config{})
	}

	if err != nil {
		log.Fatalf("fatal: gagal inisialisasi database: %v", err)
	}

	// Migration tabel
	if err := DB.AutoMigrate(&models.Jurusan{}, &models.News{}); err != nil {
		log.Fatalf("fatal: gagal auto migrate database: %v", err)
	}

	// Mengaktifkan Row Level Security (RLS) jika menggunakan Postgres
	if DB.Dialector.Name() == "postgres" {
		DB.Exec("ALTER TABLE IF EXISTS public.jurusans ENABLE ROW LEVEL SECURITY;")
		DB.Exec("ALTER TABLE IF EXISTS public.news ENABLE ROW LEVEL SECURITY;")
	}

	// Seed data jika tabel masih kosong
	SeedJurusanIfEmpty(DB, cfg.Env)
	SeedNewsIfEmpty(DB, cfg.Env)

	return DB
}

// SeedJurusanIfEmpty memasukkan data jurusan resmi (SIJA & TJAT) jika database kosong atau masih berisi data draft lama.
func SeedJurusanIfEmpty(db *gorm.DB, env string) {
	if strings.EqualFold(env, "production") {
		return
	}

	// Hapus data draft lama jika ada
	var countOld int64
	db.Model(&models.Jurusan{}).Where("LOWER(kode) IN ?", []string{"rpl", "tkj", "mm", "tt"}).Count(&countOld)
	if countOld > 0 {
		log.Println("memperbarui data jurusan: menghapus data draft lama (RPL/TKJ/MM/TT) dari database...")
		db.Exec("DELETE FROM jurusans WHERE LOWER(kode) IN ('rpl', 'tkj', 'mm', 'tt')")
	}

	var count int64
	db.Model(&models.Jurusan{}).Count(&count)
	if count > 0 {
		return
	}

	log.Println("seeding data awal jurusan resmi (SIJA & TJAT)...")
	dummyJurusan := []models.Jurusan{
		{
			Kode:          "SIJA",
			Nama:          "Sistem Informasi Jaringan dan Aplikasi",
			Slug:          "sija",
			Deskripsi:     "Program 4 tahun yang mempelajari pemrograman, pengelolaan basis data, dan sistem informasi berbasis teknologi modern.",
			Skills:        []string{"Software Development", "Database & Cloud Computing", "Networking & Cybersecurity"},
			ProspekKarier: []string{"Software Engineer", "Web Developer", "Mobile App Developer", "Database Administrator", "IT Security Specialist", "System Analyst"},
			Gambar:        "/images/jurusan/sija.jpg",
		},
		{
			Kode:          "TJAT",
			Nama:          "Teknik Jaringan Akses Telekomunikasi",
			Slug:          "tjat",
			Deskripsi:     "Program 3 tahun yang fokus pada teknologi jaringan telekomunikasi, infrastruktur fiber optic, dan sistem komunikasi modern.",
			Skills:        []string{"Telecommunication Networks", "Fiber Optic Technology", "Wireless Communication"},
			ProspekKarier: []string{"Network Engineer", "Telecommunication Technician", "Fiber Optic Specialist", "Wireless Network Administrator", "ISP Technician"},
			Gambar:        "/images/jurusan/tjat.jpg",
		},
	}

	for _, j := range dummyJurusan {
		if err := db.Create(&j).Error; err != nil {
			log.Printf("peringatan: gagal seed jurusan %s: %v", j.Kode, err)
		}
	}
	log.Println("berhasil seed data awal jurusan resmi (SIJA & TJAT).")
}

// SeedNewsIfEmpty memasukkan data awal berita jika tabel news masih kosong di database.
func SeedNewsIfEmpty(db *gorm.DB, env string) {
	if strings.EqualFold(env, "production") {
		return
	}

	var count int64
	db.Model(&models.News{}).Count(&count)
	if count > 0 {
		return
	}

	log.Println("seeding data awal berita/informasi ke database...")
	initialNews := []models.News{
		{
			Title:         "Penuh Dedikasi! Siswa dan Guru SMK Telkom Sidoarjo Peringati Hari Kemerdekaan RI ke-81",
			Slug:          "penuh-dedikasi-siswa-dan-guru-smk-telkom-sidoarjo-peringati-hari-kemerdekaan-ri-ke-81",
			Category:      "Kegiatan Sekolah",
			Day:           "17",
			Month:         "AGT",
			DateFormatted: "17 Agustus 2026",
			Time:          "08.00",
			Image:         "/images/berita/berita-hut-ri-81.png",
			Summary:       "Upacara peringatan Hari Kemerdekaan Republik Indonesia ke-81 di SMK Telkom Sidoarjo berlangsung dengan khidmat dan penuh semangat nasionalisme.",
			Content:       "Upacara peringatan Hari Kemerdekaan Republik Indonesia ke-81 di SMK Telkom Sidoarjo berlangsung dengan khidmat dan penuh semangat nasionalisme.\n\nBertindak sebagai Inspektur Upacara, Kepala SMK Telkom Sidoarjo, Bapak Abror, S.Hum., M.Pd.\n\nTerima kasih kepada seluruh petugas upacara yang telah menjalankan tugas dengan penuh tanggung jawab dan dedikasi. Mari terus kobarkan semangat kemerdekaan dan semangat berkarya untuk Indonesia!",
			Author:        "Humas SKOMDA",
		},
		{
			Title:         "Bikin Suasana 17-an Makin Pecah, Intip Keseruan Rangkaian Lomba di Kegiatan SPECTRA!",
			Slug:          "bikin-suasana-17-an-makin-pecah-intip-keseruan-rangkaian-lomba-di-kegiatan-spectra",
			Category:      "Kegiatan Sekolah",
			Day:           "18",
			Month:         "AGT",
			DateFormatted: "18 Agustus 2026",
			Time:          "13.30",
			Image:         "/images/berita/berita-lomba-spectra.png",
			Summary:       "17-an di SKOMDA auto seru! Bukan cuma siswa, guru, karyawan, sampai seluruh warga sekolah ikut turun langsung meramaikan lomba 17 Agustus SPECTRA.",
			Content:       "17-an di SKOMDA auto seru!\n\nBukan cuma siswa, kali ini guru, karyawan, sampai seluruh warga sekolah ikut turun langsung meramaikan lomba 17 Agustus dalam rangkaian SPECTRA!\n\nMulai dari ketawa bareng, adu strategi, sampai momen-momen seru yang bikin susah move on. Karena di SKOMDA, kemerdekaan paling seru kalau dirayakan bersama-sama!",
			Author:        "OSIS SKOMDA",
		},
		{
			Title:         "Sabet Medali Emas LKS Nasional 2026, Siswa SMK Telkom Sidoarjo Raih Bantuan Pendidikan dari Gubernur Khofifah",
			Slug:          "sabet-medali-emas-lks-nasional-2026-siswa-smk-telkom-sidoarjo-raih-bantuan-pendidikan-dari-gubernur-khofifah",
			Category:      "Prestasi",
			Day:           "12",
			Month:         "AGT",
			DateFormatted: "12 Agustus 2026",
			Time:          "10.00",
			Image:         "/images/berita/berita-lks-emas-revano.png",
			Summary:       "Setelah meraih Medali Emas Artificial Intelligence di LKS Dikmen Nasional 2026, Revano Satya Pandega menerima bantuan pendidikan dari Gubernur Jawa Timur.",
			Content:       "Setelah meraih Medali Emas Artificial Intelligence di LKS Dikmen Nasional 2026, Revano Satya Pandega kembali menerima bantuan pendidikan dari Gubernur Jawa Timur, Ibu Khofifah Indar Parawansa sebagai bentuk apresiasi atas prestasinya.\n\nMelalui Kepala Dinas Pendidikan Provinsi Jawa Timur, Dr. Aries Agung Paewai, S.STP., M.M., penghargaan ini diharapkan menjadi penyemangat agar Revano terus belajar, berkembang, dan meraih mimpi yang lebih tinggi.\n\nHari ini Revano. Besok, bisa jadi giliran kamu!",
			Author:        "Tim Redaksi SKOMDA",
		},
		{
			Title:         "Bentuk Talenta Siap Kerja, SMK Telkom Sidoarjo Bekali Siswa Pemahaman Industri Lewat Seminar Kebekerjaan",
			Slug:          "bentuk-talenta-siap-kerja-smk-telkom-sidoarjo-bekali-siswa-pemahaman-industri-lewat-seminar-kebekerjaan",
			Category:      "Karya & Inovasi Siswa",
			Day:           "08",
			Month:         "AGT",
			DateFormatted: "8 Agustus 2026",
			Time:          "09.15",
			Image:         "/images/berita/berita-seminar-kebekerjaan.png",
			Summary:       "From Student to Professional: Menjadi profesional bukan dimulai saat lulus, tetapi sejak masih di bangku sekolah melalui Seminar Kebekerjaan SKOMDA.",
			Content:       "From Student to Professional: Menjadi profesional bukan dimulai saat lulus, tetapi sejak masih di bangku sekolah.\n\nMelalui Seminar Kebekerjaan, siswa belajar memahami dunia industri secara langsung, membangun keterampilan yang dibutuhkan, serta mempersiapkan diri menghadapi karier masa depan.\n\nDi SKOMDA, kami percaya bahwa pendidikan bukan sekadar menghasilkan lulusan, tetapi membentuk talenta terbaik yang siap berkarier di dunia industri.",
			Author:        "BKK SKOMDA",
		},
		{
			Title:         "Sesuaikan Kebutuhan Industri Masa Kini, SKOMDA Sediakan 9 Pilihan Keahlian Digital Talent Program",
			Slug:          "sesuaikan-kebutuhan-industri-masa-kini-skomda-sediakan-9-pilihan-keahlian-digital-talent-program",
			Category:      "Artikel & Edukasi",
			Day:           "04",
			Month:         "AGT",
			DateFormatted: "4 Agustus 2026",
			Time:          "11.00",
			Image:         "/images/berita/berita-dtp-9-keahlian.png",
			Summary:       "SKOMDA sediakan 9 pilihan keahlian DTP mulai dari Software Developer, Network, IoT, Cloud, AI Specialist hingga Cyber Security.",
			Content:       "Kalau masa depanmu ada di dunia digital, kamu mau jadi apa?\n\nDi SKOMDA, kamu bisa mulai langkahmu lewat Digital Talent Program (DTP) yang dirancang sesuai kebutuhan industri masa kini. Sembilan pilihan peminatan DTP meliputi Software Developer, Network System Administrator, Network Infrastructure Engineer, Visual Communication Designer, IoT Engineer, Cloud Engineer, AI Specialist, Digital Marketing Specialist, dan Cyber Security Specialist.\n\nDi sini siswa belajar langsung lewat project riil industri dan mengasah portofolio nyata.",
			Author:        "Tim Kurikulum SKOMDA",
		},
		{
			Title:         "Sambut Siswa Baru, SMK Telkom Sidoarjo Tuntaskan Rangkaian Pra MPLS dan Leadership 2026",
			Slug:          "sambut-siswa-baru-smk-telkom-sidoarjo-tuntaskan-rangkaian-pra-mpls-dan-leadership-2026",
			Category:      "Kegiatan Sekolah",
			Day:           "28",
			Month:         "JUL",
			DateFormatted: "28 Juli 2026",
			Time:          "14.00",
			Image:         "/images/berita/berita-pra-mpls-leadership.png",
			Summary:       "Rangkaian Pra MPLS dan Leadership 2026 selesai dengan lancar, mempersiapkan siswa baru untuk memasuki lingkungan belajar berkarakter.",
			Content:       "Pra MPLS dan Leadership 2026 telah tuntas dilaksanakan dengan lancar. Seluruh rangkaian pembekalan kedisiplinan, pengenalan budaya sekolah, dan kepemimpinan dasar diikuti dengan antusiasme tinggi oleh ratusan calon peserta didik baru.\n\nDengan semangat ini, siswa baru SKOMDA siap menapaki petualangan akademik dan vokasi dengan mentalitas pembelajar mandiri dan berintegritas.",
			Author:        "Kesiswaan SKOMDA",
		},
		{
			Title:         "SPMB INDEN 2027/2028 Resmi Dibuka: Bebas Biaya Pendaftaran Khusus Batch Inden",
			Slug:          "spmb-inden-2027-2028-resmi-dibuka-bebas-biaya-pendaftaran-khusus-batch-inden",
			Category:      "Pengumuman",
			Day:           "20",
			Month:         "JUL",
			DateFormatted: "20 Juli 2026",
			Time:          "08.30",
			Image:         "/images/berita/berita-spmb-inden-2027.png",
			Summary:       "Penerimaan peserta didik baru Batch Inden dibuka resmi dengan benefit bebas biaya pendaftaran bagi calon siswa berprestasi.",
			Content:       "SPMB INDEN 2027/2028 resmi dibuka! Saatnya mengambil langkah pertama menuju masa depan cerah bersama SMK Telkom Sidoarjo.\n\nNikmati benefit spesial Free Biaya Pendaftaran khusus peserta Batch Inden sebelum batas waktu pendaftaran berakhir. Informasi lengkap dan pendaftaran online dapat diakses melalui portal resmi https://s.id/SPMBSKOMDA atau hotline 08113021919.",
			Author:        "Panitia SPMB SKOMDA",
		},
		{
			Title:         "61 Tahun Mengabdi, Telkom Indonesia Terus Dorong Kemajuan Ekosistem Digital Nasional",
			Slug:          "61-tahun-mengabdi-telkom-indonesia-terus-dorong-kemajuan-ekosistem-digital-nasional",
			Category:      "Kemitraan & Kerja Sama",
			Day:           "06",
			Month:         "JUL",
			DateFormatted: "6 Juli 2026",
			Time:          "09.00",
			Image:         "/images/berita/berita-hut-telkom-61.png",
			Summary:       "Mengusung semangat Sinergi Transformasi, PT Telkom Indonesia terus memperkuat fondasi talenta digital melalui Telkom Schools.",
			Content:       "Selamat Ulang Tahun ke-61 Telkom Indonesia! Selama lebih dari enam dekade, Telkom Indonesia senantiasa menjadi penggerak utama transformasi digital di seluruh pelosok Nusantara.\n\nMelalui Yayasan Pendidikan Telkom dan SMK Telkom Sidoarjo, sinergi inovasi terus diakselerasi untuk mencetak generasi muda yang kompeten dan siap mengarungi era ekonomi digital global.",
			Author:        "Yayasan Pendidikan Telkom",
		},
		{
			Title:         "Upaya Tingkatkan Kualitas Pengajar, Guru SKOMDA Dalami Implementasi AI Bersama Telkom University",
			Slug:          "upaya-tingkatkan-kualitas-pengajar-guru-skomda-dalami-implementasi-ai-bersama-telkom-university",
			Category:      "Kegiatan Sekolah",
			Day:           "24",
			Month:         "JUN",
			DateFormatted: "24 Juni 2026",
			Time:          "11.30",
			Image:         "/images/berita/berita-guru-ai-education.png",
			Summary:       "Bapak dan Ibu guru SMK Telkom Sidoarjo mengikuti pelatihan AI for Education bersama dosen Fakultas Ilmu Terapan Telkom University.",
			Content:       "Dalam semangat terus berinovasi, guru-guru SMK Telkom Sidoarjo mengikuti program intensif 'AI for Education' yang dipandu langsung oleh akademisi Telkom University.\n\nPelatihan ini memfokuskan integrasi teknologi kecerdasan artifisial dalam metode pengajaran di kelas, pemanfaatan AI dalam otomatisasi penilaian, serta etika penggunaan teknologi bagi siswa.",
			Author:        "Tim Kurikulum SKOMDA",
		},
		{
			Title:         "Julukan 'Spider-Man Darjo': Billal Habibulloh Siswa SKOMDA Sabet Juara 3 Kejurprov Jatim U17",
			Slug:          "julukan-spider-man-darjo-billal-habibulloh-siswa-skomda-sabet-juara-3-kejurprov-jatim-u17",
			Category:      "Prestasi",
			Day:           "18",
			Month:         "JUN",
			DateFormatted: "18 Juni 2026",
			Time:          "15.45",
			Image:         "/images/berita/berita-billal-spiderman-darjo.png",
			Summary:       "Prestasi membanggakan dari cabang olahraga panjat dinding diraih oleh Billal Habibulloh Arrasyid pada Kejurprov Jatim U17 Speed KONI.",
			Content:       "Prestasi gemilang kembali ditorehkan oleh siswa SMK Telkom Sidoarjo. Billal Habibulloh Arrasyid, siswa kelas XI TJAT 3, sukses membawa pulang medali Juara 3 pada Kejurprov Jawa Timur kategori U17 Speed yang diadakan oleh KONI Jawa Timur.\n\nJulukan 'Spider-Man Darjo' disematkan atas kelincahan dan kecepatannya memanjat dinding vertikal dalam hitungan detik.",
			Author:        "Ekstrakurikuler Panjat SKOMDA",
		},
		{
			Title:         "Gak Mau Kalah Canggih! Guru SKOMDA Sambangi PT Hummatech Hingga Nortis AI",
			Slug:          "gak-mau-kalah-canggih-guru-skomda-sambangi-pt-hummatech-hingga-nortis-ai",
			Category:      "Kemitraan & Kerja Sama",
			Day:           "10",
			Month:         "JUN",
			DateFormatted: "10 Juni 2026",
			Time:          "14.20",
			Image:         "/images/berita/berita-kunjungan-industri-guru.png",
			Summary:       "Para guru SMK Telkom Sidoarjo melaksanakan Kunjungan Industri ke PT Hummatech, Nortis AI, dan PT Radnet Digital Indonesia.",
			Content:       "Di balik siswa yang kompeten, ada guru yang selalu memperbarui wawasannya. Melalui kunjungan industri ke PT Hummatech, Nortis AI, dan PT Radnet Digital Indonesia, tenaga pendidik SKOMDA berdiskusi langsung mengenai kebutuhan riil industri teknologi masa kini.\n\nLangkah ini memastikan setiap materi ajar di kelas selalu seirama dengan perkembangan teknologi terbaru.",
			Author:        "Hubungan Industri SKOMDA",
		},
		{
			Title:         "Siap Go International: Siswa SKOMDA Dikenalkan Peluang Kerja ke Korea Selatan Lewat BP3MI Jatim",
			Slug:          "siap-go-international-siswa-skomda-dikenalkan-peluang-kerja-ke-korea-selatan-lewat-bp3mi-jatim",
			Category:      "Kemitraan & Kerja Sama",
			Day:           "02",
			Month:         "JUN",
			DateFormatted: "2 Juni 2026",
			Time:          "10.30",
			Image:         "/images/berita/berita-bp3mi-korea-selatan.png",
			Summary:       "BP3MI Jawa Timur kenalkan skema kerja Government to Government (GtoG) ke Korea Selatan untuk membuka karier global lulusan vokasi.",
			Content:       "SMK Telkom Sidoarjo bekerja sama dengan BP3MI Jawa Timur menyelenggarakan sosialisasi peluang karier ke Korea Selatan melalui skema resmi Government to Government (GtoG).\n\nSiswa diberikan wawasan mendalam seputar persiapan bahasa, sertifikasi kejuruan, dan etos kerja internasional agar siap berkompetisi di tingkat global.",
			Author:        "BKK SKOMDA",
		},
		{
			Title:         "Tidak Sekadar Ziarah: Siswa SMK Telkom Sidoarjo Hidupkan Semangat Kepahlawanan di TMP",
			Slug:          "tidak-sekadar-ziarah-siswa-smk-telkom-sidoarjo-hidupkan-semangat-kepahlawanan-di-tmp",
			Category:      "Kegiatan Sekolah",
			Day:           "27",
			Month:         "MEI",
			DateFormatted: "27 Mei 2025",
			Time:          "12.30",
			Image:         "/images/berita/news-thumb-1.png",
			Summary:       "Dalam rangka memperingati hari bersejarah, siswa SMK Telkom Sidoarjo melaksanakan ziarah dan kegiatan edukatif di Taman Makam Pahlawan Kusuma Bangsa.",
			Content:       "Sidoarjo: Ratusan siswa-siswi SMK Telkom Sidoarjo (SKOMDA) bersama jajaran dewan guru menyelenggarakan kegiatan ziarah dan renungan kebangsaan di Taman Makam Pahlawan Kusuma Bangsa Sidoarjo.\n\nKegiatan ini bukan hanya seremoni tabur bunga semata, melainkan bagian dari pendidikan karakter dan penguatan Profil Pelajar Pancasila yang rutin diadakan sekolah. Para siswa diajak memahami pengorbanan para pahlawan dalam memperjuangkan kemerdekaan serta mengimplementasikan nilai integritas, kerja keras, dan kepemimpinan dalam era teknologi saat ini.\n\nKepala Sekolah SMK Telkom Sidoarjo menyampaikan bahwa generasi muda di bidang teknologi harus memiliki fondasi nasionalisme yang kokoh agar karya inovasi mereka selalu berorientasi pada kemaslahatan bangsa.",
			Author:        "Tim Humas SKOMDA",
		},
		{
			Title:         "Siswi SKOMDA Sukses Raih Juara 1 INSYS FEST 5.0 dengan Aplikasi Kustomisasi Batik",
			Slug:          "siswi-skomda-sukses-raih-juara-1-insys-fest-5-aplikasi-kustomisasi-batik",
			Category:      "Prestasi",
			Day:           "24",
			Month:         "MEI",
			DateFormatted: "24 Mei 2025",
			Time:          "10.15",
			Image:         "/images/home/hero/image1.png",
			Summary:       "Karya inovatif digitalisasi budaya lokal mengantarkan siswi SIJA meraih penghargaan tingkat nasional pada ajang INSYS FEST 5.0.",
			Content:       "Prestasi membanggakan kembali diukir oleh siswi program keahlian Sistem Informasi Jaringan dan Aplikasi (SIJA) SMK Telkom Sidoarjo. Tim inovator SKOMDA berhasil merebut Juara 1 dalam ajang bergengsi INSYS FEST 5.0 kategori App Development tingkat nasional.\n\nAplikasi yang dikembangkan memanfaatkan kecerdasan buatan (AI) untuk membantu perajin lokal menghasilkan pola motif batik khas Nusantara secara digital yang dapat langsung diaplikasikan ke mesin cetak tekstil modern.\n\nDewan juri mengapresiasi inovasi ini karena tidak hanya memiliki keunggulan teknis algoritma yang rapi, namun juga memberikan dampak nyata bagi pelestarian budaya dan pemberdayaan ekonomi UMKM kreatif.",
			Author:        "Redaksi Prestasi SKOMDA",
		},
		{
			Title:         "Lomba Matematika SMP/MTs Terbesar Se-Sidoarjo Sukses Digelar di SKOMDA",
			Slug:          "lomba-matematika-smp-mts-terbesar-se-sidoarjo-sukses-digelar-di-skomda",
			Category:      "Kegiatan Sekolah",
			Day:           "20",
			Month:         "MEI",
			DateFormatted: "20 Mei 2025",
			Time:          "09.00",
			Image:         "/images/home/hero/image4.png",
			Summary:       "Ratusan peserta dari puluhan sekolah antusias mengikuti kompetisi logika matematika dan sains yang diselenggarakan oleh OSIS SKOMDA.",
			Content:       "SMK Telkom Sidoarjo sukses menghelat Kompetisi Logika Matematika dan Sains Terbuka untuk jenjang SMP/MTs se-Jawa Timur. Lebih dari 300 peserta dari 45 sekolah hadir menunjukkan ketajaman penalaran komputasional mereka di Aula Graha Telkom SKOMDA.\n\nSelain kompetisi, para guru pendamping dan siswa juga berkesempatan mengikuti open house laboratorium teknologi, mencoba simulator jaringan fiber optic, serta menyaksikan showcase karya software buatan siswa SMK Telkom Sidoarjo.",
			Author:        "Panitia Lomba SKOMDA",
		},
		{
			Title:         "Siswa XII SIJA 1 Raih Juara 3 FITCOM 3.0 di Universitas Dinamika Surabaya",
			Slug:          "siswa-xii-sija-1-raih-juara-3-fitcom-3-di-universitas-dinamika",
			Category:      "Prestasi",
			Day:           "17",
			Month:         "MEI",
			DateFormatted: "17 Mei 2025",
			Time:          "14.20",
			Image:         "/images/home/hero/image5.png",
			Summary:       "Prestasi membanggakan kembali diraih siswa kejuruan dalam kompetisi networking & cloud computing tingkat perguruan tinggi.",
			Content:       "Siswa kelas XII SIJA 1 SMK Telkom Sidoarjo menorehkan prestasi gemilang dengan meraih Juara 3 pada ajang FITCOM 3.0 yang diselenggarakan Fakultas Ilmu Terapan Universitas Dinamika Surabaya.\n\nDalam perlombaan ini, peserta diuji dalam perancangan arsitektur cloud server, konfigurasi routing switching skala enterprise, serta keamanan siber defensif. Keberhasilan ini membuktikan kurikulum berbasis industri di SKOMDA mampu bersaing di level perguruan tinggi.",
			Author:        "Tim Humas SKOMDA",
		},
		{
			Title:         "SKOMDA KUBIK 2025 Resmi Dibuka: SMK Telkom Sidoarjo Dorong Siswa Jadi Inovator Muda",
			Slug:          "skomda-kubik-2025-resmi-dibuka-smk-telkom-sidoarjo-dorong-siswa-jadi-inovator-muda",
			Category:      "Kegiatan Sekolah",
			Day:           "13",
			Month:         "MEI",
			DateFormatted: "13 Mei 2025",
			Time:          "08.45",
			Image:         "/images/home/hero/image6.png",
			Summary:       "Ajang tahunan inkubasi ide bisnis dan karya teknologi digital siswa dibuka secara meriah bersama praktisi industri teknologi.",
			Content:       "Program inkubasi inovasi tahunan SKOMDA KUBIK 2025 resmi dibuka hari ini. Melalui program ini, siswa diberikan mentoring intensif bersama praktisi startup teknologi terkemuka untuk mengubah ide proyek menjadi produk siap uji pasar.",
			Author:        "Tim Inkubator SKOMDA",
		},
		{
			Title:         "Kerjasama Strategis SMK Telkom Sidoarjo Bersama Jagoan Hosting & Markaz Design",
			Slug:          "kerjasama-strategis-smk-telkom-sidoarjo-bersama-jagoan-hosting-markaz-design",
			Category:      "Kemitraan & Kerja Sama",
			Day:           "10",
			Month:         "MEI",
			DateFormatted: "10 Mei 2025",
			Time:          "11.00",
			Image:         "/images/berita/news-thumb-1.png",
			Summary:       "Penandatanganan nota kesepahaman (MoU) kurikulum industri dan program magang bersertifikat untuk siswa SIJA dan TJAT.",
			Content:       "SMK Telkom Sidoarjo resmi menandatangani Nota Kesepahaman (MoU) kemitraan strategis dengan Jagoan Hosting dan Markaz Design untuk sinkronisasi kurikulum, guru tamu industri, serta penyaluran lulusan langsung kerja.",
			Author:        "Hubungan Industri SKOMDA",
		},
		{
			Title:         "Pengumuman Jadwal Asesmen Sumatif Akhir Semester Ganjil Tahun Ajaran 2025/2026",
			Slug:          "pengumuman-jadwal-asesmen-sumatif-akhir-semester-ganjil-2025-2026",
			Category:      "Pengumuman",
			Day:           "05",
			Month:         "MEI",
			DateFormatted: "05 Mei 2025",
			Time:          "08.00",
			Image:         "/images/home/hero/image1.png",
			Summary:       "Informasi teknis dan tata tertib pelaksanaan asesmen digital berbasis Computer-Based Test (CBT) bagi seluruh siswa kelas X, XI, dan XII.",
			Content:       "Diberitahukan kepada seluruh siswa-siswi SMK Telkom Sidoarjo bahwa Asesmen Sumatif Akhir Semester Ganjil akan diselenggarakan menggunakan platform ujian digital CBT sekolah.",
			Author:        "Kurikulum SKOMDA",
		},
		{
			Title:         "Karya Siswa: Inovasi Smart Greenhouse Berbasis IoT dan Cloud Computing SIJA",
			Slug:          "karya-siswa-inovasi-smart-greenhouse-berbasis-iot-cloud-computing-sija",
			Category:      "Karya & Inovasi Siswa",
			Day:           "02",
			Month:         "MEI",
			DateFormatted: "02 Mei 2025",
			Time:          "13.30",
			Image:         "/images/home/hero/image4.png",
			Summary:       "Sistem pemantauan iklim mikro tanaman otomatis karya siswa kelas XI yang terintegrasi dengan dashboard monitoring realtime.",
			Content:       "Siswa kelas XI SIJA menciptakan prototype Smart Greenhouse yang memadukan sensor kelembaban tanah, suhu, dan intensitas cahaya dengan kontrol otomatis pompa nutrisi hidroponik berbasis IoT.",
			Author:        "Lab IoT SKOMDA",
		},
		{
			Title:         "Tips Menghadapi Sertifikasi CCNA dan Cloud Architect untuk Siswa Kejuruan",
			Slug:          "tips-menghadapi-sertifikasi-ccna-dan-cloud-architect-untuk-siswa-smk",
			Category:      "Artikel & Edukasi",
			Day:           "28",
			Month:         "APR",
			DateFormatted: "28 Apr 2025",
			Time:          "15.00",
			Image:         "/images/home/hero/image5.png",
			Summary:       "Panduan praktis dan strategi belajar efektif untuk menembus ujian sertifikasi internasional di bidang telekomunikasi dan jaringan.",
			Content:       "Mendapatkan sertifikasi internasional seperti Cisco CCNA dan AWS Certified Cloud Practitioner membuka peluang karir global yang luas bagi lulusan SMK. Berikut panduan persiapan dan tips belajarnya.",
			Author:        "Guru Kejuruan TJAT",
		},
		{
			Title:         "Kisah Sukses Alumni SKOMDA: Bekerja Sebagai Software Engineer di Tech Startup Jakarta",
			Slug:          "kisah-sukses-alumni-skomda-bekerja-sebagai-software-engineer-tech-startup-jakarta",
			Category:      "Alumni",
			Day:           "25",
			Month:         "APR",
			DateFormatted: "25 Apr 2025",
			Time:          "16.30",
			Image:         "/images/program/profil-jurusan/charen.png",
			Summary:       "Cerita inspiratif alumni angkatan 2022 tentang perjalanan karir dari bangku SMK hingga dipercaya memimpin tim pengembang aplikasi.",
			Content:       "Charen, alumni SMK Telkom Sidoarjo angkatan 2022, membagikan kisahnya meniti karir dari siswa kejuruan hingga menjadi Software Engineer di perusahaan teknologi terkemuka di Jakarta.",
			Author:        "Ikatan Alumni SKOMDA",
		},
		{
			Title:         "Workshop Cyber Security Bersama Telkom University untuk Siswa Jurusan TJAT",
			Slug:          "workshop-cyber-security-bersama-telkom-university-siswa-tjat",
			Category:      "Kegiatan Sekolah",
			Day:           "21",
			Month:         "APR",
			DateFormatted: "21 Apr 2025",
			Time:          "10.00",
			Image:         "/images/berita/news-thumb-1.png",
			Summary:       "Pelatihan praktis pertahanan siber dan pengujian penetrasi sistem jaringan komputer dipandu langsung oleh dosen Tel-U.",
			Content:       "Siswa jurusan Teknik Jaringan Akses Telekomunikasi mengikuti workshop intensif tentang dasar-dasar ethical hacking, enkripsi data jaringan, dan firewall security bersama dosen Telkom University.",
			Author:        "Tim Humas SKOMDA",
		},
		{
			Title:         "Pelepasan Siswa Prakerin Industri Angkatan 2025 ke 30+ Perusahaan Mitra Nasional",
			Slug:          "pelepasan-siswa-prakerin-industri-angkatan-2025-ke-30-perusahaan-mitra",
			Category:      "Kemitraan & Kerja Sama",
			Day:           "18",
			Month:         "APR",
			DateFormatted: "18 Apr 2025",
			Time:          "09.30",
			Image:         "/images/home/hero/image6.png",
			Summary:       "Kepala Sekolah melepas 180 siswa untuk mengikuti program Praktik Kerja Industri selama 6 bulan di berbagai kota metropolitan.",
			Content:       "Sebanyak 180 siswa SMK Telkom Sidoarjo resmi dilepas untuk melaksanakan Praktik Kerja Industri (Prakerin) di lebih dari 30 perusahaan mitra BUMN dan swasta nasional.",
			Author:        "Hubungan Industri SKOMDA",
		},
	}

	for _, n := range initialNews {
		if err := db.Create(&n).Error; err != nil {
			log.Printf("peringatan: gagal seed berita '%s': %v", n.Title, err)
		}
	}
	log.Println("berhasil seed 12 data awal berita ke database.")
}
