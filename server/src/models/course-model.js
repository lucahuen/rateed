const mongoose = require("mongoose");
const {Int32} = require("mongodb");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, required: true },
    semester: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    score: { type: Int32, default: 0 },
    counter: { type: Int32, default: 0 },
    bonus_points: { type: Boolean, default: false },
    professor: { type: String },
    university_chair: { type: String },
    exam_date: { type: Date },
    exam_admission: { type: Boolean},
    old_exam: { type: Boolean},
    tutorial: { type: Boolean},



});

module.exports = mongoose.model("Course", courseSchema);