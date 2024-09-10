package main

import (
	"github.com/gorilla/mux"
)

// InitializeRouter sets up the routes for the API
func InitializeRouter() *mux.Router {
	router := mux.NewRouter()

	// Define API routes
	router.HandleFunc("/api/todos", getTodos).Methods("GET")
	router.HandleFunc("/api/todos", createTodo).Methods("POST")
	router.HandleFunc("/api/todos/{id}", updateTodo).Methods("PUT")
	router.HandleFunc("/api/todos/{id}", deleteTodo).Methods("DELETE")

	return router
}
