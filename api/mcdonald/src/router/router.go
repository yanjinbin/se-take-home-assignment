package router

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"mcdonald/src/conf"
	"mcdonald/src/service"
)

var svc *service.Service

func Init(cfg *conf.Config) {
	svc = service.New(cfg)
}

// RegisterRouter sets up and registers the API routes within the provided Gin RouterGroup.
func RegisterRouter(g *gin.RouterGroup) {
	bots := g.Group("bots")
	{
		bots.GET("", BotList)
		bots.POST("", AddBot)
		bots.DELETE(":id", DeleteBot)
	}

	orders := g.Group("orders")
	{
		orders.GET("", OrderList)
		orders.POST("", CreateOrder)
	}
}

// RegisterHealthRouter is register health check api.
func RegisterHealthRouter(r *gin.Engine) {
	r.GET("health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status":    "ok",
			"timestamp": time.Now(),
		})
	})
}
