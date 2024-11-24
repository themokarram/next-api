import mongoose from "mongoose";
const { MongoClient } = require('mongodb');

const MONGO_URI =`mongodb://localhost:27017/`;

if (!MONGO_URI) throw new Error("Please define the MONGO_URI environment variable.");

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
async function connectToDatabase() {
    await testConnection()
    console.log("insideFnnnnnn")
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}
export default connectToDatabase;


async function testConnection() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Connection failed:", error.message);
    } finally {
        await client.close();
    }
}


