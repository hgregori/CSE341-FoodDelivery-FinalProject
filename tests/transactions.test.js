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

const transactionsController = require('../controller/transactions');

describe('Transactions Controller - Unit Tests for GET and GET ALL routes', () => {
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

    describe('GET /transactions (getAllTransactions)', () => {
        it('should return 200 and a list of all transactions', async () => {
            const mockTransactionsList = [
                {
                    _id: new ObjectId(),
                    userId: new ObjectId().toString(),
                    totalPrice: 28.97,
                    status: 'pending'
                },
                {
                    _id: new ObjectId(),
                    userId: new ObjectId().toString(),
                    totalPrice: 45.50,
                    status: 'completed'
                }
            ];
            mockToArray.mockResolvedValueOnce(mockTransactionsList);

            await transactionsController.getAllTransactions(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTransactionsList);
        });

        it('should return 500 if database throws an error', async () => {
            mockToArray.mockRejectedValueOnce(new Error('Database query failure'));

            await transactionsController.getAllTransactions(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error loading transactions data'
            }));
        });
    });

    describe('GET /transactions/:id (getSingleTransaction)', () => {
        it('should return 200 and the transaction when a valid ID exists', async () => {
            const validId = new ObjectId().toString();
            const mockTransaction = {
                _id: new ObjectId(validId),
                userId: new ObjectId().toString(),
                totalPrice: 28.97,
                status: 'pending'
            };
            req.params.id = validId;
            mockFindOne.mockResolvedValueOnce(mockTransaction);

            await transactionsController.getSingleTransaction(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTransaction);
        });

        it('should return 400 when an invalid ObjectId format is provided', async () => {
            req.params.id = 'invalid-transaction-id';

            await transactionsController.getSingleTransaction(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Must use a valid transaction id.' });
        });

        it('should return 404 when transaction is not found', async () => {
            const validId = new ObjectId().toString();
            req.params.id = validId;
            mockFindOne.mockResolvedValueOnce(null);

            await transactionsController.getSingleTransaction(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Transaction not found' });
        });

        it('should return 500 if database query throws an error', async () => {
            const validId = new ObjectId().toString();
            req.params.id = validId;
            mockFindOne.mockRejectedValueOnce(new Error('Database read failure'));

            await transactionsController.getSingleTransaction(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error loading transaction data'
            }));
        });
    });
});
