const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    UserName: {type: String, required: true},
    Text: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
});

module.exports = mongoose.model("Message", messageSchema);
