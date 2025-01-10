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
                message: 'Benutzer nicht gefunden'
            });
        }

        // Passwort-Hash überprüfen
        const isPasswordValid = await bcrypt.compare(password, foundUser.password); // Vergleicht Klartext mit Hash
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Ungültige Anmeldedaten'
            });
        }

        // Erfolg - Passwort und Benutzername stimmen überein
        return res.status(200).json({
            message: 'Anmeldung erfolgreich',
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
                message: 'user does not exist',
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

exports.updatePassword = async (req, res, next) => {
    try {
        const userId = req.params.userId; // ID des Benutzers aus der URL
        const { currentPassword, newPassword } = req.body; // Aktuelles und neues Passwort aus der Anfrage

        // Benutzer suchen
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Benutzer nicht gefunden." });
        }

        // Überprüfen, ob das aktuelle Passwort korrekt ist
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Das aktuelle Passwort ist falsch." });
        }

        // Neues Passwort hashen
        const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 Salt-Runden

        // Passwort aktualisieren
        await User.updateOne(
            { _id: userId }, // Filterkriterium
            { $set: { password: hashedPassword } } // Zu aktualisierendes Feld
        );

        res.status(200).json({ message: "Passwort erfolgreich aktualisiert." });
    } catch (error) {
        next(error);
    }
};