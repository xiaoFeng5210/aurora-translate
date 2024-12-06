package utils

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
)

// 新增：通用 HTTP 请求函数
func SendHTTPRequest(method, url string, body []byte, headers map[string]string) ([]byte, error) {
	req, err := http.NewRequest(method, url, bytes.NewBuffer(body))
	if err != nil {
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
