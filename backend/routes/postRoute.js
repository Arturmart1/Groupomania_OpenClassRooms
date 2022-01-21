const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postController = require('../controllers/post');

router.get('/', postController.gets);
router.get('/:id', postController.getOnePost);
router.post('/', postController.newPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.post('/:id/like', postController.likePost)

module.exports = router;