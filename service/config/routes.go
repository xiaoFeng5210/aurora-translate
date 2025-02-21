package config

import (
	"translate-api/api"
	"translate-api/middleware"

	"github.com/gin-gonic/gin"
)

func Routes(r *gin.Engine) {

	v1 := r.Group("/api/v1")
	{
		v1.GET("/ping", api.Ping)

		/**
		* 翻译文本
		* @param source 源文本
		* @param trans_type 翻译类型
		* @param request_id 请求ID
		* @param detect 是否检测语言
		* @return target 翻译后的文本
		 */
		v1.POST("/translate/text", api.TranslateText)

		/**
		* 注册用户
		* @param username 用户名
		* @param password 密码
		* @return nil
		 */
		v1.POST("/register", api.Register)

		v1.POST("/login", api.Login)

		users := v1.Group("/users")
		{

			/**
			* 获取用户列表
			* @return users 用户列表
			 */
			users.GET("/all", api.GetUsers)
			/**
			* 创建用户
			* @param username 用户名
			* @param password 密码
			* @return nil
			 */
			users.POST("/", api.CreateUser)

			/**
			* 查询用户列表
			 */
			users.POST("/query", api.QueryUsers)
		}
	}

	// 需要认证的路由组
	authGroup := r.Group("/")

	authGroup.Use(middleware.JWT())
	{
		/**
		* 获取收藏列表
		* @return collections 收藏列表
		 */
		authGroup.GET("/api/v1/collections", api.GetCollections)

		/**
		* 添加收藏
		* @param source_text 源文本
		* @param target_text 目标文本
		* @return nil
		 */
		authGroup.POST("/api/v1/collections/add", api.AddCollection)

		/**
		* 删除收藏
		* @param id 收藏ID
		* @return nil
		 */
		authGroup.DELETE("/api/v1/collections/:id", api.DeleteCollectionItem)
	}
}
