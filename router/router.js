const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const passport = require('passport');

const foodsController = require("../controller/foods");
const restaurantsController = require("../controller/restaurants");
const usersController = require("../controller/users");
const transactionsController = require("../controller/transactions");

const { isAuthenticated, checkFirstTimeUser } = require("../middleware/oauthValidation");
const { validateFood } = require("../middleware/validationFood");
const { validateRestaurant } = require("../middleware/validationRestaurants");
const { validateUser } = require("../middleware/validationUsers");
const { validateTransaction } = require("../middleware/validationTransactions");
//=========================== Main Routes ===========================

router.get("/", (req, res) => {
    // #swagger.ignore = true
    res.render("index");
});

//=========================== Foods Routes ===========================

router.get("/menu", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Foods']
        #swagger.description = 'Get all foods from the menu'
        #swagger.responses[200] = {
            description: 'List of all food items'
        }
    */
    foodsController.getAllFoods(req, res);
});

router.get("/menu/:id", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Foods']
        #swagger.description = 'Get a single food item by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Food ID',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Food item data'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'Food not found'
        }
    */
    foodsController.getSingleFood(req, res);
});

router.post("/menu", isAuthenticated, validateFood, (req, res) => {
    /* 
        #swagger.tags = ['Foods']
        #swagger.description = 'Create a new food item'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Food object to create',
            required: true,
            schema: { $ref: '#/definitions/Food' }
        }
        #swagger.responses[201] = {
            description: 'Food created successfully'
        }
        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    foodsController.createFood(req, res);
});

router.put("/menu/:id", isAuthenticated, validateFood, (req, res) => {
    /* 
        #swagger.tags = ['Foods']
        #swagger.description = 'Update a food item by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Food ID',
            required: true,
            type: 'string'
        }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Food object with updated fields',
            required: true,
            schema: { $ref: '#/definitions/Food' }
        }
        #swagger.responses[200] = {
            description: 'Food updated successfully'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'Food not found'
        }
    */
    foodsController.updateFood(req, res);
});

router.delete("/menu/:id", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Foods']
        #swagger.description = 'Delete a food item by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Food ID',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Food deleted successfully'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'Food not found'
        }
    */
    foodsController.deleteFood(req, res);
});

//=========================== Restaurants Routes ===========================

router.get("/restaurants", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Restaurants']
        #swagger.description = 'Get all restaurants'
        #swagger.responses[200] = {
            description: 'List of all restaurants'
        }
    */
    restaurantsController.getAllRestaurants(req, res);
});

router.get("/restaurants/:id", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Restaurants']
        #swagger.description = 'Get a single restaurant by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Restaurant ID',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Restaurant data'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'Restaurant not found'
        }
    */
    restaurantsController.getSingleRestaurant(req, res);
});

router.post("/restaurants", isAuthenticated, validateRestaurant, (req, res) => {
    /* 
        #swagger.tags = ['Restaurants']
        #swagger.description = 'Create a new restaurant'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Restaurant object to create',
            required: true,
            schema: { $ref: '#/definitions/Restaurant' }
        }
        #swagger.responses[201] = {
            description: 'Restaurant created successfully'
        }
        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    restaurantsController.createRestaurant(req, res);
});

router.put("/restaurants/:id", isAuthenticated, validateRestaurant, (req, res) => {
    /* 
        #swagger.tags = ['Restaurants']
        #swagger.description = 'Update a restaurant by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Restaurant ID',
            required: true,
            type: 'string'
        }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Restaurant object with updated fields',
            required: true,
            schema: { $ref: '#/definitions/Restaurant' }
        }
        #swagger.responses[200] = {
            description: 'Restaurant updated successfully'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'Restaurant not found'
        }
    */
    restaurantsController.updateRestaurant(req, res);
});

router.delete("/restaurants/:id", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Restaurants']
        #swagger.description = 'Delete a restaurant by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Restaurant ID',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Restaurant deleted successfully'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'Restaurant not found'
        }
    */
    restaurantsController.deleteRestaurant(req, res);
});

//=========================== Users Routes ===========================

router.get("/users", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.description = 'Get all users'
        #swagger.responses[200] = {
            description: 'List of all users'
        }
    */
    usersController.getAllUsers(req, res);
});

router.get("/users/:id", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.description = 'Get a single user by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'User ID',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'User data'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'User not found'
        }
    */
    usersController.getSingleUser(req, res);
});

router.post("/users", isAuthenticated, validateUser, (req, res) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.description = 'Create a new user'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User object to create',
            required: true,
            schema: { $ref: '#/definitions/User' }
        }
        #swagger.responses[201] = {
            description: 'User created successfully'
        }
        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    usersController.createUser(req, res);
});

router.put("/users/:id", isAuthenticated, validateUser, (req, res) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.description = 'Update a user by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'User ID',
            required: true,
            type: 'string'
        }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User object with updated fields',
            required: true,
            schema: { $ref: '#/definitions/User' }
        }
        #swagger.responses[200] = {
            description: 'User updated successfully'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'User not found'
        }
    */
    usersController.updateUser(req, res);
});

router.delete("/users/:id", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.description = 'Delete a user by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'User ID',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'User deleted successfully'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'User not found'
        }
    */
    usersController.deleteUser(req, res);
});

//=========================== TRANSACTIONS Routes ===========================

router.get("/transactions", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Transactions']
        #swagger.description = 'Get all transactions'
        #swagger.responses[200] = {
            description: 'List of all transactions'
        }
    */
    transactionsController.getAllTransactions(req, res);
});

router.get("/transactions/:id", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Transactions']
        #swagger.description = 'Get a single transaction by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Transaction ID',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Transaction data'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'Transaction not found'
        }
    */
    transactionsController.getSingleTransaction(req, res);
});

router.post("/transactions", isAuthenticated, validateTransaction, (req, res) => {
    /* 
        #swagger.tags = ['Transactions']
        #swagger.description = 'Create a new transaction'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Transaction object to create',
            required: true,
            schema: { $ref: '#/definitions/Transaction' }
        }
        #swagger.responses[201] = {
            description: 'Transaction created successfully'
        }
        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    transactionsController.createTransaction(req, res);
});

router.put("/transactions/:id", isAuthenticated, validateTransaction, (req, res) => {
    /* 
        #swagger.tags = ['Transactions']
        #swagger.description = 'Update a transaction by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Transaction ID',
            required: true,
            type: 'string'
        }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Transaction object with updated fields',
            required: true,
            schema: { $ref: '#/definitions/Transaction' }
        }
        #swagger.responses[200] = {
            description: 'Transaction updated successfully'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'Transaction not found'
        }
    */
    transactionsController.updateTransaction(req, res);
});

router.delete("/transactions/:id", isAuthenticated, (req, res) => {
    /* 
        #swagger.tags = ['Transactions']
        #swagger.description = 'Delete a transaction by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Transaction ID',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Transaction deleted successfully'
        }
        #swagger.responses[400] = {
            description: 'Invalid ID format'
        }
        #swagger.responses[404] = {
            description: 'Transaction not found'
        }
    */
    transactionsController.deleteTransaction(req, res);
});

//=========================== AUTH Routes ===========================

router.get(
    "/auth/google",
    /* 
        #swagger.tags = ['Auth']
        #swagger.description = 'Authenticate with Google'
        #swagger.responses[200] = {
            description: 'Authentication successful'
        }
        #swagger.responses[400] = {
            description: 'Invalid authentication credentials'
        }
        #swagger.responses[401] = {
            description: 'Unauthorized authentication'
        }
        #swagger.responses[403] = {
            description: 'Forbidden authentication'
        }
        #swagger.responses[404] = {
            description: 'Authentication not found'
        }
        #swagger.responses[405] = {
            description: 'Method not allowed'
        }
        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/auth/google/callback",
    /* 
        #swagger.tags = ['Auth']
        #swagger.description = 'Callback after authentication with Google'
        #swagger.responses[200] = {
            description: 'Authentication successful'
        }
        #swagger.responses[400] = {
            description: 'Invalid authentication credentials'
        }
        #swagger.responses[401] = {
            description: 'Unauthorized authentication'
        }
        #swagger.responses[403] = {
            description: 'Forbidden authentication'
        }
        #swagger.responses[404] = {
            description: 'Authentication not found'
        }
        #swagger.responses[405] = {
            description: 'Method not allowed'
        }
        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    passport.authenticate("google", {
        failureRedirect: "/login"
    }),
    checkFirstTimeUser,
    (req, res) => {
        res.redirect("/");
    }
);

//=========================== LOGIN & LOGOUT Routes ===========================

router.get(
    "/login",
    /* 
        #swagger.tags = ['Login']
        #swagger.description = 'Login page'
        #swagger.responses[200] = {
            description: 'Login page'
        }
    */
    (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect("/");
        } else {
            return res.render("login");
        }
    }
);

router.get(
    "/logout",
    /* 
        #swagger.tags = ['Logout']
        #swagger.description = 'Logout user session'
        #swagger.responses[200] = {
            description: 'User logged out'
        }
    */
    (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            res.redirect("/");
        });
    }
);

router.get("/auth/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
});

//=========================== API Docs Routes ===========================

router.use('/api-docs', (req, res, next) => {
    // Dynamically match the current host and protocol for testing in localhost or on Render
    const isHttps = req.protocol === 'https' || req.headers['x-forwarded-proto'] === 'https';
    swaggerDocument.host = req.get('host');
    swaggerDocument.schemes = [isHttps ? 'https' : 'http'];
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serveFiles(swaggerDocument, {}), swaggerUi.setup());

module.exports = router;