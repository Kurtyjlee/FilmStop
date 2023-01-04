package usecases

import "github.com/Kurtyjlee/photo-webapp/backend/entities"

// Will GetAllTodos for this repository
type TodosRespository interface {
	GetAllTodos() ([]entities.Todo, error)
}
