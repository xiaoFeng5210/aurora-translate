package dto

import "time"

/**
* 用户表
 */
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

type UserResponse struct {
	ID        uint      `json:"id"`
	Username  string    `json:"username"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type UsersResponse struct {
	Users []map[string]interface{} `json:"users"`
}

type QueryUsersRequest struct {
	Username string `json:"username"`
	Page     int    `json:"page"`
	PageSize int    `json:"page_size"`
}
