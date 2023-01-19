package models

import "gorm.io/gorm"

type Thread struct {
	Id    uint   `json:"id"`
	Name  string `json:"name"`
	Posts []Post `json:"posts" gorm:"foreignKey:ThreadId"`
}

// Required functions
func (thread *Thread) Count(db *gorm.DB) int64 {
	var total int64
	db.Model(&Thread{}).Count(&total)
	return total
}

func (thread *Thread) Take(db *gorm.DB, limit int, offset int, filterType int) interface{} {
	var threads []Thread

	db.Offset(offset).Limit(limit).Find(&threads)

	return threads
}
