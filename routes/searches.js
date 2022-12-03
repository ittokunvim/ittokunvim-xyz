const express = require('express');
const router = express.Router();

const searchesController = require('../controllers/searches.js');

router.get('/posts', searchesController.posts_get);

module.exports = router;
