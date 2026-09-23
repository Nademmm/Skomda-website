package models

import (
	"time"

	"gorm.io/gorm"
)

// Teacher merepresentasikan data profil guru, kepala sekolah, waka, dan staf tenaga kependidikan.
type Teacher struct {
	ID                 uint           `gorm:"primaryKey" json:"id"`
	Name               string         `gorm:"size:150;not null" json:"name"`
	Role               string         `gorm:"size:150;not null" json:"role"`
	Category           string         `gorm:"size:50;not null;index" json:"category"` // Kepala Sekolah, Manajemen, Guru SIJA, Guru TJAT, Guru Umum, Staf
	Image              string         `gorm:"size:500" json:"image"`
	Bio                string         `gorm:"type:text" json:"bio"`
	PendidikanTerakhir string         `gorm:"size:150" json:"pendidikanTerakhir"`
	BidangKeahlian     string         `gorm:"size:150" json:"bidangKeahlian"`
	Motto              string         `gorm:"size:255" json:"motto"`
	Kontak             string         `gorm:"size:100" json:"kontak"`
	OrderIndex         int            `gorm:"default:0;index" json:"orderIndex"`
	CreatedAt          time.Time      `json:"created_at"`
	UpdatedAt          time.Time      `json:"updated_at"`
	DeletedAt          gorm.DeletedAt `gorm:"index" json:"-"`
}
