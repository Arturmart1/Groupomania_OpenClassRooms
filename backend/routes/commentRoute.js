const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/comment');

router.get('/:id', commentController.getComment);
router.get('/:id/display', commentController.getOneComment);
router.post('/reply', commentController.newComment);
router.delete('/:id',auth, commentController.deleteComment);

module.exports = router;