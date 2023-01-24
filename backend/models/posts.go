package models

import (
	"gorm.io/gorm"
)

type Post struct {
	Id            uint        `json:"id" gorm:"primaryKey"`
	Title         string      `json:"title"`
	Description   string      `json:"description"`
	Images        string    `json:"image"`
	TotalLikes    int         `json:"total_likes"`
	TotalComments int         `json:"total_comments"`
	UpdatedAt     string      `json:"updated_at"`
	CreatedAt     string      `json:"created_at"`
	UserId        uint        `json:"user_id"` //Users
	User          User        `json:"user" gorm:"foreignKey:UserId"`
	ThreadId      uint        `json:"thread_id"` //Threads
	Thread        Thread      `json:"thread" gorm:"foreignKey:ThreadId"`
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

func (post *Post) Take(db *gorm.DB, limit int, offset int, filterType int) interface{} {
	var posts []Post

	// Different filters for posts
	if filterType == 0 {
		db.Preload("Comments").Preload("Thread").Preload("User").Preload("Likes").Offset(offset).Limit(limit).Find(&posts)
	} else {
		db.Preload("Comments").Preload("Thread").Preload("User").Preload("Likes").Offset(offset).Limit(limit).Where("thread_id = ?", filterType).Find(&posts)
	}

	return posts
}
