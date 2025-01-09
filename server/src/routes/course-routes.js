const express = require("express");
const courseController = require("../controllers/course-controllers");
const requestLogger = require("../middleware/logger-middleware");

const courseRouter = express.Router();

courseRouter.post("/create", requestLogger, courseController.createCourse);

courseRouter.get("/", requestLogger, courseController.getAllCourses);

courseRouter.delete("/:courseId", requestLogger, courseController.deleteCourse);

module.exports = courseRouter;
