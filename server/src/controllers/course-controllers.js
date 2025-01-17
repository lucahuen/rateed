const Course = require("../models/course-model");

exports.createCourse = async (req, res, next) => {
    const {
        name, semester, professor, universityChair, examDate, examAdmission, tutorial, oldExam, bonusPoints, authorId
    } = req.body;
    console.log(name, semester, professor, universityChair, examDate, examAdmission, tutorial, oldExam, bonusPoints, authorId)
    try {
        const newCourse = await new Course({
            name: name,
            semester: semester,
            professor: professor,
            universityChair: universityChair,
            examDate: examDate,
            examAdmission: examAdmission,
            tutorial: tutorial,
            oldExam: oldExam,
            bonusPoints: bonusPoints,
            authorId: authorId
        }).save();
        return res.status(201).json({
            message: `New course created!`, data: newCourse,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllCourses = async (_, res, next) => {
    try {
        const foundCourses = await Course.find({});
        return res.status(200).json({
            message: `Found all courses`, data: foundCourses,
        });
    } catch (error) {
        next(error);
    }
};

exports.getCourseByName = async (req, res, next) => {
    try {
        const name = req.params.name; // Kursname aus den URL-Parametern holen
        const foundCourse = await Course.findOne({name}); // Suche nach Kursname

        if (!foundCourse) {
            return res.status(404).json({
                message: `Course with name '${name}' not found`,
            });
        }

        return res.status(200).json({
            message: `Found course with name '${name}'`, data: foundCourse,
        });
    } catch (error) {
        next(error); // Fehler an Middleware weiterleiten
    }
};

exports.getCoursesByQueryName = async (req, res, next) => {
    try {
        const query = req.params.query;

        const regex = new RegExp(`^${query}`, 'i');

        const foundCourses = await Course.find({name: regex});

        return res.status(200).json({
            message: 'Success', data: foundCourses
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteCourse = async (req, res, next) => {
    const courseId = req.params.courseId;
    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            const error = new Error(`Course not found with id: ${courseId}`);
            error.status = 404;
            throw error;
        }

        return res.status(200).json({
            message: `Course with successfully deleted.`, data: deletedCourse,
        });
    } catch (error) {
        next(error);
    }
};

exports.getCourseById = async (req, res, next) => {
    const courseId = req.params.courseId;
    try {
        const foundCourse = await Course.findById(courseId);
        if (foundCourse) {
            return res.status(200).json({
                message: `Course with id: ${courseId} found`, data: foundCourse,
            })
        }
    } catch (error) {
        next(error)
    }
}
