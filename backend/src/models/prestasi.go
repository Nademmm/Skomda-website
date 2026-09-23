package models

import (
	"time"

	"gorm.io/gorm"
)

// Prestasi merepresentasikan data capaian juara dan penghargaan siswa SKOMDA.
type Prestasi struct {
	ID           uint           `gorm:"primaryKey" json:"id"`
	Slug         string         `gorm:"size:255;not null;uniqueIndex" json:"slug"`
	Title        string         `gorm:"size:255;not null" json:"title"`
	Category     string         `gorm:"size:50;not null;index" json:"category"` // IT & AI, Olahraga, Seni & Kreatif, Kepemimpinan
	Award        string         `gorm:"size:100;not null" json:"award"`
	BadgeLevel   string         `gorm:"size:50;not null" json:"badgeLevel"` // Juara 1, Juara 2, Juara 3, Gold Medal
	Competition  string         `gorm:"size:255;not null" json:"competition"`
	Organizer    string         `gorm:"size:255;not null" json:"organizer"`
	Year         string         `gorm:"size:10;not null;index" json:"year"`
	StudentName  string         `gorm:"size:150;not null" json:"studentName"`
	StudentClass string         `gorm:"size:50;not null" json:"studentClass"`
	Image        string         `gorm:"size:500" json:"image"`
	Description  string         `gorm:"type:text" json:"description"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}
