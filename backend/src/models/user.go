package models

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// User merepresentasikan akun administrator atau editor pada sistem panel admin.
type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `gorm:"size:100;not null" json:"name"`
	Email     string         `gorm:"size:150;not null;uniqueIndex" json:"email"`
	Password  string         `gorm:"size:255;not null" json:"-"`
	Role      string         `gorm:"size:50;not null;default:'editor'" json:"role"` // super_admin | editor
	Avatar    string         `gorm:"size:500" json:"avatar"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

// SetPassword mengenkripsi kata sandi menggunakan bcrypt dengan cost 12.
func (u *User) SetPassword(plainPassword string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(plainPassword), 12)
	if err != nil {
		return err
	}
	u.Password = string(bytes)
	return nil
}

// CheckPassword memvalidasi kata sandi plain dengan hash bcrypt yang tersimpan.
func (u *User) CheckPassword(plainPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(plainPassword))
	return err == nil
}
