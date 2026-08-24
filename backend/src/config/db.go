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
			Title:         "Tidak Sekadar Ziarah: Siswa SMK Telkom Sidoarjo Hidupkan Semangat Kepahlawanan di TMP",
			Slug:          "tidak-sekadar-ziarah-siswa-smk-telkom-sidoarjo-hidupkan-semangat-kepahlawanan-di-tmp",
			Category:      "Kegiatan Sekolah",
			Day:           "27",
			Month:         "MEI",
			DateFormatted: "27 Mei 2025",
			Time:          "12.30",
			Image:         "/figma/news-thumb-1.png",
			Summary:       "Dalam rangka memperingati hari bersejarah, siswa SMK Telkom Sidoarjo melaksanakan ziarah dan kegiatan edukatif di Taman Makam Pahlawan Kusuma Bangsa.",
			Content:       "Sidoarjo — Ratusan siswa-siswi SMK Telkom Sidoarjo (SKOMDA) bersama jajaran dewan guru menyelenggarakan kegiatan ziarah dan renungan kebangsaan di Taman Makam Pahlawan Kusuma Bangsa Sidoarjo.\n\nKegiatan ini bukan hanya seremoni tabur bunga semata, melainkan bagian dari pendidikan karakter dan penguatan Profil Pelajar Pancasila yang rutin diadakan sekolah. Para siswa diajak memahami pengorbanan para pahlawan dalam memperjuangkan kemerdekaan serta mengimplementasikan nilai integritas, kerja keras, dan kepemimpinan dalam era teknologi saat ini.\n\nKepala Sekolah SMK Telkom Sidoarjo menyampaikan bahwa generasi muda di bidang teknologi harus memiliki fondasi nasionalisme yang kokoh agar karya inovasi mereka selalu berorientasi pada kemaslahatan bangsa.",
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
			Image:         "/figma/image1.png",
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
			Image:         "/figma/image4.png",
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
			Image:         "/figma/image5.png",
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
			Image:         "/figma/image6.png",
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
			Image:         "/figma/news-thumb-1.png",
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
			Image:         "/figma/image1.png",
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
			Image:         "/figma/image4.png",
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
			Image:         "/figma/image5.png",
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
			Image:         "/figma/charen.png",
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
			Image:         "/figma/news-thumb-1.png",
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
			Image:         "/figma/image6.png",
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
