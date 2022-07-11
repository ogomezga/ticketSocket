const { Server } = require('../../models/server');
const http = require('http');

jest.mock('http', () => ({
    createServer: jest.fn(() => ({ listen: jest.fn() })),
}));

jest.mock('./../../models/server', () => ({
    constructor: jest.fn(() => ({ app: jest.fn() })),
}));
  
describe('Server', () => {

    it('should create server on port 8080', () => {
        const server = new Server().listen();
        server.listen();
        expect(http.createServer).toBeCalled();
    });
});