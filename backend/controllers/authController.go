// Registering
package controllers

import (
	"strconv"
	"time"

	"github.com/Kurtyjlee/photo-webapp/backend/database"
	"github.com/Kurtyjlee/photo-webapp/backend/entities"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
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

	// Hashing the password; Converting string to byte
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	// Registering the user
	user := entities.User{
		FirstName: data["first_name"],
		LastName:  data["last_name"],
		Email:     data["email"],
		Password:  password,
	}

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
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}

	timenow := time.Now().Add(time.Hour * 24)

	// Storing information of the user in jwt format
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.Id)),
		ExpiresAt: timenow.Unix(), // 1 day
	})

	// Generating jwt token
	token, err := claims.SignedString([]byte("secret"))

	if err != nil {
		c.SendStatus(fiber.StatusInternalServerError)
	}

	// cookie yum
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

type Claims struct {
	jwt.StandardClaims
}

// Authenticated user; User retrieved using cookies
func User(c *fiber.Ctx) error {

	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &Claims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})

	if err != nil || !token.Valid {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	// Casting the token.Claims with the Claims created above
	claims := token.Claims.(*Claims)

	// Returning the user
	var user entities.User

	database.DB.Where("Id = ?", claims.Issuer).First(&user)

	return c.JSON(user)
}
