const userController = require('../../controllers/userController');
const User = require('../../models/User');

jest.mock('../../models/User', () => ({
  find: jest.fn(),
}));

describe('getAllUsers controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { user: { role: '' } },
    };

    res = {
      status: jest.fn().mockReturnThis(), // for chaining
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  test('returns 403 if user is not admin', async () => {
    req.user.role = 'user';

    await userController.getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: 'You are not admin, you can not access all the user info',
    });
  });

  test('returns 200 and users if user is admin', async () => {
    req.user.role = 'admin';

    const fakeUsers = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    User.find.mockResolvedValue(fakeUsers);

    await userController.getAllUsers(req, res);

    expect(User.find).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeUsers);
  });

  test('returns 500 if there is an error', async () => {
    req.user.user.role = 'admin';

    const errorMessage = 'DB error';
    User.find.mockRejectedValue(new Error(errorMessage));

    await userController.getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
