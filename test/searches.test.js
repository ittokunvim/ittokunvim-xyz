const request = require('supertest');
const axios = require('axios');
const config = require('config');

const app = require('../app.js');
const apiURL = config.get('apiURL');

describe('GET /search/result', function () {
  let post = {}

  beforeEach(async () => { post = await createPost(); });

  afterEach(async () => { await deletePost(post); });

  test('it should be success', async function () {
    await request(app)
      .get('/search/result?q=' + post.title + '&type=posts' + '&page=1')
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(new RegExp(`Search - ${post.title}</title>`));
      });
  });

  test('non query', async function () {
    await request(app)
      .get('/search/result')
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(new RegExp('Search not found'));
      });
  });

  test('unknown type', async function () {
    await request(app)
      .get('/search/result?q=' + post.title + '&type=hogebar')
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(new RegExp(`Search - ${post.title}</title>`));
      });
  });

  test('too many page', async function () {
    await request(app)
      .get('/search/result?q=' + post.title + '&page=999')
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Search not found/);
      });
  });
});

async function createPost() {
  let post = {
    title: 'test',
    content: '# hello world',
  };

  return await axios.post(apiURL + '/api/v1/posts', post)
    .then(res => res.data)
    .catch(err => console.error(err));
}

async function deletePost(post) {
  await axios.delete(apiURL + '/api/v1/posts/' + post.id)
    .then(res => res.data)
    .catch(err => console.error(err));
}
