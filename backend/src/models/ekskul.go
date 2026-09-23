package models

import (
	"time"

	"gorm.io/gorm"
)

// Ekstrakurikuler merepresentasikan program kegiatan pengembangan bakat dan minat siswa.
type Ekstrakurikuler struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	Name        string         `gorm:"size:150;not null" json:"name"`
	Slug        string         `gorm:"size:150;not null;uniqueIndex" json:"slug"`
	Category    string         `gorm:"size:100;not null;index" json:"category"` // Olahraga, Seni & Budaya, Teknologi & Riset, Organisasi & Bela Negara
	Pembina     string         `gorm:"size:150" json:"pembina"`
	Schedule    string         `gorm:"size:150" json:"schedule"`
	Description string         `gorm:"type:text" json:"description"`
	Image       string         `gorm:"size:500" json:"image"`
	BadgeColor  string         `gorm:"size:50" json:"badgeColor"`
	OrderIndex  int            `gorm:"default:0;index" json:"orderIndex"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}
