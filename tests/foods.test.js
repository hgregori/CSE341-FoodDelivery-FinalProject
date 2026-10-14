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

const foodsController = require('../controller/foods');

describe('Foods Controller - Unit Tests for GET and GET ALL routes', () => {
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

    describe('GET /menu (getAllFoods)', () => {
        it('should return 200 and a list of all foods', async () => {
            const mockFoodsList = [
                { _id: new ObjectId(), name: 'Fried Rice', price: 12.49, category: 'Main Course' },
                { _id: new ObjectId(), name: 'Spring Rolls', price: 6.99, category: 'Appetizer' }
            ];
            mockToArray.mockResolvedValueOnce(mockFoodsList);

            await foodsController.getAllFoods(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockFoodsList);
        });

        it('should return 500 if database throws an error', async () => {
            mockToArray.mockRejectedValueOnce(new Error('Database connection failed'));

            await foodsController.getAllFoods(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error loading menu'
            }));
        });
    });

    describe('GET /menu/:id (getSingleFood)', () => {
        it('should return 200 and the food item when a valid ID exists', async () => {
            const validId = new ObjectId().toString();
            const mockFood = { _id: new ObjectId(validId), name: 'Fried Rice', price: 12.49 };
            req.params.id = validId;

            mockFindOne.mockResolvedValueOnce(mockFood);

            await foodsController.getSingleFood(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockFood);
        });

        it('should return 400 when an invalid ObjectId format is provided', async () => {
            req.params.id = 'invalid-id-123';

            await foodsController.getSingleFood(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Must use a valid food id.' });
        });

        it('should return 404 when food item is not found', async () => {
            const validId = new ObjectId().toString();
            req.params.id = validId;
            mockFindOne.mockResolvedValueOnce(null);

            await foodsController.getSingleFood(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Food not found' });
        });

        it('should return 500 if database query throws an error', async () => {
            const validId = new ObjectId().toString();
            req.params.id = validId;
            mockFindOne.mockRejectedValueOnce(new Error('DB read error'));

            await foodsController.getSingleFood(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error loading food data'
            }));
        });
    });
});
