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

module.exports = {
    getAllRestaurants
};