package controllers

import "github.com/gofiber/fiber/v2"

func UploadImage(c *fiber.Ctx) error {
	// form data request for images
	form, err := c.MultipartForm()

	if err != nil {
		return err
	}

	files := form.File["image"]
	filename := ""

	// Saving the files into the uploads dir
	for _, file := range files {
		filename = file.Filename

		if err := c.SaveFile(file, "./uploads/"+filename); err != nil {
			return err
		}

	}
	// return url of the file
	return c.JSON(fiber.Map{
		"url": "http://localhost:3000/api/uploads/image/" + filename,
	})
}
