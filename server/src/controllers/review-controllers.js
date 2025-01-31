const Review = require("../models/review-model");

exports.createReview = async (req, res, next) => {
    const {userId, score1, score2, score3, courseId} = req.body;

    try {
        const foundReview = await Review.findOne({userId: userId, courseId: courseId});
        let review;

        if (foundReview) {
            review = await Review.findOneAndUpdate(
                {userId: userId, courseId: courseId}, // Filter
                {$set: {score1: score1, score2: score2, score3: score3}}, // Update
                {new: true}
            );
        } else {
            review = await new Review({
                userId: userId,
                score1: score1,
                score2: score2,
                score3: score3,
                courseId: courseId
            }).save();
        }

        return res.status(201).json({
            message: "Review created or updated!",
            data: review,
        });

    } catch (error) {
        next(error);
    }
};

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

exports.getReviewsByCourse = async (req, res, next) => {
    const courseId = req.params.courseId;
    try {
        const foundReviews = await Review.find({courseId: courseId})
        if (!foundReviews) {
            return res.status(404).json({
                message: `no reviews found for course ${courseId}`
            });
        } else
            return res.status(200).json({
                message: "reviews found",
                data: foundReviews,
            });
    } catch (e) {
        next(e)
    }
}