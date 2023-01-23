package controllers

import (
	"strconv"

	"github.com/Kurtyjlee/photo-webapp/backend/database"
	"github.com/Kurtyjlee/photo-webapp/backend/middleware"
	"github.com/Kurtyjlee/photo-webapp/backend/models"
	"github.com/gofiber/fiber/v2"
)

func AllPosts(c *fiber.Ctx) error {

	// Paginated
	page, _ := strconv.Atoi(c.Query("page", "1"))

	return c.JSON(models.Paginate(database.DB, &models.Post{}, page, 0))
}

func CreatePost(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "posts"); err != nil {
		return err
	}
	var post models.Post

	if err := c.BodyParser(&post); err != nil {
		return err
	}

	database.DB.Create(&post)

	return c.JSON(post)
}

func GetPost(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "posts"); err != nil {
		return err
	}
	// Getting the id from the url
	id, _ := strconv.Atoi(c.Params("id"))

	post := models.Post{
		Id: uint(id),
	}

	database.DB.Preload("Thread").Preload("Comments").Preload("Likes").Preload("User").Find(&post)

	return c.JSON(post)
}

func UpdatePost(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "posts"); err != nil {
		return err
	}
	id, _ := strconv.Atoi(c.Params("id"))

	post := models.Post{
		Id: uint(id),
	}

	if err := c.BodyParser(&post); err != nil {
		return err
	}

	database.DB.Model(&post).Updates(post)

	return c.JSON(post)
}

func DeletePost(c *fiber.Ctx) error {
	if err := middleware.IsAuthorised(c, "posts"); err != nil {
		return err
	}
	id, _ := strconv.Atoi(c.Params("id"))

	post := models.Post{
		Id: uint(id),
	}

	database.DB.Delete(&post)

	return nil
}

func FilterPost(c *fiber.Ctx) error {

	// Paginated
	page, _ := strconv.Atoi(c.Query("page", "1"))

	id, _ := strconv.Atoi(c.Params("id"))

	return c.JSON(models.Paginate(database.DB, &models.Post{}, page, id))

}
