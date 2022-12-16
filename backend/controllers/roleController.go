package controllers

import (
	"strconv"

	"github.com/Kurtyjlee/photo-webapp/backend/database"
	"github.com/Kurtyjlee/photo-webapp/backend/models"
	"github.com/gofiber/fiber/v2"
)

func AllRoles(c *fiber.Ctx) error {
	var roles []models.Role

	database.DB.Preload("Permissions").Find(&roles)

	return c.JSON(roles)
}

func CreateRole(c *fiber.Ctx) error {
	// Gives the Data Transfer Object
	var roleDTO fiber.Map

	if err := c.BodyParser(&roleDTO); err != nil {
		return err
	}

	// list of all permissions casted as a slice of interface
	list := roleDTO["permissions"].([]interface{})

	// array of length of the number of permissions
	permissions := make([]models.Permission, len(list))

	// Populating the permissions array; enumerated
	for i, permissionId := range list {
		id, _ := strconv.Atoi(permissionId.(string))

		permissions[i] = models.Permission{
			Id: uint(id),
		}
	}

	role := models.Role{
		Name:        roleDTO["name"].(string),
		Permissions: permissions,
	}

	database.DB.Create(&role)

	return c.JSON(role)
}

func GetRole(c *fiber.Ctx) error {
	// Getting the id from the url
	id, _ := strconv.Atoi(c.Params("id"))

	role := models.Role{
		Id: uint(id),
	}

	database.DB.Preload("Permissions").Find(&role)

	return c.JSON(role)
}

func UpdateRole(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var roleDTO fiber.Map

	if err := c.BodyParser(&roleDTO); err != nil {
		return err
	}

	// list of all permissions casted as a slice of interface
	list := roleDTO["permissions"].([]interface{})

	// array of length of the number of permissions
	permissions := make([]models.Permission, len(list))

	// Populating the permissions array; enumerated
	for i, permissionId := range list {
		id, _ := strconv.Atoi(permissionId.(string))

		permissions[i] = models.Permission{
			Id: uint(id),
		}
	}

	var result string

	// Delete the old row_permissions
	database.DB.Table("role_permissions").Where("role_id", id).Delete(&result)

	// Creating new role_permissions
	role := models.Role{
		Id:          uint(id),
		Name:        roleDTO["name"].(string),
		Permissions: permissions,
	}

	database.DB.Model(&role).Updates(role)

	return c.JSON(role)
}

func DeleteRole(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	role := models.Role{
		Id: uint(id),
	}

	database.DB.Delete(&role)

	return nil
}
