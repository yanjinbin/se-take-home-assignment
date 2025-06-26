package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"mcdonald/src/conf"
	"mcdonald/src/router"

	"github.com/gin-gonic/gin"
)

const (
	BaseURL = "/mcdonald/api"
)

var (
	port       int
	configPath string
)

// @title mcdonald Swagger API
// @version 1.0
// @description This is a documentation for mcdonald
// @termsOfService http://www.mcdonald.com/
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host https://www.mcdonald.com
// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
// @BasePath /mcdonald/api/v1.
func main() {
	flag.IntVar(&port, "p", 8080, "server port")
	flag.Parse()
	cfg, err := conf.LoadConfig(configPath)
	if err != nil {
		log.Fatalf("error：unable load config: %v", err)
	}
	router.Init(cfg)
	r := gin.New()
	r.Use(Cors())
	v1Router := r.Group(BaseURL).Group("/v1")
	router.RegisterRouter(v1Router)
	router.RegisterHealthRouter(r)

	srv := &http.Server{
		Addr:              fmt.Sprintf(":%d", port),
		Handler:           r,
		ReadHeaderTimeout: 10 * time.Second,
	}
	go func() {
		if err = srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("[Server] [Fatal] Server Start Fatal: %v", err)
		}
		log.Print("[Server] [Info] Server Start")
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Print("[Server] [Info]  Shutting Down Server...")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("[Server] [Fatal]  Server Forced To Shutdown: %v", err)
	}
	log.Print("[SERVER] [Info] Exiting")
	defer log.Print("[SERVER] [Info] Closed")
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin") // 请求头部

		if origin != "" {
			c.Header("Access-Control-Allow-Origin", "*")
			c.Header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE, PATCH")
			c.Header(
				"Access-Control-Allow-Headers",
				"Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site, Origin, X-Requested-With, Content-Type, Accept-Language, Connection, User-Agent, Referer, Accept, Authorization",
			)
			// 响应标头 Access-Control-Expose-Headers 允许服务器指示那些响应标头可以暴露给浏览器中运行的脚本，以响应跨源请求。
			// https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
			c.Header(
				"Access-Control-Expose-Headers",
				"Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type, Authorization",
			)
			c.Header("Access-Control-Allow-Credentials", "true")
			c.Header("Access-Control-Max-Age", "2592000")
		}
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
	}
}
