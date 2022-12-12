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
    let url = getApiURL('create_post', req);

    const post = await axios.get(url)
      .then(res => res.data)
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

    // validation error
    if (!errors.isEmpty()) {
      res.status(422);
      req.flash('failed', errors.array()[0].msg)
      res.redirect('/posts/' + post.id);
    }

    // success
    axios.post(url + '/comments', comment)
      .then(res => res.data)
      .then(comment => {
        req.flash('success', 'コメントを作成しました');
        res.redirect('/posts/' + post.id);
      })
      .catch(err => next(err));
  }
];

exports.delete_post = (req, res, next) => {
  // post not found

  // comment not found

  // success
};

function validationComment(field) {
  switch (field) {
    case 'comment.content':
      return check(field, 'コメントを入力してください')
        .trim()
        .escape()
        .isLength({ min: 1 })
  }
}

function getApiURL(action_name, req) {
  switch (action_name) {
    case 'create_post':
      return `${apiURL}/posts/${req.params.post_id}`;
    case 'delete_post':
      break;
  }
}
