import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URI);
        if (connection.readyState === 1) {
            console.log("Connected to MongoDB");
            return Promise.resolve(true);
        }
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        return Promise.reject(false);
    }
};