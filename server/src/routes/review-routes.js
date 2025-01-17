const express = require("express");
const requestLogger = require("../middleware/logger-middleware");
const reviewController = require("../controllers/review-controllers");

const reviewRouter = express.Router();

reviewRouter.post("/", requestLogger, reviewController.createReview);
reviewRouter.get("/:userId/:courseId", requestLogger, reviewController.getReviewByUserAndCourse)
reviewRouter.get("/:courseId", requestLogger, reviewController.getReviewsByCourse)

module.exports = reviewRouter;