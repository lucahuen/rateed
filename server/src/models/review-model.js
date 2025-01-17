const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        score1: {type: Number, required: true, default: 3},
        score2: {type: Number, required: true, default: 3},
        score3: {type: Number, required: true, default: 3},
        courseId: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
        createdAt: {type: Date, default: Date.now()}
    },
);

module.exports = mongoose.model("Review", reviewSchema);