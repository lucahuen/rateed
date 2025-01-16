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
    const {username, text, courseId} = req.body

    try {
        const newMessage = await new Message({username: username, text: text, courseId: courseId}).save();
        return res.status(201).json({
            message: "new message created",
            data: newMessage,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllMessagesByCourseId = async (req, res, next) => {
    const courseId = req.params.courseId;

    try {
        const foundMessages = await Message.find({courseId: courseId}).populate("courseId");
        return res.status(200).json({
            message: `Messages for courseId ${courseId} found`,
            data: foundMessages,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteMessage = async (req, res, next) => {
    const id = req.params.messageId
    try {
        const deletedMessage = await Message.findByIdAndDelete(id)
        if (!deletedMessage) {
            const error = new Error(`Message not found with id: ${id}`);
            error.status = 404;
            throw error;
        }

        return res.status(200).json({
            message: `Message successfully deleted.`,
            data: deletedMessage,
        });
    } catch (error) {
        next(error);
    }
}