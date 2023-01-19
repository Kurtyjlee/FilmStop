package models

import (
	"math"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// Allows data to be paginated for better readability
func Paginate(db *gorm.DB, entity Entity, page int, filterType int) fiber.Map {
	limit := 5
	offset := (page - 1) * limit // Allow the offset to start from 0

	// Getting data from the entity
	data := entity.Take(db, limit, offset, filterType)
	// Getting the total number of posts
	total := entity.Count(db)

	return fiber.Map{
		"data": data,
		"meta": fiber.Map{
			"total":     total,
			"page":      page,
			"last_page": math.Ceil((float64(total) / float64(limit))),
		},
	}
}
