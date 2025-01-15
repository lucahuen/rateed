const Message = require("../models/message-model")

exports.getAllMessages = async (req, res, next) => {
    try {
        const foundMessages = await Message.find({});
        return res.status(200).json({
            message: `Found all messages`,
            data: foundMessages,
        });
    } catch (error) {
        next(error);
    }
}

exports.sendMessage = async (req, res, next) => {
    const username = req.body.username
    const text = req.body.text

    try {
        const newMessage = await new Message({username: username, text: text}).save();
        return res.status(201).json({
            message: "new message created",
            data: newMessage,
        });
    } catch (error) {
        next(error);
    }
}