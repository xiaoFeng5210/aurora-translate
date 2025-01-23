package api

import (
	"net/http"
	"translate-api/db"
	"translate-api/dto"
	"translate-api/utils"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func Register(c *gin.Context) {
	logger := utils.GetLogger()

	var req dto.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Error("解析注册请求参数失败", zap.Error(err))
		c.JSON(http.StatusBadRequest, gin.H{
			"code":     -1,
			"message":  "解析注册请求参数失败",
			"errorMsg": err.Error(),
		})
	}

	if CheckUserExists(req.Username) {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":     -1,
			"message":  "用户已存在",
			"errorMsg": "用户已存在",
		})
		return
	}

	// 创建用户之前，我就生成一个jwt吧
	token, err := utils.GenerateToken(req.Username)
	if err != nil {
		logger.Error("生成JWT令牌失败", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":     -1,
			"message":  "生成JWT令牌失败",
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
		logger.Error("创建用户时写入数据库失败", zap.Error(res.Error))
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":     -1,
			"message":  "创建用户时写入数据库失败",
			"errorMsg": res.Error.Error(),
		})
		return
	}
	// 返回token
	c.JSON(http.StatusOK, gin.H{
		"code": 0,
		"data": token,
	})
}
