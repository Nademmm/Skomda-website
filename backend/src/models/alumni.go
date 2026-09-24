package models

import (
	"time"

	"gorm.io/gorm"
)

// Alumni merepresentasikan data kelulusan peserta didik SMK Telkom Sidoarjo.
type Alumni struct {
	ID              uint           `gorm:"primaryKey" json:"id"`
	NISN            string         `gorm:"size:50;index" json:"nisn"`
	Name            string         `gorm:"size:255;not null;index" json:"name"`
	Angkatan        string         `gorm:"size:20;not null;default:'6'" json:"angkatan"`
	TahunLulus      string         `gorm:"size:10;not null;default:'2024'" json:"tahunLulus"`
	TahunAjaran     string         `gorm:"size:20;not null;default:'2023/2024'" json:"tahunAjaran"`
	StatusKelulusan string         `gorm:"size:50;not null;default:'LULUS'" json:"statusKelulusan"`
	Kategori        string         `gorm:"size:50;not null;index" json:"kategori"` // Melanjutkan Studi, Bekerja, Wirausaha, Mencari Kerja, Alumni
	StatusAktivitas string         `gorm:"size:100" json:"statusAktivitas"`
	Keterangan      string         `gorm:"size:255" json:"keterangan"`
	Institusi       string         `gorm:"size:255" json:"institusi"`
	Jurusan         string         `gorm:"size:255" json:"jurusan"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"-"`
}
