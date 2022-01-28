const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postController = require('../controllers/post');

router.get('/', postController.gets);
router.get('/:id', postController.getOnePost);
router.post('/new', postController.newPost);
router.put('/:id',auth, postController.updatePost);
router.delete('/:id',auth, postController.deletePost);
router.post('/:id/like',auth, postController.likePost);

module.exports = router;