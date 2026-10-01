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
        const restaurant = await db.collection("restaurants").findOne({ _id: ObjectId(req.params.id) });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({ message: "Error loading restaurants data", error: error.message });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await db.collection("restaurants").deleteOne({ _id: ObjectId(req.params.id) });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error deleting restaurants:", error);
        res.status(500).json({ message: "Error deleting restaurants data", error: error.message });
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await db.collection("restaurants").updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error updating restaurants:", error);
        res.status(500).json({ message: "Error updating restaurants data", error: error.message });
    }
};

const createRestaurant = async (req, res) => {
    try {
        const restaurant = await db.collection("restaurants").insertOne(req.body);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error adding restaurants:", error);
        res.status(500).json({ message: "Error adding restaurants data", error: error.message });
    }
};

module.exports = {
    getAllRestaurants,
    getSingleRestaurant,
    deleteRestaurant,
    updateRestaurant,
    createRestaurant
};