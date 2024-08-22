package api

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func Ping(c *gin.Context) {
	test := []string{"test1", "test2"}
	for i := 0; i < len(test); i++ {
		fmt.Println(test[i])
	}

	c.JSON(200, gin.H{
		"message": test,
	})
}
