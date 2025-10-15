const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    if (!cookies.token) {
      return next(new Error("Authentication error: No token found"));
    }
    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      socket.user = user;
      next();
    } catch (error) {}
  });

  io.on("connection", (socket) => {
    const mongoose = require("mongoose");

    socket.on("ai-message", async (messagePayload) => {
      try {
        const chatId = new mongoose.Types.ObjectId(messagePayload.chat);

        await messageModel.create({
          chat: chatId,
          user: socket.user._id,
          content: messagePayload.content,
          role: "user",
        });

        const chatHistory = await messageModel.find({ chat: chatId });

        console.log(
          "Chat history:",
          chatHistory.map((item) => ({
            role: item.role,
            parts: [{ text: item.content }],
          }))
        );

        const response = await aiService.generateResponse(
          chatHistory.map((item) => ({
            role: item.role,
            parts: [{ text: item.content }],
          }))
        );

        await messageModel.create({
          chat: chatId,
          user: socket.user._id,
          content: response,
          role: "model",
        });

        socket.emit("ai-message", {
          content: response,
          chat: messagePayload.chat,
        });
      } catch (err) {
        console.error("Error in ai-message handler:", err);
      }
    });
  });
}

module.exports = initSocketServer;
