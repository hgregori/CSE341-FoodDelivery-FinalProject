const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const foodsController = require("../controller/foods");
const restaurantsController = require("../controller/restaurants");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/menu", foodsController.getAllFoods);

router.get("/restaurants", restaurantsController.getAllRestaurants);

router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;