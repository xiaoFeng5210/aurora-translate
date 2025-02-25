package api

import (
	"net/http"
	"translate-api/db"
	"translate-api/dto"
	"translate-api/utils"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

// CollectionQuery 查询参数结构
type CollectionQuery struct {
	PageSize   int    `form:"pageSize,default=10"`  // 每页数量，默认10
	PageNumber int    `form:"pageNumber,default=1"` // 页码，默认0
	Keyword    string `form:"keyword" `             // 搜索关键词(可选)
	SourceLang string `form:"sourceLang" `          // 源语言(可选)
	TargetLang string `form:"targetLang" `          // 目标语言(可选)
}

// GetCollections 获取收藏列表
func GetCollections(c *gin.Context) {
	logger := utils.GetLogger()
	var query CollectionQuery

	// 解析 URL 查询参数
	if err := c.ShouldBindQuery(&query); err != nil {
		logger.Error("解析查询参数失败", zap.Error(err))
		c.JSON(http.StatusBadRequest, gin.H{
			"code":     -1004,
			"message":  "用户名是必填参数",
			"errorMsg": err.Error(),
		})
		return
	}

	// 直接获取中间件设置的 username
	username := c.GetString("username")

	// 构建查询
	db := db.GetDB()
	baseQuery := db.Model(&dto.Collection{}).Where("username = ?", username)

	// 其他可选条件
	if query.Keyword != "" {
		keyword := "%" + query.Keyword + "%"
		baseQuery = baseQuery.Where(
			db.Where("source_text LIKE ?", keyword).
				Or("target_text LIKE ?", keyword),
		)
	}
	if query.SourceLang != "" {
		baseQuery = baseQuery.Where("source_lang = ?", query.SourceLang)
	}
	if query.TargetLang != "" {
		baseQuery = baseQuery.Where("target_lang = ?", query.TargetLang)
	}

	// 获取总数
	var total int64
	if err := baseQuery.Count(&total).Error; err != nil {
		logger.Error("查询总数失败", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":     -1005,
			"message":  "查询总数失败, 数据库查询错误",
			"errorMsg": err.Error(),
		})
		return
	}

	// 分页查询
	var collections []dto.Collection
	offset := (query.PageNumber - 1) * query.PageSize
	if err := baseQuery.
		Offset(offset).
		Limit(query.PageSize).
		Order("created_at DESC").
		Find(&collections).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":     -1005,
			"message":  "查询收藏列表失败, 数据库查询错误",
			"errorMsg": err.Error(),
		})
		return
	}

	// 转换为响应结构
	var response []dto.CollectionResponse
	for _, collection := range collections {
		response = append(response, dto.CollectionResponse{
			ID:         collection.ID,
			SourceText: collection.SourceText,
			TargetText: collection.TargetText,
			SourceLang: collection.SourceLang,
			TargetLang: collection.TargetLang,
			CreatedAt:  collection.CreatedAt,
		})
	}

	if len(response) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"code": 0,
			"data": gin.H{
				"total": total,
				"list":  []dto.CollectionResponse{},
			},
		})
		return
	}

	// 返回结果
	c.JSON(http.StatusOK, gin.H{
		"code": 0,
		"data": gin.H{
			"total": total,
			"list":  response,
		},
	})
}

// AddCollection 添加收藏
func AddCollection(c *gin.Context) {
	logger := utils.GetLogger()
	var req dto.CollectionRequest

	// 解析请求参数
	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Error("解析请求参数失败", zap.Error(err))
		c.JSON(http.StatusBadRequest, gin.H{
			"code":     -1004,
			"message":  "解析请求参数失败",
			"errorMsg": err.Error(),
		})
		return
	}

	// 直接获取中间件设置的 username
	username := c.GetString("username")

	// 使用 username 创建收藏记录
	collection := dto.Collection{
		Username:   username,
		SourceText: req.SourceText,
		TargetText: req.TargetText,
		SourceLang: req.SourceLang,
		TargetLang: req.TargetLang,
	}

	// 检查是否已经收藏过相同的内容
	db := db.GetDB()
	var existingCollection dto.Collection
	err := db.Where("username = ? AND source_text = ? AND target_text = ?",
		collection.Username, collection.SourceText, collection.TargetText).
		First(&existingCollection).Error

	if err == nil {
		// 已经存在相同的收藏
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    -1,
			"message": "该内容已收藏",
		})
		return
	} else if err != gorm.ErrRecordNotFound {
		// 数据库查询出错
		logger.Error("查询收藏记录失败", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":     -1005,
			"message":  "查询收藏记录失败",
			"errorMsg": err.Error(),
		})
		return
	}

	// 保存收藏记录
	if err := db.Create(&collection).Error; err != nil {
		logger.Error("保存收藏记录失败", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":     -1005,
			"message":  "保存收藏记录失败",
			"errorMsg": err.Error(),
		})
		return
	}

	// 返回成功
	c.JSON(http.StatusOK, gin.H{
		"code": 0,
		"data": &dto.CollectionResponse{
			SourceText: collection.SourceText,
			TargetText: collection.TargetText,
			SourceLang: collection.SourceLang,
			TargetLang: collection.TargetLang,
			CreatedAt:  collection.CreatedAt,
		},
	})
}

func UpdateCollectionTranslation(c *gin.Context) {
	var req dto.UpdateCollectionTranslationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":     -1004,
			"message":  "请求参数错误",
			"errorMsg": err.Error(),
		})
	}
	if req.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    -1004,
			"message": "请求参数没有id",
		})
		return
	}
	username := c.GetString("username")
	db := db.GetDB()
	if err := db.Model(&dto.Collection{}).Where("username = ? AND id = ?", username, req.ID).Update("target_text", req.TargetText).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":     -1005,
			"message":  "更新收藏记录失败",
			"errorMsg": err.Error(),
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": "更新收藏记录成功",
	})
}

func DeleteCollectionItem(c *gin.Context) {
	// 拿到ID
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    -1004,
			"message": "请求参数没有id",
		})
		return
	}

	username := c.GetString("username")
	db := db.GetDB()
	if err := db.Where("username = ? AND id = ?", username, id).Delete(&dto.Collection{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":     -1005,
			"message":  "数据库删除收藏记录失败",
			"errorMsg": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": "删除收藏记录成功",
	})
}
