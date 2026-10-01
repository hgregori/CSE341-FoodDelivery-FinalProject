const db = require('../config/db').db;

const getAllFoods = async (req, res) => {
    try {
        const foods = await db
            .collection("foods")
            .find({})
            .toArray();

        res.render("menu", {
            title: "Menu",
            foods
        });

    } catch (error) {
        console.error(error);

        res.status(500).render("error", {
            message: "Error loading menu"
        });
    }
};

const getSingleFood = async (req, res) => {
    try {
        const food = await db.collection("foods").findOne({ _id: ObjectId(req.params.id) });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(food);
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ message: "Error loading food data", error: error.message });
    }
};

const deleteFood = async (req, res) => {
    try {
        const food = await db.collection("foods").deleteOne({ _id: ObjectId(req.params.id) });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(food);
    } catch (error) {
        console.error("Error deleting foods:", error);
        res.status(500).json({ message: "Error deleting food data", error: error.message });
    }
};

const updateFood = async (req, res) => {
    try {
        const food = await db.collection("foods").updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(food);
    } catch (error) {
        console.error("Error updating foods:", error);
        res.status(500).json({ message: "Error updating food data", error: error.message });
    }
};

const createFood = async (req, res) => {
    try {
        const food = await db.collection("foods").insertOne(req.body);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(food);
    } catch (error) {
        console.error("Error adding foods:", error);
        res.status(500).json({ message: "Error adding food data", error: error.message });
    }
};

module.exports = {
    getAllFoods,
    getSingleFood,
    deleteFood,
    updateFood,
    createFood
};