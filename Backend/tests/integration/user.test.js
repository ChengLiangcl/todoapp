const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
// const User = require('../../models/User');
const dbConnect = require('../../configs/db');

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API - Create User', () => {
  const userCreateAPI = '/auth/register'; // or '/auth/register' if that's correct

  it('should return 400 when creating a user with an existing username', async () => {
    const res = await request(app).post(userCreateAPI).send({
      username: 'cheng.liang',
      email: 'cheng.liang@testing.com',
      password: 'Big@ss911111',
      confirmPassword: 'Big@ss911111',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('username cheng.liang already exists');
  });
});

// it('POST /users/ - Create a existing user with existing email', async () => {
//   const res = await request(app).post(userCreateAPI).send({
//     username: 'jayparkdope',
//     email: 'jay.park@testing.com',
//     name: 'Jason Liang',
//   });
//   expect(res.body.code).toBe(400);
//   expect(res.body.message).toBe(
//     "email can't be duplicated, try to enter a unique email"
//   );
// });
