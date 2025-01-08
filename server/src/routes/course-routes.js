const express = require("express");
const courseController = require("../controllers/course-controllers");
const requestLogger = require("../middleware/logger-middleware");

const courseRouter = express.Router();

courseRouter.post("/courses/create", requestLogger, courseController.createCourse);

courseRouter.get("/courses", requestLogger, courseController.getAllCourses);

courseRouter.delete("/courses/:courseId", requestLogger, courseController.deleteCourse);

module.exports = courseRouter;
