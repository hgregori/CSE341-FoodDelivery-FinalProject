const { ObjectId } = require('mongodb');
const db = require('../config/db').db;

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await db.collection("transactions").find({}).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Error loading transactions data", error: error.message });
    }
};

const getSingleTransaction = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid transaction id." });
        }

        const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(req.params.id) });
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(transaction);
    } catch (error) {
        console.error("Error fetching transaction:", error);
        res.status(500).json({ message: "Error loading transaction data", error: error.message });
    }
};

const createTransaction = async (req, res) => {
    try {
        const response = await db.collection("transactions").insertOne(req.body);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(response);
    } catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).json({ message: "Error adding transaction data", error: error.message });
    }
};

const updateTransaction = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid transaction id." });
        }

        const response = await db.collection("transactions").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ message: "Error updating transaction data", error: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid transaction id." });
        }

        const response = await db.collection("transactions").deleteOne({ _id: new ObjectId(req.params.id) });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Error deleting transaction data", error: error.message });
    }
};

module.exports = {
    getAllTransactions,
    getSingleTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction
};
