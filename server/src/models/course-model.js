const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, required: true, unique: true},
    semester: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    score: { type: Number, default: 0 },
    counter: { type: Number, default: 0 },
    bonus_points: { type: Boolean, default: false },
    professor: { type: String },
    university_chair: { type: String },
    exam_date: { type: Date },
    exam_admission: { type: Boolean},
    old_exam: { type: Boolean},
    tutorial: { type: Boolean},

});

module.exports = mongoose.model("Course", courseSchema);