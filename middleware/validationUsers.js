const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUser = (req, res, next) => {
    const { name, email } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim() === '') {
        errors.push("Field 'name' is required and must be a non-empty string.");
    }

    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        errors.push("Field 'email' is required and must be a valid email address.");
    }

    if (req.body.role !== undefined && typeof req.body.role !== 'string') {
        errors.push("Field 'role' must be a string if provided.");
    }

    if (req.body.active !== undefined && typeof req.body.active !== 'boolean') {
        errors.push("Field 'active' must be a boolean if provided.");
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
    validateUser
};
