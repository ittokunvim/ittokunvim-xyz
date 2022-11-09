const axios = require('axios');

// display post list
exports.index = (req, res, next) => {
  axios.get('http://api:8000/api/v1/posts')
    .then((res) => res.data)
    .then((posts) => res.render('posts/index', {
      title: 'Post list',
      posts: posts,
    }))
    .catch((err) => next(err))
};

// display post create
exports.create_get = (req, res, next) => {
  res.render('posts/create', {
    title: 'Post create',
  });
};

// handle post create
exports.create_post = (req, res, next) => {
  res.send('NOT IMPLEMENT: post create');
};

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

// display post detail
exports.detail = (req, res, next) => {
  res.send('NOT IMPLEMENT: post detail');
};
