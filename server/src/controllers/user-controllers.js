const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    console.log(username, password, hashedPassword)
    try {
        const newUser = await new User({username: username, password: hashedPassword}).save();
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
    const password = req.body.password; // Klartext-Passwort von der Anfrage

    try {
        // Benutzer anhand des Benutzernamens suchen
        const foundUser = await User.findOne({username: username});
        if (!foundUser) {
            return res.status(404).json({
                message: 'user not found'
            });
        }

        // Passwort-Hash überprüfen
        const isPasswordValid = await bcrypt.compare(password, foundUser.password); // Vergleicht Klartext mit Hash
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'invalid login data'
            });
        }

        // Erfolg - Passwort und Benutzername stimmen überein
        return res.status(200).json({
            message: 'login success',
            user: {id: foundUser._id, username: foundUser.username} // Rückgabe nur der nötigen Daten
        });
    } catch (error) {
        next(error);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: 'user not found',
                data: null
            })
        } else {
            return res.status(200).json({
                message: "user found",
                user: user
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.getUserByName = async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await User.findOne({username: username})
        if (user) {
            return res.status(200).json({
                message: "user found",
                data: user,
            })
        } else {
            return res.status(404).json({
                message: "user not found"
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.updatePassword = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const {currentPassword, newPassword} = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "user not found"});
        }

        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "current password is wrong"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await User.updateOne(
            {_id: userId},
            {$set: {password: hashedPassword}}
        );

        res.status(200).json({message: "password updated successfully"});
    } catch (error) {
        next(error);
    }
};

exports.checkPassword = async (req, res, next) => {
    try {
        const userId = req.body.id
        const enteredPassword = req.body.password
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "user not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(enteredPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "current password is wrong"});
        } else {
            return res.status(200).json({message: "password is correct", data: true})
        }
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            const error = new Error(`user not found`);
            error.status = 404;
            throw error;
        }

        return res.status(200).json({
            message: `user successfully deleted.`,
            data: deletedUser,
        });
    } catch (error) {
        next(error);
    }
}