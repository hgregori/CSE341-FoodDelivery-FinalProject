const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.get("/", (req, res) => {
    res.render("index");
});

router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;