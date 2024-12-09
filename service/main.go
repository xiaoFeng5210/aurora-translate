package main

import (
	"translate-api/config"

	"translate-api/utils"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {

	logger := utils.GetLogger()
	logger.Info("服务正在启动......")

	r := gin.Default()
	config.Routes(r)
	r.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080
}

func dbConnect() {
	logger := utils.GetLogger()
	dsn := "host=localhost user=xiaofeng password=12345678 dbname=translate-aurora port=5431 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		logger.Error("连接数据库失败！", zap.Error(err))
	}
	logger.Info("连接数据库成功")
}
