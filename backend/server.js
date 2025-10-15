require("dotenv").config();
const app = require("./src/app");
const initSocketServer = require("././src/sockets/socket.server");
const connectDb = require("./src/db/db");
const httpServer = require("http").createServer(app);

connectDb();
initSocketServer(httpServer);

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
