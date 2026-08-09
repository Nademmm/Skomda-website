// Entry point service backend SMK Telkom Sidoarjo (Go/Gin).
// Jalankan lokal: go run ./src/cmd/server
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/nademmm/smktelkom-web/backend/src/api/health"
	"github.com/nademmm/smktelkom-web/backend/src/api/jurusan"
	"github.com/nademmm/smktelkom-web/backend/src/config"
)

func main() {
	cfg := config.Load()

	// Inisialisasi Database & Seeder
	config.InitDB(cfg)

	router := gin.Default()
	router.Use(corsMiddleware(cfg.AllowedOrigin))

	api := router.Group("/api")
	health.RegisterRoutes(api)
	jurusan.RegisterRoutes(api)

	log.Printf("backend jalan di port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("gagal menjalankan server: %v", err)
	}
}

// corsMiddleware mengizinkan request dari origin frontend Next.js saja.
func corsMiddleware(allowedOrigin string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", allowedOrigin)
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Header("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	}
}
