const express = require("express");
const requestLogger = require("../middleware/logger-middleware");
const reviewController = require("../controllers/review-controller");

const reviewRouter = express.Router();

reviewRouter.post("/", requestLogger, reviewController.createReview);

module.exports = reviewRouter;