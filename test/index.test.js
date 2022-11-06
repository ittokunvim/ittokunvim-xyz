const request = require('supertest');
const app = require('../app');

describe('/', function () {
  it('it should response the GET method', () => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end(callbackError)
  });
});

describe('/hogebar', function () {
  it('it should response 404 Not Found', () => {
    return request(app)
      .get('/hogebar')
      .expect(404)
      .expect('Content-Type', /text\/html/)
  });
});

function callbackError(err, res) {
  if (err) throw err;
}
