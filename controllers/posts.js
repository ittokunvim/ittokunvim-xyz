const axios = require('axios');
const debug = require('debug')('blog:posts');
const config = require('config');
const { check, validationResult } = require('express-validator');

const apiURL = config.get('apiURL');

// display post list
exports.list = async (req, res, next) => {
  axios.get(apiURL + '/api/v1/posts')
    .then((res) => res.data)
    .then((posts) => res.render('posts/list', {
      title: 'Post list',
      posts: posts,
    }))
    .catch((err) => next(err))
};

// display post detail
exports.detail = (req, res, next) => {
  axios.get(apiURL + '/api/v1/posts/' + req.params.id)
    .then(res => res.data)
    .then(post => {
      res.render('posts/detail', {
        title: 'Post detail',
        post: post,
      })
    })
    .catch(err => {
      debug(err.response);
      // post not found
      if (err.response.status === 404) {
        res.status(404);
        res.render('posts/404', {
          title: 'Post not found',
        });
        return;
      }
      next(err);
    })
};

// display post create
exports.create_get = (req, res, next) => {
  res.render('posts/create', {
    title: 'Post create',
    post: {},
  });
};

// handle post create
exports.create_post = [
  validationPost('post.title'),
  validationPost('post.content'),
  (req, res, next) => {
    const errors = validationResult(req);
    const post = req.body.post;

    // validation error
    if (!errors.isEmpty()) {
      res.status(422);
      res.render('posts/create', {
        title: 'Post create',
        post: post,
        errors: errors.array(),
      });
      return;
    }

    // success
    axios.post(apiURL + '/api/v1/posts', post)
      .then(res => res.data)
      .then(post => {
        res.redirect(post.id);
      })
      .catch(err => next(err));
  },
]

// display post update
exports.update_get = (req, res, next) => {
  res.send('NOT IMPLEMENT: post update');
};

// handle post update
exports.update_patch = (req, res, next) => {
  res.send('NOT IMPLEMENT: post update');
};

// display post delete
exports.delete_get = (req, res, next) => {
  res.send('NOT IMPLEMENT: post delete');
};

// handle post delete
exports.delete_delete = (req, res, next) => {
  res.send('NOT IMPLEMENT: post delete');
};

function validationPost(field) {
  switch (field) {
    case 'post.title':
      return check(field, 'Title is empty')
        .trim()
        .escape()
        .isLength({ min: 1 })
    case 'post.content':
      return check(field, 'Content is empty')
        .trim()
        .escape()
        .isLength({ min: 1 })
  }
}
