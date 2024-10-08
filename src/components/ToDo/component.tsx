/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/iSoJ6PrbyhY
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

// Define the Todo type
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function Component() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  const fetchTodos = () => {
    fetch("http://localhost:8080/api/todos") // Update the port here
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        console.error("Failed to fetch todos:", err);
      });
  };
  
  const addTodo = () => {
    if (newTodo.trim()) {
      fetch("http://localhost:8080/api/todos", { // Update the port here
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTodo.trim(), completed: false }),
      })
        .then((res) => res.json())
        .then((newTodo) => {
          setTodos([...todos, newTodo]);
        })
        .catch((err) => console.error("Failed to add todo:", err));
      setNewTodo("");
    }
  };
  
  

  // Toggle todo (API call)
  const toggleTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id)
    if (todo) {
      fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todo, completed: !todo.completed }),
      })
        .then((res) => res.json())
        .then((updatedTodo) => {
          setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)))
        })
        .catch((err) => console.error("Failed to toggle todo:", err))
    }
  }

  // Delete a todo (API call)
  const deleteTodo = (id: number) => {
    fetch(`/api/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((err) => console.error("Failed to delete todo:", err))
  }

  const editTodo = (id: number, oldText: string) => {
    const newText = prompt("Edit your todo:", oldText); // Prompt for the new text
    if (newText && newText.trim()) {
      fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText.trim() }),
      })
        .then((res) => res.json())
        .then((updatedTodo) => {
          // Update the local state with the updated todo
          setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
        })
        .catch((err) => console.error("Failed to update todo:", err));
    }
  }


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md sticky top-0">
        <h1 className="text-2xl font-bold">Todo List</h1>
      </header>
      <main className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo()
                }
              }}
              className="w-full rounded-lg bg-muted px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
          </div>
          <div className="space-y-4">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center justify-between rounded-lg bg-muted px-4 py-3">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`text-lg font-medium ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {todo.text}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editTodo(todo.id, todo.text)} // Call the function here
                  >
                    <FilePenIcon className="w-5 h-5" />
                  </Button>

                  <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

// Icon components remain unchanged
function FilePenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
