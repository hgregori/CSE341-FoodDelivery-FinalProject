const { ObjectId } = require('mongodb');

// Mock database before importing controller
const mockToArray = jest.fn();
const mockFind = jest.fn(() => ({ toArray: mockToArray }));
const mockFindOne = jest.fn();

const mockCollection = {
    find: mockFind,
    findOne: mockFindOne
};

jest.mock('../config/db', () => ({
    db: {
        collection: jest.fn(() => mockCollection)
    }
}));

const restaurantsController = require('../controller/restaurants');

describe('Restaurants Controller - Unit Tests for GET and GET ALL routes', () => {
    let req;
    let res;
    let consoleErrorSpy;

    beforeEach(() => {
        jest.clearAllMocks();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        req = {
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            setHeader: jest.fn().mockReturnThis()
        };
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    describe('GET /restaurants (getAllRestaurants)', () => {
        it('should return 200 and a list of all restaurants', async () => {
            const mockRestaurantsList = [
                {
                    _id: new ObjectId(),
                    name: 'Sakura Sushi House',
                    cuisine: 'Japanese',
                    deliveryFee: 3.99
                },
                {
                    _id: new ObjectId(),
                    name: 'Tokyo Express Ramen',
                    cuisine: 'Japanese',
                    deliveryFee: 2.99
                }
            ];
            mockToArray.mockResolvedValueOnce(mockRestaurantsList);

            await restaurantsController.getAllRestaurants(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRestaurantsList);
        });

        it('should return 500 if database throws an error', async () => {
            mockToArray.mockRejectedValueOnce(new Error('Database query failure'));

            await restaurantsController.getAllRestaurants(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error loading restaurants data'
            }));
        });
    });

    describe('GET /restaurants/:id (getSingleRestaurant)', () => {
        it('should return 200 and the restaurant when a valid ID exists', async () => {
            const validId = new ObjectId().toString();
            const mockRestaurant = {
                _id: new ObjectId(validId),
                name: 'Sakura Sushi House',
                cuisine: 'Japanese',
                deliveryFee: 3.99
            };
            req.params.id = validId;
            mockFindOne.mockResolvedValueOnce(mockRestaurant);

            await restaurantsController.getSingleRestaurant(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRestaurant);
        });

        it('should return 400 when an invalid ObjectId format is provided', async () => {
            req.params.id = 'invalid-restaurant-id';

            await restaurantsController.getSingleRestaurant(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Must use a valid restaurant id.' });
        });

        it('should return 404 when restaurant is not found', async () => {
            const validId = new ObjectId().toString();
            req.params.id = validId;
            mockFindOne.mockResolvedValueOnce(null);

            await restaurantsController.getSingleRestaurant(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Restaurant not found' });
        });

        it('should return 500 if database query throws an error', async () => {
            const validId = new ObjectId().toString();
            req.params.id = validId;
            mockFindOne.mockRejectedValueOnce(new Error('Database read failure'));

            await restaurantsController.getSingleRestaurant(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error loading restaurant data'
            }));
        });
    });
});
