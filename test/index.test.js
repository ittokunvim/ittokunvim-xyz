const request = require('supertest');
const app = require('../app');

describe('/', function () {
  it('it should response the GET method', (done) => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/text\/html/);
        done();
      });
  });
});

describe('/hogebar', function () {
  it('it should response 404 Not Found', (done) => {
    request(app)
      .get('/hogebar')
      .then(res => {
        expect(res.statusCode).toBe(404);
        expect(res.headers['content-type']).toMatch(/text\/html/);
        done();
      })
  });
});
