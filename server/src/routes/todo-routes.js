const express = require("express");
const todoController = require("../controllers/todo-controllers");
const requestLogger = require("../middleware/logger-middleware");

const todoRouter = express.Router();

todoRouter.post("/todos/create", requestLogger, todoController.createTodo);

todoRouter.get("/todos", requestLogger, todoController.getAllTodos);

todoRouter.delete("/todos/:todoId", requestLogger, todoController.deleteTodo);

module.exports = todoRouter;
