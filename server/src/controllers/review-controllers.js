const Review = require("../models/review-model");

exports.createReview = async (req, res, next) => {
    const {userId, score1, score2, score3, courseId} = req.body;

    try {
        const review = await new Review(
            {userId: userId, score1: score1, score2: score2, score3: score3, courseId: courseId}).save();

        return res.status(201).json({
            message: "Review created!",
            data: review,
        })

    } catch (error) {
        next(error);
    }
}

exports.getReviewByUserAndCourse = async (req, res, next) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;

    try {
        const foundReview = await Review.findOne({userId: userId, courseId: courseId})
        if (!foundReview) {
            return res.status(404).json({
                message: "user has not reviewed this course",
            });
        } else {
            return res.status(200).json({
                message: `review for userid ${userId} and courseid ${courseId} found`,
                data: foundReview,
            });
        }
    } catch (e) {
        next(e);
    }
}