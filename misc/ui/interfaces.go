package ui

import "github.com/Kurtyjlee/photo-webapp/backend/entities"

type Service interface {
	GetAllTodos() ([]entities.Todo, error)
}
