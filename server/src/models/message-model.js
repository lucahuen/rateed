const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    username: {type: String, required: true},
    text: {type: String, required: true},
    courseId: {type: Schema.Types.ObjectId, ref: "Course", required: true},
    createdAt: {type: Date, default: Date.now()},
});

module.exports = mongoose.model("Message", messageSchema);
