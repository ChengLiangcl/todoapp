const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../app');
// const User = require('../../models/User');
const dbConnect = require('../../../configs/db');

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API Create ', () => {
  const userCreateAPI = '/users/';
  it('POST /users/ - Create a existing user with existing username', async () => {
    const res = await request(app).post(userCreateAPI).send({
      username: 'jaypark',
      email: 'jay.park@testing.com',
      name: 'Jason Liang',
    });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(
      "username can't be duplicated, try to enter a unique username"
    );
  });

  it('POST /users/ - Create a existing user with existing email', async () => {
    const res = await request(app).post(userCreateAPI).send({
      username: 'jayparkdope',
      email: 'jay.park@testing.com',
      name: 'Jason Liang',
    });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(
      "email can't be duplicated, try to enter a unique email"
    );
  });
});
