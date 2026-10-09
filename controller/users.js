const { ObjectId } = require('mongodb');
const db = require('../config/db').db;

const getAllUsers = async (req, res) => {
    try {
        const users = await db.collection("users").find({}).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error loading users data", error: error.message });
    }
};

const getSingleUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid user id." });
        }

        const user = await db.collection("users").findOne({ _id: new ObjectId(req.params.id) });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error loading user data", error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const response = await db.collection("users").insertOne(req.body);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(response);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Error adding user data", error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid user id." });
        }

        const response = await db.collection("users").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user data", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid user id." });
        }

        const response = await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user data", error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
