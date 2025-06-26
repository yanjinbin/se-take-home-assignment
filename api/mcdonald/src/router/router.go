package router

import (
	"net/http"
	"time"

	"mcdonald/src/conf"
	"mcdonald/src/service"

	"github.com/gin-gonic/gin"
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
	permits := g.Group("permits")
	{
		permits.GET("", PermitList)
	}
}

func PermitList(c *gin.Context) {
	permits := []string{
		"dashboard:view", "patient:view", "home:view", "staff:delete", "staff:approve", "staff:edit", "staff:view", "settings:view", "security:view",
	}
	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"data":    permits,
		"message": "success",
	})
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
