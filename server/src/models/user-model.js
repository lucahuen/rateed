const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//todo: create mongodb collection for users
const userSchema = new Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);
