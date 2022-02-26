const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postController = require('../controllers/post');

router.get('/', postController.getAllPosts);
router.get('/:id', auth, postController.getOnePost);
router.post('/new', auth, multer, postController.newPost);
router.put('/:id',auth, multer, postController.updatePost);
router.delete('/:id',auth, postController.deletePost);

module.exports = router;