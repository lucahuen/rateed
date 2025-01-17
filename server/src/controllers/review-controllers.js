const Review = require("../models/review-model");

exports.createReview = async (req, res, next) => {
    const {userId, score1, score2, score3, courseId} = req.body;

    try {
        const review = await new Review(
            {userId: userId, score1:score1, score2:score2, score3:score3, courseId:courseId}).save();

        return res.status(201).json({
            message: "Review created!",
            data:review,
        })

    } catch (error) {
        next(error);
    }
}