package utils

import (
	"bytes"
	"fmt"
	"io"
	"net/http"

	"go.uber.org/zap"
)

// 新增：通用 HTTP 请求函数
func SendHTTPRequest(method, url string, body []byte, headers map[string]string) ([]byte, error) {
	logger := GetLogger()
	req, err := http.NewRequest(method, url, bytes.NewBuffer(body))
	if err != nil {
		logger.Error(
			"创建 HTTP 请求失败",
			zap.String("method", method),
			zap.String("url", url),
			zap.Error(err),
		)
		return nil, fmt.Errorf("创建 HTTP 请求失败: %w", err)
	}

	if len(headers) > 0 {
		for key, value := range headers {
			req.Header.Set(key, value)
		}
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		logger.Error(
			"发送 HTTP 请求失败",
			zap.String("method", method),
			zap.String("url", url),
			zap.Error(err),
		)
		return nil, fmt.Errorf("发送 HTTP 请求失败: %w", err)
	}
	defer resp.Body.Close()

	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		logger.Error(
			"读取响应失败",
			zap.String("method", method),
			zap.String("url", url),
			zap.Error(err),
		)
		return nil, fmt.Errorf("读取响应失败: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		logger.Error(
			"HTTP 请求失败",
			zap.String("method", method),
			zap.String("url", url),
			zap.Int("status_code", resp.StatusCode),
			zap.String("response", string(responseBody)),
		)
		return nil, fmt.Errorf("HTTP 请求失败，状态码: %d，响应: %s", resp.StatusCode, string(responseBody))
	}

	return responseBody, nil
}

/**
* 日志打印接口
 */
func LogApiRecord(path string, method int) {
	var methodStr string
	if method == 0 {
		methodStr = "收到请求"
	} else if method == 1 {
		methodStr = "返回响应"
	}
	logger := GetLogger()
	logger.Info(fmt.Sprintf("%s, 路径：%s", methodStr, path))
}
