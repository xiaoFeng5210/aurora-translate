package dto

import "time"

/**
* 收藏表
 */
type Collection struct {
	ID       uint   `gorm:"primaryKey"`
	Username string `gorm:"not null;index"`

	SourceText string
	TargetText string

	SourceLang string
	TargetLang string

	CreatedAt time.Time
	UpdatedAt time.Time
}

// CollectionRequest 创建收藏的请求结构
type CollectionRequest struct {
	SourceText string `json:"sourceText" binding:"required"`
	TargetText string `json:"targetText" binding:"required"`
	SourceLang string `json:"sourceLang" binding:"required"`
	TargetLang string `json:"targetLang" binding:"required"`
}

// CollectionResponse 收藏列表的响应结构
type CollectionResponse struct {
	ID         uint      `json:"id"`
	SourceText string    `json:"sourceText"`
	TargetText string    `json:"targetText"`
	SourceLang string    `json:"sourceLang"`
	TargetLang string    `json:"targetLang"`
	CreatedAt  time.Time `json:"createdAt"`
}
