const express = require("express");
const requestLogger = require("../middleware/logger-middleware");
const messageController = require("../controllers/message-controllers")

const messageRouter = express.Router();

messageRouter.get("/", requestLogger, messageController.getAllMessages);
messageRouter.post("/", requestLogger, messageController.sendMessage);

module.exports = messageRouter;
