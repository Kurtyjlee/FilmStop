package usecases

import "github.com/Kurtyjlee/photo-webapp/backend/entities"

type TodosRespository interface {
	GetAllTodos() ([]entities.Todo, error)
}
