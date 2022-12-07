const request = require('supertest');
const session = require('supertest-session');

const app = require('../app.js');

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

  test('too many page', async function () {
    await request(app)
      .get('/posts/list?page=999')
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post not found/);
      });
  });
});

describe('GET /posts/:id', function () {
  let post = {}

  beforeEach(async () => { post = await createPost(); });

  afterEach(async () => { await deletePost(post); });

  test('it should be success', async function () {
    await request(app)
      .get('/posts/' + post.id)
      .expect(200)
      .expect('Content-Type', /html/)
      .then((res) => {
        expect(res.text).toMatch(new RegExp(post.title));
        expect(res.text).toMatch(new RegExp(post.content.replace('# ', '') + '</h1>'));
      });
  });

  test('post not found', async function () {
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

    await session(app)
      .post('/posts/create')
      .send(post)
      .redirects()
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        post['id'] = res.request.url.match(/posts\/([\d]+)/)[1]
        expect(res.text).toMatch(new RegExp(post.title));
        expect(res.text).toMatch(new RegExp(/flash/))
        request(app).get('/').then(res => expect(res.text).not.toMatch(/flash/))
      });
    await deletePost(post);
  });

  test('validation error', async function () {
    let post = {
      post: {
        title: '',
        content: '> ref',
      }
    };

    await request(app)
      .post('/posts/create')
      .send(post)
      .expect(422)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post create/);
        expect(res.text).toMatch(new RegExp(post.content));
      });
  })
});

describe('GET /posts/:id/update', function () {
  let post = {}

  beforeEach(async () => { post = await createPost(); });

  afterEach(async () => { await deletePost(post); });

  test('it should be success', async function () {
    await request(app)
      .get('/posts/' + post.id + '/update')
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post update/);
        expect(res.text).toMatch(post.title);
      });
  });

  test('post not found', async function () {
    await request(app)
      .get('/posts/' + '1234567890' + '/update')
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post not found/);
      });
  });
});

describe('POST /posts/:id/update', function () {
  let post = {}

  beforeEach(async () => { post = await createPost(); });

  afterEach(async () => { await deletePost(post); });

  test('it should be success', async function () {
    await session(app)
      .post('/posts/' + post.id + '/update')
      .send({ 'post': post })
      .redirects()
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(new RegExp(post.title));
        expect(res.text).toMatch(new RegExp(post.content.replace('# ', '') + '</h1>'));
        expect(res.text).toMatch(new RegExp(/flash/))
      });
  });

  test('unknown post id', async function () {
    await request(app)
      .post('/posts/' + '1234567890' + '/update')
      .send({ 'post': post })
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post not found/);
      });
  });

  test('validation error', async function () {
    post.title = post.content = ''
    await request(app)
      .post('/posts/' + post.id + '/update')
      .send({ 'post': post })
      .expect(422)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post update/);
      });
  });
});

describe('POST /posts/:id/delete', function () {
  let post = {}

  beforeEach(async () => { post = await createPost(); });

  test('it should be success', async function () {
    await session(app)
      .post('/posts/' + post.id + '/delete')
      .send({ 'post': post })
      .redirects()
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post list/);
        expect(res.text).toMatch(new RegExp(/flash/))
      });
  });

  test('post not found', async function () {
    await request(app)
      .post('/posts/' + '1234567890' + '/delete')
      .send({ 'post': post })
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post not found/);
      });
    await deletePost(post);
    
  });
});
