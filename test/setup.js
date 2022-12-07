const axios = require('axios');
const config = require('config');

const apiURL = config.get('apiURL');

/** @type {import('jest').Config} */
const setup = {
  globals: {
    __DEV__: true,
  },
};

global.createPost = async function () {
  let post = {
    title: 'test',
    content: '# hello world',
  };

  return await axios.post(apiURL + '/posts', post)
    .then(res => res.data)
    .catch(err => console.error(err));
}

global.deletePost = async function (post) {
  await axios.delete(apiURL + '/posts/' + post.id)
    .then(res => res.data)
    .catch(err => console.error(err));
}

module.exports = setup;
