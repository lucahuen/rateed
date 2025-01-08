const express = require("express");
const requestLogger = require("../middleware/logger-middleware");

const loginRoutes = express.Router();

loginRoutes.get("/login", requestLogger);

module.exports = loginRoutes;
