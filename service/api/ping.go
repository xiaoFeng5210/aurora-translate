package api

import (
	"github.com/gin-gonic/gin"
)

func Ping(c *gin.Context) {
	test := []string{"test1", "test2"}

	// ... existing code ...

	c.JSON(200, gin.H{
		"message": test,
	})
}
