const express = require('express');
const router = express.Router();

const searchesController = require('../controllers/searches.js');

router.get('/result', searchesController.result_get);

module.exports = router;
