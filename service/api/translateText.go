package api

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// 定义常量
const (
	apiURL = "http://api.interpreter.caiyunai.com/v1/translator"
)

type TranslationRequest struct {
	Source    []string `json:"source"`
	Direction string   `json:"direction"`
}

// CaiyunRequest 定义了发送给彩云API的请求结构
type CaiyunRequest struct {
	Source    []string `json:"source"`
	TransType string   `json:"trans_type"`
	RequestID string   `json:"request_id"`
	Detect    bool     `json:"detect"`
}

// CaiyunResponse 定义了彩云API响应的结构
type CaiyunResponse struct {
	Target []string `json:"target"`
}

func TranslateText(c *gin.Context) {
	var req TranslationRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// 准备发送给彩云API的请求
	caiyunReq := CaiyunRequest{
		Source:    req.Source,
		TransType: req.Direction,
		RequestID: "demo",
		Detect:    true,
	}
	apiToken := os.Getenv("API_TOKEN")

	jsonData, err := json.Marshal(caiyunReq)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	// 创建一个HTTP请求
	httpReq, err := http.NewRequest("POST", apiURL, bytes.NewBuffer(jsonData))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		log.Println("创建HTTP请求失败", err)
		return
	}

	log.Printf("token: %s", apiToken)

	httpReq.Header.Set("Content-Type", "application/json")
	httpReq.Header.Set("X-Authorization", "token "+apiToken)

	client := &http.Client{}
	res, err := client.Do(httpReq)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		log.Println("发送HTTP请求失败", err)
		return
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		log.Println("读取响应失败", err)
		return
	}

	var caiyunRes CaiyunResponse
	log.Println("响应内容", string(body))
	err = json.Unmarshal(body, &caiyunRes)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		log.Println("解析响应失败", err)
		return
	}
	log.Println("解析响应成功", caiyunRes)

	c.JSON(200, gin.H{
		"code": 0,
		"data": caiyunRes.Target,
	})
}
