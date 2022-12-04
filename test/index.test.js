const request = require('supertest');
const app = require('../app');

describe('/', function () {
  it('it should response the GET method', () => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(new RegExp('Blog ittoku tech</title>'));
        expect(res.text).toMatch(new RegExp('href="/"'));
        expect(res.text).toMatch(new RegExp('ittoku-ky73'));
        expect(res.text).toMatch(new RegExp('/search/result'));
      })
  });
});

describe('/hogebar', function () {
  it('it should response 404 Not Found', () => {
    return request(app)
      .get('/hogebar')
      .expect(404)
      .expect('Content-Type', /html/)
  });
});
