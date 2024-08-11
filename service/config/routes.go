package config

import (
	"translate-api/api"

	"github.com/gin-gonic/gin"
)

func Routes(r *gin.Engine) {
	r.GET("/ping", api.Ping)
	r.POST("/translate/text", api.TranslateText)
}
