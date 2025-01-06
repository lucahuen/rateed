const express = require("express");
const todoController = require("../controllers/todo-controllers");
const requestLogger = require("../middleware/logger-middleware");

const todoRouter = express.Router();

todoRouter.post("/create", requestLogger, todoController.createTodo);

todoRouter.get("/", requestLogger, todoController.getAllTodos);

todoRouter.delete("/:todoId", requestLogger, todoController.deleteTodo);

module.exports = todoRouter;
