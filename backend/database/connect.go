package database

import (
	"fmt"
	"os"

	"github.com/Kurtyjlee/photo-webapp/backend/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	envdb := os.Getenv("DB_DATABASE")
	username := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")

	// For the database
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", username, password, host, port, envdb)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Could not connect to the db")
	}

	// To export the database
	DB = db
	db.AutoMigrate(
		&models.Thread{},
		&models.Post{},
		&models.User{},
		&models.Role{},
		&models.Permission{},
		&models.Comment{},
		&models.CommentLikes{},
		&models.PostLikes{},
	)
}
