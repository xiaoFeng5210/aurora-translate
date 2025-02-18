package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"translate-api/utils"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
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

func sendCaiyunRequest(req CaiyunRequest, apiToken string) (*CaiyunResponse, error) {
	logger := utils.GetLogger()
	jsonData, err := json.Marshal(req)
	if err != nil {
		logger.Error("JSON 编码失败", zap.Error(err))
		return nil, fmt.Errorf("JSON 编码失败: %w", err)
	}

	headers := map[string]string{
		"Content-Type":    "application/json",
		"X-Authorization": "token " + apiToken,
	}

	responseBody, err := utils.SendHTTPRequest("POST", apiURL, jsonData, headers)
	if err != nil {
		logger.Error("发送彩云api请求失败", zap.Error(err))
		return nil, err
	}

	var caiyunRes CaiyunResponse
	if err := json.Unmarshal(responseBody, &caiyunRes); err != nil {
		logger.Error("解析响应失败", zap.Error(err))
		return nil, fmt.Errorf("解析响应失败: %w", err)
	}
	return &caiyunRes, nil
}

func TranslateText(c *gin.Context) {
	logger := utils.GetLogger()
	startTime := time.Now() // 开始计时

	logger.Info(fmt.Sprintf("收到请求, 路径：%s", c.Request.URL.Path))
	var req TranslationRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Error("无效的请求数据", zap.Error(err))
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
		logger.Error("API token 未设置")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "API token 未设置"})
		return
	}

	caiyunRes, err := sendCaiyunRequest(caiyunReq, apiToken)
	if err != nil {
		logger.Error("彩云api翻译失败", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{"error": "彩云api翻译失败", "data": err.Error()})
		return
	}

	if len(caiyunRes.Target) == 0 {
		logger.Error("翻译结果为空")
		c.JSON(http.StatusBadRequest, gin.H{"error": "翻译结果为空"})
		return
	}

	duration := time.Since(startTime) // 计算耗时
	response := gin.H{
		"code": 0,
		"data": caiyunRes.Target,
	}

	logger.Info(fmt.Sprintf("翻译完成, 路径：%s, 耗时：%v",
		apiURL,
		duration,
		// response,
	))

	c.JSON(http.StatusOK, response)
}
