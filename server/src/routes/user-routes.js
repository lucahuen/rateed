const express = require("express");
const userController = require("../controllers/user-controllers");
const requestLogger = require("../middleware/logger-middleware");

const userRoutes = express.Router();

userRoutes.post("/users/create", requestLogger, userController.createUser);

module.exports = userRoutes;
