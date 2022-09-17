const request = require('supertest');
const app = require('../app');
// const createError = require('http-errors');

describe('/', function () {
  it('return html response', function () {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
  });
});

describe('/hogebar', function () {
  it('return 404 Not Found', function () {
    return request(app)
      .get('/hogebar')
      .expect(404)
      .expect('Content-Type', /html/)
  });
});
