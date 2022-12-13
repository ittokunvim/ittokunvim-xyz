const axios = require('axios');
const debug = require('debug')('blog:comments');
const config = require('config');
const { check, validationResult } = require('express-validator');

const apiURL = config.get('apiURL');

exports.create_post = [
  validationComment('comment.content'),
  async (req, res, next) => {
    const errors = validationResult(req);
    const comment = req.body.comment;
    const postURL = getApiURL('create_post.post', req);
    const commentURL = getApiURL('create_post.comment', req);

    axios.get(postURL)
      .then(res => res.data)
      .then(post => {
        debug('create_post post found:', post);
        // validation error
        if (!errors.isEmpty()) {
          debug('create_post comment validation error:', errors.array());
          res.status(422);
          req.flash('failed', errors.array()[0].msg)
          res.redirect('/posts/' + post.id);
          return;
        }
        // success
        axios.post(commentURL, comment)
          .then(res => res.data)
          .then(comment => {
            debug('create_post comment created:', comment);
            req.flash('success', 'コメントを作成しました');
            res.redirect('/posts/' + post.id);
          })
          .catch(err => next(err));
      })
      .catch(err => {
        debug('create_post post not found');
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
  }
];

exports.delete_post = async (req, res, next) => {
  const postURL = getApiURL('delete_post.post', req);
  const commentURL = getApiURL('delete_post.comment', req);

  axios.get(postURL)
    .then(res => res.data)
    .then(post => {
      debug('delete_post post found:', post);
      axios.delete(commentURL)
        .then(res => res.data)
        .then(comment => {
          debug('delete_post comment found:', comment);
          // success
          req.flash('success', 'コメントを削除しました');
          res.redirect('/posts/' + post.id);
        })
        .catch(err => {
          debug('delete_post comment not found');
          // comment not found
          if (err.response.status === 404) {
            res.status(404);
            req.flash('failed', 'コメントが見つかりません');
            res.redirect('/posts/' + post.id);
            return;
          }
          next(err);
        });
    })
    .catch(err => {
      debug('delete_post post not found');
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

function validationComment(field) {
  debug('validationComment: ', field);
  switch (field) {
    case 'comment.content':
      return check(field, 'コメントを入力してください')
        .trim()
        .escape()
        .isLength({ min: 1 })
  }
}

function getApiURL(action_name, req) {
  debug('getApiURL: ', action_name)
  switch (action_name) {
    case 'create_post.post':
    case 'delete_post.post':
      return `${apiURL}/posts/${req.params.post_id}`;
    case 'create_post.comment':
      return `${apiURL}/posts/${req.params.post_id}/comments`;
    case 'delete_post.comment':
      return `${apiURL}/posts/${req.params.post_id}/comments/${req.params.comment_id}`;
  }
}
