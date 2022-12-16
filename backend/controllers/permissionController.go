package controllers

import (
	"github.com/Kurtyjlee/photo-webapp/backend/database"
	"github.com/Kurtyjlee/photo-webapp/backend/models"
	"github.com/gofiber/fiber/v2"
)

func AllPermissions(c *fiber.Ctx) error {
	var permissions []models.Permission

	database.DB.Find(&permissions)

	return c.JSON(permissions)
}
