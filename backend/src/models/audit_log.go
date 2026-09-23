package models

import (
	"time"
)

// AuditLog mencatat riwayat aktivitas mutasi data dan otentikasi di panel admin.
type AuditLog struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"index" json:"user_id"`
	UserName  string    `gorm:"size:100" json:"user_name"`
	Action    string    `gorm:"size:50;not null;index" json:"action"` // CREATE, UPDATE, DELETE, LOGIN, LOGOUT
	Entity    string    `gorm:"size:50;not null;index" json:"entity"` // news, teacher, prestasi, bkk, etc.
	EntityID  string    `gorm:"size:100" json:"entity_id"`
	Details   string    `gorm:"type:text" json:"details"`
	IPAddress string    `gorm:"size:50" json:"ip_address"`
	CreatedAt time.Time `gorm:"index" json:"created_at"`
}
