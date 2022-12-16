package routes

import (
	"github.com/Kurtyjlee/photo-webapp/backend/controllers"
	"github.com/Kurtyjlee/photo-webapp/backend/middleware"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	// Public routes
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)

	// Make sure that the user is authenticated for the pages below
	app.Use(middleware.IsAuthenticated)

	// Non-public routes
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)

	app.Get("/api/users", controllers.AllUsers)
	app.Post("/api/users", controllers.CreateUser)
	app.Get("/api/users/:id", controllers.GetUser)
	app.Put("/api/users/:id", controllers.UpdateUser)
	app.Delete("/api/users/:id", controllers.DeleteUser)
}
