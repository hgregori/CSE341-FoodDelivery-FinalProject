const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);

const db = client.db("foodexpress");

const initializeDb = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

module.exports = { 
    db, 
    initializeDb 
};