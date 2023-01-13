package models

import (
	"gorm.io/gorm"
)

type Post struct {
	Id            uint        `json:"id"`
	Title         string      `json:"title"`
	Description   string      `json:"description"`
	Image         string      `json:"image"`
	TotalLikes    int         `json:"total_likes"`
	TotalComments int         `json:"total_comments"`
	UpdatedAt     string      `json:"updated_at"`
	CreatedAt     string      `json:"created_at"`
	UserId        uint        `json:"user_id"`                             //Users
	ThreadId      uint        `json:"thread_id"`                           //Threads
	Comments      []Comment   `json:"comments" gorm:"foreignKey:PostId"`   //Comments
	Likes         []PostLikes `json:"post_likes" gorm:"foreignKey:PostId"` //Likes
}

type PostLikes struct {
	Id     uint `json:"id"`
	UserId uint `json:"user_id"`
	User   User `json:"user" gorm:"foreignKey:UserId"`
	PostId uint `json:"post_id"`
}

// Required functions
func (post *Post) Count(db *gorm.DB) int64 {
	var total int64
	db.Model(&Post{}).Count(&total)
	return total
}

func (post *Post) Take(db *gorm.DB, limit int, offset int) interface{} {
	var posts []Post

	db.Preload("Comments").Offset(offset).Limit(limit).Find(&posts)

	return posts
}
