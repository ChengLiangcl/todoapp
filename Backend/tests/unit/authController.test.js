const User = require('../../models/User');

const { loginSchema } = require('../../validation/user');
const authController = require('../../controllers/authController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
describe('POST /login', () => {
  it('Should respond 500 code if username and password missing', async () => {
    const body = { body: {} };
    const req = body;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await authController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'username is required. password is required',
      status: 500,
    });
  });
  it('Should resposne 400 when user does not exist', async () => {
    const req = { body: { username: 'test', password: 'Big@ss911111' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    User.findOne.mockResolvedValue(null);
    await authController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User does not exist' });
  });
  it('Should response 401 and Wrong password, please try again when wrong password', async () => {
    req = { body: { username: 'test', password: 'Big@ss911111' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    User.findOne.mockResolvedValue({
      username: 'test1',
      password: 'Big@ss911111',
    });
    bcrypt.compare.mockResolvedValue(false);
    await authController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Wrong password, please try again',
    });
  });
});
