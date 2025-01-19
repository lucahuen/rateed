const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {type: String, required: true, unique: true},
    semester: {type: String, required: true},
    professor: {type: String, required: true},
    universityChair: {type: String, required: true},
    examDate: {type: Date},
    examAdmission: {type: Boolean, required: true},
    tutorial: {type: Boolean, required: true},
    oldExam: {type: Boolean, required: true},
    bonusPoints: {type: Boolean, required: true},
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now()},
    moodleKey: {type: String, default: "Kein Schlüssel"},
});

module.exports = mongoose.model("Course", courseSchema);