const express = require("express");
const requestLogger = require("../middleware/logger-middleware");
const messageController = require("../controllers/message-controllers")

const messageRouter = express.Router();

messageRouter.get("/", requestLogger, messageController.getAllMessages);
messageRouter.get("/course/:courseId", requestLogger, messageController.getAllMessagesByCourseId);
messageRouter.post("/", requestLogger, messageController.sendMessage);
messageRouter.delete("/:messageId", requestLogger, messageController.deleteMessage);

module.exports = messageRouter;
