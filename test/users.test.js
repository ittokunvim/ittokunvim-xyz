const request = require('supertest');
const app = require('../app.js');

describe('GET /users', function () {
  it('return list of users', function () {
    return request(app)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /html/)
  });
});
