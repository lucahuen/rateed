const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
        username: {type: String, required: true},
        review: {type: String, required: true},
        score: {type: Number, required: true, default: 0},
        courseName: {type: String, required: true},
        createdAt: {type: Date, default: Date.now()}
    },
);

module.exports = mongoose.model("Review", reviewSchema);