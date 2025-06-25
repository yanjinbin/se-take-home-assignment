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
