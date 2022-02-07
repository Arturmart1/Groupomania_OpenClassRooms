const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/comment');

router.get('/:id/display', commentController.getComment);
router.post('/reply',auth, commentController.newComment);
router.delete('/:id',auth, commentController.deleteComment);

module.exports = router;