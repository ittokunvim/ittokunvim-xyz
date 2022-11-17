const request = require('supertest');
const axios = require('axios');
const config = require('config');

const app = require('../app.js');
const apiURL = config.get('apiURL');

describe('GET /posts/list', function () {
  test('it should be success', async function () {
    await request(app)
      .get('/posts/list')
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post list/);
      });
  });
});

describe('GET /posts/:id', function () {
  let post = {}

  beforeEach(async () => {
    post = await createPost();
  });

  afterEach(async () => {
    await deletePost(post);
  });

  test('it should be success', async function () {
    await request(app)
      .get('/posts/' + post.id)
      .expect(200)
      .expect('Content-Type', /html/)
      .then((res) => {
        expect(res.text).toMatch(/Post detail/);
      });
  });

  test('it should be failed', async function () {
    await request(app)
      .get('/posts/111111')
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post not found/);
      });
  });
});

describe('GET /posts/create', function () {
  test('it should be success', async function () {
    await request(app)
      .get('/posts/create')
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post create/);
      });
  });
});

describe('POST /posts/create', function () {
  test('it should be success', async function () {
    let post = {
      post: {
        title: 'test',
        content: 'hello world',
      }
    };

    await request(app)
      .post('/posts/create')
      .send(post)
      .redirects()
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        post['id'] = res.request.url.match(/posts\/([\d]+)/)[1]
        expect(res.text).toMatch(/Post detail/);
      });
    await deletePost(post);
  });

  test('it should be failed', async function () {
    let post = {}

    await request(app)
      .post('/posts/create')
      .send(post)
      .expect(422)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post create/);
      });
  })
});

describe('GET /posts/:id/update', function () {
  test('it should be success', async function () {
    await request(app)
      .get('/posts/1/update')
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post update/);
      });
  });

  test('it should be failed', async function () {
    await request(app)
      .get('/posts/0192837465/update')
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post not found/);
      });
  });
});

describe('PATCH /posts/:id/update', function () {
  test('it should be success', async function () {
    let post = {
      post: {
        id: 1,
        title: 'test',
        content: 'update test',
      }
    };

    await request(app)
      .patch('/posts/1/update')
      .send(post)
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post detail/);
      });
  });

  test('unknown post id', async function () {
    let post = {};

    await request(app)
      .patch('/posts/0192837465/update')
      .send(post)
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post not found/);
      });
  });

  test('wrong post data', async function () {
    let post = {};

    await request(app)
      .patch('/posts/1/update')
      .send(post)
      .expect(422)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post update/);
      });
  });
});

describe('GET /posts/:id/delete', function () {
  test('it should be success', async function () {
    await request(app)
      .get('posts/1/delete')
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post delete/)
      });
  });

  test('it should be failed', async function () {
    await request(app)
      .get('posts/0192837465/delete')
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post not found/);
      });
  });
});

describe('DELETE /posts/:id/delete', function () {
  test('it should be success', async function () {
    let post = { id: 1 };

    await request(app)
      .delete('posts/1/delete')
      .send(post)
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post list/);
      });
  });

  test('post not found', async function () {
    let post = { id: 1 };

    await request(app)
      .delete('posts/0192837465/delete')
      .send(post)
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post not found/);
      });
  });

  test('wrong post id', async function () {
    let post = { id: 192837465 };

    await request(app)
      .delete('posts/1/delete')
      .send(post)
      .expect(422)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post delete/);
      });
  });
});

async function createPost() {
  let post = {
    title: 'test',
    content: 'hello',
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
