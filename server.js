require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const generateResponse = require('./src/services/ai.service')
const initSocketServer = require('./src/sockets/socketServer')
const httpServer = require('http').createServer(app)

connectDB();
initSocketServer(httpServer)

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
