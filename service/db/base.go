package db

import (
	"fmt"
	"os"
	"translate-api/dto"
	"translate-api/utils"

	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func DBConnect() (*gorm.DB, error) {
	logger := utils.GetLogger()

	// 从环境变量获取数据库配置
	host := getEnv("DB_HOST", "localhost")
	user := getEnv("DB_USER", "xiaofeng")
	password := getEnv("DB_PASSWORD", "12345678")
	dbname := getEnv("DB_NAME", "translate-aurora")
	port := getEnv("DB_PORT", "5432")
	sslmode := getEnv("DB_SSLMODE", "disable")
	timezone := getEnv("DB_TIMEZONE", "Asia/Shanghai")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		host, user, password, dbname, port, sslmode, timezone)

	dbCopy, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		logger.Error("连接数据库失败！", zap.Error(err))
		return nil, err
	}

	db = dbCopy

	logger.Info("连接数据库成功")

	// *这一步很关键，和数据库表进行同步
	err = db.AutoMigrate(&dto.User{}, &dto.Collection{})
	if err != nil {
		logger.Error("auto migrate失败！", zap.Error(err))
		return nil, err
	}

	return db, nil
}

func GetDB() *gorm.DB {
	if db == nil {
		DBConnect()
	}
	return db
}

// 获取环境变量，如果不存在则返回默认值
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
