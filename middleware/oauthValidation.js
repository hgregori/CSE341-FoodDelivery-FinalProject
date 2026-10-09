const { db } = require('../config/db');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }

    // For API calls (Swagger, REST clients, fetch), respond with 401 Unauthorized
    const isApiRequest = 
        req.xhr || 
        (req.headers.accept && req.headers.accept.includes('application/json')) ||
        req.path.startsWith('/menu') ||
        req.path.startsWith('/restaurants') ||
        req.path.startsWith('/users') ||
        req.path.startsWith('/transactions');

    if (isApiRequest) {
        return res.status(401).json({ message: "You do not have access. Please authenticate first." });
    }

    res.redirect("/login");
};

const checkFirstTimeUser = async (req, res, next) => {
    try {
        if (!req.user) {
            return next();
        }

        const googleId = req.user.id;
        const email = req.user.emails && req.user.emails.length > 0 ? req.user.emails[0].value : null;
        const name = req.user.displayName || 
            (req.user.name ? `${req.user.name.givenName || ''} ${req.user.name.familyName || ''}`.trim() : 'Google User');
        const picture = req.user.photos && req.user.photos.length > 0 ? req.user.photos[0].value : null;

        // Search for existing user by googleId or email
        const query = [];
        if (googleId) query.push({ googleId: googleId });
        if (email) query.push({ email: email });

        let existingUser = null;
        if (query.length > 0) {
            existingUser = await db.collection("users").findOne({ $or: query });
        }

        if (!existingUser) {
            // First time authenticating - create new user in MongoDB
            const newUser = {
                googleId: googleId || null,
                name: name,
                email: email,
                picture: picture,
                role: 'customer',
                active: true,
                provider: 'google',
                createdAt: new Date(),
                updatedAt: new Date(),
                lastLoginAt: new Date()
            };

            const result = await db.collection("users").insertOne(newUser);
            console.log(`[OAuth] First-time login registered: created user with ID ${result.insertedId}`);
            req.user.dbUser = { _id: result.insertedId, ...newUser };
        } else {
            // Existing user - update last login timestamp
            await db.collection("users").updateOne(
                { _id: existingUser._id },
                { $set: { lastLoginAt: new Date(), updatedAt: new Date() } }
            );
            req.user.dbUser = existingUser;
        }

        next();
    } catch (error) {
        console.error("Error in checkFirstTimeUser middleware:", error);
        next(error);
    }
};

module.exports = {
    isAuthenticated,
    checkFirstTimeUser
};
