package ui

import (
	"encoding/json"
	"net/http"
	"regexp"
)

type HTTPServer struct {
	service Service
}

func NewHTTP() *HTTPServer {
	return &HTTPServer{}
}

func (server *HTTPServer) UseService(service Service) {
	server.service = service
}

func (server HTTPServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	verified := server.verifyRequest(w, r)
	if !verified {
		return
	}

	// Success case
	todos, err := server.service.GetAllTodos()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(todos)
}

func (HTTPServer) verifyRequest(w http.ResponseWriter, r *http.Request) bool {
	// For correct url
	match, _ := regexp.MatchString(r.URL.Path, "/todos/?")
	if !match {
		w.WriteHeader(http.StatusNotFound)
		return false
	}
	// For disallowed methods
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return false
	}
	return true
}
