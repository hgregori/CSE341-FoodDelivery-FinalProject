const validateFood = (req, res, next) => {
    const { name, price, category, restaurantId } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim() === '') {
        errors.push("Field 'name' is required and must be a non-empty string.");
    }

    if (price === undefined || typeof price !== 'number' || price < 0) {
        errors.push("Field 'price' is required and must be a non-negative number.");
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
        errors.push("Field 'category' is required and must be a non-empty string.");
    }

    if (!restaurantId || typeof restaurantId !== 'string' || restaurantId.trim() === '') {
        errors.push("Field 'restaurantId' is required and must be a non-empty string.");
    }

    if (req.body.ingredients !== undefined && !Array.isArray(req.body.ingredients)) {
        errors.push("Field 'ingredients' must be an array of strings if provided.");
    }

    if (req.body.featured !== undefined && typeof req.body.featured !== 'boolean') {
        errors.push("Field 'featured' must be a boolean if provided.");
    }

    if (req.body.available !== undefined && typeof req.body.available !== 'boolean') {
        errors.push("Field 'available' must be a boolean if provided.");
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
    validateFood
};
