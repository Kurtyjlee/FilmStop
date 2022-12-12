package usecases_test

import (
	"fmt"
	"testing"

	"github.com/Kurtyjlee/photo-webapp/backend/entities"
	"github.com/Kurtyjlee/photo-webapp/backend/usecases"
)

type MockTodosRepo struct{}

func (MockTodosRepo) GetAllTodos() ([]entities.Todo, error) {
	// For learning: fmt.Errorf will return an unnamed error
	return nil, fmt.Errorf(("Something went wrong"))
}

func TestGetTodos(t *testing.T) {
	repo := new(MockTodosRepo)

	todos, err := usecases.GetTodos(repo)

	// Errors
	if err != usecases.ErrInternal {
		t.Fatalf("expected ErrInternal; Got: %v", err)
	}
	if todos != nil {
		t.Fatalf("Expected todos to be nil; Got: %v", todos)
	}
}
