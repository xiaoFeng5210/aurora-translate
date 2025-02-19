package db

import (
	"translate-api/dto"
	"translate-api/utils"

	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func DBConnect() (*gorm.DB, error) {
	logger := utils.GetLogger()
	dsn := "host=localhost user=xiaofeng password=12345678 dbname=translate-aurora port=5432 sslmode=disable TimeZone=Asia/Shanghai"

	dbCopy, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		logger.Error("连接数据库失败！", zap.Error(err))
		return nil, err
	}

	db = dbCopy

	logger.Info("连接数据库成功")

	// 这一步很关键，和数据库表进行同步
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
