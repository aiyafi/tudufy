# Tudufy - A Full-Stack Todo Application

Tudufy is a full-stack Todo application built with Next.js for the frontend and Go for the backend. This project was created for learning purposes and to gain experience in full-stack development for internship preparation.

## Project Overview

This application allows users to create, read, update, and delete todo items. It demonstrates the integration of a modern React-based frontend with a Go-powered REST API backend.

## Technologies Used

- Frontend:
  - Next.js (React framework)
  - TypeScript
  - Tailwind CSS for styling
- Backend:
  - Go
  - Gorilla Mux for routing

## Getting Started

### Prerequisites

- Node.js and npm (for the frontend)
- Go 1.23.1 or later (for the backend)

### Running the Frontend

1. Navigate to the project root directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Running the Backend

1. Navigate to the `backend` directory
2. Run the Go server:
   ```bash
   go run .
   ```
3. The backend API will be available at `http://localhost:8080`

## Project Structure

- `/src`: Frontend source code
  - `/app`: Next.js app directory
  - `/components`: React components
  - `/lib`: Utility functions
- `/backend`: Go backend code
  - `main.go`: Entry point for the backend server
  - `handler.go`: API route handlers
  - `model.go`: Data models
  - `router.go`: API route definitions

## Features

- Create new todo items
- List all todo items
- Mark todos as completed
- Edit existing todos
- Delete todos

## Learning Objectives

This project serves as a practical exercise in:

1. Building a responsive frontend with Next.js and TypeScript
2. Implementing a RESTful API with Go
3. Integrating frontend and backend services
4. Managing state in a React application
5. Handling CORS and API requests