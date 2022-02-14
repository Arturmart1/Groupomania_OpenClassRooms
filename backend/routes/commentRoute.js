const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/comment');

router.get('/:id/display', commentController.getAllComments);
router.get('/all', auth, commentController.commentsList);
router.post('/reply',auth, commentController.newComment);
router.delete('/:id',auth, commentController.deleteComment);

module.exports = router;