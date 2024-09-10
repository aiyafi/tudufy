package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// Todo struct represents a todo item
type Todo struct {
	ID        int    `json:"id"`
	Text      string `json:"text"`
	Completed bool   `json:"completed"`
}

// getTodos handles GET requests and returns all todos.
func getTodos(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(todos)
}

// createTodo handles POST requests and adds a new todo.
func createTodo(w http.ResponseWriter, r *http.Request) {
	var newTodo Todo
	json.NewDecoder(r.Body).Decode(&newTodo)
	newTodo.ID = len(todos) + 1
	todos = append(todos, newTodo)
	json.NewEncoder(w).Encode(newTodo)
}

// updateTodo handles PUT requests and updates an existing todo.
func updateTodo(w http.ResponseWriter, r *http.Request) {
	var updatedTodo Todo
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	json.NewDecoder(r.Body).Decode(&updatedTodo)

	for i, todo := range todos {
		if todo.ID == id {
			todos[i].Text = updatedTodo.Text
			todos[i].Completed = updatedTodo.Completed
			json.NewEncoder(w).Encode(todos[i])
			return
		}
	}

	http.Error(w, "Todo not found", http.StatusNotFound)
}

// deleteTodo handles DELETE requests and removes a todo by ID.
func deleteTodo(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	for i, todo := range todos {
		if todo.ID == id {
			todos = append(todos[:i], todos[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}

	http.Error(w, "Todo not found", http.StatusNotFound)
}
