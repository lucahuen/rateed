const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, required: true },
    semester: { type: String, required: false },
    createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Course", courseSchema);