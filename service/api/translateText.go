package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
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

// 新增：初始化函数，用于加载环境变量
func init() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("警告：加载 .env 文件失败，将使用系统环境变量")
	}
}

func TranslateText(c *gin.Context) {
	var req TranslationRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求数据"})
		return
	}

	caiyunReq := CaiyunRequest{
		Source:    req.Source,
		TransType: req.Direction,
		RequestID: "demo",
		Detect:    true,
	}

	apiToken := os.Getenv("API_TOKEN")
	if apiToken == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "API token 未设置"})
		return
	}

	caiyunRes, err := sendCaiyunRequest(caiyunReq, apiToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "彩云api翻译失败", "data": err.Error()})
		return
	}

	if len(caiyunRes.Target) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "翻译结果为空"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": 0,
		"data": caiyunRes.Target,
	})
}

func sendCaiyunRequest(req CaiyunRequest, apiToken string) (*CaiyunResponse, error) {
	jsonData, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("JSON 编码失败: %w", err)
	}

	headers := map[string]string{
		"Content-Type":    "application/json",
		"X-Authorization": "token " + apiToken,
	}

	responseBody, err := sendHTTPRequest("POST", apiURL, jsonData, headers)
	if err != nil {
		return nil, err
	}

	var caiyunRes CaiyunResponse
	if err := json.Unmarshal(responseBody, &caiyunRes); err != nil {
		return nil, fmt.Errorf("解析响应失败: %w", err)
	}

	return &caiyunRes, nil
}

// 新增：通用 HTTP 请求函数
func sendHTTPRequest(method, url string, body []byte, headers map[string]string) ([]byte, error) {
	req, err := http.NewRequest(method, url, bytes.NewBuffer(body))
	if err != nil {
		return nil, fmt.Errorf("创建 HTTP 请求失败: %w", err)
	}

	for key, value := range headers {
		req.Header.Set(key, value)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("发送 HTTP 请求失败: %w", err)
	}
	defer resp.Body.Close()

	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("读取响应失败: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("HTTP 请求失败，状态码: %d，响应: %s", resp.StatusCode, string(responseBody))
	}

	return responseBody, nil
}
