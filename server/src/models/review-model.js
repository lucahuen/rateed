const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
        username: {type: String, required: true},
        score1: {type: Number, required: true, default: 3},
        score2: {type: Number, required: true, default: 3},
        score3: {type: Number, required: true, default: 3},
        courseName: {type: String, required: true},
        //createdAt: {type: Date, default: Date.now()}
    },
);

module.exports = mongoose.model("Review", reviewSchema);