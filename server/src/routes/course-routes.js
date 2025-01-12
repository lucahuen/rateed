const express = require("express");
const courseController = require("../controllers/course-controllers");
const requestLogger = require("../middleware/logger-middleware");

const courseRouter = express.Router();

courseRouter.post("/create", requestLogger, courseController.createCourse);

courseRouter.get("/", requestLogger, courseController.getAllCourses);

courseRouter.get("/course/:courseId", requestLogger, courseController.getCourseById);

courseRouter.delete("/:courseId", requestLogger, courseController.deleteCourse);

courseRouter.get("/:name", requestLogger, courseController.getCourseByName);

courseRouter.get("/q/:query", requestLogger, courseController.getCoursesByQueryName);

module.exports = courseRouter;
