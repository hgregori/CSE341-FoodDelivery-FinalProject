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

const usersController = require('../controller/users');

describe('Users Controller - Unit Tests for GET and GET ALL routes', () => {
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

    describe('GET /users (getAllUsers)', () => {
        it('should return 200 and a list of all users', async () => {
            const mockUsersList = [
                {
                    _id: new ObjectId(),
                    name: 'Henrique Gregorio',
                    email: 'henrique@example.com',
                    role: 'admin',
                    active: true
                },
                {
                    _id: new ObjectId(),
                    name: 'Jane Doe',
                    email: 'jane@example.com',
                    role: 'customer',
                    active: true
                }
            ];
            mockToArray.mockResolvedValueOnce(mockUsersList);

            await usersController.getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsersList);
        });

        it('should return 500 if database throws an error', async () => {
            mockToArray.mockRejectedValueOnce(new Error('Database query failure'));

            await usersController.getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error loading users data'
            }));
        });
    });

    describe('GET /users/:id (getSingleUser)', () => {
        it('should return 200 and the user when a valid ID exists', async () => {
            const validId = new ObjectId().toString();
            const mockUser = {
                _id: new ObjectId(validId),
                name: 'Henrique Gregorio',
                email: 'henrique@example.com',
                role: 'admin'
            };
            req.params.id = validId;
            mockFindOne.mockResolvedValueOnce(mockUser);

            await usersController.getSingleUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 400 when an invalid ObjectId format is provided', async () => {
            req.params.id = 'invalid-user-id';

            await usersController.getSingleUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Must use a valid user id.' });
        });

        it('should return 404 when user is not found', async () => {
            const validId = new ObjectId().toString();
            req.params.id = validId;
            mockFindOne.mockResolvedValueOnce(null);

            await usersController.getSingleUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should return 500 if database query throws an error', async () => {
            const validId = new ObjectId().toString();
            req.params.id = validId;
            mockFindOne.mockRejectedValueOnce(new Error('Database read failure'));

            await usersController.getSingleUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error loading user data'
            }));
        });
    });
});
