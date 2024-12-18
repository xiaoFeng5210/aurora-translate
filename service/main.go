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
