import http from "http";                // ✅ fixed
import express from "express";
import { Server } from "socket.io";
import redis from "./redis.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5174",
    },
});

export async function getReceiverSocketId(userId) {
    return await redis.get(`socket:${userId}`);
}

//used to store online users and their corresponding socket ids using redis now

io.on("connection", async (socket) => {
    console.log("A user connected: " + socket.id); 

    const userId = socket.handshake.query.userId;
    if (userId) {
        await redis.set(`socket:${userId}`, socket.id); // Store the userId and socketId in Redis
    }
    await redis.sadd("onlineUsers", userId);
    const onlineUsers = await redis.smembers("onlineUsers");
    io.emit("getOnlineUsers", onlineUsers); // Emit the updated list of online users to all clients

    socket.on("disconnect", async () => {
        console.log("A user disconnected: " + socket.id);
        // Remove the user from the online users list
        if (userId) {
            await redis.del(`socket:${userId}`);
        }
        await redis.srem("onlineUsers", userId);
        const onlineUsers = await redis.smembers("onlineUsers");
        io.emit("getOnlineUsers", onlineUsers); // Emit the updated list of online users to all clients
    });
});    


export { io, server, app };