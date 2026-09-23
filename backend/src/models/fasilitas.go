package models

import (
	"time"

	"gorm.io/gorm"
)

// Fasilitas merepresentasikan sarana dan prasarana kampus SMK Telkom Sidoarjo.
type Fasilitas struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	Name        string         `gorm:"size:200;not null" json:"name"`
	Category    string         `gorm:"size:100;not null;index" json:"category"` // Laboratorium & Komputer, Fasilitas Umum, Ruang Praktik TEFA
	Image       string         `gorm:"size:500;not null" json:"image"`
	Description string         `gorm:"type:text" json:"description"`
	Capacity    string         `gorm:"size:100" json:"capacity"`
	Features    string         `gorm:"type:text" json:"features"`
	OrderIndex  int            `gorm:"default:0;index" json:"orderIndex"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}
