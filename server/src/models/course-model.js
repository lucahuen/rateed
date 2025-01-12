const mongoose = require("mongoose");
const {Int32} = require("mongodb");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, required: true },
    semester: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    score: {type: Int32, default: 0},
    counter: {type: Int32, default: 0},
});

module.exports = mongoose.model("Course", courseSchema);