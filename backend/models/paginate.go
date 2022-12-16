package models

import (
	"math"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Paginate(db *gorm.DB, page int) fiber.Map {
	limit := 2
	offset := (page - 1) * limit // Allow the offset to start from 0
	var total int64

	var posts []Post

	// Getting data 5 at a time
	db.Offset(offset).Limit(limit).Find(&posts)
	// Getting the total number of posts
	db.Model(Post{}).Count(&total)

	return fiber.Map{
		"data": posts,
		"meta": fiber.Map{
			"total":     total,
			"page":      page,
			"last_page": math.Ceil((float64(total) / float64(limit))),
		},
	}
}
