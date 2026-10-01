const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const foodsController = require("../controller/foods");
const restaurantsController = require("../controller/restaurants");

//=========================== Main Routes ===========================

router.get("/", (req, res) => {
    res.render("index");
});

//=========================== Foods Routes ===========================

router.get("/menu", foodsController.getAllFoods);
router.get("/menu/:id", foodsController.getSingleFood);
router.post("/menu", foodsController.createFood);
router.delete("/menu/:id", foodsController.deleteFood);
router.put("/menu/:id", foodsController.updateFood);

//=========================== Restaurants Routes ===========================

router.get("/restaurants", restaurantsController.getAllRestaurants);
router.get("/restaurants/:id", restaurantsController.getSingleRestaurant);
router.delete("/restaurants/:id", restaurantsController.deleteRestaurant);
router.put("/restaurants/:id", restaurantsController.updateRestaurant);
router.post("/restaurants", restaurantsController.createRestaurant);

//=========================== API Docs Routes ===========================

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;