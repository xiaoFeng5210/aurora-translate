package api

import (
	"net/http"
	"translate-api/db"
	"translate-api/dto"
	"translate-api/utils"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

// 创建用户
func CreateUser(c *gin.Context) {
	logger := utils.GetLogger()

	var req dto.CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Error("解析创建用户请求参数失败", zap.Error(err))
		c.JSON(http.StatusBadRequest, gin.H{
			"code":     -1,
			"message":  "解析创建用户请求参数失败",
			"errorMsg": err.Error(),
		})
		return
	}

	user := &dto.User{
		Username: req.Username,
		Password: req.Password,
	}

	db := db.GetDB()
	res := db.Create(&user)
	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":     -1,
			"message":  "创建用户时写入数据库错误",
			"errorMsg": res.Error.Error(),
		})
		logger.Error("创建用户, 写入数据库失败", zap.Error(res.Error))
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": 0,
		"data": user,
	})
}
