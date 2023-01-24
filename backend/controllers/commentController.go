package controllers

import (
	"strconv"

	"github.com/Kurtyjlee/photo-webapp/backend/database"
	"github.com/Kurtyjlee/photo-webapp/backend/middleware"
	"github.com/Kurtyjlee/photo-webapp/backend/models"
	"github.com/gofiber/fiber/v2"
)

func AllComments(c *fiber.Ctx) error {

	// Paginated
	page, _ := strconv.Atoi(c.Query("page", "1"))

	return c.JSON(models.Paginate(database.DB, &models.Comment{}, page, 0))
}

func CreateComment(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "comments"); err != nil {
		return err
	}
	var comment models.Comment

	if err := c.BodyParser(&comment); err != nil {
		return err
	}

	database.DB.Create(&comment)

	return c.JSON(comment)
}

func GetComment(c *fiber.Ctx) error {
	// Getting the id from the url
	id, _ := strconv.Atoi(c.Params("id"))

	comment := models.Comment{
		Id: uint(id),
	}

	database.DB.Find(&comment)

	return c.JSON(comment)
}

func UpdateComment(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "comments"); err != nil {
		return err
	}
	id, _ := strconv.Atoi(c.Params("id"))

	comment := models.Comment{
		Id: uint(id),
	}

	if err := c.BodyParser(&comment); err != nil {
		return err
	}

	database.DB.Model(&comment).Updates(comment)

	return c.JSON(comment)
}

func DeleteComment(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "comments"); err != nil {
		return err
	}
	id, _ := strconv.Atoi(c.Params("id"))

	comment := models.Comment{
		Id: uint(id),
	}

	database.DB.Delete(&comment)

	return nil
}
