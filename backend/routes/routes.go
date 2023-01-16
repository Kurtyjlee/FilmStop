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
	app.Put("/api/user/info", controllers.UpdateInfo)
	app.Put("/api/user/password", controllers.UpdatePassword)

	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)

	app.Get("/api/users", controllers.AllUsers)
	app.Post("/api/users", controllers.CreateUser)
	app.Get("/api/users/:id", controllers.GetUser)
	app.Put("/api/users/:id", controllers.UpdateUser)
	app.Delete("/api/users/:id", controllers.DeleteUser)

	app.Get("/api/roles", controllers.AllRoles)
	app.Post("/api/roles", controllers.CreateRole)
	app.Get("/api/roles/:id", controllers.GetRole)
	app.Put("/api/roles/:id", controllers.UpdateRole)
	app.Delete("/api/roles/:id", controllers.DeleteRole)

	app.Get("/api/permissions", controllers.AllPermissions)

	app.Get("/api/posts", controllers.AllPosts)
	app.Post("/api/posts", controllers.CreatePost)
	app.Get("/api/posts/:id", controllers.GetPost)
	app.Put("/api/posts/:id", controllers.UpdatePost)
	app.Delete("/api/posts/:id", controllers.DeletePost)

	app.Post("/api/uploads/image", controllers.UploadImage)
	app.Static("/api/uploads/image", "./uploads") // Serve static files

	app.Get("/api/comments", controllers.AllComments)
	app.Post("/api/comments", controllers.CreateComment)
	app.Get("/api/comments/:id", controllers.GetComment)
	app.Put("/api/comments/:id", controllers.UpdateComment)
	app.Delete("/api/comments/:id", controllers.DeleteComment)
}
