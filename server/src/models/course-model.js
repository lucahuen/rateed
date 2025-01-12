const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, required: true },
    semester: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    score: {type: int, default: 0},
    counter: {type: int, default: 0},
});

module.exports = mongoose.model("Course", courseSchema);