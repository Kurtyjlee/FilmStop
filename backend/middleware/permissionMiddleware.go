package middleware

import (
	"errors"
	"strconv"

	"github.com/Kurtyjlee/photo-webapp/backend/database"
	"github.com/Kurtyjlee/photo-webapp/backend/models"
	"github.com/Kurtyjlee/photo-webapp/backend/util"
	"github.com/gofiber/fiber/v2"
)

func IsAuthorised(c *fiber.Ctx, page string) error {
	// Getting cookie
	cookie := c.Cookies("jwt")

	Id, err := util.ParseJwt(cookie)

	if err != nil {
		return err
	}

	userId, _ := strconv.Atoi(Id)

	user := models.User{
		Id: uint(userId),
	}

	// Getting user
	database.DB.Find(&user)

	role := models.Role{
		Id: user.RoleId,
	}

	// Getting role
	database.DB.Preload("Permissions").Find(&role)

	if c.Method() == "GET" {
		for _, permission := range role.Permissions {
			// If user can view or edit the page
			if permission.Name == "view_"+page || permission.Name == "edit_"+page {
				return nil
			}
		}
	} else {
		for _, permission := range role.Permissions {
			// If user can edit the page
			if permission.Name == "edit_"+page {
				return nil
			}
		}
	}

	// If user has no permissions
	c.Status(fiber.StatusUnauthorized)
	return errors.New("Unauthorised")

}
