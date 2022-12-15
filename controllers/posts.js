const axios = require('axios');
const debug = require('debug')('blog:posts');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { DateTime } = require('luxon');
const { marked } = require('marked');

const apiURL = config.get('apiURL');

// display post list
exports.list = async (req, res, next) => {
  const url = getApiURL('list', req);

  axios.get(url)
    .then(res => res.data)
    .then(data => {
      debug('list: post format dateTime');
      data['posts'].forEach(callbackFormatDateTime)
      return data;
    })
    .then(data => {
      debug('list: posts found');
      res.render('posts/list', {
        title: 'Post list',
        posts: data['posts'],
        post_count: data['post_count'],
      });
    })
    .catch(err => {
      debug('list: post not found');
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

// display post detail
exports.detail = async (req, res, next) => {
  const postURL = getApiURL('detail.post', req);
  const commentURL = getApiURL('detail.comments', req);

  axios.get(postURL)
    .then(res => res.data)
    .then(callbackFormatDateTime)
    .then(callbackFormatContent)
    .then(post => {
      debug('detail: post found');
      // success
      axios.get(commentURL)
        .then(res => res.data)
        .then(data => { 
          data.forEach(callbackFormatDateTime)
          return data;
        })
        .then(comments => {
          debug('detail: post comments found');
          res.render('posts/detail', {
            title: post.title,
            post: post,
            comments: comments,
          })
        })
        .catch(err => next(err));
    })
    .catch(err => {
      debug('detail: post not found');
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
    const url = getApiURL('create_post', req);

    // validation error
    if (!errors.isEmpty()) {
      debug('create_post: validation error');
      res.status(422);
      post.content = unescapeContent(post.content)
      res.render('posts/create', {
        title: 'Post create',
        post: post,
        errors: errors.array(),
      });
      return;
    }

    // success
    axios.post(url, post)
      .then(res => res.data)
      .then(post => {
        debug('create_post: post created');
        req.flash('success', '記事を作成しました');
        res.redirect(post.id);
      })
      .catch(err => next(err));
  },
]

// display post update
exports.update_get = (req, res, next) => {
  const url = getApiURL('update_get', req);

  axios.get(url)
    .then(res => res.data)
    .then(post => {
      debug('update_get: post found');
      post.content = unescapeContent(post.content)
      res.render('posts/update', {
        title: 'Post update',
        post: post,
      });
    })
    .catch(err => {
      debug('update_get: post not found');
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
  validationPost('post.title'),
  validationPost('post.content'),
  (req, res, next) => {
    const errors = validationResult(req);
    const post = req.body.post;
    const url = getApiURL('update_post', req)

    // validation error
    if (!errors.isEmpty()) {
      debug('update_post: validation error');
      res.status(422);
      res.render('posts/update', {
        title: 'Post update',
        post: post,
        errors: errors.array(),
      });
    }

    // success
    axios.patch(url, post)
      .then(res => res.data)
      .then(post => {
        debug('update_post: post updated');
        req.flash('success', '記事を更新しました');
        res.redirect('/posts/' + post.id)
      })
      .catch(err => {
        debug('update_post: post not found');
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
exports.delete_post = (req, res, next) => {
  const url = getApiURL('delete_post', req);

  axios.delete(url)
    .then(() => {
      debug('delete_post: post deleted');
      req.flash('success', '記事を削除しました');
      res.redirect('/posts/list');
    })
    .catch(err => {
      debug('delete_post: post not found');
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

function validationPost(field) {
  debug(`validationPost(${field})`);
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

function getApiURL(name, req) {
  debug(`getApiURL(${name}, req)`);
  switch (name) {
    case 'list': 
      return `${apiURL}/posts?${getQuery('page', req)}`;
    case 'detail.post':
    case 'update_get':
    case 'update_post':
    case 'delete_post':
      return `${apiURL}/posts/${req.params.id}`;
    case 'detail.comments':
      return `${apiURL}/posts/${req.params.id}/comments`;
    case 'create_post':
      return `${apiURL}/posts`;
  }
}

function callbackFormatDateTime(post) {
  post.created_at = formatDateTime(post.created_at);
  post.updated_at = formatDateTime(post.updated_at);
  return post;
}

function formatDateTime(date) {
  return DateTime.fromISO(date).setLocale('ja').toLocaleString(DateTime.DATE_MED)
}

function callbackFormatContent(post) {
  debug('callbackFormatContent(post)');
  post.content = marked.parse(unescapeContent(post.content));
  return post;
}

function unescapeContent(content) {
  debug('unescapeContent(content)')
  return content
    .replace(/&gt;/g, '>')
}

function getQuery(name, req) {
  debug(`getQuery(${name}, req)`);
  return (req.query[name]) ? `${name}=${req.query[name]}` : '';
}
