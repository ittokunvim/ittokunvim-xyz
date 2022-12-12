const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments.js');

router.post('/:post_id/comments/', commentsController.create_post);
router.post('/:post_id/comments/:comment_id', commentsController.delete_post);

module.exports = router;
