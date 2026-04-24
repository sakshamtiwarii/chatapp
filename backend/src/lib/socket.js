import http from "http";                // ✅ fixed
import express from "express";
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5174",
    },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

//used to store online users and their corresponding socket ids
const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id); 

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected: " + socket.id);
        // Remove the user from the online users list
        if (userId) {
            delete userSocketMap[userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});    


export { io, server, app };