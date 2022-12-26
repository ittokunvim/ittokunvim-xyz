const request = require('supertest');
const app = require('../app');

describe('/', function () {
  it('it should be success', () => {
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
  it('URL Not Found', () => {
    return request(app)
      .get('/hogebar')
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(new RegExp('URL Not Found'));
      })
  });
});
