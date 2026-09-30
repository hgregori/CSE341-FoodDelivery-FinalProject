const express = require('express');
const path = require('path');
const router = require('./router/router');
const app = express();
const mongodb = require("./config/db");

const PORT = process.env.PORT || 3002;

mongodb.initializeDb();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static("public"));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});