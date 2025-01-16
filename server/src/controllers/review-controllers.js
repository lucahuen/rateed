const Review = require("../models/review-model");

exports.createReview = async (req, res, next) => {
    const {username, score1, score2, score3, courseName} = req.body;

    try {
        const review = await new Review(
            {username: username, score1:score1, score2:score2, score3:score3, courseName:courseName}).save();

        return res.status(201).json({
            message: "Review created!",
            data:review,
        })

    } catch (error) {
        next(error);
    }
}