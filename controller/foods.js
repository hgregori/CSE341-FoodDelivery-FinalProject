const db = require('../config/db').db;

const getAllFoods = async (req, res) => {
    try {
        const foods = await db.collection("foods").find({}).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(foods);
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ message: "Error loading food data", error: error.message });
    }
};

module.exports = {
    getAllFoods
};