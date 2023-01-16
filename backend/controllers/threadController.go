package controllers

import (
	"strconv"

	"github.com/Kurtyjlee/photo-webapp/backend/database"
	"github.com/Kurtyjlee/photo-webapp/backend/middleware"
	"github.com/Kurtyjlee/photo-webapp/backend/models"
	"github.com/gofiber/fiber/v2"
)

func AllThreads(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "threads"); err != nil {
		return err
	}

	// Paginated
	page, _ := strconv.Atoi(c.Query("page", "1"))

	return c.JSON(models.Paginate(database.DB, &models.Thread{}, page))
}

func CreateThread(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "threads"); err != nil {
		return err
	}
	var thread models.Thread

	if err := c.BodyParser(&thread); err != nil {
		return err
	}

	database.DB.Create(&thread)

	return c.JSON(thread)
}

func GetThread(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "threads"); err != nil {
		return err
	}
	// Getting the id from the url
	id, _ := strconv.Atoi(c.Params("id"))

	thread := models.Thread{
		Id: uint(id),
	}

	database.DB.Find(&thread)

	return c.JSON(thread)
}

func UpdateThread(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "threads"); err != nil {
		return err
	}
	id, _ := strconv.Atoi(c.Params("id"))

	thread := models.Thread{
		Id: uint(id),
	}

	if err := c.BodyParser(&thread); err != nil {
		return err
	}

	database.DB.Model(&thread).Updates(thread)

	return c.JSON(thread)
}

func DeleteThread(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "threads"); err != nil {
		return err
	}
	id, _ := strconv.Atoi(c.Params("id"))

	thread := models.Thread{
		Id: uint(id),
	}

	database.DB.Delete(&thread)

	return nil
}
