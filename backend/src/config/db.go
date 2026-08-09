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
	if err := DB.AutoMigrate(&models.Jurusan{}); err != nil {
		log.Fatalf("fatal: gagal auto migrate database: %v", err)
	}

	// Seed data dummy jika tabel jurusan masih kosong
	SeedJurusanIfEmpty(DB, cfg.Env)

	return DB
}

// SeedJurusanIfEmpty memasukkan data dummy jurusan awal dari frontend/src/lib/data.ts jika database masih kosong.
// Pada environment production, seeder ini DILEWATI demi keamanan agar data dummy tidak tayang ke publik.
func SeedJurusanIfEmpty(db *gorm.DB, env string) {
	var count int64
	db.Model(&models.Jurusan{}).Count(&count)
	if count > 0 {
		return
	}

	if strings.EqualFold(env, "production") {
		log.Println("peringatan: database kosong pada environment production. Seeding data dummy DILEWATI demi keamanan.")
		return
	}

	log.Println("seeding data awal jurusan...")
	// TODO: konten asli dari sekolah — data di bawah masih draft
	dummyJurusan := []models.Jurusan{
		{
			Kode:          "RPL",
			Nama:          "Rekayasa Perangkat Lunak",
			Slug:          "rpl",
			Deskripsi:     "Membangun aplikasi web & mobile dari nol — dari desain sistem, pengembangan backend & frontend, hingga deployment industri.",
			Skills:        []string{"Pemrograman Web", "Basis Data", "Mobile Development", "DevOps Dasar"},
			ProspekKarier: []string{"Software Engineer", "Fullstack Developer", "Mobile App Developer", "Database Administrator"},
			Gambar:        "/images/jurusan/rpl.jpg",
		},
		{
			Kode:          "TKJ",
			Nama:          "Teknik Komputer & Jaringan",
			Slug:          "tkj",
			Deskripsi:     "Merancang, memasang, merawat infrastruktur jaringan enterprise, mengelola server cloud, dan mengamankan sistem komputer.",
			Skills:        []string{"Jaringan Komputer", "Administrasi Server", "Keamanan Siber Dasar", "Cloud Computing"},
			ProspekKarier: []string{"Network Engineer", "System Administrator", "Cloud Specialist", "Cyber Security Analyst"},
			Gambar:        "/images/jurusan/tkj.jpg",
		},
		{
			Kode:          "MM",
			Nama:          "Multimedia",
			Slug:          "mm",
			Deskripsi:     "Produksi konten visual kreatif, motion graphic, animasi 2D/3D, UI/UX design, dan video editing untuk industri digital & broadcast.",
			Skills:        []string{"Desain Grafis", "Videografi & Editing", "Motion Design", "UI/UX Design"},
			ProspekKarier: []string{"UI/UX Designer", "Motion Graphic Artist", "Video Editor", "Creative Content Creator"},
			Gambar:        "/images/jurusan/mm.jpg",
		},
		{
			Kode:          "TT",
			Nama:          "Teknik Telekomunikasi",
			Slug:          "tt",
			Deskripsi:     "Mempelajari sistem transmisi sinyal digital, teknologi komunikasi nirkabel (5G), jaringan fiber optik, dan infrastruktur telekomunikasi modern.",
			Skills:        []string{"Fiber Optik", "Sistem Transmisi", "Jaringan Seluler", "RF & Nirkabel"},
			ProspekKarier: []string{"Telecommunication Engineer", "Fiber Optic Specialist", "Drive Test Engineer", "Network Operation Center (NOC) Specialist"},
			Gambar:        "/images/jurusan/tt.jpg",
		},
	}

	for _, j := range dummyJurusan {
		if err := db.Create(&j).Error; err != nil {
			log.Printf("peringatan: gagal seed jurusan %s: %v", j.Kode, err)
		}
	}
	log.Println("berhasil seed data awal jurusan.")
}
