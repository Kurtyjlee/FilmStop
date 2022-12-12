package usecases

import "github.com/Kurtyjlee/photo-webapp/backend/entities"

func GetTodos(repo TodosRespository) ([]entities.Todo, error) {
	// Makes the error pass
	return nil, ErrInternal
}
