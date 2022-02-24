const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/comment');

router.get('/:id/display', commentController.getAllComments);
router.get('/:id', auth, commentController.getOneComment);
router.post('/reply',auth, commentController.newComment);
router.delete('/delete/:id',auth, commentController.deleteComment);
router.put('/update/:id', auth, commentController.updateComment);

module.exports = router;