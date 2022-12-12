package usecases

import "github.com/Kurtyjlee/photo-webapp/backend/entities"

func GetTodos(repo TodosRespository) ([]entities.Todo, error) {
	todos, err := repo.GetAllTodos()
	if err != nil {
		return nil, ErrInternal
	}
	// Makes the error pass
	return todos, nil
}
