const swaggerautogen = require("swagger-autogen");

const doc = {
    info: {
        title: "CSE341 Final Project - Henrique Gregorio",
        description: "This is the Final Project for CSE341 - Henrique Gregorio"
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerautogen(outputFile, endpointsFiles, doc);