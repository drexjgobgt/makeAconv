import { Server } from "socket.io";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

let io;

// this is for storing online users
const userSocketMap = {}; // {userId:socketId}

export function setupSocket(server) {
  io = new Server(server, {
    cors: {
      origin: [ENV.CLIENT_URL],
      credentials: true,
    },
  });

  // apply authentication middleware to all socket connections
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log("A user connected", socket.user.fullName);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // with socket.on we listen for events from clients
    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.user.fullName);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}

// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io };
