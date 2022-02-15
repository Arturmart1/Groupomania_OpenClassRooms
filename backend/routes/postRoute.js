const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postController = require('../controllers/post');

router.get('/', postController.getAllPosts);
router.get('/:id', auth, postController.getOnePost);
router.post('/new', auth, postController.newPost);
router.put('/:id',auth, postController.updatePost);
router.delete('/:id',auth, postController.deletePost);
router.post('/:id/like',auth, postController.likePost);

module.exports = router;