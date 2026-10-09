const validateTransaction = (req, res, next) => {
    const { user, userId, restaurant, restaurantId, items, totalPrice, subtotal, status } = req.body;
    const errors = [];

    if (!user && !userId) {
        errors.push("Field 'user' (object) or 'userId' (string) is required.");
    }

    if (!restaurant && !restaurantId) {
        errors.push("Field 'restaurant' (object) or 'restaurantId' (string) is required.");
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
        errors.push("Field 'items' is required and must be a non-empty array.");
    }

    const price = totalPrice !== undefined ? totalPrice : subtotal;
    if (price === undefined || typeof price !== 'number' || price < 0) {
        errors.push("Field 'totalPrice' (or 'subtotal') is required and must be a non-negative number.");
    }

    if (!status || typeof status !== 'string' || status.trim() === '') {
        errors.push("Field 'status' is required and must be a non-empty string.");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Validation failed",
            errors
        });
    }

    next();
};

module.exports = {
    validateTransaction
};
