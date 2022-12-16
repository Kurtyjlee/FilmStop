package models

import "gorm.io/gorm"

type Entity interface {
	// Required functions
	Count(db *gorm.DB) int64
	Take(db *gorm.DB, Limit int, offset int) interface{}
}
