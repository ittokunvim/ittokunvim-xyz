const axios = require('axios');
const debug = require('debug')('blog:searches');
const config = require('config');

const apiURL = config.get('apiURL');

// display search list
exports.posts_get = (req, res, next) => {
  req.query.q = (typeof req.query.q === 'undefined') ? '' : req.query.q;

  axios.get(apiURL + '/api/v1/search/posts?q=' + req.query.q)
    .then(res => res.data)
    .then(posts => {
      res.render('search/result', {
        title: 'Search - ' + req.query.q,
        posts: posts,
      });
    })
    .catch((err) => {
      // search not found
      if (err.response.status === 404) {
        res.status(404);
        res.render('search/404', {
          title: 'Search not found',
        });
        return;
      }
      next(err)
    });
};
