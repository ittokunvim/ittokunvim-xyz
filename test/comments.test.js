const request = require('supertest');
const session = require('supertest-session');

const app = require('../app.js');

describe('POST /posts/:id/comments', function () {
  let post = {}

  beforeEach(async () => { post = await createPost(); });

  afterEach(async () => { await deletePost(post); });

  test('it should be success', async function () {
    let comment = commentHash;

    await session(app)
      .post('/posts/' + post.id + '/comments')
      .send(comment)
      .redirects()
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(new RegExp(`${post.title}</title>`))
        expect(res.text).toMatch(new RegExp(comment.content));
        expect(res.text).toMatch(new RegExp(/flash/));
      });
  });

  test('validation error', async function () {
    let comment = {
      comment: {
        content: '',
      }
    };

    await session(app)
      .post('/posts/' + post.id + '/comments')
      .send(comment)
      // .expect(422)
      .redirects() // あとで修正
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(new RegExp(`${post.title}</title>`))
        expect(res.text).toMatch(new RegExp(/flash/));
      });
  });

  test('post not found', async function () {
    let comment = commentHash;

    await request(app)
      .post('/posts/' + 1234 + '/comments')
      .send(comment)
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(new RegExp('URL Not Found'));
      });
  });
});

describe('POST /posts/:id/comments/:id', function () {
  let post = {}

  beforeEach(async () => {
    post = await createPost();
    comment = await createPostComment(post);
  });

  afterEach(async () => { await deletePost(post); });

  test('it should be success', async function () {
    await session(app)
      .post('/posts/' + post.id + '/comments/' + comment.id)
      .redirects()
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(new RegExp(post.title + '</title>'));
        expect(res.text).not.toMatch(new RegExp(comment.content));
        expect(res.text).toMatch(/flash/);
      });
  });

  test('post not found', async function () {
    await request(app)
      .post('/posts/' + 1234 + '/comments/' + comment.id)
      .redirects()
      .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(new RegExp('URL Not Found'));
      });
  });

  test('comment not found', async function () {
    await session(app)
      .post('/posts/' + post.id + '/comments/' + 1234)
      .redirects()
      // .expect(404)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/flash/);
      });
  });
});
