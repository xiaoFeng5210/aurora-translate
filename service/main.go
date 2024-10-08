package main

import (
	"translate-api/config"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	config.Routes(r)
	r.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080
}
