package models

import (
	"time"
)

// News merepresentasikan skema data berita/artikel di database.
type News struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	Title         string    `gorm:"size:255;not null" json:"title"`
	Slug          string    `gorm:"size:255;not null;uniqueIndex" json:"slug"`
	Category      string    `gorm:"size:100;not null" json:"category"`
	Day           string    `gorm:"size:10" json:"day"`
	Month         string    `gorm:"size:20" json:"month"`
	DateFormatted string    `gorm:"size:50" json:"dateFormatted"`
	Time          string    `gorm:"size:20" json:"time"`
	Image         string    `gorm:"size:500" json:"image"`
	Summary       string    `gorm:"type:text" json:"summary"`
	Content       string    `gorm:"type:text" json:"content"`
	Author        string    `gorm:"size:100;default:'Humas SKOMDA'" json:"author"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
