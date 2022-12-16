package controllers

import (
	"strconv"
	"time"

	"github.com/Kurtyjlee/photo-webapp/backend/database"
	"github.com/Kurtyjlee/photo-webapp/backend/entities"
	"github.com/Kurtyjlee/photo-webapp/backend/util"
	"github.com/gofiber/fiber/v2"
)

func Register(c *fiber.Ctx) error {
	var data map[string]string

	// Getting user data from the body
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// Check if passwords match
	if data["password"] != data["password_confirm"] {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "passwords do not match",
		})
	}

	// Registering the user
	user := entities.User{
		FirstName: data["first_name"],
		LastName:  data["last_name"],
		Email:     data["email"],
	}
	user.SetPassword(data["password"])

	// inputting user into the database
	database.DB.Create(&user)

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	// Getting user data from the body
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user entities.User

	database.DB.Where("email = ?", data["email"]).First(&user)

	// Check if user is found
	if user.Id == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}

	// Comparing passwords
	if err := user.ComparePassword(data["password"]); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}

	timenow := time.Now().Add(time.Hour * 24)

	// Generating jwt token
	token, err := util.GenerateJwt(strconv.Itoa(int(user.Id)))

	if err != nil {
		c.SendStatus(fiber.StatusInternalServerError)
	}

	// cookies
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  timenow,
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})

}

// Authenticated user; User retrieved using cookies
func User(c *fiber.Ctx) error {

	cookie := c.Cookies("jwt")

	id, _ := util.ParseJwt(cookie)

	// Returning the user
	var user entities.User

	database.DB.Where("Id = ?", id).First(&user)

	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	// Making the cookie expire
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
