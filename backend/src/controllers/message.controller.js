import cloudinary from "../lib/cloudinary.js";
import Message from "../models/messages.model.js";
import { User } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import redis from "../lib/redis.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const cacheKey = 'sidebar:' + loggedInUserId;

        // Check if the data is in Redis cache
        const cachedUsers = await redis.get(cacheKey);
        if (cachedUsers) {
            return res.status(200).json(JSON.parse(cachedUsers));
        }

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password -email -createdAt -updatedAt");
        await redis.set(cacheKey, JSON.stringify(filteredUsers), "EX", 60);
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const cacheKey ='messages:' + [myId, userToChatId].sort().join(':');

        // Check if messages are in Redis cache
        const cachedMessages = await redis.get(cacheKey);
        if (cachedMessages) {
            return res.status(200).json(JSON.parse(cachedMessages));
        }   

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        }).sort({ createdAt: 1 });
        //save the messages in redis cache for 5 mins
        await redis.set(cacheKey, JSON.stringify(messages), "EX", 300);

        res.status(200).json(messages); // sort by time ascending
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Internal server error" });
    }    

};

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            // upload base64 image to Cloudinary and get the URL
            // for simplicity, let's assume we have a function uploadImage that does this
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;

        }

        const newMessage = new Message({
            text,
            image: imageUrl,
            senderId,
            receiverId,
        });

        await newMessage.save();
        const cacheKey = "messages:" + [senderId.toString(), receiverId].sort().join(":");
        await redis.del(cacheKey);


          
        // realtime via socket.io
        const receiverSocketId = await getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }



        res.status(201).json(newMessage);

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" });
}};   