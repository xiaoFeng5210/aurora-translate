package api

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

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
	// 把拿到的req写到文件中
	// 指定文件名
	filename := "test.json"

	jsonData, err := json.Marshal(req)
	if err != nil {
		fmt.Println("json.Marshal failed, err:", err)
		return
	}

	writeData := []byte(string(jsonData))
	fmt.Printf("writeData: %v", writeData)
	err = os.WriteFile(filename, writeData, 0644)
	if err != nil {
		fmt.Println("write file failed, err:", err)
		return
	}

	c.JSON(200, gin.H{
		"code": 0,
		"data": req,
	})
}
