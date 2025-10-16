const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie);
    if (!cookies.token) {
      next(new Error("Authentication error: No token found"));
    }
    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagePayload) => {
      const userMessage = await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: messagePayload.content,
        role: "user",
      });

      const vectors = await aiService.generateVector(messagePayload.content);

      await createMemory({
        vectors,
        messageId: userMessage._id.toString(),
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: messagePayload.content,
        },
      });

      const memory = await queryMemory({
        queryVector: vectors,
        limit: 4,
        metadata: {},
      });

      const chatHistory = await messageModel.find({
        chat: messagePayload.chat,
      });

      const stm = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `This are some previous messages from chats, used to generate response.
              ${memory.map((item) => item.metadata.text).join("\n")}`,
            },
          ],
        },
      ];

      console.log(ltm[0], stm)

      const response = await aiService.generateResponse([...ltm, ...stm]);

      const aiMessage = await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: response,
        role: "model",
      });

      const aiVectors = await aiService.generateVector(response);

      await createMemory({
        vectors: aiVectors,
        messageId: aiMessage._id.toString(),
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: response,
        },
      });

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      });
    });
  });
}

module.exports = initSocketServer;
