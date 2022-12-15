package main

import (
	"log"

	"github.com/Kurtyjlee/photo-webapp/backend/database"
	"github.com/Kurtyjlee/photo-webapp/backend/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	// Connect to the database
	database.Connect()

	app := fiber.New()

	// Allow the front end to get cookies
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	// Setting up the route
	routes.Setup(app)

	log.Fatal(app.Listen(":3000"))
}
