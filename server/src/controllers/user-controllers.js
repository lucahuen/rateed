const User = require("../models/user-model");

exports.createUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const newUser = await new User({username, password}).save();
        return res.status(201).json({
            message: 'new user created',
            data: newUser,
        })
    } catch (error) {
        next(error)
    }
};

//todo: implememt getUser
exports.getUser = async (req, res, next) => {
    const userId = req.params.userId
    try {

    } catch (error) {
        next(error)
    }

}