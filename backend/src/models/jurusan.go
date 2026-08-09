package models

import (
	"time"
)

// Jurusan merepresentasikan skema data jurusan di database.
type Jurusan struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	Kode          string    `gorm:"size:10;not null;uniqueIndex" json:"kode"`
	Nama          string    `gorm:"size:100;not null" json:"nama"`
	Slug          string    `gorm:"size:100;not null;uniqueIndex" json:"slug"`
	Deskripsi     string    `gorm:"type:text;not null" json:"deskripsi"`
	Skills        []string  `gorm:"serializer:json" json:"skills"`
	ProspekKarier []string  `gorm:"serializer:json" json:"prospek_karier"`
	Gambar        string    `gorm:"size:255" json:"gambar"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
