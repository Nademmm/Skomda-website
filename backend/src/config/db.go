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

// SeedJurusanIfEmpty memasukkan data jurusan resmi (SIJA & TJAT) jika database kosong atau masih berisi data draft lama.
// Pada environment production, seeder ini DILEWATI demi keamanan agar data dummy tidak tayang ke publik.
func SeedJurusanIfEmpty(db *gorm.DB, env string) {
	if strings.EqualFold(env, "production") {
		log.Println("peringatan: database kosong pada environment production. Seeding data dummy DILEWATI demi keamanan.")
		return
	}

	// Hapus data draft lama (RPL, TKJ, MM, TT) jika masih ada di DB agar otomatis ter-update ke SIJA & TJAT
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
