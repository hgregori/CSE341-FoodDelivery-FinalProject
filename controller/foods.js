const { ObjectId } = require('mongodb');
const db = require('../config/db').db;

const getAllFoods = async (req, res) => {
    try {
        const foods = await db.collection("foods").find({}).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(foods);
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ message: "Error loading menu", error: error.message });
    }
};

const getSingleFood = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid food id." });
        }

        const food = await db.collection("foods").findOne({ _id: new ObjectId(req.params.id) });
        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(food);
    } catch (error) {
        console.error("Error fetching food:", error);
        res.status(500).json({ message: "Error loading food data", error: error.message });
    }
};

const createFood = async (req, res) => {
    try {
        const response = await db.collection("foods").insertOne(req.body);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(response);
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ message: "Error adding food data", error: error.message });
    }
};

const updateFood = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid food id." });
        }

        const response = await db.collection("foods").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "Food not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        console.error("Error updating food:", error);
        res.status(500).json({ message: "Error updating food data", error: error.message });
    }
};

const deleteFood = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid food id." });
        }

        const response = await db.collection("foods").deleteOne({ _id: new ObjectId(req.params.id) });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "Food not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        console.error("Error deleting food:", error);
        res.status(500).json({ message: "Error deleting food data", error: error.message });
    }
};

module.exports = {
    getAllFoods,
    getSingleFood,
    createFood,
    updateFood,
    deleteFood
};
