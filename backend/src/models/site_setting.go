package models

import (
	"time"
)

// SiteSetting menyimpan konfigurasi dinamis website (kontak, banner darurat, status PPDB).
type SiteSetting struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Key         string    `gorm:"size:100;not null;uniqueIndex" json:"key"`
	Value       string    `gorm:"type:text;not null" json:"value"`
	Category    string    `gorm:"size:50;not null;default:'general'" json:"category"` // general, ppdb, contact, announcement
	Description string    `gorm:"size:255" json:"description"`
	UpdatedAt   time.Time `json:"updated_at"`
}
