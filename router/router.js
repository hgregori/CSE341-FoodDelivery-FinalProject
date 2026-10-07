const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const foodsController = require("../controller/foods");
const restaurantsController = require("../controller/restaurants");

//=========================== Main Routes ===========================

router.get("/", (req, res) => {
    // #swagger.ignore = true
    res.render("index");
});

//=========================== Foods Routes ===========================

router.get("/menu", (req, res) => {
    /* 
        #swagger.tags = ['Foods']
        #swagger.description = 'Get all foods from the menu'
        #swagger.responses[200] = {
            description: 'List of all food items'
        }
    */
    foodsController.getAllFoods(req, res);
});

router.get("/menu/:id", (req, res) => {
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

router.post("/menu", (req, res) => {
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

router.put("/menu/:id", (req, res) => {
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

router.delete("/menu/:id", (req, res) => {
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

router.get("/restaurants", (req, res) => {
    /* 
        #swagger.tags = ['Restaurants']
        #swagger.description = 'Get all restaurants'
        #swagger.responses[200] = {
            description: 'List of all restaurants'
        }
    */
    restaurantsController.getAllRestaurants(req, res);
});

router.get("/restaurants/:id", (req, res) => {
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

router.post("/restaurants", (req, res) => {
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

router.put("/restaurants/:id", (req, res) => {
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

router.delete("/restaurants/:id", (req, res) => {
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

//=========================== API Docs Routes ===========================

router.use('/api-docs', (req, res, next) => {
    // Dynamically match the current host and protocol for testing in localhost or on Render
    swaggerDocument.host = req.get('host');
    swaggerDocument.schemes = [req.protocol];
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;