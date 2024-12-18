package dto

import "time"

type User struct {
	ID        uint   `gorm:"primaryKey"`
	Username  string `gorm:"unique"`
	Password  string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type CreateUserRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
