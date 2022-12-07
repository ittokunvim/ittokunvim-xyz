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

function getSearchURL(req) {
  const q = getQeury('q', req);
  const type = getQeury('type', req);
  const page = getQeury('page', req);
  const target = getSearchTarget(req);

  return `${apiURL}/api/v1/search/${target}?${q}&${type}&${page}`;
}

function getQeury(name, req) {
  return (req.query[name]) ? `${name}=${req.query[name]}` : '';

}

function getSearchTarget(req) {
  switch (req.query.type) {
    case 'posts':
      return 'posts';
    default:
      return 'posts';
  }
}
