package ui_test

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"

	"github.com/Kurtyjlee/photo-webapp/backend/entities"
	"github.com/Kurtyjlee/photo-webapp/backend/ui"
)

// Testing the service
type MockService struct {
	err   error
	todos []entities.Todo
}

// s for service
func (s MockService) GetAllTodos() ([]entities.Todo, error) {
	if s.err != nil {
		return nil, s.err
	}
	return s.todos, nil
}

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

// For testing
type HTTPTest struct {
	name string

	service     *MockService
	inputMethod string
	inputURL    string

	expectedStatus int
	expectedTodos  []entities.Todo
}

// Actual test function‘
// For learning: read up on go's http package
func TestHTTP(t *testing.T) {

	tests := getTests()

	tests = append(tests, getDisallowedMethods()...)

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			testHTTP(t, test)
		})
	}
}

func testHTTP(t *testing.T, test HTTPTest) {
	// Mock response writer
	w := httptest.NewRecorder()
	r := httptest.NewRequest(test.inputMethod, test.inputURL, nil)

	server := ui.NewHTTP()

	server.UseService(test.service)

	server.ServeHTTP(w, r)

	// body for the todos
	var body []entities.Todo
	json.NewDecoder(w.Result().Body).Decode(&body)

	// Expects an error 500
	if w.Result().StatusCode != test.expectedStatus {
		t.Fatalf("Expected %v; got %v", test.expectedStatus, w.Result())
	}
	// Expecting the body to be the same as the test
	if !reflect.DeepEqual(body, test.expectedTodos) {
		t.Fatalf("Expected %v; got %v", test.expectedTodos, body)
	}
}

func getTests() []HTTPTest {
	return []HTTPTest{
		{
			name: "Random error gives 500 status and no todos",

			service:     &MockService{err: fmt.Errorf("something bad happened")},
			inputMethod: "GET",
			inputURL:    "http://mywebsite.com/todos/",

			expectedStatus: 500,
			expectedTodos:  nil,
		},
		{
			name: "wrong path gives 404 status and no todos",

			service:     &MockService{todos: dummyTodos},
			inputMethod: "GET",
			inputURL:    "http://mywebsite.com/foo",

			expectedStatus: 404,
		},
		// Success case
		{
			name: "Random error gives 500 status and no todos",

			service:     &MockService{err: fmt.Errorf("something bad happened")},
			inputMethod: "GET",
			inputURL:    "http://mywebsite.com/todos",

			expectedStatus: 500,
			expectedTodos:  nil,
		},
		{
			name: "Returns todos from service if no error",

			service:     &MockService{todos: dummyTodos},
			inputMethod: "GET",
			inputURL:    "http://mywebsite.com/todos/",

			expectedStatus: 200,
			expectedTodos:  dummyTodos,
		},
	}
}

func getDisallowedMethods() []HTTPTest {
	tests := []HTTPTest{}

	disallowedmethods := []string{
		http.MethodDelete,
		http.MethodHead,
		http.MethodOptions,
		http.MethodPatch,
		http.MethodPost,
		http.MethodPut,
	}

	// Put all methods into the array
	for _, method := range disallowedmethods {
		tests = append(tests, HTTPTest{
			name: fmt.Sprintf("Method %s gives 405 status and no todos", method),

			service:     &MockService{todos: dummyTodos},
			inputURL:    "http://mywebsite.com/todos/",
			inputMethod: method,

			expectedStatus: http.StatusMethodNotAllowed,
		})
	}

	return tests
}
