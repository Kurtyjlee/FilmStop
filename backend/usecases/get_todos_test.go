package usecases_test

import (
	"fmt"
	"testing"

	"github.com/Kurtyjlee/photo-webapp/backend/entities"
	"github.com/Kurtyjlee/photo-webapp/backend/usecases"
)

// Dummy data
var dummyTodos = []entities.Todo{
	{
		Title:       "todo 1",
		Description: "Description of todo 1",
		IsCompleted: true,
	},
	{
		Title:       "todo 2",
		Description: "Hello world",
		IsCompleted: true,
	},
}

// For errors
type BadTodosRepo struct{}

func (BadTodosRepo) GetAllTodos() ([]entities.Todo, error) {
	// For learning: fmt.Errorf will return an unnamed error
	return nil, fmt.Errorf(("Something went wrong"))
}

// actual MockTodosRepo
type MockTodosRepo struct{}

func (MockTodosRepo) GetAllTodos() ([]entities.Todo, error) {
	// No error
	return dummyTodos, nil
}

func TestGetTodos(t *testing.T) {
	// test
	t.Run("Return ErrInternal when TodosRepository returns error", func(t *testing.T) {

		repo := new(BadTodosRepo)

		todos, err := usecases.GetTodos(repo)

		// Errors
		if err != usecases.ErrInternal {
			t.Fatalf("expected ErrInternal; Got: %v", err)
		}
		if todos != nil {
			t.Fatalf("Expected todos to be nil; Got: %v", todos)
		}
	})

	// test
	t.Run("Returns todos from TodosRepository", func(t *testing.T) {

		repo := new(MockTodosRepo)

		todos, err := usecases.GetTodos(repo)

		// Errors
		if err != nil {
			t.Fatalf("Expected err to be nil; Got %v", err)
		}
		// if todos not equal to dummyTodos
		if todos == nil {
			t.Fatalf("Expected todos from dummyTodos; Got %v", todos)
		}
	})
}
