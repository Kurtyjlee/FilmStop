package controllers

import (
	"strconv"

	"github.com/Kurtyjlee/photo-webapp/backend/database"
	"github.com/Kurtyjlee/photo-webapp/backend/middleware"
	"github.com/Kurtyjlee/photo-webapp/backend/models"
	"github.com/gofiber/fiber/v2"
)

func AllUsers(c *fiber.Ctx) error {

	// permissions middleware
	if err := middleware.IsAuthorised(c, "users"); err != nil {
		return err
	}

	// Paginated
	page, _ := strconv.Atoi(c.Query("page", "1"))

	return c.JSON(models.Paginate(database.DB, &models.User{}, page))
}

func CreateUser(c *fiber.Ctx) error {
	// permissions middleware
	if err := middleware.IsAuthorised(c, "users"); err != nil {
		return err
	}

	var data map[string]string

	// Getting user data from the body
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// Registering the user
	user := models.User{
		UserName: data["user_name"],
		Email:    data["email"],
		RoleId:   1, //Admin
	}
	user.SetPassword(data["password"])

	// inputting user into the database
	database.DB.Create(&user)

	return c.JSON(user)
}

func GetUser(c *fiber.Ctx) error {
	// permissions middleware
	if err := middleware.IsAuthorised(c, "users"); err != nil {
		return err
	}

	// Getting the id from the url
	id, _ := strconv.Atoi(c.Params("id"))

	user := models.User{
		Id: uint(id),
	}

	database.DB.Preload("Role").Find(&user)

	return c.JSON(user)
}

func UpdateUser(c *fiber.Ctx) error {
	// permissions middleware
	if err := middleware.IsAuthorised(c, "users"); err != nil {
		return err
	}

	id, _ := strconv.Atoi(c.Params("id"))

	user := models.User{
		Id: uint(id),
	}

	if err := c.BodyParser(&user); err != nil {
		return err
	}

	database.DB.Model(&user).Updates(user)

	database.DB.Preload("Role").Find(&user)

	return c.JSON(user)
}

func DeleteUser(c *fiber.Ctx) error {
	// permissions middleware
	if err := middleware.IsAuthorised(c, "users"); err != nil {
		return err
	}

	id, _ := strconv.Atoi(c.Params("id"))

	user := models.User{
		Id: uint(id),
	}

	database.DB.Delete(&user)

	return nil
}
