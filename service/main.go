package main

import (
	"translate-api/config"
	"translate-api/db"

	"translate-api/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	logger := utils.GetLogger()
	logger.Info("服务正在启动......")

	db.GetDB()

	r := gin.Default()

	config.Routes(r)
	r.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		if origin != "" {
			c.Header("Access-Control-Allow-Origin", "http://localhost") // 可将将 * 替换为指定的域名
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
			c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
			c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type")
			c.Header("Access-Control-Allow-Credentials", "true")
		}
		c.Next()
	}
}
