const mongoose = require("mongoose");
const userSchema = require("../models/user-model");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {type: String, required: true, unique: true},
    semester: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    score: {type: Number, default: 0},
    counter: {type: Number, default: 0},
    bonus_points: {type: Boolean, default: false},
    professor: {type: String, required: true},
    university_chair: {type: String, required: true},
    exam_date: {type: Date},
    exam_admission: {type: Boolean},
    old_exam: {type: Boolean},
    tutorial: {type: Boolean},
    author_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},


});

module.exports = mongoose.model("Course", courseSchema);