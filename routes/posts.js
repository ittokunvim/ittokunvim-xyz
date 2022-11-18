const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts.js');

/* GET /posts */
router.get('/list', postsController.list);

router.get('/create', postsController.create_get);
router.post('/create', postsController.create_post);

router.get('/:id/update', postsController.update_get);
router.post('/:id/update', postsController.update_post);

router.get('/:id/delete', postsController.delete_get);
router.post('/:id/delete', postsController.delete_post);

router.get('/:id', postsController.detail);

module.exports = router;
