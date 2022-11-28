const axios = require('axios');
const debug = require('debug')('blog:posts');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { DateTime } = require('luxon');

const apiURL = config.get('apiURL');

// display post list
exports.list = async (req, res, next) => {
  axios.get(apiURL + '/api/v1/posts')
    .then((res) => res.data)
    .then((posts) => {
      posts.forEach(callbackFormatDateTime)
      return posts;
    })
    .then((posts) => {
      res.render('posts/list', {
        title: 'Post list',
        posts: posts,
      });
    })
    .catch((err) => next(err))
};

// display post detail
exports.detail = (req, res, next) => {
  axios.get(getApiPostURL(req.params.id))
    .then(res => res.data)
    .then(callbackFormatDateTime)
    .then(post => {
      res.render('posts/detail', {
        title: post.title,
        post: post,
      })
    })
    .catch(err => {
      // post not found
      if (err.response.status === 404) {
        res.status(404);
        res.render('posts/404', {
          title: 'Post not found',
        });
        return;
      }
      next(err);
    });
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
        req.flash('success', '記事を作成しました');
        res.redirect(post.id);
      })
      .catch(err => next(err));
  },
]

// display post update
exports.update_get = (req, res, next) => {
  axios.get(getApiPostURL(req.params.id))
    .then(res => res.data)
    .then(post => {
      res.render('posts/update', {
        title: 'Post update',
        post: post,
      });
    })
    .catch(err => {
      // post not found
      if (err.response.status === 404) {
        res.status(404);
        res.render('posts/404', {
          title: 'Post not found',
        });
        return;
      }
      next(err);
    });
};

// handle post update
exports.update_post = [
  validationPost('post.id'),
  validationPost('post.title'),
  validationPost('post.content'),
  (req, res, next) => {
    const errors = validationResult(req);
    const post = req.body.post;

    // validation error
    if (!errors.isEmpty()) {
      res.status(422);
      res.render('posts/update', {
        title: 'Post update',
        post: post,
        errors: errors.array(),
      });
    }

    axios.patch(getApiPostURL(req.params.id), post)
      .then(res => res.data)
      .then(post => {
        req.flash('success', '記事を更新しました');
        res.redirect('/posts/' + post.id)
      })
      .catch(err => {
        // post not found
        if (err.response.status === 404) {
          res.status(404);
          res.render('posts/404', {
            title: 'Post not found',
          });
          return;
        }
        next(err);
      });
  },
];

// handle post delete
exports.delete_post = [
  validationPost('post.id'),
  (req, res, next) => {
    const errors = validationResult(req);
    const post = req.body.post;

    // validation error
    if (!errors.isEmpty()) {
      res.status(422);
      res.render('posts/delete', {
        title: 'Post delete',
        post: post,
        errors: errors.array(),
      });
    }

    axios.delete(getApiPostURL(req.params.id), post)
      .then(() => {
        req.flash('success', '記事を削除しました');
        res.redirect('/posts/list');
      })
      .catch(err => {
        // post not found
        if (err.response.status === 404) {
          res.status(404);
          res.render('posts/404', {
            title: 'Post not found',
          });
          return;
        }
        next(err);
      });
  },
];

function validationPost(field) {
  switch (field) {
    case 'post.id':
      return check(field)
        .trim()
        .escape()
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

function getApiPostURL(id) {
  return apiURL + '/api/v1/posts/' + id;
}

function callbackFormatDateTime(post) {
  post.created_at = formatDateTime(post.created_at);
  post.updated_at = formatDateTime(post.updated_at);
  return post;
}

function formatDateTime(date) {
  return DateTime.fromISO(date).setLocale('ja').toLocaleString(DateTime.DATE_MED)
}

