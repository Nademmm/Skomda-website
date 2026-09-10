// Package api menyediakan registrasi route berbasis Go Fiber.
// Menggunakan models GORM dan database yang sama persis dengan service Gin.
package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"gorm.io/gorm"

	"github.com/nademmm/smktelkom-web/backend/src/client/cloudinary"
	"github.com/nademmm/smktelkom-web/backend/src/config"
	"github.com/nademmm/smktelkom-web/backend/src/models"
)

// NewFiberApp menginisialisasi router Fiber beserta middleware dan seluruh route domain.
func NewFiberApp(cfg config.Config) *fiber.App {
	app := fiber.New(fiber.Config{
		AppName:      "SMK Telkom Sidoarjo API (Fiber Edition)",
		ServerHeader: "Fiber",
	})

	// Middleware
	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000,http://localhost:3001,http://localhost:4321,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:4321,http://127.0.0.1:5173",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization, X-Requested-With",
		AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS",
		AllowCredentials: true,
	}))

	cldClient, _ := cloudinary.NewClient(cfg.CloudinaryURL)

	api := app.Group("/api")

	// 1. Health check
	api.Get("/health", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":  "ok",
			"service": "smktelkom-web-backend",
			"engine":  "fiber-v2",
		})
	})

	// 2. Jurusan routes
	jurusanGroup := api.Group("/jurusan")
	jurusanGroup.Get("", func(c *fiber.Ctx) error {
		var list []models.Jurusan
		if err := config.DB.Find(&list).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Gagal mengambil data jurusan dari server",
			})
		}
		return c.JSON(fiber.Map{"data": list})
	})

	jurusanGroup.Get("/:slug", func(c *fiber.Ctx) error {
		slug := strings.TrimSpace(c.Params("slug"))
		if slug == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Parameter slug tidak boleh kosong",
			})
		}

		var item models.Jurusan
		err := config.DB.Where("LOWER(slug) = ?", strings.ToLower(slug)).First(&item).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
					"error": "Jurusan tidak ditemukan",
				})
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Terjadi kesalahan server saat mencari jurusan",
			})
		}
		return c.JSON(fiber.Map{"data": item})
	})

	// 3. News routes
	newsGroup := api.Group("/news")
	newsGroup.Get("", func(c *fiber.Ctx) error {
		category := strings.TrimSpace(c.Query("category"))
		search := strings.TrimSpace(c.Query("search"))

		query := config.DB.Model(&models.News{}).Order("id DESC")
		if category != "" && !strings.EqualFold(category, "semua") {
			query = query.Where("LOWER(category) = ?", strings.ToLower(category))
		}
		if search != "" {
			searchTerm := "%" + strings.ToLower(search) + "%"
			query = query.Where("LOWER(title) LIKE ? OR LOWER(summary) LIKE ? OR LOWER(content) LIKE ?", searchTerm, searchTerm, searchTerm)
		}

		var newsList []models.News
		if err := query.Find(&newsList).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Gagal mengambil data berita dari database",
			})
		}
		return c.JSON(fiber.Map{
			"data":  newsList,
			"total": len(newsList),
		})
	})

	newsGroup.Get("/:slug", func(c *fiber.Ctx) error {
		slug := strings.TrimSpace(c.Params("slug"))
		var item models.News
		err := config.DB.Where("LOWER(slug) = ?", strings.ToLower(slug)).First(&item).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
					"error": "Berita tidak ditemukan",
				})
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Terjadi kesalahan server saat mencari berita",
			})
		}
		return c.JSON(fiber.Map{"data": item})
	})

	newsGroup.Post("", func(c *fiber.Ctx) error {
		type NewsInput struct {
			Title         string `json:"title"`
			Slug          string `json:"slug"`
			Category      string `json:"category"`
			Day           string `json:"day"`
			Month         string `json:"month"`
			DateFormatted string `json:"dateFormatted"`
			Time          string `json:"time"`
			Image         string `json:"image"`
			Summary       string `json:"summary"`
			Content       string `json:"content"`
			Author        string `json:"author"`
		}

		var input NewsInput
		if err := c.BodyParser(&input); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Payload tidak valid",
			})
		}

		slug := strings.TrimSpace(input.Slug)
		if slug == "" {
			slug = slugify(input.Title)
		}

		now := time.Now()
		day := input.Day
		if day == "" {
			day = fmt.Sprintf("%02d", now.Day())
		}
		month := input.Month
		if month == "" {
			months := []string{"", "JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"}
			month = months[int(now.Month())]
		}
		dateFormatted := input.DateFormatted
		if dateFormatted == "" {
			monthsFull := []string{"", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"}
			dateFormatted = fmt.Sprintf("%d %s %d", now.Day(), monthsFull[int(now.Month())], now.Year())
		}
		timeStr := input.Time
		if timeStr == "" {
			timeStr = now.Format("15.04")
		}
		image := input.Image
		if image == "" {
			image = "/images/berita/news-thumb-1.png"
		}
		author := input.Author
		if author == "" {
			author = "Humas SKOMDA"
		}

		news := models.News{
			Title:         input.Title,
			Slug:          slug,
			Category:      input.Category,
			Day:           day,
			Month:         month,
			DateFormatted: dateFormatted,
			Time:          timeStr,
			Image:         image,
			Summary:       input.Summary,
			Content:       input.Content,
			Author:        author,
		}

		if err := config.DB.Create(&news).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Gagal menyimpan berita",
			})
		}
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"message": "Berita berhasil diterbitkan",
			"data":    news,
		})
	})

	newsGroup.Delete("/:id", func(c *fiber.Ctx) error {
		idParam := c.Params("id")
		id, err := strconv.ParseUint(idParam, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "ID berita tidak valid",
			})
		}
		result := config.DB.Delete(&models.News{}, uint(id))
		if result.Error != nil || result.RowsAffected == 0 {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Berita tidak ditemukan",
			})
		}
		return c.JSON(fiber.Map{"message": "Berita berhasil dihapus"})
	})

	// 4. Chatbot
	cbGroup := api.Group("/chatbot")
	cbGroup.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "ready",
			"engine": "fiber",
			"target": cfg.NexusRouterURL,
		})
	})
	cbGroup.Post("/message", func(c *fiber.Ctx) error {
		var req struct {
			Message string        `json:"message"`
			History []interface{} `json:"history"`
			Stream  bool          `json:"stream"`
			Model   string        `json:"model"`
		}
		if err := c.BodyParser(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Permintaan tidak valid: format data JSON salah.",
			})
		}
		trimmed := strings.TrimSpace(req.Message)
		if trimmed == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Pesan tidak boleh kosong.",
			})
		}

		if req.Model == "" {
			req.Model = "Emberock"
		}

		targetURL := strings.TrimRight(cfg.NexusRouterURL, "/") + "/api/v1/skomda/chat"
		forwardPayload, err := json.Marshal(map[string]interface{}{
			"message": req.Message,
			"history": req.History,
			"stream":  req.Stream,
			"model":   req.Model,
		})
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Gagal memproses data pesan.",
			})
		}

		httpReq, err := http.NewRequestWithContext(c.Context(), http.MethodPost, targetURL, bytes.NewBuffer(forwardPayload))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Gagal menghubungkan ke gateway AI.",
			})
		}

		httpReq.Header.Set("Content-Type", "application/json")
		httpReq.Header.Set("X-Agent-Name", "Skomda-Website-Bot")
		httpReq.Header.Set("X-Internal-Client", "skomda")
		httpReq.Header.Set("X-Virtual-Key", "vk-skomda")
		if req.Stream {
			httpReq.Header.Set("Accept", "text/event-stream")
		}

		client := &http.Client{
			Timeout: 45 * time.Second,
		}

		resp, err := client.Do(httpReq)
		if err != nil {
			log.Printf("[Fiber Chatbot] Gagal menghubungi NexusRouter di %s: %v", targetURL, err)
			return c.Status(fiber.StatusOK).JSON(fiber.Map{
				"response": "Mohon maaf, layanan asisten virtual sedang dalam pemeliharaan berkala.\n\nUntuk pertanyaan seputar PPDB 2026/2027 atau konsultasi jurusan SIJA & TJAT, silakan hubungi WhatsApp Humas resmi SMK Telkom Sidoarjo di 0811-3021-919 atau unduh brosur resmi di menu [Unduh Informasi](/unduh-informasi).",
				"sources": []fiber.Map{
					{
						"title":    "Unduh Brosur PPDB & Informasi",
						"url":      "/unduh-informasi",
						"category": "PPDB & Regulasi",
					},
				},
				"fallback": true,
			})
		}

		if req.Stream && strings.Contains(resp.Header.Get("Content-Type"), "text/event-stream") {
			c.Set("Content-Type", "text/event-stream")
			c.Set("Cache-Control", "no-cache")
			c.Set("Connection", "keep-alive")
			c.Context().SetBodyStream(resp.Body, -1)
			return nil
		}

		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Gagal membaca respons dari gateway AI.",
			})
		}

		c.Status(resp.StatusCode)
		c.Set("Content-Type", resp.Header.Get("Content-Type"))
		return c.Send(body)
	})

	// 5. Cloudinary Signed Upload
	api.Get("/cloudinary/sign", func(c *fiber.Ctx) error {
		if cldClient == nil || cldClient.CloudName == "" {
			return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{
				"error": "Cloudinary belum dikonfigurasi di server backend",
			})
		}
		folder := c.Query("folder", "skomda/uploads")
		params := cldClient.GetSignedUploadParams(folder)
		return c.JSON(fiber.Map{
			"data": params,
		})
	})

	return app
}

func slugify(s string) string {
	s = strings.ToLower(strings.TrimSpace(s))
	reg := regexp.MustCompile(`[^a-z0-9]+`)
	s = reg.ReplaceAllString(s, "-")
	return strings.Trim(s, "-")
}
