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

exports.handleLoginRequest = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const foundUser = await User.findOne({username: username})
        if (!foundUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        if (foundUser.username !== username || foundUser.password !== password) {
            return res.status(401).json({
                message: 'Invalid login data'
            });
        }

        // Erfolg - Passwort und Benutzername stimmen überein
        return res.status(200).json({
            message: 'Login successful',
            user: { id: foundUser._id, username: foundUser.username } // Rückgabe nur der nötigen Daten
        });
    } catch (error) {
        next(error)
    }
}

// //todo: implememt getUser
// exports.getUser = async (req, res, next) => {
//     const userId = req.params.userId
//     try {
//
//     } catch (error) {
//         next(error)
//     }
//
// }