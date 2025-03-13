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
	r.Use(Cors())
	config.Routes(r)
	r.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-methods, Access-Control-Allow-Origin")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers")
		c.Header("Access-Control-Allow-Credentials", "true")

		// 处理OPTIONS请求
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
