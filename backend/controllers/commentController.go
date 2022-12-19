package controllers

import (
	"strconv"

	"github.com/Kurtyjlee/photo-webapp/backend/database"
	"github.com/Kurtyjlee/photo-webapp/backend/middleware"
	"github.com/Kurtyjlee/photo-webapp/backend/models"
	"github.com/gofiber/fiber/v2"
)

// Need CRUD operations for comments

func AllComments(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "comments"); err != nil {
		return err
	}
	// Paginated
	page, _ := strconv.Atoi(c.Query("page", "1"))

	return c.JSON(models.Paginate(database.DB, &models.Comment{}, page))
}
