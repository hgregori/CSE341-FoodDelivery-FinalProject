const validateRestaurant = (req, res, next) => {
    const { name, address, cuisine, openingHours, deliveryFee } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim() === '') {
        errors.push("Field 'name' is required and must be a non-empty string.");
    }

    if (!address || typeof address !== 'string' || address.trim() === '') {
        errors.push("Field 'address' is required and must be a non-empty string.");
    }

    if (!cuisine || typeof cuisine !== 'string' || cuisine.trim() === '') {
        errors.push("Field 'cuisine' is required and must be a non-empty string.");
    }

    if (!openingHours || typeof openingHours !== 'string' || openingHours.trim() === '') {
        errors.push("Field 'openingHours' is required and must be a non-empty string.");
    }

    if (deliveryFee === undefined || typeof deliveryFee !== 'number' || deliveryFee < 0) {
        errors.push("Field 'deliveryFee' is required and must be a non-negative number.");
    }

    if (req.body.rating !== undefined) {
        if (typeof req.body.rating !== 'number' || req.body.rating < 0 || req.body.rating > 5) {
            errors.push("Field 'rating' must be a number between 0 and 5 if provided.");
        }
    }

    if (req.body.description !== undefined && typeof req.body.description !== 'string') {
        errors.push("Field 'description' must be a string if provided.");
    }

    if (req.body.image !== undefined && typeof req.body.image !== 'string') {
        errors.push("Field 'image' must be a string if provided.");
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
    validateRestaurant
};
