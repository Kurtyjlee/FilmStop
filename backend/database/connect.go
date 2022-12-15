package database

import (
	"github.com/Kurtyjlee/photo-webapp/backend/entities"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	db, err := gorm.Open(mysql.Open("root:password@/photo-webapp"), &gorm.Config{})

	if err != nil {
		panic("Could not connect to the db")
	}

	// To export the database
	DB = db

	db.AutoMigrate(&entities.User{})
}
