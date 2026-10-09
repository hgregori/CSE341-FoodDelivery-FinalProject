const swaggerautogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "CSE341 Final Project - Henrique Gregorio",
        description: "Food Delivery API for CSE341 - Henrique Gregorio",
        version: "1.0.0"
    },
    host: "cse341-fooddelivery-finalproject.onrender.com",
    basePath: "/",
    schemes: ["https", "http"],
    tags: [
        {
            name: "Foods",
            description: "Operations related to food items and menu"
        },
        {
            name: "Restaurants",
            description: "Operations related to restaurants"
        },
        {
            name: "Users",
            description: "Operations related to user accounts"
        },
        {
            name: "Transactions",
            description: "Operations related to order transactions"
        }
    ],
    definitions: {
        Food: {
            restaurantId: "6abd917edd6772b461ea47e2",
            name: "Fried Rice",
            price: 12.49,
            amount: "1 plate",
            ingredients: [
                "rice",
                "egg",
                "carrot",
                "peas",
                "soy sauce"
            ],
            image: "/images/foods/fried-rice.jpg",
            imageAlt: "Plate of fried rice with vegetables and egg",
            category: "Main Course",
            featured: true,
            available: true
        },
        Restaurant: {
            name: "Sakura Sushi House",
            address: "125 Cherry Blossom Ave, New York, NY",
            cuisine: "Japanese",
            rating: 4.8,
            description: "Authentic Japanese cuisine featuring fresh sushi, sashimi, ramen, and traditional dishes prepared daily.",
            openingHours: "11:00 AM - 10:00 PM",
            deliveryFee: 3.99,
            image: "/images/restaurants/sakura-sushi-house.jpg"
        },
        User: {
            name: "Henrique Gregorio",
            email: "henrique@example.com",
            role: "customer",
            active: true
        },
        Transaction: {
            userId: "6ac6c819bd09052255094358",
            restaurantId: "6abd917edd6772b461ea47de",
            items: [
                {
                    foodId: "6abd93afdd6772b461ea47e8",
                    name: "Fried Rice",
                    unitPrice: 12.49,
                    quantity: 2,
                    subtotal: 24.98
                }
            ],
            totalPrice: 28.97,
            status: "pending"
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./router/router.js'];

swaggerautogen(outputFile, endpointsFiles, doc);