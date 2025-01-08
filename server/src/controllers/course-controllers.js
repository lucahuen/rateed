const Course = require("../models/course-model");

exports.createCourse = async (req, res, next) => {
    const name = req.body.name;
    try {
        print(name);s
        const newCourse = await new Course({name}).save();
        return res.status(201).json({
            message: `New course created!`,
            data: newCourse,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllCourses = async (_, res, next) => {
    try {
        const foundCourses = await Course.find({});
        return res.status(200).json({
            message: `Found all courses`,
            data: foundCourses,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCourse = async (req, res, next) => {
    const courseId = req.params.todoId;
    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            const error = new Error(`Course not found with id: ${courseId}`);
            error.status = 404;
            throw error;
        }

        return res.status(200).json({
            message: `Course with successfully deleted.`,
            data: deletedCourse,
        });
    } catch (error) {
        next(error);
    }
};
