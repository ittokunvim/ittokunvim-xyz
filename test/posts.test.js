const request = require('supertest');
const app = require('../app.js');

describe('GET /posts', function () {
  test('it should be success', async function () {
    await request(app)
      .get('/posts')
      .expect(200)
      .expect('Content-Type', /html/)
      .then(res => {
        expect(res.text).toMatch(/Post list/);
        expect(res.text).toMatch(/First post/);
      });
  });
});

describe('GET /posts/:id', function () {
  test('it should be success', function () {
    // let post = fetchPost('http://localhost:8000/api/v1/posts/1');
    let post = { uuid: 'uuid' };

    request(app)
      .get('/posts/' + post.uuid)
      .expect(200)
      .expect('Content-Type', /html/)
      .end(requestEndCallback);
    // .then((res) => {
    //   expect(res.text).toMatch(post.title);
    // });
  });

  // test('it should be failed', function () {
  //   request(app)
  //     .get('/posts/invaliduuid')
  //     .expect(404)
  //     .expect('Content-Type', /html/)
  // });
});

describe('GET /posts/create', function () {
  test('it should be success', function () {
    request(app)
      .get('/posts/create')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(requestEndCallback);
  });
});

describe('POST /posts/create', function () {
  test('it should be success', function () {
    let post = {};

    request(app)
      .post('/posts/create')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(requestEndCallback);
  });
});

describe('GET /posts/:id/update', function () {
  test('it should be success', function () {
    let post = { uuid: 'uuid' };

    request(app)
      .get('/posts/' + post.uuid + '/update')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(requestEndCallback);
  });
});

describe('PATCH /posts/:id/update', function () {
  test('it should be success', function () {
    let post = { uuid: 'uuid' };

    request(app)
      .patch('/posts/' + post.uuid + '/update')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(requestEndCallback);
  });
});

describe('GET /posts/:id/delete', function () {
  test('it should be success', function () {
    let post = { uuid: 'uuid' };

    request(app)
      .get('/posts/' + post.uuid + '/delete')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(requestEndCallback);
  });
});

describe('DELETE /posts/:id/delete', function () {
  test('it should be success', function () {
    let post = { uuid: 'uuid' };

    request(app)
      .delete('/posts/' + post.uuid + '/delete')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(requestEndCallback);
  });
});

// async function fetchPost(url) {
//   try {
//     const res = await fetch(url);
//     const json = await res.json();
//     json;
//   }
//   catch (err) {
//     console.error('fetchPost error: ', err);
//   }
// }

function requestEndCallback(err, res) {
  if (err) throw err;
}
