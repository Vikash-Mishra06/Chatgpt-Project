require('dotenv').config();
console.log("=== ENVIRONMENT VARIABLES ===");
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "SET" : "NOT SET");
console.log("==============================");

const app = require('./src/app');
const connectDB = require('./src/db/db');
const initSocketServer = require('./src/sockets/socket.server');
const httpServer = require('http').createServer(app);

connectDB();
initSocketServer(httpServer);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}!`);
})