const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts.js');

/* GET /posts */
router.get('/', postsController.list);

router.get('/create', postsController.create_get);
router.post('/create', postsController.create_post);

router.get('/:id/update', postsController.update_get);
router.patch('/:id/update', postsController.update_patch);

router.get('/:id/delete', postsController.delete_get);
router.delete('/:id/delete', postsController.delete_delete);

router.get('/:id', postsController.detail);

module.exports = router;
