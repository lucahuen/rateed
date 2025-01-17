const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {type: String, required: true, unique: true},
    semester: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    score: {type: Number, default: 0},
    counter: {type: Number, default: 0},
    bonus_points: {type: Boolean, required: true},
    professor: {type: String, required: true},
    university_chair: {type: String, required: true},
    exam_date: {type: Date},
    exam_admission: {type: Boolean},
    old_exam: {type: Boolean, required: true},
    tutorial: {type: Boolean, required: true},
    author_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},


});

module.exports = mongoose.model("Course", courseSchema);