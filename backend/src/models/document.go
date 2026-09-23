package models

import (
	"time"

	"gorm.io/gorm"
)

// Document merepresentasikan dokumen unduhan publik seperti SOP K3, regulasi, dan brosur PPDB.
type Document struct {
	ID            uint           `gorm:"primaryKey" json:"id"`
	Title         string         `gorm:"size:255;not null" json:"title"`
	Category      string         `gorm:"size:100;not null;index" json:"category"` // Unduh Informasi, Dokumen K3, Kurikulum
	FileURL       string         `gorm:"size:500;not null" json:"fileUrl"`
	FileSize      string         `gorm:"size:50" json:"fileSize"`
	FileType      string         `gorm:"size:50;default:'PDF'" json:"fileType"`
	Description   string         `gorm:"type:text" json:"description"`
	DownloadCount int            `gorm:"default:0" json:"downloadCount"`
	IsPublic      bool           `gorm:"default:true" json:"isPublic"`
	OrderIndex    int            `gorm:"default:0;index" json:"orderIndex"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}
