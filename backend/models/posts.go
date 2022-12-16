package models

import "gorm.io/gorm"

type Post struct {
	Id          uint   `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image"`
	Likes       int    `json:"likes"`
}

func (post *Post) Count(db *gorm.DB) int64 {
	var total int64
	db.Model(&Post{}).Count(&total)
	return total
}

func (post *Post) Take(db *gorm.DB, limit int, offset int) interface{} {
	var posts []Post

	db.Offset(offset).Limit(limit).Find(&posts)

	return posts
}
