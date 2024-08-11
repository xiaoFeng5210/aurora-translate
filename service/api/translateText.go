package api

import "github.com/gin-gonic/gin"

type TranslationRequest struct {
	Source    []string `json:"source"`
	Direction string   `json:"direction"`
}

func TranslateText(c *gin.Context) {
	var req TranslationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"code": 0,
		"data": req,
	})
}
