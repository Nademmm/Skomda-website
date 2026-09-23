package api

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/nademmm/smktelkom-web/backend/src/api/middleware"
	"github.com/nademmm/smktelkom-web/backend/src/config"
	"github.com/nademmm/smktelkom-web/backend/src/models"
)

// registerCrudRoutes mendaftarkan seluruh endpoint CRUD untuk Guru, Prestasi, BKK, Ekskul, Fasilitas, Dokumen, dan Pengaturan.
func registerCrudRoutes(api fiber.Router, cfg config.Config) {
	authGuard := middleware.AuthMiddleware(cfg.JWTSecret)

	// ==================== 1. TEACHERS / GURU & STAF ====================
	teacherGroup := api.Group("/teachers")
	teacherGroup.Get("", func(c *fiber.Ctx) error {
		category := strings.TrimSpace(c.Query("category"))
		query := config.DB.Model(&models.Teacher{}).Order("order_index ASC, id ASC")
		if category != "" && !strings.EqualFold(category, "semua") {
			query = query.Where("LOWER(category) = ?", strings.ToLower(category))
		}
		var list []models.Teacher
		if err := query.Find(&list).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Gagal mengambil data guru"})
		}
		return c.JSON(fiber.Map{"data": list, "total": len(list)})
	})

	teacherGroup.Post("", authGuard, func(c *fiber.Ctx) error {
		var item models.Teacher
		if err := c.BodyParser(&item); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Payload tidak valid"})
		}
		if strings.TrimSpace(item.Name) == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Nama guru/staf wajib diisi"})
		}
		if err := config.DB.Create(&item).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Gagal menyimpan data guru"})
		}
		recordAudit(c, "CREATE", "teacher", fmt.Sprint(item.ID), fmt.Sprintf("Menambahkan guru: %s (%s)", item.Name, item.Role))
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Data guru berhasil ditambahkan", "data": item})
	})

	teacherGroup.Put("/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		var existing models.Teacher
		if err := config.DB.First(&existing, uint(id)).Error; err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Data guru tidak ditemukan"})
		}
		if err := c.BodyParser(&existing); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Payload tidak valid"})
		}
		existing.ID = uint(id)
		config.DB.Save(&existing)
		recordAudit(c, "UPDATE", "teacher", fmt.Sprint(existing.ID), fmt.Sprintf("Memperbarui profil guru: %s", existing.Name))
		return c.JSON(fiber.Map{"message": "Data guru berhasil diperbarui", "data": existing})
	})

	teacherGroup.Delete("/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		var existing models.Teacher
		if err := config.DB.First(&existing, uint(id)).Error; err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Data guru tidak ditemukan"})
		}
		config.DB.Delete(&existing)
		recordAudit(c, "DELETE", "teacher", fmt.Sprint(id), fmt.Sprintf("Menghapus data guru: %s", existing.Name))
		return c.JSON(fiber.Map{"message": "Data guru berhasil dihapus"})
	})

	// ==================== 2. PRESTASI SISWA ====================
	prestasiGroup := api.Group("/prestasi")
	prestasiGroup.Get("", func(c *fiber.Ctx) error {
		category := strings.TrimSpace(c.Query("category"))
		year := strings.TrimSpace(c.Query("year"))
		query := config.DB.Model(&models.Prestasi{}).Order("id DESC")
		if category != "" && !strings.EqualFold(category, "semua") {
			query = query.Where("LOWER(category) = ?", strings.ToLower(category))
		}
		if year != "" && !strings.EqualFold(year, "semua") {
			query = query.Where("year = ?", year)
		}
		var list []models.Prestasi
		if err := query.Find(&list).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Gagal mengambil data prestasi"})
		}
		return c.JSON(fiber.Map{"data": list, "total": len(list)})
	})

	prestasiGroup.Post("", authGuard, func(c *fiber.Ctx) error {
		var item models.Prestasi
		if err := c.BodyParser(&item); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Payload tidak valid"})
		}
		if strings.TrimSpace(item.Title) == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Judul prestasi wajib diisi"})
		}
		if strings.TrimSpace(item.Slug) == "" {
			item.Slug = slugify(item.Title)
		}
		if err := config.DB.Create(&item).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Gagal menyimpan prestasi"})
		}
		recordAudit(c, "CREATE", "prestasi", fmt.Sprint(item.ID), fmt.Sprintf("Menambahkan prestasi: %s (%s)", item.Title, item.Award))
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Data prestasi berhasil disimpan", "data": item})
	})

	prestasiGroup.Put("/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		var existing models.Prestasi
		if err := config.DB.First(&existing, uint(id)).Error; err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Data prestasi tidak ditemukan"})
		}
		if err := c.BodyParser(&existing); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Payload tidak valid"})
		}
		existing.ID = uint(id)
		config.DB.Save(&existing)
		recordAudit(c, "UPDATE", "prestasi", fmt.Sprint(existing.ID), fmt.Sprintf("Memperbarui prestasi: %s", existing.Title))
		return c.JSON(fiber.Map{"message": "Data prestasi berhasil diperbarui", "data": existing})
	})

	prestasiGroup.Delete("/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		var existing models.Prestasi
		if err := config.DB.First(&existing, uint(id)).Error; err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Data prestasi tidak ditemukan"})
		}
		config.DB.Delete(&existing)
		recordAudit(c, "DELETE", "prestasi", fmt.Sprint(id), fmt.Sprintf("Menghapus prestasi: %s", existing.Title))
		return c.JSON(fiber.Map{"message": "Data prestasi berhasil dihapus"})
	})

	// ==================== 3. BKK (BURSA KERJA & MITRA) ====================
	bkkGroup := api.Group("/bkk")
	bkkGroup.Get("/jobs", func(c *fiber.Ctx) error {
		status := strings.TrimSpace(c.Query("status"))
		query := config.DB.Model(&models.BKKJob{}).Order("id DESC")
		if status != "" && !strings.EqualFold(status, "semua") {
			query = query.Where("LOWER(status) = ?", strings.ToLower(status))
		}
		var list []models.BKKJob
		config.DB.Find(&list)
		return c.JSON(fiber.Map{"data": list, "total": len(list)})
	})

	bkkGroup.Post("/jobs", authGuard, func(c *fiber.Ctx) error {
		var item models.BKKJob
		if err := c.BodyParser(&item); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Payload tidak valid"})
		}
		config.DB.Create(&item)
		recordAudit(c, "CREATE", "bkk_job", fmt.Sprint(item.ID), fmt.Sprintf("Membuat lowongan: %s di %s", item.Title, item.Company))
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Lowongan kerja berhasil ditambahkan", "data": item})
	})

	bkkGroup.Put("/jobs/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		var existing models.BKKJob
		if err := config.DB.First(&existing, uint(id)).Error; err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Lowongan tidak ditemukan"})
		}
		c.BodyParser(&existing)
		existing.ID = uint(id)
		config.DB.Save(&existing)
		recordAudit(c, "UPDATE", "bkk_job", fmt.Sprint(id), fmt.Sprintf("Memperbarui lowongan: %s", existing.Title))
		return c.JSON(fiber.Map{"message": "Lowongan berhasil diperbarui", "data": existing})
	})

	bkkGroup.Delete("/jobs/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		var existing models.BKKJob
		if err := config.DB.First(&existing, uint(id)).Error; err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Lowongan tidak ditemukan"})
		}
		config.DB.Delete(&existing)
		recordAudit(c, "DELETE", "bkk_job", fmt.Sprint(id), fmt.Sprintf("Menghapus lowongan: %s", existing.Title))
		return c.JSON(fiber.Map{"message": "Lowongan berhasil dihapus"})
	})

	bkkGroup.Get("/partners", func(c *fiber.Ctx) error {
		var list []models.BKKPartner
		config.DB.Order("order_index ASC, id ASC").Find(&list)
		return c.JSON(fiber.Map{"data": list, "total": len(list)})
	})

	bkkGroup.Post("/partners", authGuard, func(c *fiber.Ctx) error {
		var item models.BKKPartner
		c.BodyParser(&item)
		config.DB.Create(&item)
		recordAudit(c, "CREATE", "bkk_partner", fmt.Sprint(item.ID), fmt.Sprintf("Menambahkan mitra industri: %s", item.Name))
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Mitra berhasil ditambahkan", "data": item})
	})

	bkkGroup.Put("/partners/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		var existing models.BKKPartner
		if err := config.DB.First(&existing, uint(id)).Error; err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Mitra tidak ditemukan"})
		}
		var input models.BKKPartner
		if err := c.BodyParser(&input); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Payload tidak valid"})
		}
		existing.Name = input.Name
		existing.Category = input.Category
		existing.Logo = input.Logo
		existing.Description = input.Description
		existing.Website = input.Website
		if input.OrderIndex > 0 {
			existing.OrderIndex = input.OrderIndex
		}
		config.DB.Save(&existing)
		recordAudit(c, "UPDATE", "bkk_partner", fmt.Sprint(existing.ID), fmt.Sprintf("Memperbarui mitra industri: %s", existing.Name))
		return c.JSON(fiber.Map{"message": "Mitra berhasil diperbarui", "data": existing})
	})

	bkkGroup.Delete("/partners/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		config.DB.Delete(&models.BKKPartner{}, uint(id))
		recordAudit(c, "DELETE", "bkk_partner", fmt.Sprint(id), "Menghapus mitra industri")
		return c.JSON(fiber.Map{"message": "Mitra berhasil dihapus"})
	})

	// ==================== 4. EKSTRAKURIKULER ====================
	ekskulGroup := api.Group("/ekskul")
	ekskulGroup.Get("", func(c *fiber.Ctx) error {
		var list []models.Ekstrakurikuler
		config.DB.Order("order_index ASC, id ASC").Find(&list)
		return c.JSON(fiber.Map{"data": list, "total": len(list)})
	})

	ekskulGroup.Post("", authGuard, func(c *fiber.Ctx) error {
		var item models.Ekstrakurikuler
		c.BodyParser(&item)
		if item.Slug == "" {
			item.Slug = slugify(item.Name)
		}
		config.DB.Create(&item)
		recordAudit(c, "CREATE", "ekskul", fmt.Sprint(item.ID), fmt.Sprintf("Menambahkan ekstrakurikuler: %s", item.Name))
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Ekstrakurikuler berhasil ditambahkan", "data": item})
	})

	ekskulGroup.Put("/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		var existing models.Ekstrakurikuler
		config.DB.First(&existing, uint(id))
		c.BodyParser(&existing)
		existing.ID = uint(id)
		config.DB.Save(&existing)
		recordAudit(c, "UPDATE", "ekskul", fmt.Sprint(id), fmt.Sprintf("Memperbarui ekstrakurikuler: %s", existing.Name))
		return c.JSON(fiber.Map{"message": "Ekstrakurikuler berhasil diperbarui", "data": existing})
	})

	ekskulGroup.Delete("/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		config.DB.Delete(&models.Ekstrakurikuler{}, uint(id))
		recordAudit(c, "DELETE", "ekskul", fmt.Sprint(id), "Menghapus ekstrakurikuler")
		return c.JSON(fiber.Map{"message": "Ekstrakurikuler berhasil dihapus"})
	})

	// ==================== 5. FASILITAS ====================
	fasilitasGroup := api.Group("/fasilitas")
	fasilitasGroup.Get("", func(c *fiber.Ctx) error {
		var list []models.Fasilitas
		config.DB.Order("order_index ASC, id ASC").Find(&list)
		return c.JSON(fiber.Map{"data": list, "total": len(list)})
	})

	fasilitasGroup.Post("", authGuard, func(c *fiber.Ctx) error {
		var item models.Fasilitas
		c.BodyParser(&item)
		config.DB.Create(&item)
		recordAudit(c, "CREATE", "fasilitas", fmt.Sprint(item.ID), fmt.Sprintf("Menambahkan fasilitas: %s", item.Name))
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Fasilitas berhasil ditambahkan", "data": item})
	})

	fasilitasGroup.Put("/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		var existing models.Fasilitas
		config.DB.First(&existing, uint(id))
		c.BodyParser(&existing)
		existing.ID = uint(id)
		config.DB.Save(&existing)
		recordAudit(c, "UPDATE", "fasilitas", fmt.Sprint(id), fmt.Sprintf("Memperbarui fasilitas: %s", existing.Name))
		return c.JSON(fiber.Map{"message": "Fasilitas berhasil diperbarui", "data": existing})
	})

	fasilitasGroup.Delete("/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		config.DB.Delete(&models.Fasilitas{}, uint(id))
		recordAudit(c, "DELETE", "fasilitas", fmt.Sprint(id), "Menghapus fasilitas")
		return c.JSON(fiber.Map{"message": "Fasilitas berhasil dihapus"})
	})

	// ==================== 6. DOKUMEN & REGULASI ====================
	docGroup := api.Group("/documents")
	docGroup.Get("", func(c *fiber.Ctx) error {
		category := strings.TrimSpace(c.Query("category"))
		query := config.DB.Model(&models.Document{}).Order("order_index ASC, id ASC")
		if category != "" && !strings.EqualFold(category, "semua") {
			query = query.Where("LOWER(category) = ?", strings.ToLower(category))
		}
		var list []models.Document
		query.Find(&list)
		return c.JSON(fiber.Map{"data": list, "total": len(list)})
	})

	docGroup.Post("", authGuard, func(c *fiber.Ctx) error {
		var item models.Document
		c.BodyParser(&item)
		config.DB.Create(&item)
		recordAudit(c, "CREATE", "document", fmt.Sprint(item.ID), fmt.Sprintf("Mengunggah dokumen: %s", item.Title))
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Dokumen berhasil disimpan", "data": item})
	})

	docGroup.Put("/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		var existing models.Document
		config.DB.First(&existing, uint(id))
		c.BodyParser(&existing)
		existing.ID = uint(id)
		config.DB.Save(&existing)
		recordAudit(c, "UPDATE", "document", fmt.Sprint(id), fmt.Sprintf("Memperbarui dokumen: %s", existing.Title))
		return c.JSON(fiber.Map{"message": "Dokumen berhasil diperbarui", "data": existing})
	})

	docGroup.Delete("/:id", authGuard, func(c *fiber.Ctx) error {
		id, _ := strconv.ParseUint(c.Params("id"), 10, 32)
		config.DB.Delete(&models.Document{}, uint(id))
		recordAudit(c, "DELETE", "document", fmt.Sprint(id), "Menghapus dokumen")
		return c.JSON(fiber.Map{"message": "Dokumen berhasil dihapus"})
	})

	// ==================== 7. SITE SETTINGS ====================
	settingsGroup := api.Group("/settings")
	settingsGroup.Get("", func(c *fiber.Ctx) error {
		var list []models.SiteSetting
		config.DB.Find(&list)
		settingsMap := make(map[string]string)
		for _, s := range list {
			settingsMap[s.Key] = s.Value
		}
		return c.JSON(fiber.Map{"data": list, "map": settingsMap})
	})

	settingsGroup.Put("/:key", authGuard, func(c *fiber.Ctx) error {
		key := strings.TrimSpace(c.Params("key"))
		var payload struct {
			Value string `json:"value"`
		}
		c.BodyParser(&payload)

		var item models.SiteSetting
		err := config.DB.Where("key = ?", key).First(&item).Error
		if err != nil {
			item = models.SiteSetting{Key: key, Value: payload.Value, UpdatedAt: time.Now()}
			config.DB.Create(&item)
		} else {
			item.Value = payload.Value
			item.UpdatedAt = time.Now()
			config.DB.Save(&item)
		}
		recordAudit(c, "UPDATE", "setting", key, fmt.Sprintf("Mengubah pengaturan %s: %s", key, payload.Value))
		return c.JSON(fiber.Map{"message": "Pengaturan berhasil diperbarui", "data": item})
	})
}

// recordAudit mencatat log aktivitas admin ke database
func recordAudit(c *fiber.Ctx, action, entity, entityID, details string) {
	userName, _ := c.Locals("user_name").(string)
	userID, _ := c.Locals("user_id").(uint)
	ip := c.IP()

	go func() {
		config.DB.Create(&models.AuditLog{
			UserID:    userID,
			UserName:  userName,
			Action:    action,
			Entity:    entity,
			EntityID:  entityID,
			Details:   details,
			IPAddress: ip,
			CreatedAt: time.Now(),
		})
	}()
}
