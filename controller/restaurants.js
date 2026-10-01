const { ObjectId } = require('mongodb');
const db = require('../config/db').db;

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await db.collection("restaurants").find({}).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({ message: "Error loading restaurants data", error: error.message });
    }
};

const getSingleRestaurant = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid restaurant id." });
        }

        const restaurant = await db.collection("restaurants").findOne({ _id: new ObjectId(req.params.id) });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        res.status(500).json({ message: "Error loading restaurant data", error: error.message });
    }
};

const createRestaurant = async (req, res) => {
    try {
        const response = await db.collection("restaurants").insertOne(req.body);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(response);
    } catch (error) {
        console.error("Error adding restaurant:", error);
        res.status(500).json({ message: "Error adding restaurant data", error: error.message });
    }
};

const updateRestaurant = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid restaurant id." });
        }

        const response = await db.collection("restaurants").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).json({ message: "Error updating restaurant data", error: error.message });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid restaurant id." });
        }

        const response = await db.collection("restaurants").deleteOne({ _id: new ObjectId(req.params.id) });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        console.error("Error deleting restaurant:", error);
        res.status(500).json({ message: "Error deleting restaurant data", error: error.message });
    }
};

module.exports = {
    getAllRestaurants,
    getSingleRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};
