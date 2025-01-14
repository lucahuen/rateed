const express = require("express");
const userController = require("../controllers/user-controllers");
const requestLogger = require("../middleware/logger-middleware");

const userRoutes = express.Router();

userRoutes.post("/create", requestLogger, userController.createUser);

userRoutes.post("/login", requestLogger, userController.handleLoginRequest)

userRoutes.get("/:userId", requestLogger, userController.getUser)

userRoutes.post("/:userId/updatePassword", requestLogger, userController.updatePassword)

userRoutes.post("/checkPassword", requestLogger, userController.checkPassword)

userRoutes.delete("/:userId", requestLogger, userController.deleteUser)

userRoutes.get("/username/:username", requestLogger, userController.getUserByName)


module.exports = userRoutes;
