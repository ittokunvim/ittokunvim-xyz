const axios = require('axios');
const debug = require('debug')('blog:searches');
const config = require('config');

const apiURL = config.get('apiURL');

// display search list
exports.result_get = (req, res, next) => {
  const url = getSearchURL(req);

  axios.get(url)
    .then(res => res.data)
    .then(data => {
      const searchTarget = getSearchTarget(req);

      res.render('search/' + searchTarget, {
        title: 'Search - ' + req.query.q,
        [searchTarget]: data,
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

function getSearchTarget(req) {
  return (req.query.type) ? req.query.type : 'posts';
}

function getSearchURL(req) {
  const q = getQeury('q', req);
  const type = getQeury('type', req);
  const target = getSearchTarget(req);

  return `${apiURL}/api/v1/search/${target}?${q}&${type}`;
}

function getQeury(name, req) {
  return (req.query[name]) ? `${name}=${req.query[name]}` : '';
}
