package api

import (
	"net/http"
	"translate-api/db"
	"translate-api/dto"
	"translate-api/utils"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

var testToken string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDAxMDYwNDIsImlhdCI6MTczOTg0Njg0MiwidXNlcm5hbWUiOiLlsI_puK3lrZAifQ.xj2UZ8DIYpJc8Q2gpiLW6RTZawhLAkDah_HDaIeOziI"

func CheckUserExists(username string) bool {
	var user dto.User
	db := db.GetDB()
	result := db.Where("username = ?", username).First(&user)
	if result.Error != nil {
		return false
	} else {
		return true
	}
}

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

	if CheckUserExists(req.Username) {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":     -1,
			"message":  "用户已存在",
			"errorMsg": "用户已存在",
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
		"data": &dto.UserResponse{
			ID:        user.ID,
			Username:  user.Username,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		},
	})
}

/**
* 查询用户列表
 */
func QueryUsers(c *gin.Context) {
	var req dto.QueryUsersRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":     -1,
			"message":  "解析查询用户请求参数失败",
			"errorMsg": err.Error(),
		})
		return
	}

	db := db.GetDB()

	model := db.Model(&dto.User{})

	var users []dto.User

	if req.Username != "" {
		model = model.Where("username = ?", req.Username)
	}

	err := model.Limit(req.PageSize).Offset((req.Page - 1) * req.PageSize).Find(&users).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":     -1,
			"message":  "数据库查询错误",
			"errorMsg": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": 0,
		"data": &dto.UsersResponse{
			Users: toUsersMap(users),
		},
	})
}

// 获取用户列表
func GetUsers(c *gin.Context) {
	db := db.GetDB()
	var users []dto.User
	result := db.Raw("SELECT * FROM users").Scan(&users)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":     -1,
			"message":  "获取用户列表时查询数据库失败",
			"errorMsg": result.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": 0,
		"data": &dto.UsersResponse{
			Users: toUsersMap(users),
		},
	})
}

func toUsersMap(users []dto.User) []map[string]interface{} {
	usersData := make([]map[string]interface{}, len(users))
	for i, user := range users {
		usersData[i] = map[string]interface{}{
			"id":        user.ID,
			"username":  user.Username,
			"createdAt": user.CreatedAt,
			"updatedAt": user.UpdatedAt,
		}
	}
	return usersData
}
