const express = require("express");
const requestLogger = require("../middleware/logger-middleware");

const reviewRouter = express.Router();

reviewRouter.get("/review/", requestLogger);

module.exports = reviewRouter;