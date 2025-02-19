package middleware

import (
	"net/http"
	"strings"
	"translate-api/utils"

	"github.com/gin-gonic/gin"
)

func JWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 从Header获取Authorization
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"code":    -1001,
				"message": "缺少认证令牌",
			})
			return
		}

		// 解析Bearer Token
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"code":    -1002,
				"message": "令牌格式错误",
			})
			return
		}

		// 验证令牌
		username, err := utils.ParseToken(parts[1])
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"code":    -1003,
				"message": "无效令牌",
				"error":   err.Error(),
			})
			return
		}

		// 将用户名存入上下文
		c.Set("username", username)
		c.Next()
	}
}
